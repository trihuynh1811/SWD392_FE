import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { ArtworkApi } from '../api/Api';
import { useFormik, ErrorMessage } from "formik";
import * as Yup from "yup";
import '../dist/output.css';
import { useDispatch, useSelector } from 'react-redux';
import { setAccessToken } from '../store/authActions';
import PreviewFile from '../components/PreviewFile';
import { Footer } from '../components/footer/Footer';
import { Header } from '../components/header/Header';

function ArtworkDetail() {
    const artworkTypes = useSelector((state) => state.artworkType.artworkTypes)
    const creatorList = useSelector((state) => state.currentUser.creatorList)

    const [searchParams, setSearchParams] = useSearchParams();
    const [id, setId] = useState(0)
    const [artwork, setArtwork] = useState(null)

    useEffect(() => {
        window.scrollTo(0, 0)
        ArtworkApi.GetArtworkById(searchParams.get("id")).then(res => {
            console.log(res.data)
            console.log(artworkTypes.filter(type => type.id === res.data.typeId)[0].name)
            setArtwork(res.data)
            setId(searchParams.get("id"))
        }).catch(e => console.log(e))

    }, [])

    return (
        <>
            <Header></Header>
            <div className='bg-[#F4F1E4] py-12 flex flex-col' style={{ minHeight: '100vh' }}>
                {
                    artwork ? (
                        <>
                            <div className='flex mx-10 rounded-lg bg-white'>
                                <div className='w-1/4 h-1/2 px-3 py-4'>
                                    <img src={artwork.imagePath} alt={artwork.name} className='w-full h-auto object-cover rounded-lg max-h-full' />
                                </div>
                                <div className='w-3/4 px-3 py-4 flex flex-col justify-between'>
                                    <div className='grid grid-cols-6'>
                                        <div className=''>Name</div>
                                        <div className='col-span-5'>{artwork.name}</div>
                                    </div>
                                    <div className='grid grid-cols-6'>
                                        <div className=''>Description</div>
                                        <div className='col-span-5'>{artwork.description}</div>
                                    </div>
                                    <div className='grid grid-cols-6'>
                                        <div className=''>Type</div>
                                        <div className='col-span-5'>{artworkTypes.filter(type => type.id === artwork.typeId)[0].name}</div>
                                    </div>
                                    <div className='grid grid-cols-6'>
                                        <div className='col-span-1 col'>Price</div>
                                        <div className='col-span-5'>{artwork.price}</div>
                                    </div>
                                </div>
                            </div>
                            <div>
                                Made by {creatorList.filter(creator => creator.id === artwork.userId)[0].fullName}
                            </div>
                            <button>follow</button>
                        </>
                    )
                        :
                        <p>Loading...</p>
                }
            </div>
            <Footer></Footer>
        </>

    )
}

export default ArtworkDetail