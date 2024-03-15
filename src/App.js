import { Link } from 'react-router-dom';
import React from 'react';
import './dist/output.css';
import { useSelector } from 'react-redux';
import './css/app.css';
import './css/Login-Register/Login.css';
import './css/Homepage.css';
import './css/input.css';
import { Footer } from './components/footer/Footer';
import { Header } from './components/header/Header';
import { Intro } from './components/homepage/Intro';

function App() {
  


  return (
    <div className='bg-[#F4F1E4]'>
      <Header></Header>
      <Intro></Intro>
      <div className="App" style={{ minHeight: "100vh" }}>
        
      </div>



      
      <Footer></Footer>

    </div>

  );
}

export default App;
