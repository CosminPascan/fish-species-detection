const FishList = ({ fish }) => {
    return (
        <>
            <div className='list-title'>Detected species (Best metrics)</div>
            <div className='list-container'>
                <ul>
                    {fish.map((fish, index) => (
                        <li key={index}>
                            <h2>Species: {fish.species} </h2>
                            Confidence: {fish.confidence}% <br />
                            Length: {fish.length}cm <br />
                            Height: {fish.height}cm <br />
                        </li>
                    ))}
                </ul>
            </div>
        </>
    )
}

export default FishList