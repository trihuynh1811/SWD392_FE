import wallet_icon from '../../image/Homepage/wallet_icon.png'
import collection_icon from '../../image/Homepage/collection_icon.png'
import artwork_icon from '../../image/Homepage/artwork_icon.png'
import sale_icon from '../../image/Homepage/sale_icon.png'


export const Benefit = () => {
  return (
    <div className="mt-[150px]">
      <h1 className="text-center font-bold text-[40px] leading-[44px] text-[#3D4449] capitalize">Create And Sell Artworks</h1>
      <div className="flex justify-center items-center gap-[30px] mt-[52px] ">
      <div className="card_intro w-[320px] h-[265px] rounded-[16px] pt-[40px] pb-[55px]">
          <div className=''>
            <div className='flex justify-center'>
              <img className='' src={wallet_icon} alt="" />
            </div>
            <h3 className='text-[23px] text-center text-white mt-[20px]'>Set up your wallet</h3>
            <p className='text-[13px] px-[34px] text-center mt-[16px] text-[#888888]'>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatu</p>
          </div>
        </div>
        <div className="card_intro w-[320px] h-[265px] rounded-[16px] pt-[40px] pb-[55px]">
          <div className=''>
            <div className='flex justify-center'>
              <img className='' src={collection_icon} alt="" />
            </div>
            <h3 className='text-[23px] text-center text-white mt-[20px]'>Create Your collection</h3>
            <p className='text-[13px] px-[34px] text-center mt-[16px] text-[#888888]'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore </p>
          </div>
        </div><div className="card_intro w-[320px] h-[265px] rounded-[16px] pt-[40px] pb-[55px]">
          <div className=''>
            <div className='flex justify-center'>
              <img className='' src={artwork_icon} alt="" />
            </div>
            <h3 className='text-[23px] text-center text-white mt-[20px]'>Add Your Artworks</h3>
            <p className='text-[13px] px-[34px] text-center mt-[16px] text-[#888888]'>DSed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium,</p>
          </div>
        </div><div className="card_intro w-[320px] h-[265px] rounded-[16px] pt-[40px] pb-[55px]">
          <div className=''>
            <div className='flex justify-center'>
              <img className='' src={sale_icon} alt="" />
            </div>
            <h3 className='text-[23px] text-center text-white mt-[20px]'>List them for sale</h3>
            <p className='text-[13px] px-[34px] text-center mt-[16px] text-[#888888]'>Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id es</p>
          </div>
        </div>


      </div>
    </div>
  )
}