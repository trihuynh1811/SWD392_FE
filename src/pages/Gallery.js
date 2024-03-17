import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { ArtworkApi, UserApi } from '../api/Api';
import { useFormik, ErrorMessage } from "formik";
import * as Yup from "yup";
import '../dist/output.css';
import { useDispatch, useSelector } from 'react-redux';
import { setAccessToken } from '../store/authActions';
import PreviewFile from '../components/PreviewFile';
import axios from 'axios';
import { Footer } from '../components/footer/Footer';
import { HeaderOutSide } from '../components/header/Header_outside';
import { setArtworkTypes } from '../store/artworkTypeActions';
import { setCreatorList } from '../store/userActions';

function Gallery() {
    const [artworkList, setArtworkList] = useState([])
    const artworkTypes = useSelector((state) => state.artworkType.artworkTypes)
    const creatorList = useSelector((state) => state.currentUser.creatorList)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0)
        if (artworkTypes.length <= 0) {
            ArtworkApi.GetAllArtworkType().then(res => {
                dispatch(setArtworkTypes(res.data))
            }).catch(e => console.log(e))
            UserApi.GetAllCreator().then(res => {
                console.log(res.data)
                dispatch(setCreatorList(res.data))
            }).catch(e => console.log(e))
        }
        else {
            console.log(creatorList)
            console.log(artworkTypes)
        }
        ArtworkApi.GetAllArtwork().then(res => {
            setArtworkList(res.data)
        }).catch(e => console.log(e))
    }, [])

    const seeArtworkDetail = (id) => {
        navigate(`/artwork-detail?id=${id}`)
    }

    const renderAllArtwork = artworkList.map((artwork, index) => (
        <div key={artwork.id} className="w-1/4 p-4">
            {/* Render your data here */}
            <div className="bg-gray-200 p-4 rounded shadow" role='button' onClick={() => seeArtworkDetail(artwork.id)}>
                <img src={artwork.imagePath} className='w-full h-auto object-cover' alt={artwork.name} />
                <p>{artwork.name}</p>
                <p>{artwork.price}</p>
            </div>
        </div>
    ))

    return (
        <div className='bg-[#F4F1E4]'>
            <HeaderOutSide></HeaderOutSide>
            <div className='gallery_container mt-[34px] px-[92px]'>
                <div className='search_flow flex'>
                    <div className='search_name relative'>
                        <input type="search" name='search_name' placeholder='Artwork name...' className='bg-white h-10 px-5 pr-10 rounded-full text-sm focus:outline-none' />
                        <button className=''>
                            <svg xmlns="http://www.w3.org/2000/svg" width="29" height="29" viewBox="0 0 29 29" fill="none">
                                <path d="M27.6251 27.625L21.2915 21.2915M21.2915 21.2915C22.3749 20.2081 23.2343 18.9219 23.8206 17.5064C24.4069 16.0909 24.7087 14.5738 24.7087 13.0417C24.7087 11.5095 24.4069 9.99241 23.8206 8.57691C23.2343 7.16141 22.3749 5.87525 21.2915 4.79187C20.2081 3.70849 18.922 2.84911 17.5065 2.26279C16.091 1.67647 14.5739 1.37469 13.0417 1.37469C11.5096 1.37469 9.99247 1.67647 8.57697 2.26279C7.16147 2.84911 5.87531 3.70849 4.79193 4.79187C2.60395 6.97985 1.37476 9.94739 1.37476 13.0417C1.37476 16.1359 2.60395 19.1035 4.79193 21.2915C6.97991 23.4794 9.94745 24.7086 13.0417 24.7086C16.136 24.7086 19.1035 23.4794 21.2915 21.2915Z" stroke="#3D4449" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                        </button>
                    </div>
                    <div className='search_tag mt-3'>
                        <input type="text" placeholder='Tag...' />
                    </div>

                </div>
            </div>
            <div style={{ minHeight: '100vh' }}>
                <div className="flex flex-wrap">
                    {artworkList.length > 0 && renderAllArtwork}
                </div>
            </div>
            <Footer></Footer>
        </div>
    )
}

export default Gallery