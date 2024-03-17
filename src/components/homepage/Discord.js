import React from 'react';
import discord_poster from '../../image/Homepage/discord_poster.png'

export const Discord = () => {
  return (
    <div>
      <div className='relative'>
        <img className='w-full' src={discord_poster} alt="" />
      </div>
      <div>
        <h2>Be part of a <span>creative</span> community! <span>🌎</span></h2>
      </div>
    </div>
  );
};

