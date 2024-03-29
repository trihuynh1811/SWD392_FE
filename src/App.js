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
import { Benefit } from './components/homepage/Benefits';
import { Discord } from './components/homepage/Discord';
import { ArtworksView } from './components/homepage/ArtworksView';
import TypeHubList from './components/typeCarousel/TypeHubList';
import ManageArtwork from './pages/ManageArtwork';


function App() {


  return (
    <div className='bg-[#F4F1E4]'>
      <Header></Header>
      <Intro></Intro>
      <Benefit></Benefit>
      <TypeHubList></TypeHubList>
      <Discord></Discord>
      <ArtworksView></ArtworksView>

      
      


      
      <Footer></Footer>

    </div>

  );
}

export default App;
