import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import img1 from '../Images/c14.jpg';
import img2 from '../Images/c15.jpg';
import img3 from '../Images/c7.jpg';
import img4 from '../Images/c9.jpg';
import img5 from '../Images/c10.jpg';
import img22 from '../Images/c16.jpg';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BASE_URL } from '../config';

const Contact = () => {

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    detailsfor: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(`${BASE_URL}addrequest`, formData);
      console.log('Success:', response.data);

      toast.success('Request sent successfully!');

      // Reset form fields
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: '',
        detailsfor: '',
      });
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to send request.');
    }
  };

  const cards = [
    {
      img: img3,
      name: 'AGRIVIMAAN Email',
      desc: "info@agrivimaan.com"

    },
    {
      img: img4,
      name: 'AGRIVIMAAN Phone',
      desc: '+91 853 546 0665, +91 741 137 7836,'

    },
    {
      img: img5,
      name: 'AGRIVIMAAN Office Location',
      desc: 'Adarsha colony, Sindhanur 584 128'

    }
  ]
  return (
    <div>
      <ToastContainer />
      <div style={{ backgroundImage: `url(${img1})` }} className='md:h-96 bg-no-repeat md:bg-cover h-32 '>

      </div>

      <div className='bg-color2 h-auto pb-14'>
        <h1 className='text-center text-white text-xl pt-4'>CONTACT US</h1>
        <h1 className='text-center text-white text-3xl pt-4'>AGRIVIMAAN Contact</h1>
        <div className=' flex flex-col md:flex-row gap-20  pl-28 pt-14'>
          {cards.map((card) => (
            <div className=' relative w-52 h-52 md:w-72 md:h-52 bg-color4'>
              <img src={card.img} className='rounded-full absolute -top-7 -left-14 h-20 w-20 rounded-full object-cover ' />
              <h1 className='text-black text-center text-xl pt-14'>{card.name}</h1>
              <p className='text-black text-center text-sm pt-4'>{card.desc}</p>
            </div>
          ))}
        </div>

      </div>

      <div className=' flex flex-col md:flex-row bg-color4 h-auto pb-7'>

        <div className='w-1/2  pl-4 md:pl-14 pt-14'>
          <h1 className=' pl-4  text-sm md:text-xl text-color1'>Let’s Connect</h1>
          <h1 className='pl-4 text-xl md:text-3xl text-color1 pt-4'>Get in touch ...</h1>
          <form className='pt-7' onSubmit={handleSubmit}>
            <div className=''>
              <input type='text' placeholder='Enter Your Name' name='name' className=' w-52 md:w-80 h-10 rounded ml-4 ' value={formData.name} onChange={handleChange} required />
            </div>
            <div className='pt-4'>
              <input type='text' placeholder='Enter Your Email' name='email' className=' w-52 md:w-80 h-10 rounded ml-4 ' value={formData.email} onChange={handleChange} required />
            </div>
            <div className='pt-4'>
              <input type='text' placeholder='Enter Your Phone No' name='phone' className=' w-52 md:w-80 h-10 rounded ml-4' value={formData.phone} onChange={handleChange} required />
            </div>
            <div className='pt-4 '>
              <textarea type='text' className=' w-52 md:w-80 h-14 rounded ml-4 ' name='message' value={formData.message} onChange={handleChange} />
            </div>
            <div className='pt-4'>
              <label className='pl-4  md:pb-0 pb-4 text-black'>Require details for</label>
              <select className='ml-4' name='detailsfor' value={formData.detailsfor} onChange={handleChange} required>
                <option>Drone Spray</option>
                <option>Purchase a Drone</option>
                <option>Become a Drone Partner</option>
                <option>Others</option>
              </select>
            </div>
            <div className='pt-7 '>
              <button className='bg-lime-500 hover:bg-lime-700 text-white font-bold  px-6 py-2 rounded ml-4 text-xl'>Submit</button>
            </div>
          </form>

        </div>

        <div className=' w-1/2'>
          <img src={img2} className='w-96 h-64 mt-14 ml-14' />
          <img src={img22} className='w-96 h-64  ml-14' />
        </div>
      </div>
    </div>
  )
}

export default Contact
