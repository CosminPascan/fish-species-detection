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
        
        const loadHabitats = async () => {
            let token = localStorage.getItem('accessToken')
            const response = await fetch('http://localhost:5234/api/habitats/all', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
            if (response.status === 401) {
                await fetch('http://localhost:5234/api/refresh-token', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    credentials: 'include'
                })
                    .then(res => res.json())
                    .then(data => {
                        localStorage.setItem('accessToken', data.accessToken)
                        token = localStorage.getItem('accessToken')
                    })
            }

            await fetch('http://localhost:5234/api/habitats/all', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(res => res.json())
                .then(data => {
                    let arr = []
                    for (let h of data.habitats) {
                        arr.push(h.name)
                    }
                    setHabitats(arr)
                    setSelectedHabitat(arr[0])
                })
        }

        loadHabitats()
        
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
                        <select className='select-habitats' onChange={handleHabitat}>
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
                                    //console.log(JSON.stringify(f))

                                    let token = localStorage.getItem('accessToken')
                                    await fetch('http://localhost:5234/api/detections/create', {
                                        method: 'POST',
                                        headers: {
                                            'Content-Type': 'application/json',
                                            'Authorization': `Bearer ${token}`
                                        },
                                        body: JSON.stringify(f)
                                    })
                                }
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