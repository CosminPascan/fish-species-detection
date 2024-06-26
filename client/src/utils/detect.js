import * as tf from '@tensorflow/tfjs'
import labels from '../data/labels.json'
import { renderBoxes } from './renderBox'

const noOfClasses = labels.length

const preprocess = (source, modelWidth, modelHeight) => {
    let xRatio, yRatio

    const input = tf.tidy(() => {
        const img = tf.browser.fromPixels(source)
        const [h, w] = img.shape.slice(0, 2)
        const maxSize = Math.max(w, h)
        const imgPadded = img.pad([
            [0, maxSize - h],
            [0, maxSize - w],
            [0, 0]
        ])

        xRatio = maxSize / w
        yRatio = maxSize / h

        return tf.image.
            resizeBilinear(imgPadded, [modelWidth, modelHeight]).
            div(255.0).
            expandDims(0)
    })

    return [input, xRatio, yRatio]
}

const detect = async(model, distance, cameraSource, canvas, returnDetectionData) => {
    const [modelWidth, modelHeight] = model.inputShape.slice(1, 3)

    tf.engine().startScope()

    const [input, xRatio, yRatio] = preprocess(cameraSource, modelWidth, modelHeight)
    
    const res = model.net.execute(input)
    const transRes = res.transpose([0, 2, 1])
    const boxes = tf.tidy(() => {
        const w = transRes.slice([0, 0, 2], [-1, -1, 1])
        const h = transRes.slice([0, 0, 3], [-1, -1, 1])
        const x1 = tf.sub(transRes.slice([0, 0, 0], [-1, -1, 1]), tf.div(w, 2))
        const y1 = tf.sub(transRes.slice([0, 0, 1], [-1, -1, 1]), tf.div(h, 2))
        
        return tf.concat([
            y1, 
            x1, 
            tf.add(y1, h), 
            tf.add(x1, w)
        ], 2).squeeze()
    })

    const [scores, classes] = tf.tidy(() => {
        const rawScores = transRes.slice([0, 0, 4], [-1, -1, noOfClasses]).squeeze(0)
        return [rawScores.max(1), rawScores.argMax(1)]
    })

    const nms = await tf.image.nonMaxSuppressionAsync(boxes, scores, 500, 0.45, 0.2)
    
    const boxesData = boxes.gather(nms, 0).dataSync()
    const scoresData = scores.gather(nms, 0).dataSync()
    const classesData = classes.gather(nms, 0).dataSync()

    const [detectedSpecies, detectedConfidence, realLength, realHeight] = 
        renderBoxes(distance, canvas, boxesData, scoresData, classesData, [xRatio, yRatio])
    
    tf.dispose([res, transRes, boxes, scores, classes, nms])

    returnDetectionData(detectedSpecies, detectedConfidence, realLength, realHeight)

    tf.engine().endScope()
}

export const detectLive = (model, distance, camera, canvas, callback) => {
    const detectFrame = async (model, distance, camera, canvas, returnDetectionData) => {
        const cameraSource = camera.video

        if (cameraSource === null) {
            return
        }
        
        detect(model, distance, cameraSource, canvas, (detectedSpecies, detectedConfidence, realLength, realHeight) => {
            returnDetectionData(detectedSpecies, detectedConfidence, realLength, realHeight)
            requestAnimationFrame(() => {
                detectFrame(model, distance, camera, canvas, returnDetectionData)
            })
        })
    }

    detectFrame(model, distance, camera, canvas, (detectedSpecies, detectedConfidence, realLength, realHeight) => {
        callback(detectedSpecies, detectedConfidence, realLength, realHeight)
    })
}