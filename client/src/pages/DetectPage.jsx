import { useState, useEffect } from 'react'
import * as tf from '@tensorflow/tfjs'
import CameraHandler from '../components/CameraHandler'
import FishList from '../components/FishList'
import '../style/DetectPage.css'

const DetectPage = ({ modelPath }) => {
    const [model, setModel] = useState({
        net: null,
        inputShape: [1, 0, 0, 3]
    })
    const [fish, setFish] = useState([])
    const [habitats, setHabitats] = useState([])
    const [selectedHabitat, setSelectedHabitat]= useState('')

    useEffect(() => {
        tf.ready().then(async () => {
            const yolov8 = await tf.loadGraphModel(modelPath)
            setModel({
                net: yolov8,
                inputShape: yolov8.inputs[0].shape
            })
        })
        // console.log('Model has been loaded!')

        const token = localStorage.getItem('accessToken')
        fetch('http://localhost:5234/api/habitats/all', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
            .then(res => res.json())
            .then(data => {
                setHabitats(data.habitats)
            })
    }, [])

    const handleHabitat = (e) => {
        setSelectedHabitat(e.target.value)
    }

    return (
        <>  
            <div className='detect-container'>
                <CameraHandler model={model} setFish={setFish} />
                <div className='fish-container'>
                    <FishList fish={fish} />
                    <div className='habitats-wrapper'>
                        <select className='select' onChange={handleHabitat}>
                            {habitats.map((habitat, index) => {
                                return (
                                    <option key={index}>
                                        {habitat.name}
                                    </option>
                                )
                            })}
                        </select>
                        <button className='update-habitats-btn' onClick={() => {
                            console.log(selectedHabitat)
                        }}>
                            Update habitat
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DetectPage