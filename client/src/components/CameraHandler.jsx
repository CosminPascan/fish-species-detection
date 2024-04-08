import Webcam from 'react-webcam'
import { useState, useRef } from 'react'
import { detectLive } from '../utils/detect'

const CameraHandler = (props) => {
    const [streaming, setStreaming] = useState(false)

    const cameraRef = useRef(null)
    const canvasRef = useRef(null)

    const videoConstraints = {
        width: 640,
        height: 480,
        facingMode: 'environment'
    }

    return (
        <>
            <div className='camera-container'>
                {streaming && 
                    <Webcam
                        audio={false}
                        ref={cameraRef}
                        videoConstraints={videoConstraints}
                        onPlay={() => detectLive(props.model, cameraRef.current, canvasRef.current)} />
                }
                <canvas
                    width={props.model.inputShape[1]}
                    height={props.model.inputShape[2]}
                    ref={canvasRef} />
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
