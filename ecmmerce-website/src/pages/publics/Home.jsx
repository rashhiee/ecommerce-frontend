import React from 'react'

const HomePage = () => {
  return (
    <div className='w-full h-auto'>
    <div
  className="relative mt-[68px] w-full h-screen bg-cover bg-center bg-no-repeat" 
  
  style={{ backgroundImage: "url('/images/mainpage.webp')" }}
>
  <div className="absolute inset-0 bg-black bg-opacity-40"></div>

  <div className="relative z-10 flex items-center justify-start h-full px-10 md:px-20">
    <div className="max-w-md text-white">
      <h1 className="text-4xl md:text-6xl font-bold mb-4">Step Into Style</h1>
      <p className="text-lg md:text-xl mb-6">
        Discover the latest trends and timeless classics — all in one place.
      </p>
      <button className="bg-[#2b333a] text-white px-6 py-2 rounded-lg hover:bg-[#2c89a6] transition">
        Shop Now
      </button>
    </div>
  </div>
</div>

      <div className='bg-white w-full h-auto p-12 flex  justify-center  '>
              <div className='flex flex-col items-center'>
                <h1 className='font-bold p-3'>Trending now</h1>
                <div className='w-auto h-auto p-2 bg-[#dccfbde1] rounded-[8px] flex justify-between items-center '>
                  <div className='py-3 px-6 rounded-[6px] hover:bg-[#e9e4dde1] '>
                      <p>Men</p>
                  </div>
                  <div className='py-3 px-6 rounded-[6px] hover:bg-[#e9e4dde1]'>
                    <p>Women</p>
                  </div>
                  <div className='py-3 px-6 rounded-[6px] hover:bg-[#e9e4dde1]'>
                   <p>Kids</p>
                  </div>
                </div>
              </div>
      </div>
    </div>


  )
}

export default HomePage