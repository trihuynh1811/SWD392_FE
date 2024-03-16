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

function ManageArtwork() {
    const [artworkList, setArtworkList] = useState([])
    const [currentArtworkList, setCurrentArtworkList] = useState([])
    const accessToken = useSelector((state) => state.auth.accessToken);
    const currentUser = useSelector((state) => state.currentUser.user);

    console.log(currentUser)
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0)
        if (accessToken === null) {
            navigate("/login")
            return
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

    const renderListOfArtwork = currentArtworkList.map((artwork, index) => (
        <div key={index} className="bg-slate-100 rounded-lg flex mx-3 my-3">
            <div className="w-1/5 rounded-lg px-3 py-3 flex justify-center items-center">
                <img src={artwork.imagePath} className="w-full h-44 object-cover max-w-full max-h-44 rounded-lg" />
            </div>
            <div className="w-3/5 px-3 py-3 flex flex-col border-e-2 border-black justify-between">
                <div className="flex"><div className="w-14">Name:</div> <div className="capitalize ms-4 w-full">{artwork.name}</div></div>
                <div className="flex"><div className="w-14">Type:</div> <div className="ms-4 w-full">{artwork.typeId}</div></div>
                <div className="flex"><div className="w-14">Status:</div> <div className="ms-4 w-full">{artwork.artworkStatus}</div></div>
                <div className="flex"><div className="w-14">Price:</div> <div className="ms-4 w-full">{artwork.price}</div></div>
            </div>
            <div className="flex justify-center items-center flex-col w-1/5">
                <button type="button" id="createProductButton" data-modal-toggle="createProductModal" className="flex items-center justify-center text-black bg-primary-700 border-2 border-blue-500 hover:bg-blue-500 hover:text-white focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 px-3 w-1/2" onClick={() => redirectTo("editArtwork", artwork.id)}>
                    Edit
                </button>
                <button type="button" id="createProductButton" data-modal-toggle="createProductModal" className="flex items-center justify-center bg-primary-700 border-2 bg-red-500 text-white focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 px-3 w-1/2">
                    Delete
                </button>
            </div>
        </div>
    ))

    return (
        <>
            <Header></Header>
            <section className="bg-[#F4F1E4] p-3 sm:p-5 antialiased">
                <div className="mx-auto max-w-screen-2xl px-4 lg:px-12">
                    <h1 className='font-bold'>Your Artworks</h1>
                    <div className="bg-white relative shadow-md sm:rounded-lg overflow-hidden">
                        <div className="flex flex-col md:flex-row items-stretch md:items-center md:space-x-3 space-y-3 md:space-y-0 justify-between mx-4 py-4 border-t">
                            <div className="w-full md:w-1/2">
                                <form className="flex items-center">
                                    <label htmlFor="simple-search" className="sr-only">Search</label>
                                    <div className="relative w-full">
                                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                            <svg aria-hidden="true" className="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                <path fillRule="evenodd" clipRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" />
                                            </svg>
                                        </div>
                                        <input type="text" id="simple-search" placeholder="Search for products" required="" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2" />
                                    </div>
                                </form>
                            </div>
                            <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
                                <button type="button" id="createProductButton" data-modal-toggle="createProductModal" className="flex items-center justify-center text-black bg-primary-700 border-2 border-red-500 hover:bg-red-500 hover:text-white focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2" onClick={() => redirectTo("newArtwork", 0)}>
                                    <svg className="h-3.5 w-3.5 mr-1.5 -ml-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                        <path clipRule="evenodd" fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" />
                                    </svg>
                                    Add Artwork
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="mt-3 rounded-lg bg-slate-200 flex flex-col" style={{ minHeight: "100vh" }}>
                        {currentArtworkList.length > 0 && renderListOfArtwork}
                    </div>
                </div>

            </section>
            <Footer></Footer>
        </>
    )
}

export default ManageArtwork