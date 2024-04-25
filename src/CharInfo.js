import Header from "./header";
import { useState, useEffect } from 'react';
import Footer from "./footer";
import { useParams } from 'react-router-dom'; // Import useParams hook

const Charinfo = () => {
    const { id } = useParams(); // Use useParams hook to access route parameters
    const [character, setCharacter] = useState(null);
    const [origin, setOrigin] = useState(null);
    const [location, setLocation] = useState(null);

    useEffect(() => {
        const fetchCharacter = async () => {
            try {
                const response = await fetch(`https://rickandmortyapi.com/api/character/${id}`);
                const data = await response.json();
                setCharacter(data);
                // Check if origin exists and fetch origin details
                if (data.origin && typeof data.origin === 'object' && typeof data.origin.url === 'string') {
                    const originResponse = await fetch(data.origin.url);
                    const originData = await originResponse.json();
                    setOrigin(originData);
                }
                // Check if location exists and fetch location details
                if (data.location && typeof data.location === 'object' && typeof data.location.url === 'string') {
                    const locationResponse = await fetch(data.location.url);
                    const locationData = await locationResponse.json();
                    setLocation(locationData);
                }
            } catch (error) {
                console.error('Error fetching character data:', error);
            }
        };

        fetchCharacter();
    }, [id]);

    if (!character) {
        return <div>Loading...</div>;

    }
    

    return (
        <div>
            <Header/>
            {/* Character card container */}
            <div className="character-info">
                <div className="char-details">
                    <div className="char-pic">
                        {character.image && <img src={character.image} alt={character.name} />}
                    </div>
                    <div className="charinfo">
                        <h2>Information</h2>
                        <p>Name: <span>{character.name}</span></p>
                        <p>Status: <span>{character.status}</span></p>
                        <p>Species: <span>{character.species}</span></p>
                        <p>Type: <span>{character.type}</span></p>
                        <p>Gender: <span>{character.gender}</span></p>
                        <p>Created: <span>{character.created}</span></p>

                        <h2>Origin</h2>
                        {/* Render origin details if available */}
                        {origin && (
                            <>
                                <p>Name: <span>{origin.name}</span></p>
                                <p>Type: <span>{origin.type}</span></p>
                                <p>Dimension: <span>{origin.dimension}</span></p>
                                <p>Created: <span>{origin.created}</span></p>
                            </>
                        )}

                        <h2>Location</h2>
                        {/* Render location details if available */}
                        {location && (
                            <>
                                <p>Name: <span>{location.name}</span></p>
                                <p>Type: <span>{location.type}</span></p>
                                <p>Dimension: <span>{location.dimension}</span></p>
                                <p>Created: <span>{location.created}</span></p>
                            </>
                        )}
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    );
}

export default Charinfo;
