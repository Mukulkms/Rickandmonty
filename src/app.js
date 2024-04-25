import React from 'react';
import './style.css';
import SingleChar from './charsingle';
import Charpage from './Allcharacter';
import Charinfo from './CharInfo';
import { Route, Routes } from 'react-router-dom';
import Episodespage from './episodespage';

const Approuter = () =>{

    return(
        <div>
            <Routes>
                <Route path='/' element={<SingleChar/>}></Route>
                <Route path='/Charinfo/:id' element={<Charinfo/>}></Route> {/* Added route parameter */}
                <Route path='/Charpage' element={<Charpage/>}></Route>
                <Route path='/Episodespage' element={<Episodespage/>}></Route>
            </Routes>         
        </div>
    )
}

export default Approuter;
