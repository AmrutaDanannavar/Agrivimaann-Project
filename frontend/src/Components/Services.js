import React from 'react';
import img25 from '../Images/sa1.jpg';
import img26 from '../Images/sa2.jpg';
import img27 from '../Images/sa3.jpg';
import img28 from '../Images/sa4.jpg';
import img29 from '../Images/sa5.jpg';
import img30 from '../Images/sa7.jpg';
import img31 from '../Images/sa8.jpg';
import img33 from '../Images/sa10.jpg';

const Services = () => {
  const cards = [
    {
      img: img26,
      desc: "Scaling New Heights in Indian Agriculture:25,000+ Farms Transformed by DronesUnveiling Unpreced Capture at 2mm/pi Resolution"

    },
    {
      img: img27,
      desc: 'Unveiling Unprecedented Devil: Data Capture at 2mm/pixel Ground Sampling Resolution"'

    },
    {
      img: img28,
      desc: 'Precise AI/ML Models: Counting Plants, Analyzing Uniformity, and Detecting Tassels with Accuracy'

    }
  ]
  const card2 = [
    {
      img: img30,
      name: 'Enhanced Efficiency'
    },
    {
      img: img31,
      name: 'Precision Farming'
    },
    
    {
      img:img33,
      name:'Elevating Farm Safety'
    }
  ]
  return (
    <div>
      <div style={{ backgroundImage: `url(${img25})` }} className='h-96 bg-no-repeat bg-cover'>
        <h1 className='text-center text-black  text-4xl pt-4'>Drone-as-a-Service</h1>
      </div>

      <div className='bg-color2 h-auto'>
        <h1 className='text-center text-black text-xl pt-14'>OUR EXPERTISE</h1>
        <h1 className='text-center text-black text-3xl pt-7'>Empowering Farmers with Precision Drones</h1>
        <div className=' flex flex-col md:flex-row gap-20 pl-14 md:pl-28 pt-14 pb-4'>
          {cards.map((card) => (
            <div className='  w-72 h-72 bg-color4 relative hover:scale-110 duration-300 rounded'>
              <img src={card.img} className='m-4 h-46 w-64  object-cover ' />
              <p className='text-black text-center text-sm p-2'>{card.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div className=' flex flex-col md:flex-row gap-10 bg-color4 h-auto pb-4'>
        <img src={img29} className=' p-7 w-96 h-96 ' />
        <div className='pt-4 md:pt-7 md:pl-0 pl-4'>
          <h1 className='text-black text-2xl bold'>Data Collection</h1>
          <p>High-resolution imagery and multispectral data capture.</p>
          <p> Analyze crop health, soil conditions, and more. Inform decisions, boost productivity.</p>
          <br />
          <h1 className='text-black text-2xl bold'>Data Processing & Analysis</h1>
          <p>Agri drones perform data processing and analysis to extract meaningful insights from captured data.<p>They use advanced algorithms and software to analyze crop health, detect pests or diseases</p><p>measure vegetation indices, and generate maps for precision agriculture.</p></p>
          <br />
          <h1 className='text-black text-2xl bold'>Data Delivery</h1>
          <p>SkyDeck: Share, Analyze, and Generate High-Precision Field Maps.</p>
          <p>Collaborate, Annotate,and Gain Insights for Enhanced Farm Management.</p>
        </div>


      </div>

      <div className='bg-color3 h-auto'>
        <h1 className='text-white text-xl text-center pt-7'>BENEFITS</h1>
        <h1 className='text-white text-2xl text-center pt-4' >Embrace the Benefits of
          Drones for</h1>
        <h1 className='text-white text-2xl text-center '>Enhanced Efficiency and Higher Yields</h1>

        <div className='flex flex-col  md:flex-row justify-center gap-20 pt-7 pb-4'>
          {
            card2.map((card) => (
              <div className='w-64 md:h-52 h-52 pt-4 md:pl-0 pl-28 '>
                <img src={card.img} className=' rounded-full ' />
                <h1 className='text-white text-center  text-xl bold pr-4 md:pr-14 pt-4'>{card.name}</h1>

              </div>
            ))
          }

        </div>
      </div>

    </div>
  )
}

export default Services
