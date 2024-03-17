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
import { Header } from '../components/header/Header';
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
        <>
            <Header></Header>
            <div style={{ minHeight: '100vh' }}>
                <div className="flex flex-wrap">
                    {artworkList.length > 0 && renderAllArtwork}
                </div>
            </div>
            <Footer></Footer>
        </>
    )
}

export default Gallery