import { useRef } from 'react'
import axios from '../api/axios'
import { getImageURL } from '../utils/image'

const HabitatsList = ({ habitats, loadHabitats }) => {
    const textRefs = useRef([])

    const deleteHabitat = async (habitatName, token) => {
        await axios.delete(`http://localhost:5234/api/habitats/delete/${habitatName}`,
            {
                headers: { 'Authorization': `Bearer ${token}` }
            }
        )
        loadHabitats()
    }

    const handleDeleteHabitat = async (index) => {
        const textEl = textRefs.current[index]
        textEl.focus()
        const habitatName = textEl.innerText
        let token = localStorage.getItem('accessToken')
        try {
            await deleteHabitat(habitatName, token)
        } catch (err) {
            if (err.response.status === 401) {
                const response = await axios.post('/refresh-token')
                localStorage.setItem('accessToken', response.data.accessToken)
                token = localStorage.getItem('accessToken')
                await deleteHabitat(habitatName, token)
            }
        }
    }

    return (
        <>
            <div className='habitats-list'>
                {habitats.map((habitat, index) => (
                    <div className='habitat-item' key={index}>
                        <div className='habitat-name' ref={el => textRefs.current[index] = el}>{habitat.name}</div>
                        <div className='habitat-description'>{habitat.description}</div>                    
                        <div className='detections-list'>
                            {habitat.detections.length ?
                                habitat.detections.map((d, i) => ( 
                                    <div className='detection-item' key={i}>
                                        <img width='75' height='75' src={getImageURL(d.species)} />
                                        <div className='detection-attributes'>
                                            <b>species</b> - {d.species} <br />
                                            <b>confidence</b> - {d.confidence}% <br />
                                            <b>length</b> - {d.length}cm <br />
                                            <b>height</b> - {d.height}cm
                                        </div>
                                    </div>                               
                                )) : 'No species detected'}
                        </div>
                        <button className='delete-button' onClick={() => handleDeleteHabitat(index)}>X</button>   
                    </div>          
                ))}
            </div>
        </>
    )
}

export default HabitatsList