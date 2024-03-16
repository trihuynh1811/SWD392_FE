import React from 'react';
import { Footer } from '../components/footer/Footer';
import { HeaderOutSide } from '../components/header/Header_outside';
import '../css/Pricing/Pricing.css';
import { Link } from 'react-router-dom';
import check_icon from '../image/Icon/check_icon.png'

export const Pricing = () => {
  return (
    <div className='bg-[#F4F1E4]'>
      <HeaderOutSide></HeaderOutSide>
      <div className='pricing_container mt-[66px] '>
        <h1 className='pricing_title text-center text-[72px] font-bold text-[#3D4449] tracking-[1px] leading-[50px]'>Get unlimited upload<span className='text-[100px]'>.</span> </h1>
        <div className=' flex justify-center  mt-[35px]'>
          <h3 className='text-center w-[614px] leading-[28px] text-[#7D7D7D] flex-shrink-0 text-[18px]'>Find the perfect plan, starting from $2/week - Let’s make your account more powerful</h3>
        </div>
        {/* save banner */}
        <div className='flex justify-center items-center gap-[6px] mt-[51px]'>
          <p className='text-[#A67E4E] text-[18px] font-normal leading-[28px] '>Yearly</p>
          <div className='bg-[#46A126] text-white px-[9px] py-[2px] rounded-[5px]'>Save 30%</div>
        </div>
        {/* subscription card */}
        <div className='flex gap-[70px] justify-center mt-[78px] mb-[235px]'>
          <div className='title w-[376px] h-[578px] border border-[#3D4449] rounded-[40px]'>
            <h1 className='text-[40px] font-bold mt-[36px] ml-[25px]'>Free</h1>
            <p className='text-[#888] text-[16px] ml-[25px]'>For casual users</p>
            <div className='flex justify-center'>
              <div className='mt-[68px] py-[10px] px-[96px] bg-[#FFD586] bg-opacity-50 rounded-[12px]'>
                <div className='text-[16px] font-medium text-[#3D4449] text-opacity-50'>On Free plan</div>
              </div>
            </div>
            {/* rights */}
            <div className='ml-[38px] mt-[39px]'>
              <div className='flex items-center gap-[7.85px] mb-[15px]'>
                <div><img className='' src={check_icon} alt="" /></div>
                <div className='text-[14px]'>Limited artworks upload</div>
              </div>
              <div className='flex items-center gap-[7.85px]'>
                <div>
                  <img src={check_icon} alt="" />
                </div>
                <div className='text-[14px]'>Only 1 artwork upload/day</div>
              </div>
            </div>
          </div>
          <div className='title w-[376px] h-[578px] bg-[#F6ECC5] rounded-[40px]'>
            <h1 className='text-[40px] font-bold mt-[36px] ml-[25px]'>Monthly</h1>
            <p className='text-[#888] text-[16px] ml-[25px]'>For individuals & creators</p>
            <div className='text-center text-[56px] text-[#3D4449] mt-[48px]'>
              $8
            </div>
            <div className='flex justify-center'>
              <button className='  mt-[48px]'>
                <Link className='upgrade_btn py-[12px] px-[106px] text-[16px] text-[#3D4449] font-bold bg-[#FFD586] rounded-[12px] lg:hover:bg-[black] lg:hover:text-[#fefefe]'>Upgrade</Link>
              </button>
            </div>
            {/* rights */}
            <div className='ml-[38px] mt-[39px]'>
              <div className='flex items-center gap-[7.85px] mb-[15px]'>
                <div><img className='' src={check_icon} alt="" /></div>
                <div className='text-[14px]'>Browse latest website and artworks</div>
              </div>
              <div className='flex items-center gap-[7.85px] mb-[15px]'>
                <div>
                  <img src={check_icon} alt="" />
                </div>
                <div className='text-[14px]'>Unlimited artworks upload</div>
              </div>
              <div className='flex items-center gap-[7.85px] mb-[15px]'>
                <div><img className='' src={check_icon} alt="" /></div>
                <div className='text-[14px]'>Free artworks upload per day</div>
              </div>
            </div>
          </div>
          {/*  */}
          <div className='title w-[376px] h-[578px] border border-[#3D4449] rounded-[40px]'>
            <h1 className='text-[40px] font-bold mt-[36px] ml-[25px]'>Yearly</h1>
            <p className='text-[#888] text-[16px] ml-[25px]'>For small artist team & creators</p>
            <div className='text-center text-[56px] text-[#3D4449] mt-[48px]'>
              $67,2
            </div>
            <div className='flex justify-center'>
              <button className='mt-[48px] '>
                <Link className='upgrade_btn py-[12px] px-[106px] text-[16px] text-[#3D4449] font-bold bg-[#FFD586] rounded-[12px] lg:hover:bg-[black] lg:hover:text-[#fefefe]'>Upgrade</Link>
              </button>
            </div>
            {/* rights */}
            <div className='ml-[38px] mt-[39px]'>
              <div className='flex items-center gap-[7.85px] mb-[15px]'>
                <div><img className='' src={check_icon} alt="" /></div>
                <div className='text-[14px]'>Browse latest website and artworks</div>
              </div>
              <div className='flex items-center gap-[7.85px] mb-[15px]'>
                <div>
                  <img src={check_icon} alt="" />
                </div>
                <div className='text-[14px]'>Unlimited artworks upload</div>
              </div>
              <div className='flex items-center gap-[7.85px] mb-[15px]'>
                <div><img className='' src={check_icon} alt="" /></div>
                <div className='text-[14px]'>Free artworks upload per day</div>
              </div>
              <div className='flex items-center gap-[7.85px] mb-[15px]'>
                <div><img className='' src={check_icon} alt="" /></div>
                <div className='text-[14px]'>Saving 30% on a yearly subscription </div>
              </div>
            </div>
          </div>
          
        </div>
        {/*  */}


      </div>
      
      <Footer></Footer>
    </div>
  );
};

