import React from 'react';
import logo from '../../image/Logo/Asp_logo_white.png'
import fb_logo from '../../image/Logo/Facebook_Logo.png'
import dis_logo from '../../image/Logo/Discord_Logo.png'
import send_icon from '../../image/Icon/Send_icon.png';

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
        <div className='pt-[22px] flex gap-[60px] '>
          <div>
            <h3 className='text-[#FFFFFF] text-[21px]'>Gallery</h3>
            <p className='text-[14px] text-[#3D4449] pt-[15px]'>Explore</p>
            <p className='text-[14px] text-[#3D4449] pt-[8px]'>Details</p>
            <p className='text-[14px] text-[#3D4449] pt-[8px]'>Audition</p>
          </div>
          <div>
            <h3 className='text-[#FFFFFF] text-[21px]'>Resource</h3>
            <p className='text-[14px] text-[#3D4449] pt-[15px]'>Help&Center</p>
            <p className='text-[14px] text-[#3D4449] pt-[8px]'>FaQs</p>
          </div>
          <div className=''>
            <h3 className='text-[#FFFFFF] text-[21px]'>Account</h3>
            <p className='text-[14px] text-[#3D4449] pt-[15px]'>Profile</p>
            <p className='text-[14px] text-[#3D4449] pt-[8px]'>My wallet</p>
          </div>
          <div>
            <h3 className='text-[#FFFFFF] text-[21px]'>Send us newsletter</h3>
            <p className='text-[14px] text-[#3D4449] pt-[12px]'>Signup for our newsletter to get the latest news
              in your inbox.</p>
            <div className='flex pt-[9.6px] items-center'>
              <input className='bg-transparent border border-[#3D4449] h-[35px] pl-[15px] placeholder-[#3D4449] rounded-tl-[20px] rounded-bl-[20px] border-r-[#FFD586]' type="text" placeholder="Enter your email..." />
              <a href='/#' className=' cursor-pointer w-[41px] bg-[#FFD586] h-[35px] flex justify-center items-center rounded-tr-[20px] rounded-br-[20px]'>
                <img className='w-[25px]' src={send_icon} alt="" />
              </a>
            </div>

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