import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { ArtworkApi } from '../api/Api';
import { useFormik, ErrorMessage } from "formik";
import * as Yup from "yup";
import '../dist/output.css';
import { useDispatch, useSelector } from 'react-redux';
import { setAccessToken } from '../store/authActions';
import PreviewFile from '../components/PreviewFile';
import axios from 'axios';
import { Footer } from '../components/footer/Footer';
import { Header } from '../components/header/Header';
import login_img from '../image/LoginSignUp/Login_Img.png'
import raiden from '../image/Raiden_Rising_Render.webp'
import jwt_decode from "jwt-decode"
import { setArtworkTypes } from '../store/artworkTypeActions';
import { HeaderOutSide } from '../components/header/Header_outside';

function ManageArtwork() {
    const [artworkList, setArtworkList] = useState([])
    const [currentArtworkList, setCurrentArtworkList] = useState([])
    const accessToken = useSelector((state) => state.auth.accessToken);
    const currentUser = useSelector((state) => state.currentUser.user);
    const artworkTypes = useSelector((state) => state.artworkType.artworkTypes)
    const dispatch = useDispatch();

    console.log(currentUser)
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0)
        if (accessToken === null) {
            navigate("/login")
            return
        }
        if (artworkTypes.length <= 0) {
            ArtworkApi.GetAllArtworkType().then(res => {
                dispatch(setArtworkTypes(res.data))
            }).catch(e => console.log(e))
        }
        else {
            console.log(artworkTypes)
        }
        ArtworkApi.GetAllArtworkByUserId(currentUser.userId)
            .then(res => {
                setArtworkList(res.data)
                setCurrentArtworkList(res.data)
            })
            .catch(e => console.log(e))
    }, [])

    useEffect(() => {
        console.log(artworkList)
        console.log(currentArtworkList)
    }, [artworkList, currentArtworkList])

    const redirectTo = (url, id) => {
        switch (url) {
            case "newArtwork":
                navigate('/new-artwork')
                break;

            case "editArtwork":
                navigate(`/edit-artwork?id=${id}`)
                break;

            default:
                break;
        }
    }

    const renderListOfArtwork = currentArtworkList.map((artwork, index) => {
        const price = artwork.price;
        const formatedPrice = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'VND' }).format(price);
        return (
            <div key={index} className="bg-[#fefefe] w-[350px] h-[460px] pb-[35px] rounded-lg mx-3 my-3">
                <div className="flex justify-center rounded-sm">
                    <img src={artwork.imagePath} className="w-[330px] pt-[10px] h-[302px] max-h-[302px] object-cover rounded-[10px]" alt='' />
                </div>
                <div className="">
                    <div className="flex"> <div className="capitalize pl-[15px] w-full text-[#A67E4E] font-bold text-[24px]">{artwork.name || "No name artwork"}</div></div>
                    <div className="flex ms-4 gap-[180px] pb-[15px]">
                        <div className=" flex items-center gap-1">
                            <span className='text-[#FF6C79]'>
                                Type:
                            </span> {artwork.typeId}
                        </div>
                        <div className="ms-4 flex items-center gap-1">
                            <span className='text-[#FF6C79]'>
                                Status:
                            </span> {artwork.artworkStatus}
                        </div>
                    </div>
                    <div className="flex"><div className="ms-4 w-full text-[#3D4449] text-[18px]">{formatedPrice}</div></div>
                </div>
                <div className='flex justify-center'>
                    <hr className='w-[330px] border-[#9CA3A8] border-opacity-80 mb-[8px]' />
                </div>

                <div className=" flex justify-center gap-[190px] ">
                    <button type="button" id="createProductButton" data-modal-toggle="createProductModal" className="flex w-[70px] items-center justify-center text-[#3D4449] bg-[#FFD586] hover:bg-[#f0ae33]      font-bold rounded-[5px] text-[16px] px-2 py-2" onClick={() => redirectTo("editArtwork", artwork.id)}>
                        Edit
                    </button>
                    <button type="button" id="createProductButton" data-modal-toggle="createProductModal" className="flex items-center justify-center border-2 border-[#FF0000] bg-transparent text-[#FF0000] hover:bg-[#e23a3a] hover:text-[#fff] font-bold rounded-lg text-sm px-2 py-1 ">
                        Delete
                    </button>
                </div>
            </div>
        )

    })

    return (
        <>
            <HeaderOutSide></HeaderOutSide>
            <section className="bg-[#F4F1E4] p-3 sm:p-5 antialiased">
                <div className="mx-auto max-w-screen-2xl px-4 lg:px-12">
                    <h1 className='font-bold text-[23px] opacity-80'>Your Artworks</h1>
                    <div className=" relative  sm:rounded-lg overflow-hidden">
                        <div className="flex flex-col md:flex-row items-stretch md:items-center md:space-x-3 space-y-3 md:space-y-0 justify-between mx-4 py-4">
                            <div className="w-full md:w-1/2">
                                <form className="flex items-center">
                                    <label htmlFor="simple-search" className="sr-only">Search</label>
                                    <div className="relative w-full">
                                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                            <svg aria-hidden="true" className="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                <path fillRule="evenodd" clipRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" />
                                            </svg>
                                        </div>
                                        <input type="text" id="simple-search" placeholder="Search artwork" required="" className="bg-[#E5E4E4] border border-[#3D4449] text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2" />
                                    </div>
                                </form>
                            </div>
                            <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
                                <button type="button" id="createProductButton" data-modal-toggle="createProductModal" className="flex bg-[#86A8FF] items-center justify-center text-[#3D4449] bg-primary-700   hover:bg-[#4c79ec] hover:text-white focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2" onClick={() => redirectTo("newArtwork", 0)}>
                                    <svg className="h-3.5 w-3.5 mr-1.5 -ml-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                        <path clipRule="evenodd" fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" />
                                    </svg>
                                    Add Artwork
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="mt-3  pb-[80px] rounded-lg flex flex-col items-center bg-[#191A23] " style={{ minHeight: "100vh" }}>
                        <h1 className='text-[#fff] text-center text-[32px] font-bold pt-[30px] uppercase'>Manage Artworks</h1>
                        <div className='grid grid-cols-3 pt-[40px] gap-x-[30px] gap-y-[40px]'>
                            {currentArtworkList.length > 0 && renderListOfArtwork}
                        </div>
                    </div>
                </div>

            </section>
            <Footer></Footer>
        </>
    )
}

export default ManageArtwork;
