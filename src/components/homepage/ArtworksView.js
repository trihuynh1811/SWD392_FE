import React from 'react';
import av1 from '../../image/Homepage/artworkview_1.png'
import av2 from '../../image/Homepage/artworkview_2.png'
import av3 from '../../image/Homepage/artworkview_3.png'
import av4 from '../../image/Homepage/artworkview_4.png'

export const ArtworksView = () => {
  return (
    <div className='artworkview_container'>
      <div className='artwork_img'>
        <div>
          <img src={av1} alt="" />
        </div>
        <div>
          <img src={av2} alt="" />
        </div>
        <div>
          <img src={av3} alt="" />
        </div>
        <div>
          <img src={av4} alt="" />
        </div>
      </div>
    </div>
  );
};

