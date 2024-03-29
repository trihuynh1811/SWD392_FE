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
import '../css/app.css';
import clock_icon from '../image/Icon/clock_icon.png'
import money_icon from '../image/Icon/money_icon.png';

function Gallery() {
    const [artworkList, setArtworkList] = useState([])
    const artworkTypes = useSelector((state) => state.artworkType.artworkTypes)
    const creatorList = useSelector((state) => state.currentUser.creatorList)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const [artworkName, setArtworkName] = useState("")

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
        if (searchParams.get('type') !== null) {
            ArtworkApi.GetAllArtworkByType(searchParams.get('type')).then(res => {
                if (res.data !== 'No artworks found') {
                    console.log(res.data)
                    setArtworkList(res.data)
                }

            }).catch(e => console.log(e))
        }
        else {
            ArtworkApi.GetAllArtwork().then(res => {
                setArtworkList(res.data)
            }).catch(e => console.log(e))
        }

    }, [])

    const seeArtworkDetail = (id) => {
        navigate(`/artwork-detail?id=${id}`)
    }
    // handle date format

    const renderAllArtwork = artworkList.map((artwork, index) => {
        const fullFormatCreatedDay = artwork.createdDate;
        const formatCreatedDate = new Date(fullFormatCreatedDay).toLocaleDateString("en-Us");

        const price = artwork.price;
        const formatedPrice = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'VND' }).format(price);

        return (<div key={artwork.id} className="">

            {/* Render your data here */}
            <div className="relative bg-[#FEFEFE] artwork_card flex-shrink-0 w-[340px] h-[450px] border border-black" role='button' onClick={() => seeArtworkDetail(artwork.id)}>

                <div className='pl-[15px] pt-[10px] flex items-center gap-[100px]'>
                    <div className='text-[#3D4449] text-[16px] font-bold'>{artwork.userName} VantCii.meart</div>
                    <div className='flex items-center'>
                        <img src={clock_icon} alt="" />
                        <p className='text-[#9CA3A8]'>{formatCreatedDate}</p>
                    </div>
                </div>

                <div className='ml-[15px] mt-[40px]'>
                    <p className='text-[#A67E4E] font-bold text-[30px]'>{artwork.name}</p>
                    <div className='flex items-start gap-[5px]'>
                        <img src={money_icon} className='' alt="" />
                        <p className='text-[18px] price text-[#3D4449]'>{formatedPrice}</p>
                    </div>
                </div>

                <div className='flex justify-center '>
                    <img src={artwork.imagePath} className='absolute bottom-[15px] border border-black w-[310px] h-[282px] object-cover' alt={artwork.name} />
                </div>
            </div>

        </div>)
    })

    const handleInput = (e) => {
        setArtworkName(e.target.value)
    }

    const renderSearchResult = () => {
        if (artworkName === "") {
            ArtworkApi.GetAllArtwork().then(res => {
                setArtworkList(res.data)
            }).catch(e => console.log(e))
            return
        }
        ArtworkApi.GetAllArtworkByName(artworkName).then(res => {
            if (res.data === 'no artworks found with this name') {
                setArtworkList([])
                return
            }
            setArtworkList(res.data)
        }).catch(e => console.error(e))
    }

    // Type handle
    const optionsTypeData = [
        { value: 'Landscapes', content: 'Landscapes' },
        { value: 'Portrait', content: 'Portrait' },
        { value: 'Still life', content: 'Still life' },
        { value: 'Abstract', content: 'Abstract' },
        { value: 'Illustration', content: 'Illustration' },
        { value: 'Animals', content: 'Animals' },
        { value: 'Genres', content: 'Genres' },
    ]
    return (
        <div className='bg-[#F4F1E4]'>
            <HeaderOutSide></HeaderOutSide>
            <div className='gallery_container flex items-center gap-[600px] mt-[34px] px-[92px]'>
                <div className='search_flow flex items-center gap-[40px]'>
                    <div className='search_name relative'>
                        <input type="search" name='search_name' placeholder='Artwork name...' className='bg-[#E5E4E4] border border-[#3D4449] h-10 pl-[40px] pr-10 rounded-[5px] text-sm focus:outline-none w-[300px]' onChange={e => handleInput(e)} />
                        <button className='absolute left-[10px] top-[8px]' onClick={renderSearchResult}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" viewBox="0 0 29 29" fill="none">
                                <path d="M27.6251 27.625L21.2915 21.2915M21.2915 21.2915C22.3749 20.2081 23.2343 18.9219 23.8206 17.5064C24.4069 16.0909 24.7087 14.5738 24.7087 13.0417C24.7087 11.5095 24.4069 9.99241 23.8206 8.57691C23.2343 7.16141 22.3749 5.87525 21.2915 4.79187C20.2081 3.70849 18.922 2.84911 17.5065 2.26279C16.091 1.67647 14.5739 1.37469 13.0417 1.37469C11.5096 1.37469 9.99247 1.67647 8.57697 2.26279C7.16147 2.84911 5.87531 3.70849 4.79193 4.79187C2.60395 6.97985 1.37476 9.94739 1.37476 13.0417C1.37476 16.1359 2.60395 19.1035 4.79193 21.2915C6.97991 23.4794 9.94745 24.7086 13.0417 24.7086C16.136 24.7086 19.1035 23.4794 21.2915 21.2915Z" stroke="#3D4449" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                        </button>
                    </div>
                    {/* <div className='search_tag relative'>
                        <input className='h-10 bg-transparent border border-[#3D4449] rounded-[5px] focus:outline-none pl-[40px]' type="search" placeholder='Tag...' />
                        <button className='absolute left-[10px] top-[8px]'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" viewBox="0 0 29 29" fill="none">
                                <path d="M27.6251 27.625L21.2915 21.2915M21.2915 21.2915C22.3749 20.2081 23.2343 18.9219 23.8206 17.5064C24.4069 16.0909 24.7087 14.5738 24.7087 13.0417C24.7087 11.5095 24.4069 9.99241 23.8206 8.57691C23.2343 7.16141 22.3749 5.87525 21.2915 4.79187C20.2081 3.70849 18.922 2.84911 17.5065 2.26279C16.091 1.67647 14.5739 1.37469 13.0417 1.37469C11.5096 1.37469 9.99247 1.67647 8.57697 2.26279C7.16147 2.84911 5.87531 3.70849 4.79193 4.79187C2.60395 6.97985 1.37476 9.94739 1.37476 13.0417C1.37476 16.1359 2.60395 19.1035 4.79193 21.2915C6.97991 23.4794 9.94745 24.7086 13.0417 24.7086C16.136 24.7086 19.1035 23.4794 21.2915 21.2915Z" stroke="#3D4449" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                        </button>
                    </div> */}

                </div>
                {/* filter type */}
                {/*<div>
                    <select className='h-[40px] bg-transparent' name="" id="">
                        {optionsTypeData.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.content}
                            </option>
                        ))}
                    </select>
                </div>*/}
            </div>
            <h1 className='text-[48px] text-[#3D4449] font-bold text-center mt-[50px]'> <span className='gallery_title'>Artwork</span> Gallery🎨</h1>
            <div style={{ minHeight: '100vh' }}>
                <div className='flex justify-center mt-[50px] mb-[150px]'>
                    <div className="grid grid-cols-3 gap-x-[80px] gap-y-[80px]">
                        {artworkList.length > 0 ? renderAllArtwork : <div>No result found</div>}
                    </div>
                </div>
            </div>
            <Footer></Footer>
        </div>
    )
}

export default Gallery