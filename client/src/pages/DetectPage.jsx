import { useState, useEffect } from 'react'
import * as tf from '@tensorflow/tfjs'
import CameraHandler from '../components/CameraHandler'
import FishList from '../components/FishList'
import Navbar from '../components/Navbar'

const DetectPage = () => {
    const [model, setModel] = useState({
        net: null,
        inputShape: [1, 0, 0, 3]
    })
    const [fish, setFish] = useState([])

    const modelName = 'fish_species_v1.0'

    useEffect(() => {
        tf.ready().then(async () => {
            const yolov8 = await tf.loadGraphModel(`${window.location.href}/${modelName}_web_model/model.json`)
            setModel({
                net: yolov8,
                inputShape: yolov8.inputs[0].shape
            })
        })
        // console.log('Model has been loaded!')
    }, [])

    return (
        <>  
            <Navbar />
            <div className="container">
                <CameraHandler model={model} setFish={setFish} />
                <FishList fish={fish} />
            </div>
        </>
    )
}

export default DetectPage