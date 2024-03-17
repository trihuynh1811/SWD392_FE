import React from 'react';
import discord_poster from '../../image/Homepage/discord_poster.png'
import discord_icon from '../../image/Icon/discord_icon.png'

export const Discord = () => {
  return (
    <div>
      <div className='relative'>
        <img className='w-full' src={discord_poster} alt="" />
        <div className='absolute left-[2%] bottom-1'>
          <h2>Be part of a <span>creative</span> community! <span>🌎</span></h2>
          <button className='flex items-center'>
            <div>
              <img src={discord_icon} alt="" />
            </div>
            <p>Join Discord Server</p>
          </button>
        </div>
      </div>

    </div>
  );
};

