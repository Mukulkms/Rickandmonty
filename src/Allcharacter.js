import Header from './header';
import Footer from './footer';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
const Charpage = () => {
    const [chardata, setChardata] = useState([]);
    const [filterOptions, setFilterOptions] = useState({
        name: '',
        status: '',
        species: '',
        type: '',
        gender: ''
    });
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        const fetchData = () => {
            const params = new URLSearchParams({
                ...filterOptions,
                page: currentPage,
                // Limiting to 10 results per page
                // You can adjust this limit as needed
                limit: 10
            });
            return fetch(`https://rickandmortyapi.com/api/character/?${params}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    setChardata(data.results);
                    setTotalPages(data.info.pages);
                })
                .catch(error => {
                    console.error('Error fetching character data:', error);
                });
        };
    
        fetchData();
    }, [filterOptions, currentPage]);
    
    useEffect(() => {
        const fetchFilterOptions = () => {
            return fetch('https://rickandmortyapi.com/api/character/')
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    const { results } = data;
    
                    const uniqueNames = [...new Set(results.map(item => item.name))];
                    const uniqueStatus = [...new Set(results.map(item => item.status))];
                    const uniqueSpecies = [...new Set(results.map(item => item.species))];
                    const uniqueTypes = [...new Set(results.map(item => item.type))];
                    const uniqueGenders = [...new Set(results.map(item => item.gender))];
    
                    setFilterOptions(prevOptions => ({
                        ...prevOptions,
                        nameOptions: uniqueNames,
                        statusOptions: uniqueStatus,
                        speciesOptions: uniqueSpecies,
                        typeOptions: uniqueTypes,
                        genderOptions: uniqueGenders
                    }));
                })
                .catch(error => {
                    console.error('Error fetching filter options:', error);
                });
        };
    
        fetchFilterOptions();
    }, []);

    const handleFilterChange = (event) => {
        const { name, value } = event.target;
        setFilterOptions(prevOptions => ({
            ...prevOptions,
            [name]: value
        }));
    };

    const nextPage = () => {
        setCurrentPage(prevPage => prevPage + 1);
    };

    const prevPage = () => {
        setCurrentPage(prevPage => prevPage - 1);
    };

    return (
        <div>
            <Header />
            <div className="char-container">
                <div className="filterdiv">
                    <div className="field-grp">
                        <p>NAME</p>
                        <select name="name" id="name" onChange={handleFilterChange}>
                            <option value="">All</option>
                            {filterOptions.nameOptions && filterOptions.nameOptions.map((name, index) => (
                                <option key={index} value={name}>{name}</option>
                            ))}
                        </select>

                        <p>STATUS</p>
                        <select name="status" id="status" onChange={handleFilterChange}>
                            <option value="">All</option>
                            {filterOptions.statusOptions && filterOptions.statusOptions.map((status, index) => (
                                <option key={index} value={status}>{status}</option>
                            ))}
                        </select>

                        <p>SPECIES</p>
                        <select name="species" id="species" onChange={handleFilterChange}>
                            <option value="">All</option>
                            {filterOptions.speciesOptions && filterOptions.speciesOptions.map((species, index) => (
                                <option key={index} value={species}>{species}</option>
                            ))}
                        </select>

                        <p>TYPE</p>
                        <select name="type" id="type" onChange={handleFilterChange}>
                            <option value="">All</option>
                            {filterOptions.typeOptions && filterOptions.typeOptions.map((type, index) => (
                                <option key={index} value={type}>{type}</option>
                            ))}
                        </select>

                        <p>GENDER</p>
                        <select name="gender" id="gender" onChange={handleFilterChange}>
                            <option value="">All</option>
                            {filterOptions.genderOptions && filterOptions.genderOptions.map((gender, index) => (
                                <option key={index} value={gender}>{gender}</option>
                            ))}
                        </select>

                    </div>
                </div>
                <div className="char-grpimg">
                    {chardata && chardata.map((item) => (
                        <div className="card1" key={item.id}>
                            <div className="title">
                                <h2>{item.name}</h2>
                                <p>{item.species}</p>
                            </div>
                            <div className="character">
                                <img src={item.image} alt={item.name} />
                            </div>
                            <div className="desc">
                                <p>Status: {item.status}</p>
                                <p>Type: {item.type}</p>
                            </div>
                            <div className="links">
                            <Link to={`/Charinfo/${item.id}`}>Learn More</Link>
                            </div>
                        </div>
                    ))}
                </div>
                <div>
                </div>
            </div>
            <div className='pagination-main'>

            <div className='pagination'>
                <button onClick={prevPage} disabled={currentPage === 1}>Previous</button>
                <span>{currentPage} / {totalPages}</span>
                <button onClick={nextPage} disabled={currentPage === totalPages}>Next</button>
            </div>
            </div>
            <Footer />
        </div>

    );
};

export default Charpage;
