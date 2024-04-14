import Webcam from 'react-webcam'
import { useState, useRef, useEffect } from 'react'
import { detectLive } from '../utils/detect'

const CameraHandler = ({model}) => {
    const [streaming, setStreaming] = useState(false)
    const [fish, setFish] = useState([])

    const cameraRef = useRef(null)
    const canvasRef = useRef(null)
    
    const videoConstraints = {
        width: 640,
        height: 480,
        facingMode: 'environment'
    }

    return (
        <>
            <div className='container'>  
                <div className='camera-container'>
                    {streaming && 
                        <Webcam
                            audio={false}
                            ref={cameraRef}
                            videoConstraints={videoConstraints}
                            onPlay={() => detectLive(model, cameraRef.current, canvasRef.current, (detectedSpecies, detectedConfidence) => {
                                if (detectedSpecies !== null && detectedConfidence !== null) {
                                    setFish(fish => {
                                        let isDetected = false
                                        let index = null

                                        for (let f of fish) {
                                            if (f.species === detectedSpecies) {
                                                isDetected = true
                                                index = fish.indexOf(f)
                                            }
                                        }

                                        if (!isDetected) {
                                            fish = [...fish, {species: detectedSpecies, highestConfidence: detectedConfidence}]
                                        } else {
                                            let f = fish[index]
                                            if (f.highestConfidence < detectedConfidence) {
                                                f.highestConfidence = detectedConfidence
                                            }
                                            fish = [...fish]                                         
                                        }

                                        return fish
                                    })
                                }
                            })} />
                    }
                    <canvas
                        width={model.inputShape[1]}
                        height={model.inputShape[2]}
                        ref={canvasRef} />
                </div>

                <div className='fish-container'>
                    <ul>
                        Detected species
                        {fish.map((item, index) => (
                            <li key={index}>Species: {item.species} Highest confidence: {item.highestConfidence}</li>
                        ))}
                    </ul>
                </div>
            </div>

            <button onClick={() => {
                if (streaming === false) {
                    setStreaming(true)
                } else if (streaming === true) {
                    let stream = cameraRef.current.stream
                    const tracks = stream.getTracks()
                    tracks.forEach(track => track.stop())
                    setStreaming(false)
                }
            }}>
                {streaming === true ? 'Close' : 'Open'} camera
            </button>
        </>
        
    )
}

export default CameraHandler
