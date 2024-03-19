import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { ArtworkApi, UserApi } from '../api/Api';
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
                            <div className='flex justify-center'>
                                <div className='w-[90%]'>
                                    <button className='mb-[15px]'>
                                        <Link to={'/gallery'} className='mb-[15px]'>Back to gallery</Link>
                                    </button>
                                    <p className='text-black text-[56px] mb-[10px]'>Artwork Detail Information</p>
                                    <div className='flex mb-[10px]'>
                                        <div className='w-[5%]'>
                                        </div>
                                        <div className='w-[95%]'>
                                            <p>{artwork.name}</p>
                                            <p>{artwork.creator.fullName}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='flex justify-center'>
                                <div className='bg-[#FEFEFE] artwork_card flex-shrink-0 w-[40%] h-fit'>
                                    <div className='flex justify-center '>
                                        <img src={artwork.imagePath} className='mt-[10px] mb-[10px] w-[90%] object-cover' alt={artwork.name} />
                                    </div>
                                </div>
                                <div className='w-[5%]'>
                                </div>
                                <div className='w-[45%]'>
                                    <p className='mb-[5px]'>Description:</p>
                                    <p className='mb-[5px]'>{artwork.description}</p>
                                    <p className='mb-[5px]'>Artwork type: {artworkTypes.filter(type => type.id === artwork.typeId)[0].name}</p>
                                    <p className='mb-[20px]'>Posted: {artwork.createdDate.substring(0, 10)}</p>
                                    <button className='w-[95%] h-[80px] bg-gradient-to-r from-red-300 to-amber-200 rounded-3xl'>
                                        <p className='text-lime-50 text-3xl'>
                                            {"VND " + artwork.price.toString()}
                                        </p>
                                    </button>
                                </div>
                            </div>
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