const FishList = ({ fish }) => {
    return (
        <>
            <div className="list-title">Detected species (Best metrics)</div>
            <div className="list-container">
                <ul>
                    {fish.map((fish, index) => (
                        <li key={index}>
                            Species: {fish.species} <br />
                            Confidence: {fish.highestConfidence}% <br />
                            Width: {fish.width}cm <br />
                            Height: {fish.height}cm <br />
                        </li>
                    ))}
                </ul>
            </div>
        </>
    )
}

export default FishList