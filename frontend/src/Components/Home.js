import React from 'react'
import imgurl from '../Images/h1.jpg';
import img2 from '../Images/hp.jpg';
import img3 from '../Images/hm.jpg';
import img4 from '../Images/hpm.jpg';
import img5 from '../Images/hem.jpg';
import img6 from '../Images/dp1.jpg';
import img7 from '../Images/cs1.jpg';
import img8 from '../Images/bd1.jpg';
import img9 from '../Images/da1.jpg';
import img10 from '../Images/wd2.jpg';


const Home = () => {
  const Information = [
    {
      name: 'Pesticide Spraying ',
      image: img2,
      desc: 'In modern agriculture, the use of drones for pesticide spraying has emerged as a game-changer, offering a range of advantages that traditional methods cannot match. This cutting-edge technology utilizes unmanned aerial vehicles (UAVs) equipped with advanced spraying systems to deliver pesticides accurately and efficiently across fields.'
    },
    {
      name: 'Crop Monitoring and Management',
      image: img3,
      desc: 'Drones, also known as Unmanned Aerial Vehicles (UAVs), have revolutionized agriculture, providing a new dimension to crop monitoring and management. Equipped with various sensors and cameras, drones offer farmers precise and efficient ways to manage crops, enhance yield, and reduce costs.'
    },
    {
      name: 'Precision Agriculture',
      image: img4,
      desc: 'Precision agriculture, also known as precision farming, is a modern farming practice that uses technology to monitor and manage crop production. Drones play a critical role in precision agriculture by providing detailed data on crop conditions, which allows for more accurate and efficient farming practices.'
    },
    {
      name: 'Environmental monitoring',
      image: img5,
      desc: 'Environmental monitoring by drone is a rapidly growing field that utilizes unmanned aerial vehicles(UAVs) to collect data and monitor various environmental factors.Drones offer a cost- effective, efficient, and versatile method for gathering environmental data across diverse landscapes.   '
    }
  ]
  const information2 = [
    {
      name: 'Drone piloting',
      image: img6,
      desc: "The ability to fly a drone safely and effectively."
    },
    {
      name: 'Crop science',
      image: img7,
      desc: "The knowledge of crop growth and production."
    },
    {
      name: 'Business development',
      image: img8,
      desc: "The ability to identify and develop new markets for agricultural drones"
    },
    {
      name: 'Data analysis',
      image: img9,
      desc: "The ability to use data collected by drones to make informed decisions about crop management.."
    }

  ]
  return (
    <div >
      <div style={{ backgroundImage: `url(${imgurl})` }} className=' h-64 md:h-96 bg-cover bg-center flex items-center justify-center '>
        <h1 className='pt-56 text-white text-2xl md:text-4xl font-bold pb-14'>PM Drones revolutionizing farming Industry</h1>
      </div>

      <div className='bg-color3 h-auto  md:h-auto py-10 md:py-10'>
        <h1 className='text-center text-white text-lg md:text-xl p-4'>Transform your farming operations with Agrivimaan’s advanced technology, maximizing yields and streamlining crop management.</h1>

              {/* Information */}

        <div className='flex flex-col md:flex-row gap-6 md:gap-10 justify-center px-4  '>
          {Information.map((info) => (
            <div className='w-full md:w-64 h-auto bg-color1 rounded-lg shadow-lg relative hover:scale-105 transition-transform duration-300'>
              <img className="w-full h-440 md:h-48 object-cover rounded-t-lg" src={info.image} />
              <h1 className='text-xl p-4 text-white font-semibold'>{info.name}</h1>
              <h2 className='text-xs p-4 md:text-sm text-white'>{info.desc}</h2>
            </div>
          ))

          }
        </div>

      </div>

          {/* information2 */}
      <div className="flex flex-col md:flex-row bg-color4 py-10 px-4 md:px-10  h-auto">

        <div className="  w-full md:w-1/2 p-4">
          <h1 className='text-center text-black text-2xl md:text-3xl font-bold mb-4'>We Are Different & Always Professional</h1>
          <img src={img10} className='w-full h-auto rounded-lg  md:pl-14 md:w-4/5 md:h-4/5 rounded' />
        </div>


        <div className=" md:w-1/2 md:p-4">
          <div className='flex flex-col flex-wrap pl-4 gap-10 justify-center pt-7 md:flex-row '>
            {information2.map((info2) => (
              <div className='flex flex-col items-center text-center md:w-52 md:h-48 '>
                <img className="rounded-full w-28 h-28" src={info2.image} />
                <h1 className='text-lg md:text-xl text-black font-semibold'>{info2.name}</h1>
                <h2 className='text-xs md:text-sm text-black'>{info2.desc}</h2>
              </div>
            ))
            }
          </div>
        </div>
      </div>

    </div>
  )
}

export default Home
