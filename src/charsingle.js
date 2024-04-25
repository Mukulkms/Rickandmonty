import { useState , useEffect} from 'react';
import Header from './header';
import Banner from './banner';
import SingleEp from './episode';
import Footer from './footer';
import { Link } from 'react-router-dom';
const SingleChar = () =>{
const [chardata,setData] = useState();

    
useEffect(()=>{
    let arr = [];
    let maindata = fetch('https://rickandmortyapi.com/api/character');
    maindata.then((res)=>res.json())
        .then((result)=>{
            for(var i =0; i<4; i++){
                arr.push(result.results[i])
            }
        })
        .then(()=>setData(arr));
    },[]);

return(

    <div >

    {/*single character card container */}
     <Header/>
     <Banner/>

    <div className="card-container">
    <div className="heading">
        <h2>Rick & Morty App</h2>
        <span>Here we get all information about Rick & Morty. Find out everything about the characters and the episodes.</span>
    </div>

        
        <div className="c-heading">
            <h1>Characters</h1>
            <Link to="/Charpage">View all characters</Link>
        </div>


     <div className="card-section">
        {chardata && chardata.map((item)=>(
        <div className="card-grp">
            <div className="card1">
                <div className="title">
                    <h2>{item.name}</h2>
                    <p>{item.species}</p>
                </div>

                <div className="character">
                    <img src={item.image} alt="" />
                </div>

                <div className="desc">
                    <p>Status:{item.status}</p>
                    <p>type:{item.type}</p>
                </div>

                <div className="links">
                    <Link to='/Charinfo'>Learn More</Link>
                </div>
            </div>
        </div>
))}
    </div>
   
   </div>

 <SingleEp/>
 <Footer/>
    </div>
)}


export default SingleChar;