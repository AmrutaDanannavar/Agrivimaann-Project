import React from 'react'
import { Link, Outlet, useNavigate, Routes, Route } from 'react-router-dom';
import  { Suspense, lazy } from 'react';

import image from '../Images/admin.jpg';
import img3 from '../Images/dparts.jpg';
import img4 from '../Images/dss1.jpg';
import img5 from '../Images/o1.jpg';
import img6 from '../Images/pi1.jpg';
import img7 from '../Images/task.jpg';
import img8 from '../Images/re1.jpg';

const Requests = lazy(() => import('./Requests'));
const Tasks = lazy(()=> import('./Tasks'));
const Pilots = lazy(()=>import('./Pilots'));
const DroneParts = lazy(()=> import('./DroneParts'))
const DronePartsOrders = lazy(()=>import('./DronePartsOrders'));
const DroneSprayingServices = lazy(()=>import('./DroneSprayingServices'))

const DashBoard = () => {
  const navigate = useNavigate();
    const username = localStorage.getItem('username');
    const handleLogout = () => {
      localStorage.removeItem('username');
      localStorage.removeItem('user_token');
      navigate('/'); // Redirect to login page after logout
  };
    

  return (
    <div className="flex h-screen">
     <div className="flex-1">
        <div className="flex justify-between w-full items-center bg-color2 h-20">
          <div className='flex flex-row gap-2 items-center text-black '>
            
             <img src={image} alt="Admin" className="h-20 w-20 rounded-full m-4 pt-2 pb-2 mr-4" />
             <h1 className="text-xl font-bold">{`Welcome, ${username}`}</h1>
          </div>
          <div className="flex gap-4 pr-4">
                        <button 
                            onClick={() => navigate('/dashboard')}
                            className='bg-green-900 text-white p-2 rounded hover:bg-green-600'>
                            Go to Dashboard
                        </button>
                        <button 
                            onClick={handleLogout}
                            className='bg-red-900 text-white p-2 rounded hover:bg-red-600'>
                            Logout
                        </button>
                    </div>
        </div>
        <div className="h-screen">
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route path="/" element={
                <div>
                  <ul className="flex flex-row gap-20 flex-wrap ml-64 mr-28 pt-20 p-4 text-xl">
                    <li className="flex flex-col hover:bg-color2 justify-center items-center h-40 w-40 bg-color1 rounded-full">
                      <img src={img8} alt="Requests" />
                      <Link to="requests" className='text-black font-bold pt-4 text-xl'>Requests</Link>
                    </li>
                    <li className="flex flex-col hover:bg-color2 justify-center items-center h-40 w-40 bg-color1 rounded-full">
                      <img src={img6} alt="Pilots" />
                      <Link to="pilots" className='text-black font-bold pt-4 text-xl'>Pilots</Link>
                    </li>
                    <li className="flex flex-col hover:bg-color2 justify-center items-center h-40 w-40 bg-color1 rounded-full">
                      <img src={img7} alt="Tasks" className='h-20 w-20' />
                      <Link to="tasks" className='text-black font-bold pt-4 text-xl'>Tasks</Link>
                    </li>
                    <li className="flex flex-col hover:bg-color2 justify-center items-center h-40 w-40 bg-color1 rounded-full">
                      <img src={img3} alt="Drone Parts" className='h-20 w-20' />
                      <Link to="drone-parts" className='text-black pt-4 font-bold text-xl'>Drone Parts</Link>
                    </li>
                    <li className="flex flex-col hover:bg-color2 justify-center items-center h-40 w-40 rounded-full bg-color1">
                      <img src={img4} alt="Spraying Services" className='h-20 w-20' />
                      <Link to="drone-spraying-services" className='text-black font-bold pt-4 text-xl pl-10'>Spraying-Services</Link>
                    </li>
                    <li className="flex flex-col hover:bg-color2 justify-center items-center h-40 w-40 rounded-full bg-color1">
                      <img src={img5} alt="Drone Parts Order" />
                      <Link to="drone-parts-order" className='text-black pt-4 font-bold text-xl pl-7'>Drone Parts Order</Link>
                    </li>
                  </ul>
                </div>} 
              />
              <Route path="requests" element={<Requests />} />
              <Route path="pilots" element={<Pilots />} />
              <Route path="tasks" element={<Tasks />} />
              <Route path="drone-parts" element={<DroneParts />} />
              <Route path="drone-spraying-services" element={<DroneSprayingServices />} />
              <Route path="drone-parts-order" element={<DronePartsOrders />} />
              <Route path="/pilots/*" element={<Pilots />} />
            </Routes>
          </Suspense>
        </div>

        <div className="p-4">
          <Outlet />
        </div>
      </div>
    
  </div>
  )
}

export default DashBoard
