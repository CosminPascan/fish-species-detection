import labels from '../data/labels.json'
import Colors from './colors'

export const renderBoxes = (distance, canvas, boxesData, scoresData, classesData, ratios) => {
    const ctx = canvas.getContext('2d')
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)

    // configure font
    const font = `${Math.max(
        Math.round(Math.max(ctx.canvas.width, ctx.canvas.height) / 40), 
        22
    )}px Arial`
    ctx.font = font
    ctx.textBaseline = 'top'

    let detectedSpecies = null
    let detectedConfidence = null
    let realLength = null
    let realHeight = null

    for (let i = 0; i < scoresData.length; i++) {
        const className = labels[classesData[i]]
        const classScore = (scoresData[i] * 100).toFixed(2)

        if (classScore >= 90) {
            detectedSpecies = className
            detectedConfidence = classScore

            let [y1, x1, y2, x2] = boxesData.slice(4 * i, 4 * (i + 1))
            x1 *= ratios[0]
            x2 *= ratios[0]
            y1 *= ratios[1]
            y2 *= ratios[1]

            const width = x2 - x1
            const height = y2 - y1

            const focalLength = 500
            const focalHeight = 650

            realLength = Math.round(width * distance / focalLength * 100) / 100
            realHeight = Math.round(height * distance / focalHeight * 100) / 100

            // console.log(`class: ${className}, score: ${score}`)
            // console.log(`length: ${realLength}, height: ${realHeight}`)

            const colors = new Colors()
            const color = colors.get(classesData[i])

            // draw box
            ctx.fillStyle = 'rgba(255, 255, 255, 0.2)'
            ctx.fillRect(x1, y1, width, height)

            // draw border box
            ctx.strokeStyle = color
            ctx.lineWidth = Math.max(
                Math.min(ctx.canvas.width, ctx.canvas.height) / 200, 
                2.5
            )
            ctx.strokeRect(x1, y1, width, height)

            // draw label background
            ctx.fillStyle = color
            const textWidth = ctx.measureText(className + ' - ' + classScore + 
                '%, length - ' + realLength + 'cm, height - ' + realHeight + 'cm').width
            const textHeight = parseInt(font, 10)
            const yText = y1 - (textHeight + ctx.lineWidth)
            ctx.fillRect(
                x1 - 1, 
                yText < 0 ? 0 : yText, // handle overflow label box
                textWidth + ctx.lineWidth, 
                textHeight + ctx.lineWidth
            )

            // draw label
            ctx.fillStyle = '#FFFFFF'
            ctx.fillText(
                className + ' - ' + classScore + '%, length - ' + realLength + 'cm, height - ' + realHeight + 'cm', 
                x1 - 1, 
                yText < 0 ? 0 : yText
            )
        }
    }

    return [detectedSpecies, detectedConfidence, realLength, realHeight]
}