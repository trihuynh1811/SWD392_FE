import React from 'react';
import { Link } from 'react-router-dom';
import left_icon from '../image/Icon/left_icon.png';
import logo from '../image/Logo/Asp_Logo.png';
import card_icon from '../image/Icon/card_icon.png';
import cvc_icon from '../image/Icon/cvc_icon.png';
import { useSelector } from 'react-redux';

export const SubscriptionCheckout = (props) => {
  const currentUser = useSelector((state) => state.currentUser.user)
  const email = currentUser['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress']

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
        <div className='flex items-center gap-[93px] bg-[#E6E9EC] w-[420px] h-[43px] rounded-[5px] pl-[24px]'>
          <label className='text-[16px] font-bold' htmlFor="">Email</label>
          <span className='text-[16px] font-light'>{email}</span>
        </div>
        {/*  */}
        <form action="">
          <div>
            <p className='mb-[5px]'>Card information</p>
            <div className=' relative'>
              <input className='w-[410px] focus:outline-[#3D4449] py-[10px] pl-[17px] rounded-[10px] border border-[#9CA3A8] border-opacity-60' type="text" placeholder='1234 1234 1234 1234' />
              <img src={card_icon} className='w-[100px] left-[300px] bottom-[12px] absolute' alt="" />
            </div>
          </div>
          {/*  */}
          <div className='flex gap-[18px] mt-[20px]'>
            <input className='py-[10px] focus:outline-[#3D4449] w-[170px] pl-[17px] rounded-[10px] border border-[#9CA3A8] border-opacity-60' type="text" placeholder='MM/YY' />
            <div className='relative'>
              <input className='py-[10px] w-[220px] pl-[17px] rounded-[10px] focus:outline-[#3D4449] border border-[#9CA3A8] border-opacity-60' type="text" placeholder='CVC' />
              <img src={cvc_icon} className='absolute left-[178px] bottom-[5px]' alt="" />
            </div>
          </div>
          {/*  */}
          <div className='mt-[30px]'>
            <p className='mb-[5px]' >Card holder's name</p>
            <input className='w-[410px] focus:outline-[#3D4449] py-[10px] pl-[17px] rounded-[10px] border border-[#9CA3A8] border-opacity-60' type="text" name="" id="" placeholder='Fullname...' />
          </div>
          <h3 className='w-[400px] text-[16px] text-[#A67E4E] tracking-[-0.2px] mt-[10px]'>Make sure your information is real. Please check all fields carefully</h3>
          <input type="submit" className='w-[410px] text-white hover:opacity-80 bg-[#000] mt-[40px] cursor-pointer py-[10px] pl-[17px] rounded-[10px] border border-[#9CA3A8] border-opacity-60' value={"Register"} />
          <p className='text-[13px] mt-[8px] leading-[17px] text-[#9CA3A8] w-[415px] ml-[5px]'>By confirming your subscription, you authorize ProAs to charge future payments based on their terms. You can always unsubscribe.</p>
        </form>
      </div>
    </div>
  );
};

