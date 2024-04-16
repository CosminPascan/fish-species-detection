const FishList = ({ fish }) => {
    return (
        <div className='fish-container'>
            <div className="list-title">Detected species</div>
            <div className="list-container">
                <ul>
                    {fish.map((fish, index) => (
                        <li key={index}>Species: {fish.species} Highest confidence: {fish.highestConfidence}</li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default FishList