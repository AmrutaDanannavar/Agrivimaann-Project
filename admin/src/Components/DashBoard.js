import React, { useState, useEffect, Suspense, lazy } from 'react';
import { Link, useNavigate, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../config';
import {
  FaBars,
  FaSignOutAlt,
  FaTasks,
  FaUserTie,
  FaCogs,
  FaPlane,
  FaBoxOpen,
  FaRegClipboard,
} from 'react-icons/fa';
import image from '../Images/admin.jpg';

const Requests = lazy(() => import('./Requests'));
const Tasks = lazy(() => import('./Tasks'));
const Pilots = lazy(() => import('./Pilots'));
const DroneParts = lazy(() => import('./DroneParts'));
const DronePartsOrders = lazy(() => import('./DronePartsOrders'));
const DroneSprayingServices = lazy(() => import('./DroneSprayingServices'));

const DashBoard = () => {
  const navigate = useNavigate();
  const username = localStorage.getItem('username');
  const [requestCount, setRequestCount] = useState(0);
  const [pilotCount, setPilotCount] = useState(0);
  const [taskCount, setTaskCount] = useState(0);
  const [serviceCount, setServiceCount] = useState(0);
  const [partCount, setPartCount] = useState(0);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const [
          requestResponse,
          pilotResponse,
          taskResponse,
          serviceResponse,
           partResponse,
        ] = await Promise.all([
          axios.get(`${BASE_URL}getrequests`),
          axios.get(`${BASE_URL}getpilots`),
          axios.get(`${BASE_URL}gettasks`),
          axios.get(`${BASE_URL}getservices`),
          axios.get(`${BASE_URL}getparts`)
        ]);

        setRequestCount(requestResponse.data.length);
        setPilotCount(pilotResponse.data.length);
        setTaskCount(taskResponse.data.length);
        setServiceCount(serviceResponse.data.length);
        setPartCount(partResponse.data.length);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchCounts();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('username');
    localStorage.removeItem('user_token');
    navigate('/'); // Redirect to login page after logout
  };

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div
        className={`${
          isSidebarCollapsed ? 'w-20' : 'w-64'
        } bg-black text-white flex flex-col h-full transition-width duration-300 fixed`}
      >
        <div className="flex items-center justify-between h-20 bg-black px-4">
          {!isSidebarCollapsed && (
            <div className="flex items-center">
              <img
                src={image}
                alt="Admin"
                className="h-12 w-12 rounded-full"
              />
              <h1 className="text-xl text-white font-bold ml-2">{username}</h1>
            </div>
          )}
          <button
            onClick={toggleSidebar}
            className="text-white focus:outline-none"
          >
            <FaBars size={24} />
          </button>
        </div>
        <nav className="flex flex-col p-4 pt-7 space-y-4">
          <Link
            to="requests"
            className="flex items-center text-white hover:bg-color5 rounded p-2"
          >
            <FaRegClipboard size={24} />
            {!isSidebarCollapsed && (
              <span className="ml-3 text-md font-medium">Requests</span>
            )}
          </Link>
          <Link
            to="pilots"
            className="flex items-center text-white hover:bg-color5 rounded p-2"
          >
            <FaUserTie size={24} />
            {!isSidebarCollapsed && (
              <span className="ml-3 text-md font-medium">Pilots</span>
            )}
          </Link>
          <Link
            to="tasks"
            className="flex items-center text-white hover:bg-color5 rounded p-2"
          >
            <FaTasks size={24} />
            {!isSidebarCollapsed && (
              <span className="ml-3 text-md font-medium">Tasks</span>
            )}
          </Link>
          <Link
            to="drone-spraying-services"
            className="flex items-center text-white hover:bg-color5 rounded p-2"
          >
            <FaPlane size={24} />
            {!isSidebarCollapsed && (
              <span className="ml-3 text-md font-medium">Spraying Services</span>
            )}
          </Link>
          <Link
            to="drone-parts"
            className="flex items-center text-white hover:bg-color5 rounded p-2"
          >
            <FaCogs size={24} />
            {!isSidebarCollapsed && (
              <span className="ml-3 text-md font-medium">Drone Parts</span>
            )}
          </Link>
          <Link
            to="drone-parts-order"
            className="flex items-center text-white hover:bg-color5 rounded p-2"
          >
            <FaBoxOpen size={24} />
            {!isSidebarCollapsed && (
              <span className="ml-3 text-md font-medium">Parts Orders</span>
            )}
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center text-white bg-red-600 hover:bg-red-500 rounded p-2 mt-auto"
          >
            <FaSignOutAlt size={24} />
            {!isSidebarCollapsed && (
              <span className="ml-3 text-md font-medium">Logout</span>
            )}
          </button>
        </nav>
      </div>

      {/* Main Content Area */}
      <div
        className={`flex-1 ${
          isSidebarCollapsed ? 'ml-20' : 'ml-64'
        } transition-margin duration-300`}
      >
        <div className="p-4">
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route
                path="/"
                element={
                  <div className="flex flex-wrap items-center justify-center pt-28 gap-6">
                    <div className="bg-blue-800 text-blue-100 w-64 p-4 shadow rounded text-center">
                      <h2 className="text-xl font-bold mb-2">Requests</h2>
                      <p className="text-3xl font-semibold">{requestCount}</p>
                    </div>
                    <div className="bg-teal-800 text-teal-100 w-64 p-4 shadow rounded text-center">
                      <h2 className="text-xl font-bold mb-2">Pilots</h2>
                      <p className="text-3xl font-semibold">{pilotCount}</p>
                    </div>
                    <div className="bg-green-800 text-green-100 w-64 p-4 shadow rounded text-center">
                      <h2 className="text-xl font-bold mb-2">Tasks</h2>
                      <p className="text-3xl font-semibold">{taskCount}</p>
                    </div>
                    <div className="bg-purple-800 text-purple-100 w-64 p-4 shadow rounded text-center">
                      <h2 className="text-xl font-bold mb-2">Services</h2>
                      <p className="text-3xl font-semibold">{serviceCount}</p>
                    </div>
                    <div className="bg-orange-800 text-orange-100 w-64 p-4 shadow rounded text-center">
                      <h2 className="text-xl font-bold mb-2">Drone Parts</h2>
                      <p className="text-3xl font-semibold">{partCount}</p>
                    </div>
                  </div>
                }
              />
              <Route path="requests" element={<Requests />} />
              <Route path="pilots" element={<Pilots />} />
              <Route path="tasks" element={<Tasks />} />
              <Route path="drone-parts" element={<DroneParts />} />
              <Route
                path="drone-spraying-services"
                element={<DroneSprayingServices />}
              />
              <Route
                path="drone-parts-order"
                element={<DronePartsOrders />}
              />
              <Route path="/pilots/*" element={<Pilots />} />
            </Routes>
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
