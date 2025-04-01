 import React from 'react'
 import { IoMdStar } from "react-icons/io";
 const HeroSection = () => {
   return (
    <div className="bg-primary text-white h-[calc(100vh-15vh)]">
      <div className='container mx-auto p-4 pt-6 md:p-6'>
        <div className='flex flex-col  justify-center items-start'> <div className='flex flex-col gap-2 justify-center items-start md:flex-row md:justify-start md:items-center'>
          <div className='flex justify-start items-center gap-0.5'><IoMdStar fill='gold' size={24} /><IoMdStar fill='gold' size={24} /><IoMdStar fill='gold' size={24} /><IoMdStar fill='gold' size={24} /><IoMdStar fill='gold' size={24} /></div>
          <p className='font-roboto text-sm md:text-base lg:text-lg'>40,000+ Happy Customers</p>
          </div>
          <h3>Biome Protect Now Available</h3>
          <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quos sapiente facilis quis reiciendis qui saepe harum quidem tempore libero officia!

</p>
<button>Shop Now</button>
          </div>
        <div></div>
      </div>



     </div>
   )
 }
 
 export default HeroSection