import React from 'react';
import img16 from '../Images/bg2.jpg';
import img17 from '../Images/ap1.jpg';
import img18 from '../Images/apm1.jpg';
import img19 from '../Images/hed.jpg';
import img20 from '../Images/ha1.jpg';


const About = () => {
  const cards =[
    {
      img:img18,
      name:"Precision Crop Monitoring",
      desc:"Precise imaging. Informed decisions. Efficient farming."

    },
    {
      img:img19,
      name:'Efficient Data Collection',
      desc:'Enhanced decision-making. Streamlined processes for timely accuracy.'

    },
    {
      img:img20,
      name:'Actionable Insights',
      desc:'Actionable insights. Informed decisions. Optimized farming.'

    }
  ]
  return (
    <div>
      <div style={{ backgroundImage: `url(${img16})` }} className='h-64 md:h-96 bg-no-repeat bg-cover bg-center flex items-center justify-center'>
        <h1 className='text-center text-white font-bold text-2xl md:text-4xl p-4'>AboutUs</h1>
      </div>

      <div className=' flex flex-col md:flex-row bg-color1 p-4 md:p-14 h-auto'>
        <div className='md:w-1/2 mb-6 md:mb-0'>
          <h1 className='text-black text-xl md:text-2xl font-semibold mb-4'>AGRICULTURE</h1>
          <h1 className='text-black text-2xl md:text-3xl font-bold mb-4'>Specializing in Agri Drone Services</h1>
          <p className='text-black text-base md:text-xl mb-4' >Our expertise in drone technology and agriculture enables precision spraying, crop health analysis, and land mapping.</p>
          <span>&#x2705;</span>  <span className='  text-black text-sm pb-2 pl-4'>Precision spraying</span><br/>
          <span>&#x2705;</span> <span className='text-black text-sm pb-2 pl-4'>P Data-driven insights</span><br/>
          <span>&#x2705;</span> <span className='text-black text-sm pb-2 pl-4'>PExpert team of experienced pilots</span> 
        </div>

        <div className='md:w-1/2 flex justify-center'>
         <a href='/icon/83144/checked'></a> <img src={img17} className='w-full md:w-96 md:h-64 object-cover'/>
        </div>
      </div>

      <div className='bg-color2 py-20 h-auto'>
        <h1 className='text-center text-black text-xl'>WHAT WE DO</h1>
        <h1  className='text-center text-black text-3xl pt-7'>Provide Drone and Aerial Photography Service</h1>
        <div className=' flex flex-col md:flex-row gap-20  pl-20 pt-28'>
          {cards.map((card)=>(
            <div className=' relative w-64 h-52 bg-color5'>
              <img src={card.img} className='rounded-full absolute -top-14 -left-14 h-28 w-28 rounded-full object-cover '/>
              <h1 className='text-white text-center text-xl pt-14'>{card.name}</h1>
              <p className='text-white text-center text-sm pt-4'>{card.desc}</p>
             </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default About
