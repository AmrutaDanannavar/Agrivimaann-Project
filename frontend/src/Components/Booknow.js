import React from 'react';
import img1 from '../Images/b14.jpg';
import { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BASE_URL } from '../config';

const Booknow = () => {

  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone_number: '',
    drone_model: '',
    booking_date: '',
    booking_time: '',
    duration: '',
    location: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };


  const handleBooknow = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(`${BASE_URL}booknow`, formData);
      console.log('Success:', response.data);

      toast.success('booking  successful');

      // Reset form fields
      setFormData({
        full_name: '',
        email: '',
        phone_number: '',
        drone_model: '',
        booking_date: '',
        booking_time: '',
        duration: '',
        location: ''
      });
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to book.');
    }
  };
  return (
    <div>
      <ToastContainer />
      <div style={{ backgroundImage: `url(${img1})` }} className='md:h-screen  bg-cover bg-no-repeat '>
        <div className='mx-auto pl-10 pt-7'>
          <div className='bg-color1 bg-opacity-70 p-4 rounded-lg shadow-lg w-full max-w-lg'>
            <form className=' pl-4 pt-4 md:pl-2 text-white text-xl' onSubmit={handleBooknow}>
              <div className='pt-4 flex flex-wrap space-y-4 md:space-y-0 md:space-x-4'>
                <div className='flex-1'>
                  <label className='block mb-2'>Full Name</label>
                  <input
                    type='text'
                    placeholder='Enter Your Name'
                    name='full_name'
                    className='w-full h-10 rounded px-3'
                    value={formData.full_name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className='flex-1'>
                  <label className='block mb-2'>Email</label>
                  <input
                    type='text'
                    placeholder='Enter Your Email'
                    name='email'
                    className='w-full h-10 rounded px-3'
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className='pt-4 flex flex-wrap space-y-4 md:space-y-0 md:space-x-4'>
                <div className='flex-1'>
                  <label className='block mb-2'>Phone Number</label>
                  <input
                    type='text'
                    placeholder='Enter Your Phone No'
                    name='phone_number'
                    className='w-full h-10 rounded px-3'
                    value={formData.phone_number}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className='flex-1'>
                  <label className='block mb-2'>Location</label>
                  <input
                    type='text'
                    placeholder='Enter Location'
                    name='location'
                    className='w-full h-10 rounded px-3'
                    value={formData.location}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className='pt-4 flex flex-wrap space-y-4 md:space-y-0 md:space-x-4'>
                <div className='flex-1'>
                  <label className='block text-white mb-2'>Drone Model</label>
                  <select className='w-full text-black h-10 rounded px-3' name='drone_model' value={formData.drone_model} onChange={handleChange} required >
                    <option >11L-Quad</option>
                    <option>11L-Hexa</option>
                  </select>
                </div>
                <div className='flex-1'>
                  <label className='block mb-2'>Booking Date</label>
                  <input
                    type='date'
                    name='booking_date'
                    className='w-full h-10 text-black rounded px-3'
                    value={formData.booking_date}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className='pt-4 flex flex-wrap space-y-4 md:space-y-0 md:space-x-4'>
                <div className='flex-1'>
                  <label className='block text-white mb-2'>Booking Time</label>
                  <input
                    type='time'
                    name='booking_time'
                    className='w-full text-black h-10 rounded px-3'
                    value={formData.booking_time}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className='flex-1'>
                  <label className='block mb-2'>Duration (hours)</label>
                  <input
                    type='number'
                    placeholder='Enter duration'
                    name='duration'
                    className='w-full text-black h-10 rounded px-3'
                    value={formData.duration}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className='pt-7 pb-7'>
                <button className='bg-lime-500 hover:bg-lime-700 text-white font-bold  px-6 py-2 rounded ml-40 text-xl'>Booknow</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Booknow
