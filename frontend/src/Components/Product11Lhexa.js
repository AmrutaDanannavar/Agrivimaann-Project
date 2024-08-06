import React from 'react';
import img22 from '../Images/hexa1.jpg';
import img23 from '../Images/hexp.jpg';
import img24 from '../Images/hexap.jpg';

const Product11Lhexa = () => {
  return (
    <div>
      <div className='bg-color2 h-auto md:pb-14'>
        <h1 className='text-center text-white text-4xl pt-7'>11L Hexa</h1>
        <div className='flex flex-col md:flex-row gap-20'>
           <img src={img22} className=' pl-4 md:pl-28 h-64 mt-7'/> 
           <ul className='text-white text-xl pt-4 md:pt-14 pl-14 pb-4'>
             < h1 >Capacity: 16000mAh</h1> 
             <h1 className='pt-4'>Voltage: 50V</h1>
             <h1 className='pt-4'>Discharge Rate: 5C</h1>
             <h1 className='pt-4'>Weight: 39.6 kg</h1>
             <h1 className='pt-4'>Dimensions: 2487*2460*685  mm</h1>
           </ul>
        </div>
      </div>

      <div className='bg-color4 h-auto md:pb-14'>
        <div className='flex flex-col md:flex-row gap-20'>
                <p className='text-black text-center  pl-4 md:pl-14 text-sm md:text-xl pt-14'>
                <h1 className=' text-xl md:text-3xl bold pb-7'>Performance you can rely on...</h1>   
                The 11L Hexa drone is renowned for its reliable performance, featuring a hexacopter design that offers superior stability and maneuverability compared to traditional quadcopters. This six-propeller configuration enhances the drone's ability to withstand windy conditions and provides a smoother flight experience, which is particularly advantageous for professional applications.    
                </p>
                <img src={img23} className=' p-4 md:pr-56  md:pt-14 '/>
        </div>
      </div>

      <div className='bg-color3 h-auto md:pb-14'>
           <div className='flex flex-col  md:flex-row gap-20'>
             <img src={img24} className='ml-4 md:ml-28 h-72 mt-7 mr-4 '/> 
                <p className='text-white  text-center pl-4 md:pl-14 text-sm pb-4 md:text-xl md:pt-14 '>
                <h1 className='text-xl md:text-3xl bold pb-7 '>Compact for one man operability ..</h1>   
                <p>The 11L Hexa drone is designed with a compact and user-friendly build,</p>
                <p>making it suitable for one-man operability. Its streamlined design allows</p> 
                <p> a single operator to easily manage all aspects of  the drone's setup,  </p> 
                <p>operation, and transportation. </p>   
                </p>
             </div>
      </div> 

    </div>
  )
}

export default Product11Lhexa
