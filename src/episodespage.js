import { useEffect ,useState } from "react";
import Header from './header';
import Footer from './footer';

const EpisodePage = () => {
    const [episodeData, setEpisodeData] = useState([]);
    const [filterOptions, setFilterOptions] = useState({
        name: '',
        episode: ''
    });
    const [chardata,csetData] = useState([]);
    const [shuffledImages, setShuffledImages] = useState([]);

    useEffect(() => {
        // Function to fetch episode data based on filter options
        const fetchData = async () => {
            try {
                const params = new URLSearchParams(filterOptions);
                const response = await fetch(`https://rickandmortyapi.com/api/episode/?${params}`);
                const data = await response.json();
                setEpisodeData(data.results);
            } catch (error) {
                console.error('Error fetching episode data:', error);
            }
        };
        
        fetchData();
    }, [filterOptions]);
    
    useEffect(() => {
        // Function to fetch filter options for each filter
        const fetchFilterOptions = async () => {
            try {
                const response = await fetch('https://rickandmortyapi.com/api/episode/');
                const data = await response.json();
                const { results } = data;
                
                // Get unique values for each filter option
                const uniqueNames = [...new Set(results.map(item => item.name))];
                const uniqueEpisodes = [...new Set(results.map(item => item.episode))];
                
                // Update filter options state
                setFilterOptions(prevOptions => ({
                    ...prevOptions,
                    nameOptions: uniqueNames,
                    episodeOptions: uniqueEpisodes
                }));
            } catch (error) {
                console.error('Error fetching filter options:', error);
            }
        };
        
        fetchFilterOptions();
    }, []);
    
    useEffect(()=>{
        let arr = [];
        let maindata = fetch('https://rickandmortyapi.com/api/character');
        maindata.then((res)=>res.json())
            .then((result)=>{
                for(var i =0; i<18; i++){
                    arr.push(result.results[i])
                }
            })
            .then(()=>csetData(arr));
        },[]);
    const Images = [
        { image: '/episode1.jpg' },
        { image: '/episode2.jpg' },
        { image: '/episode3.jpg' },
        { image: '/episode4.jpg' },
        // Add more images if needed
    ];
    useEffect(() => {
        // Shuffle Images array when episodeData changes
        const shuffleImages = () => {
            const shuffled = Images.sort(() => Math.random() - 0.5);
            setShuffledImages(shuffled);
        };
        
        shuffleImages();
    }, [episodeData]);
    
    // Function to handle filter option changes
    const handleFilterChange = (event) => {
        const { name, value } = event.target;
        setFilterOptions(prevOptions => ({
            ...prevOptions,
            [name]: value
        }));
    };

    return (
        <div>
            <Header/>
            
            <div className="episodes-container">
                <div className="filterdiv">
                    <div className="field-grp">
                        <p>NAME</p>
                        <select name="name" id="name" onChange={handleFilterChange}>
                            {filterOptions.nameOptions && filterOptions.nameOptions.map((name, index) => (
                                <option key={index} value={name}>{name}</option>
                            ))}
                        </select>
                        <p>EPISODE</p>
                        <select name="episode" id="episode" onChange={handleFilterChange}>
                            <option value="">All</option>
                            {filterOptions.episodeOptions && filterOptions.episodeOptions.map((episode, index) => (
                                <option key={index} value={episode}>{episode}</option>
                            ))}
                        </select>

                        
                    </div>
                </div>
                <div className="episode-grpimg">
                    {episodeData.map((item,index) => (
                        <div className="episodes-card" key={item.id}>
                            <div className="images">
                                <img src={shuffledImages[index % shuffledImages.length].image} alt="" />
                            </div>
                            <div className="title">
                                <p>{item.episode}</p>
                                <button>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M12.001 4.52853C14.35 2.42 17.98 2.49 20.2426 4.75736C22.5053 7.02472 22.583 10.637 20.4786 12.993L11.9999 21.485L3.52138 12.993C1.41705 10.637 1.49571 7.01901 3.75736 4.75736C6.02157 2.49315 9.64519 2.41687 12.001 4.52853ZM18.827 6.1701C17.3279 4.66794 14.9076 4.60701 13.337 6.01687L12.0019 7.21524L10.6661 6.01781C9.09098 4.60597 6.67506 4.66808 5.17157 6.17157C3.68183 7.66131 3.60704 10.0473 4.97993 11.6232L11.9999 18.6543L19.0201 11.6232C20.3935 10.0467 20.319 7.66525 18.827 6.1701Z"></path>
                                    </svg>
                                </button>
                            </div>
                            <div className="desc">
                                <h2>{item.name}</h2>
                                <p>Air Date:{item.air_date}</p>
                            </div>
                            <div className="chr">
                                {chardata && chardata.map((img, index) => (
                                    <div className="small-char" key={index}>
                                        <img src={img.image} alt="" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <Footer/>
        </div>
    );
};

export default EpisodePage;
