import React from 'react';
import img1 from '../Images/b14.jpg';
import { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BASE_URL } from '../config';

const Booknow = () => {

  const [formData, setFormData] = useState({
    customer_name: '',
    email: '',
    phone: '',
    service_type: '',
    drone_model: '',
    pilot_id: '',
    booking_date: '',
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
        customer_name: '',
        email: '',
        phone: '',
        service_type: '',
        drone_model: '',
        pilot_id: '',
        booking_date: '',
        location: ''
      });
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to book.');
    }
  };
  return (
    <div className='bg-color1' >
      <ToastContainer />
      <div className='flex gap-10 h-screen'>
        <div className='pl-10 pt-7'>
          <div className='bg-black bg-opacity-60 p-2  shadow-lg '>
            <form className=' pl-2 pt-2 md:pl-2 text-white text-xl' onSubmit={handleBooknow}>
              <div className='pt-2 flex flex-wrap space-y-2 md:space-y-0 md:space-x-2'>
                <div className='flex-1'>
                  <label className='block mb-2'> Name</label>
                  <input
                    type='text'
                    placeholder='Enter Your Name'
                    name='customer_name'
                    className='w-full text-black  h-10 rounded px-2'
                    value={formData.customer_name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className='flex-1'>
                  <label className='block mb-2'>Email</label>
                  <input
                    type='email'
                    placeholder='Enter Your Email'
                    name='email'
                    className='w-full h-10 text-black rounded px-2'
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
                    name='phone'
                    className='w-full h-10  text-black  rounded px-2'
                    value={formData.phone}
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
                    className='w-full h-10  text-black  rounded px-2'
                    value={formData.location}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className='pt-4 flex flex-wrap space-y-4 md:space-y-0 md:space-x-4'>
                <div className='flex-1'>
                  <label className='block text-white mb-2'>Service-Type</label>
                  <select className='w-full text-black h-10 rounded px-2' name='service_type' value={formData.service_type} onChange={handleChange} required >
                    <option >spraying</option>
                    <option>inspection</option>
                  </select>
                </div>
                <div className='flex-1'>
                  <label className='block mb-2'>Booking Date</label>
                  <input
                    type='date'
                    name='booking_date'
                    className='w-full h-10 text-black rounded px-2'
                    value={formData.booking_date}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className='pt-4 flex flex-wrap space-y-4 md:space-y-0 md:space-x-4'>
                <div className='flex-1'>
                  <label className='block text-white mb-2'>Drone-Model</label>
                  <select className='w-full text-black h-10 rounded px-2' name='drone_model' value={formData.drone_model} onChange={handleChange} required >
                    <option >Quadcopter</option>
                    <option>Hexacopter</option>
                  </select>
                </div>
              </div>
              <div className='pt-7 pb-7'>
                <button className='bg-color5 hover:bg-color4 text-white font-bold  px-6 py-2 rounded ml-40 text-xl'>Book Now</button>
              </div>
            </form>
          </div>
        </div>

        <div className="w-full md:w-1/2 flex items-center">
          <div>
            <h2 className="text-3xl text-color5 font-semibold mb-4">Welcome to Our Drone Booking Service</h2>
            <p className="mb-4">
              We provide high-quality drone services for various needs including agricultural spraying, inspection, and more.
              Our experienced pilots and state-of-the-art drones ensure that you receive the best service possible.
            </p>
            <p className="mb-4">
              To book a service, please fill out the form on the left. Select the drone, pilot, and specify the service type and location.
            </p>
            <p>
              If you have any questions, feel free to contact us at support@example.com or call us at 123-456-7890.
            </p>
          </div>
        </div>
      </div>
    </div>

  )
}

export default Booknow
