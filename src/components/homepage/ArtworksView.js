import React from 'react';
import av1 from '../../image/Homepage/artworkview_1.png'
import av2 from '../../image/Homepage/artworkview_2.png'
import av3 from '../../image/Homepage/artworkview_3.png'
import av4 from '../../image/Homepage/artworkview_4.png'
import '../../css/Homepage.css'

export const ArtworksView = () => {
  return (
    <div className='artworkview_container mt-[117px]'>
      <div className='flex justify-center'>
        <div className='w-[800px]'>
          <h1 className='text-center text-[32px] tracking-[-2%] font-bold'>With <span className='size_text'>many size</span>  we have in packages, you can enjoy all the artworks completely </h1>
          <div className='artwork-list mt-[30px]'>
            <div className='artwork-item'>
              <img src={av1} alt="" />
            </div>
            <div className='artwork-item'>
              <img src={av2} alt="" />
            </div>
            <div className='artwork-item'>
              <img src={av3} alt="" />
            </div>
            <div className='artwork-item'>
              <img src={av4} alt="" />
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};

