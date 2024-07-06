import Webcam from 'react-webcam'
import { useState, useRef } from 'react'
import { detectLive } from '../utils/detect'

const CameraHandler = ({ model, setFish }) => {
    const [streaming, setStreaming] = useState(false)
    const [distance, setDistance] = useState(0)

    const cameraRef = useRef(null)
    const canvasRef = useRef(null)
    
    const videoConstraints = {
        width: 640,
        height: 480,
        facingMode: 'environment'
    }

    const handleDistance = (e) => {
        setDistance(e.target.value)
    }

    return (
        <div className='camera-container'>
            <div className='camera'>
                {streaming && 
                    <Webcam
                        audio={false}
                        ref={cameraRef}
                        videoConstraints={videoConstraints}
                        onPlay={() => detectLive(model, distance, cameraRef.current, canvasRef.current, (detectedSpecies, detectedConfidence, realLength, realHeight) => {
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
                                        fish = [...fish, {species: detectedSpecies, confidence: detectedConfidence, length: realLength, height: realHeight}]
                                    } else {
                                        let f = fish[index]
                                        
                                        if (f.confidence < detectedConfidence) {
                                            f.confidence = detectedConfidence
                                        }

                                        if (f.length < realLength) {
                                            f.length = realLength
                                        }

                                        if (f.height < realHeight) {
                                            f.height = realHeight
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
            
            <div className='camera-btn-container'>
                <button onClick={() => {
                    if (distance === 0 || distance === '') {
                        alert('Please set a distance to begin!')
                    } else if (streaming === false) {
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

                <div className='distance-wrapper'>
                    <div className='distance-text'>Distance (cm)</div>
                    <div className='d-input-box'>
                        <input type='text' placeholder={0} required onChange={handleDistance} value={distance} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CameraHandler
