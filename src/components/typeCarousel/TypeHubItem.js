import React from 'react';
import { Link } from 'react-router-dom';



export const TypeHubItem = (props) => {
  return (
    <Link to={`/gallery?type=${props.typeId}`}>
      <div className='typehub-item mb-[40px] '>
        <div className='relative max-w-max'>
          <div className='w-[300px] h-[189px] max-w-max'>
            <img className='w-[300px] h-[189px] object-cover rounded-[20px] ' src={props.image} alt="" />
          </div>
          <div className='absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-80 rounded-[20px]'></div>
          <div className='absolute inset-0 text-center flex justify-center items-end pb-[20px] '>
            <p className=' flex-shrink-0 text-[#FFD586] text-[21px]'>{props.type}</p>
          </div>

        </div>
      </div>
    </Link>
  );
};

export default TypeHubItem;