import React from 'react';
import discord_poster from '../../image/Homepage/discord_poster.png'
import discord_icon from '../../image/Icon/discord_icon.png'

export const Discord = () => {
  return (
    <div className='mt-[112px]'>
      <div className='relative'>
        <img className='w-full' src={discord_poster} alt="" />
        <div className='absolute left-[100px] bottom-[22%]'>
          <h2 className='text-[56px] w-[709px] font-bold text-[#3D4449] leading-[80px]'>Be part of a <span className='text-[#FF6C79]'>creative</span> community!<span>🌎</span></h2>
          <button className='flex 
            items-center 
            gap-[15px] 
            bg-[#FF6C79]
            px-[30px]
            py-[14px]
            rounded-[15px]
            mt-[20px]'>
            <div className='flex
            items-center'>
              <img src={discord_icon} className='w-[30px]' alt="" />
            </div>
            <p className='text-[18px] text-[#FAFAFA]'>Join Discord Server</p>
          </button>
        </div>
      </div>

    </div>
  );
};

