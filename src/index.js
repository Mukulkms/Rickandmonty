import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import Approuter from './app';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <div>

   <React.StrictMode>
     <BrowserRouter><Approuter/></BrowserRouter>
   </React.StrictMode>
    
  </div>
);

reportWebVitals();
