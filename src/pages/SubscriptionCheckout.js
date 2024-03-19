import React from 'react';
import { Link } from 'react-router-dom';
import left_icon from '../image/Icon/left_icon.png';
import logo from '../image/Logo/Asp_Logo.png';
import StripeContainer from '../components/payment/StripeContainer';

export const SubscriptionCheckout = (props) => {
  return (
    <div className='checkout_container flex h-screen'>
      <div className='w-[50%] max-h-screen bg-[rgb(244,241,228)]'>
        <div className='logo_back flex gap-[10px] items-center hover:opacity-80 pt-[150px] pl-[66px]'>
          <Link to={"/pricing"}>
            <img src={left_icon} className='w-[30px]' alt="" />
          </Link>
          <Link to={"/pricing"}>
            <img src={logo} className='w-[120px]' alt="" />
          </Link>
        </div>
        {/*  */}
        <div className='pl-[123px]'>
          <h4 className='mt-[54px] text-[#3D4449] opacity-[46%] mb-[10px]'>Register ProAs Pro</h4>
          <div className='flex items-center gap-[10px]'>
            <p className='text-[40px] font-bold'>200,000 VNĐ</p>
            <p className='text-[16px] text-[#3D4449] leading-[18px] opacity-[46%] w-[55px]'>each month</p>
          </div>
        </div>
        {/*  */}
        <div className='relative w-[480px] h-[130px] border border-[#CDCECF] ml-[123px] mt-[50px] rounded-[5px]'>
          <div className='flex justify-center gap-[230px] pt-[10px]'>
            <h3>ProAs Pro</h3>
            <p>200,000 VNĐ</p>
          </div>
          <div className='text-[14px] pl-[35px] text-[#888888]'>
            <p>A single license for personal use.</p>
            <p>Pay every month</p>
          </div>
          <div className='h-[40px] mt-[12px] bg-[#BFC2C5] bg-opacity-45 rounded-bl-[5px] rounded-br-[5px]'>
            <p className='pt-[9px] pl-[20px]'>
              <span className='text-[#0E6263] py-[3px] px-[8px] rounded-[5px] font-bold bg-[#CBF4C9]'>Saving 30%</span> <span className='font-light text-[#3D4449]'>with </span>
              <Link to={"/pricing"} className='underline font-bold text-[#3D4449]'>yearly payment</Link>
            </p>
          </div>
        </div>
        <div className='flex  mt-[20px]'>
          <hr className='bg-[#888888] ml-[120px] h-[1.5px] opacity-40 w-[480px] mr-[20px] text-center' />
        </div>
        <div className='flex text-[#3D4449] items-center gap-[300px] ml-[120px] mt-[20px]'>
          <div>
            Total pay
          </div>
          <div>
            200,000 VNĐ
          </div>
        </div>
      </div>
      <div className='w-[50%] max-h-screen flex flex-col justify-center gap-[60px] items-center'>
        <StripeContainer />
      </div>
    </div>
  );
};

