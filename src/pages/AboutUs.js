import poster_1 from '../image/AboutUs/poster1.png';
import poster_2 from '../image/AboutUs/poster2.png';
import poster_3 from '../image/AboutUs/poster3.png';
import banner from '../image/AboutUs/banner.png';
import line_header from '../image/AboutUs/line_header.png';
import { Header } from '../components/header/Header';
import { Footer } from '../components/footer/Footer';
import '../css/AboutUs/AboutUs.css';

export const AboutUs = () => {
  return (

    <>
      <Header></Header>


      <div className='aboutUs_container bg-[#F4F1E4]'>
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
        <div>
          <div>
            <h1></h1>
            <p></p>
          </div>
          <div>
            <img src={poster_2} alt="" />
          </div>
        </div>
      </div>
      <Footer></Footer>
    </>
  )
}