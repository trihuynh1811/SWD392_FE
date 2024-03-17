import { Link } from 'react-router-dom';
import React from 'react';
import { useSelector } from 'react-redux';
import line_between from '../../image/Header/line_between.png'
import '../../css/app.css';




export const Header = () => {
  const accessToken = useSelector((state) => state.auth.accessToken)

  console.log(accessToken)

  const displayLoginRegisterButton = accessToken !== null ?
    (<Link to={"/login"} className="text-blue-800 bg-slate-200 hover:bg-slate-300 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 py-2 focus:outline-none">Logout</Link>) :
    (
      <div className='flex flex-nowrap justify-center items-center'>
        <Link to={"/login"} className="text-[#F8939C] flex-shrink-0 focus:ring-4 focus:ring-gray-300 font-medium text-[18px]  mr-[12px] focus:outline-none lg:hover:opacity-80">Log In</Link>
        <Link to={"/register"} className="btn_signup flex-shrink-0 text-[#3D4449]  focus:ring-4 focus:ring-primary-300 font-medium text-[18px] lg:hover:bg-[black] lg:hover:text-[#fefefe]  border rounded-[40px] border-[#3D4449] border-solid  px-[20px] py-[8px] transition-all focus:outline-none">Sign Up</Link>
      </div>
    )
  const displayManageArtwork = accessToken !== null ? (
    <li>
      <Link to={"/manage-artwork"} className="block text-[18px] text-[#3D4449]   hover:text-[#F8939C] lg:hover:bg-transparent font-medium lg:border-0 lg:hover:text-primary-700 lg:p-0">Your Artwork</Link>
    </li>
  ) : (null)
  return (
    <div >
      <header className='sticky top-0 bg-[#F4F1E4]' style={{ zIndex: 999 }}>
        <nav className="bg-[#F4F1E4] ">
          <div className="flex px-[30px] pt-[30px] flex-nowrap justify-center gap-[550px] items-center ">
            <div className=''>
              <a href="/" className="">
                <img src={require("../../image/Logo/Asp_Logo.png")} className="w-full h-full" alt="ASP Logo" />
              </a>
            </div>

            <div className="flex  gap-[40px] flex-nowrap justify-center items-center w-full">
              {/* nav content */}
              <div className=" flex-shrink-0 lg:order-1" id="mobile-menu-2">
                <ul className="flex flex-nowrap overflow-auto justify-center items-center mt-4 font-medium gap-[30px] lg:mt-0">
                  <li>
                    <Link to={"/"} className=" text-[18px] text-[#3D4449]   hover:text-[#F8939C] lg:hover:bg-transparent font-medium lg:border-0 lg:hover:text-primary-700 lg:p-0">Home</Link>
                  </li>
                  <li>
                    <Link to={"/about-us"} className=" text-[#3D4449]  hover:text-[#F8939C]  font-medium text-[18px]">About us</Link>
                  </li>
                  <li>
                    <Link to={"/gallery"} className="text-[18px] text-[#3D4449]  hover:bg-gray-50 lg:hover:bg-transparent font-medium lg:border-0 lg:hover:text-[#F8939C] lg:p-0">Gallery</Link>
                  </li>
                  {displayManageArtwork}
                  <li>
                    <button className='bg-black px-[8px] py-[11px] rounded-[10px]'>
                      <Link to={"/pricing"} className="price_btn text-[18px]  hover:bg-gray-50 lg:hover:bg-transparent font-medium lg:border-0 lg:hover:text-[#F8939C] lg:p-0">Get Pro</Link>
                    </button>

                  </li>
                  <li>
                    <img className='h-[42px] opacity-60' src={line_between} alt="" />
                  </li>
                </ul>
              </div>
              <div className='order-last ml-[-10px]'>
                {displayLoginRegisterButton}
                <button data-collapse-toggle="mobile-menu-2" type="button" className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="mobile-menu-2" aria-expanded="false">
                  <span className="sr-only">Open main menu</span>
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path></svg>
                  <svg className="hidden w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                </button>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </div>
  )
}