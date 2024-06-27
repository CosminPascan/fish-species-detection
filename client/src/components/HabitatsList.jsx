import { useRef } from "react"
import { getImageURL } from "../utils/image"

const HabitatsList = ({ habitats, loadHabitats }) => {

    const textRefs = useRef([])

    const handleDeleteHabitat = async (index) => {
        const textEl = textRefs.current[index];
        textEl.focus();
        const habitatName = textEl.innerText
        let token = localStorage.getItem('accessToken')
        await fetch(`http://localhost:5234/api/habitats/delete/${habitatName}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            credentials: 'include',
        })

        loadHabitats()
    }

    return (
        <>
            <div className="habitats-list">
                {habitats.map((habitat, index) => (
                    <div className="habitat-item" key={index}>
                        <div className="habitat-name" ref={el => textRefs.current[index] = el}>{habitat.name}</div>
                        <div className="habitat-description">{habitat.description}</div>                    
                        <div className='detections-list'>
                            {habitat.detections.length ?
                                habitat.detections.map((d, i) => ( 
                                    <div className='detection-item' key={i}>
                                        <img width='75' height='75' src={getImageURL(d.species)} />
                                        <div className='detection-attributes'>
                                            species - {d.species} <br />
                                            confidence - {d.confidence}% <br />
                                            length - {d.length}cm <br />
                                            height - {d.height}cm
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