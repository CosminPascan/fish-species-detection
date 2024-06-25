import { getImageURL } from "../utils/image"

const HabitatsList = ({ habitats }) => {
    return (
        <>
            <div className="habitats-title">Habitats</div>
            <div className="habitats-list">
                {habitats.map((habitat, index) => (
                    <div className="habitat-item" key={index}>
                        <div className="habitat-name">{habitat.name}</div>
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
                    </div>          
                ))}
            </div>
        </>
    )
}

export default HabitatsList