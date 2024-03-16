import poster_1 from '../image/AboutUs/poster1.png';
import poster_2 from '../image/AboutUs/poster2.png';
import poster_3 from '../image/AboutUs/poster3.png';
import banner from '../image/AboutUs/banner.png';
import line_header from '../image/AboutUs/line_header.png';
import { Header } from '../components/header/Header';
import { Footer } from '../components/footer/Footer';
import '../css/AboutUs/AboutUs.css';
import { Link } from 'react-router-dom';

export const AboutUs = () => {
  return (

    <>
      <Header></Header>


      <div className='aboutUs_container bg-[#F4F1E4] pb-[40px]'>
        <div className='flex justify-center pt-[23px]'>
          <img className='w-[1400px]' src={line_header} alt="" />
        </div>
        {/*  */}
        <div className='flex justify-center px-[107px] mt-[85px]'>
          <div className='w-[50%]'>
            <img className='w-[500px]' src={poster_1} alt="" />
          </div>
          <div className='w-[50%]'>
            <h1 className='story_title text-[72px] mb-[25px]'>Our Story</h1>
            <p className='text-[20px] text-[#3D4449] text-justify opacity-80'>At ProAs, our story is one of passion, creativity, and a deep love for art in all its forms. We began with a simple dream – to create a platform where artists could share their work with the world, connect with fellow creators, and inspire art enthusiasts globally. Our journey is defined by the belief that every artist, regardless of background or experience, deserves a space to showcase their unique voice. We are committed to nurturing a community that celebrates the diversity and beauty of art and encourages the exploration of artistic expression</p>
          </div>
        </div>
        <div className='flex justify-center items-center mt-[80px]'>
          <div className='w-[50%]'>
            <h1 className='story_title text-[72px] mb-[25px]'>Our Contents</h1>
            <p className='text-[20px] text-[#3D4449] text-justify opacity-80 pr-[131px]'>At Artwork Sharing, our dedication to offering a diverse range of artistic content knows no bounds. From timeless masterpieces to cutting-edge contemporary creations, our platform serves as a celebration of artistic exploration and cultural tapestry. Our digital gallery proudly features traditional paintings, captivating sculptures, evocative photography, mesmerizing digital art, immersive multimedia installations, and everything in between. We take pride in providing a rich and vibrant tapestry of creative expression, representing a kaleidoscope of cultural influences, artistic styles, and genres from every corner of the globe.
            </p>
          </div>
          <div className=''>
            <img className='w-[580px]' src={poster_2} alt="" />
          </div>
        </div>
        <div className='our_gallery px-[97px] mt-[87px]'>
          <h1 className='banner_title uppercase text-center text-[56px] text-[#3D4449]'>our gallery</h1>
          <img className='mt-[30px]' src={banner} alt="" />
          <div className='flex justify-center mt-[30px]'>
            <button to='/Gallery' className='go_btn cursor-pointer border text-[24px] rounded-[20px] bg-[#A67E4E] text-[#FFFFFF] px-[50px] py-[20px] relative isolate overflow-hidden before:absolute before:left-auto before:content-empty before:right-0 before:top-0 before:h-full before:w-0 before:bg-black before:z-[-1] before:transition-opacity before:duration-400 hover:before:left-0 hover:before:right-auto hover:before:w-full'><Link to='/Gallery'>Explore now</Link></button>
          </div>
        </div>

      </div>
      <Footer></Footer>
    </>
  )
}