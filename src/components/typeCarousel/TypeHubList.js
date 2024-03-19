import React, { useEffect, useState } from 'react';
import { ImageTypeData } from './ImageTypeData';
import { TypeHubItem } from './TypeHubItem';
import { ArtworkApi } from '../../api/Api';
import '../../css/Homepage.css';



export const TypeHubList = () => {
  const [artworkTypes, setArtworkTypes] = useState([])

  useEffect(() => {
    ArtworkApi.GetAllArtworkType().then(res => {
      console.log(res.data)
      setArtworkTypes(res.data)
    }).catch(e => console.error(e))
  }, [])
  // handle scroll type hub
  // document.getElementById('next').onclick = function () {
  //   const widthItem = document.querySelector('.typehub-item').offsetWidth;
  //   document.getElementById('typehub-list').scrollLeft += widthItem;
  // }
  // document.getElementById('prev').onclick = function () {
  //   const widthItem = document.querySelector('.typehub-item').offsetWidth;
  //   document.getElementById('typehub-list').scrollLeft -= widthItem;
  // }
  useEffect(() => {
    const handleNextClick = () => {
      const widthItem = document.querySelector('.typehub-item').offsetWidth;
      document.getElementById('typehub-list').scrollLeft += widthItem;
    };

    const handlePrevClick = () => {
      const widthItem = document.querySelector('.typehub-item').offsetWidth;
      document.getElementById('typehub-list').scrollLeft -= widthItem;
    };

    const nextButton = document.getElementById('next');
    const prevButton = document.getElementById('prev');

    if (nextButton && prevButton) {
      nextButton.addEventListener('click', handleNextClick);
      prevButton.addEventListener('click', handlePrevClick);
    }

    return () => {
      if (nextButton && prevButton) {
        nextButton.removeEventListener('click', handleNextClick);
        prevButton.removeEventListener('click', handlePrevClick);
      }
    };
  }, []);





  return (
    <div className='pt-[15px] mt-[96px]'>
      <h3 className='text-center text-[13px] font-medium text-[#A67E4E] mb-[20px]'>READY-TO-GO CONTENT </h3>
      <h1 className='typehub_title text-center text-[56px] text-[#3D4449] mb-[20px]'>Instant types hub</h1>
      <div className='flex justify-center mb-[80px]'>
        <p className='text-center w-[748px] text-[21px] text-[#3D4449] opacity-80 '>From basic things to amazingly expert artworks, find the content you want in these categories</p>
      </div>

      <div id='typehub-list' className='typehub-list flex gap-[50px]'>
        {artworkTypes.length > 0 && ImageTypeData.map((item, index) => {
          return (
            <TypeHubItem
              key={index}
              image={item.image}
              type={artworkTypes.filter(type => type.id === item.id)[0].name}
              typeId={item.id}
            />
          )
        })}
      </div>
      <div className='direction flex items-center justify-center gap-[32px]'>
        <button id='prev' className='bg-white px-[15px] py-[15px] rounded-full'>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M17 2L7 12L17 22" stroke="#FF6C79" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </button>
        {/*  */}
        <button id='next' className='bg-white px-[15px] py-[15px] rounded-full'>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M7 22L17 12L7 2" stroke="#FF6C79" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </button>
      </div>
    </div>

  );
};

export default TypeHubList;