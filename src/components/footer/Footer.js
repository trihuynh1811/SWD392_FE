import React from 'react';
import logo from '../../image/Logo/Asp_logo_white.png'
import fb_logo from '../../image/Logo/Facebook_Logo.png'
import dis_logo from '../../image/Logo/Discord_Logo.png'

export const Footer = () => {
  return (
    <div className='w-full h-[350px] bg-[#F8939C] pb-[10px]'>
      <div className='pt-[60px] pl-[180px]' >
        <img src={logo} alt='' className='' />
      </div>
      {/* footer content */}

      <div className='flex gap-[188px]'>
        <div className=' pl-[180px] pt-[22px]'>
          <h5 className='w-[327px] text-[16px] text-[#3D4449] leading-[24px] font-normal'>Explore a vibrant collection of art from around the world on ProAs. Join our community to discover, share, and appreciate the beauty of artistic vision</h5>
          <div className='flex gap-[15px] pt-[9px]'>
            <img className='cursor-pointer' src={fb_logo} alt='facebook' />
            <img className='cursor-pointer' src={dis_logo} alt='discord' />
          </div>
        </div>
        <div className='pt-[22px] flex gap-[60px]'>
          <div>
            <h3 className='text-[#FFFFFF]'>Gallery</h3>
          </div>
          <div>
            <h3 className='text-[#FFFFFF]'>Resource</h3>
          </div>
          <div>
            <h3 className='text-[#FFFFFF]'>My account</h3>
          </div>
          <div>
            <h3 className='text-[#FFFFFF]'>Send us newsletter</h3>
          </div>
        </div>
      </div>
      {/* Rights */}
      <div className='pl-[180px] pt-[60px]  flex items-center gap-[695px]'>
        <p className='text-[13px] text-[#565660]'>Copyright © 2024 ProAs. All rights reserved.</p>
        <p className='text-[13px] text-[#565660]'>Design By VantCii</p>
      </div>
    </div>
  )
}