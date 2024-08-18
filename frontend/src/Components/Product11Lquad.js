import React from 'react';
import img21 from '../Images/quad1.jpg';
import img22 from '../Images/quad3.jpg';
import img23 from '../Images/cm.jpg';

const Product11Lquad = () => {
  return (
    <div >
      <div className='bg-color1 h-auto md:pb-14'>
        <h1 className='text-center text-black text-4xl pt-7'>11L Quad</h1>
        <div className='flex flex-col md:flex-row gap-20'>
           <img src={img21} className=' pl-4 md:pl-28 h-64 mt-7'/> 
           <ul className='text-black text-xl  pt-4 md:pt-14 pl-14 pb-4'>
             < h1 >Capacity: 16000mAh</h1> 
             <h1 className='pt-4'>Voltage: 22.2V</h1>
             <h1 className='pt-4'>Discharge Rate: 15Cv</h1>
             <h1 className='pt-4'>Weight: 1990g</h1>
             <h1 className='pt-4'>Dimensions: 193*77*66 mm</h1>
           </ul>
        </div>
      </div>

      <div className='bg-color1 h-auto md:pb-14'>
        <div className='flex flex-col md:flex-row gap-20'>
                <p className='text-black text-center pl-4 md:pl-14  text-sm md:text-xl pt-14'>
                <h1 className=' text-xl md:text-3xl bold pb-7'>Performance you can rely on...</h1>   
                The 11L Quad drone is known for its impressive performance, offering exceptional flight stability and maneuverability. With advanced GPS technology, it provides precise navigation and reliable positioning. 
                The drone is equipped with a high-resolution camera, delivering clear and stable aerial footage. Its robust battery life ensures extended flight times, making it suitable for both recreational and professional use    
                </p>
                <img src={img22} className='p-4 md:pr-56  md:pt-14 '/>
        </div>
      </div>

      <div className='bg-color1 h-auto md:pb-14'>
           <div className='flex flex-col  md:flex-row gap-20'>
             <img src={img23} className=' ml-28 h-72 mt-7 '/> 
                <p className='text-black  text-center pl-4 text-sm pt-2 md:pl-14  md:text-xl md:pt-14 pb-4'>
                <h1 className=' text-xl md:text-3xl bold pb-7 '>Compact for one man operability ..</h1>   
                <p>The H12 series uses newest Qualcomm Snapdragon 625 processor,</p>
                <p>equipped with an Android embedded system and advanced SDR</p> 
                <p>technology and super protocol stack, making the image clearer,</p> 
                <p>lower the latency, longer distance. </p>   
                </p>
             </div>
      </div> 
    </div>
  )
}

export default Product11Lquad
