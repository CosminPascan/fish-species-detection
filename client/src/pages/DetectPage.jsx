import { useState, useEffect } from 'react'
import * as tf from '@tensorflow/tfjs'
import axios from '../api/axios'
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

    const getHabitats = async (token) => {
        const response = await axios.get('/habitats/all', 
            {
                headers: { 'Authorization': `Bearer ${token}` }
            }
        ) 
        setHabitats(response.data.habitats)
        updateHabitatsList(response.data.habitats)
    }

    const updateHabitatsList = (habitats) => {
        let arr = []
        for (let h of habitats) {
            arr.push(h.name)
        }
        setHabitats(arr)
        setSelectedHabitat(arr[0])
    }

    const loadHabitats = async () => {
        let token = localStorage.getItem('accessToken')
        try {
            await getHabitats(token)
        } catch (err) {
            if(err.response.status === 401) {
                const res = await axios.post('/refresh-token')
                localStorage.setItem('accessToken', res.data.accessToken)
                token = localStorage.getItem('accessToken')
                getHabitats(token)
            }
        }
    }

    const createDetections = async (f, token) => {
        await axios.post('http://localhost:5234/api/detections/create',
            JSON.stringify(f),
            {
                headers: { 'Authorization': `Bearer ${token}` }
            }
        )
    }

    useEffect(() => {
        tf.ready().then(async () => {
            const yolov8 = await tf.loadGraphModel(modelPath)
            setModel({
                net: yolov8,
                inputShape: yolov8.inputs[0].shape
            })
        })
        // console.log('Model has been loaded!')
        loadHabitats()    
    }, [])

    return (
        <>  
            <div className='detect-container'>
                <CameraHandler model={model} setFish={setFish} />
                <div className='fish-container'>
                    <FishList fish={fish} />
                    <div className='habitats-wrapper'>
                        <select className='select-habitats' onChange={(e) => setSelectedHabitat(e.target.value)}>
                            {habitats.map((habitat, index) => {
                                return (
                                    <option key={index}>
                                        {habitat}
                                    </option>
                                )
                            })}
                        </select>
                        <button className='update-habitats-btn' onClick={async () => {
                            if (fish.length) {
                                for (let f of fish) {
                                    f['habitatName'] = selectedHabitat

                                    let token = localStorage.getItem('accessToken')
                                    try {
                                        await createDetections(f, token)
                                    } catch (err) {
                                        if (err.response.status === 401) {
                                            const response = await axios.post('/refresh-token')
                                            localStorage.setItem('accessToken', response.data.accessToken)
                                            token = localStorage.getItem('accessToken')
                                            createDetections(f, token)
                                        }
                                    }
                                }
                                alert(`Habitat ${selectedHabitat} has been updated!`)
                            } else {
                                alert('No species detected!')
                            }
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