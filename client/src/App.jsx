import { useState, useEffect } from 'react'
import * as tf from '@tensorflow/tfjs'
import './style/App.css'
import CameraHandler from './components/CameraHandler'

function App() {
    const [model, setModel] = useState({
        net: null,
        inputShape: [1, 0, 0, 3]
    })

    const modelName = 'fish_species_v1.0'

    useEffect(() => {
        tf.ready().then(async () => {
            const yolov8 = await tf.loadGraphModel(`${window.location.href}/${modelName}_web_model/model.json`)
            setModel({
                net: yolov8,
                inputShape: yolov8.inputs[0].shape
            })
        })
        console.log('Model has been loaded!')
    }, [])

    return (
        <>
            <CameraHandler model={model} />
        </>
    )
}

export default App
