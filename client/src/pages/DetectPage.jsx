import { useState, useEffect } from 'react'
import * as tf from '@tensorflow/tfjs'
import CameraHandler from '../components/CameraHandler'
import FishList from '../components/FishList'
import Navbar from '../components/Navbar'

const DetectPage = ({ modelPath, setIsAuthenticated }) => {
    const [model, setModel] = useState({
        net: null,
        inputShape: [1, 0, 0, 3]
    })
    const [fish, setFish] = useState([])

    useEffect(() => {
        tf.ready().then(async () => {
            const yolov8 = await tf.loadGraphModel(modelPath)
            setModel({
                net: yolov8,
                inputShape: yolov8.inputs[0].shape
            })
        })
        // console.log('Model has been loaded!')
    }, [])

    return (
        <>  
            <Navbar setIsAuthenticated={setIsAuthenticated} />
            <div className="container">
                <CameraHandler model={model} setFish={setFish} />
                <FishList fish={fish} />
            </div>
        </>
    )
}

export default DetectPage