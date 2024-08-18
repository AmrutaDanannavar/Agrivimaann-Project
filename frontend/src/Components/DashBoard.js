import React from 'react';
import { Link, Outlet, useNavigate, Routes, Route } from 'react-router-dom';
import  { Suspense, lazy } from 'react';
import img2 from '../Images/dash1.jpg';
import img3 from '../Images/dparts.jpg';
import img4 from '../Images/dss1.jpg';
import img5 from '../Images/o1.jpg';
import img6 from '../Images/pi1.jpg';
import img7 from '../Images/task.jpg';
import img8 from '../Images/re1.jpg';


const Request  = lazy(() => import('./Request'));
const Pilots  = lazy(() => import('./Pilots'));
const Tasks  = lazy(() => import('./Tasks'));
const DroneParts  = lazy(() => import('./DroneParts'));
const DroneSprayingServices  = lazy(() => import('./DroneSprayingServices'));
const DronePartsOrder  = lazy(() => import('./DronePartsOrder'));

const DashBoard = ({ onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate('/');
  };

  return (
    <div className="flex h-screen">
      <div className="flex-1 ">
        <div className="flex justify-between  w-full items-center bg-color2 h-20">
          <div className='flex flex-row gap-5 items-center text-black '>
              <img src={img2} className='text-white pl-4'/>  
              <Link to="/admin" className='text-3xl hover:bg-color4'>Welcome to the Admin Dashboard</Link>
          </div>
          <button
            onClick={handleLogout}
            className="mr-14 mt-2 bg-red-500 text-white p-2 rounded"
          >
            Logout
          </button>
        </div>
        <div className="h-screen ">
          <Suspense fallback={<div >Loading...</div>}>
            <Routes>
              <Route path="/" element={<div >
                <ul className="flex flex-row  gap-20 flex-wrap  ml-64 mr-28 pt-20 p-4 text-xl">
                   <li className=" flex flex-col hover:bg-color2 justify-center items-center h-40 w-40 bg-color4 rounded-full ">
                     <img src={img8} className=''/>
                     <Link to="/admin/requests" className='text-black font-bold pt-4  text-xl'>Requests</Link>
                    </li>
                   <li className="flex flex-col hover:bg-color2   justify-center items-center h-40 w-40 bg-color4  rounded-full">
                      <img src={img6} className=''/> 
                      <Link to="/admin/pilots"  className='text-black font-bold pt-4 text-xl'>Pilots</Link>
                   </li>
                   <li className="flex flex-col hover:bg-color2  justify-center items-center h-40 w-40 bg-color4  rounded-full">
                      <img src={img7} className='h-20 w-20'/> 
                      <Link to="/admin/tasks"  className='text-black font-bold pt-4 text-xl'>Tasks</Link>
                   </li>
                   <li className="flex flex-col hover:bg-color2  justify-center items-center h-40 w-40 bg-color4  rounded-full">
                      <img src={img3} className='h-20 w-20'/>  
                      <Link to="/admin/drone-parts"  className='text-black pt-4 font-bold text-xl'>Drone Parts</Link>
                    </li>
                   <li className="flex flex-col hover:bg-color2  justify-center items-center h-40 w-40  rounded-full bg-color4">
                     <img src={img4} className='h-20 w-20'/>
                      <Link to="/admin/drone-spraying-services"  className='text-black font-bold pt-4  text-xl pl-10'> Spraying-Services</Link>
                    </li>
                   <li className="flex flex-col hover:bg-color2  justify-center items-center h-40 w-40  rounded-full bg-color4">
                      <img src={img5} className=''/>
                      <Link to="/admin/drone-parts-order"  className='text-black pt-4 font-bold  text-xl pl-7'>Drone Parts Order</Link>
                   </li>
                 </ul>
              </div>} />
              <Route path="requests" element={<Request />} />
              <Route path="pilots" element={<Pilots />} />
              <Route path="tasks" element={<Tasks />} />
              <Route path="drone-parts" element={<DroneParts />} />
              <Route path="drone-spraying-services" element={<DroneSprayingServices />} />
              <Route path="drone-parts-order" element={<DronePartsOrder />} />
            </Routes>
          </Suspense>
        </div>
        
        <div className="p-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
