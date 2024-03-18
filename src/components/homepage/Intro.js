import blur_yellow from '../../image/Homepage/blur_yellow.png'
import blur_blue from '../../image/Homepage/blur_blue.png'
import blur_pink from '../../image/Homepage/blur_pink.png'
import poster_intro from '../../image/Homepage/poster_intro.png';
import '../../css/Homepage.css';
import { Link } from 'react-router-dom';


export const Intro = () => {
  return (
    <div>
      <div className='home_conteiner relative'>
        <div className='relative z-[99] flex justify-center items-center mt-[70px] gap-[10px]'>
          <div className=''>
            <h1 className='text-[65px] leading-[85px] font-bold w-[845px] tracking-[3px]'><span className='text-[#3D4449]'>Explore great artworks,</span> <span className='text-[#F8939C]'>faster</span></h1>
            <p className='text-[#787779] w-[680px] text-[17px] font-light mt-[20px] tracking-[1.15px] leading-[26px] mb-[55px]'>Dive into a world of creativity. Explore unique artworks that tell captivating stories. Discover a gallery of endless inspiration. Welcome to ProAs!</p>
            <button to='/Gallery' className='explore_btn cursor-pointer border text-[18px] rounded-[50px] bg-[#F8939C] text-[#FFFFFF] px-[50px] py-[20px] relative isolate overflow-hidden before:absolute before:left-auto before:content-empty before:right-0 before:top-0 before:h-full before:w-0 before:bg-black before:z-[-1] before:transition-opacity before:duration-400 hover:before:left-0 hover:before:right-auto hover:before:w-full'><Link to='/Gallery'>Explore now</Link></button>
          </div>
          <div>
            <img className='w-[400px]' src={poster_intro} alt="" />
          </div>
        </div>
      </div>
      <img className='absolute w-[500px] left-[-10%] top-[40px]' src={blur_yellow} alt="" />
      <img className='absolute w-[500px] right-[25%] top-[20%]' src={blur_blue} alt="" />
      <img className='absolute w-[500px] right-[1%] bottom-[-28%]' src={blur_pink} alt="" />  
            
    </div>
    

  )
}