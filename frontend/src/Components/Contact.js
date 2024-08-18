import React from 'react';
import { useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import axios from 'axios';
import img1 from '../Images/cu2.jpg';
import img2 from '../Images/n2.jpg';
import img3 from '../Images/e1.jpg';
import img4 from '../Images/lo1.jpg';
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

  const [captchaToken, setCaptchaToken] = useState(null);
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleCaptcha = (value) => {
    setCaptchaToken(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (!captchaToken) {
        toast.error('CAPTCHA validation failed');
        return;
    }

    try {
        const response = await axios.post(`${BASE_URL}addrequest`, {
            ...formData
        });
        console.log('Success:', response.data);
        toast.success('Request sent successfully!');
        setFormData({
            name: '',
            email: '',
            phone: '',
            message: '',
            detailsfor: '',
        });
        setCaptchaToken(null);  // Reset the CAPTCHA token
    } catch (error) {
        console.error('Error:', error);
        toast.error(error.response?.data?.message || 'Failed to send request.');
    }
};


  return (
    <div>
      <ToastContainer />
      <div style={{ backgroundImage: `url(${img1})` }} className='md:h-96 bg-no-repeat md:bg-cover h-32 '>

      </div>



      <div className=' flex flex-col md:flex-row bg-color2 h-auto pb-7'>

        <div className='w-1/2  pl-4 md:pl-14 pt-14'>
          <h1 className=' pl-4  text-sm md:text-xl text-black'>Let’s Connect</h1>
          <h1 className='pl-4 text-xl md:text-3xl text-black pt-4'>Get in touch ...</h1>
          <form className='pt-7' onSubmit={handleSubmit}>
            <div className=''>
              <input type='text' placeholder='Enter Your Name' name='name' className=' w-52 md:w-80 h-10 rounded ml-4 ' value={formData.name} onChange={handleChange} required />
            </div>
            <div className='pt-4'>
              <input type='email' placeholder='Enter Your Email' name='email' className=' w-52 md:w-80 h-10 rounded ml-4 ' value={formData.email} onChange={handleChange}  required pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" title='Enter a valid email' />
            </div>
            <div className='pt-4'>
              <input type='text' placeholder='Enter Your Phone No' name='phone' className=' w-52 md:w-80 h-10 rounded ml-4' value={formData.phone} onChange={handleChange}   pattern="[0-9]{10}"
              title="Please enter a valid 10-digit phone number"required />
            </div>
            <div className='pt-4 '>
              <textarea type='text' className=' w-52 md:w-80 h-14 rounded ml-4 ' name='message' value={formData.message} onChange={handleChange} />
            </div>
            <div className='pt-4'>
              <label className='pl-4  md:pb-0 pb-4 text-black'>Require details for</label>
              <select className='w-43 ml-1 rounded h-10' name='detailsfor' value={formData.detailsfor} onChange={handleChange} required>
                <option>Drone Spray</option>
                <option>Purchase a Drone</option>
                <option>Become a Drone Partner</option>
                <option>Others</option>
              </select>
            </div>
            <ReCAPTCHA className=' w-52 md:w-80 h-10 rounded ml-4 rounded pt-4 '
              
              sitekey="6Lf7CCMqAAAAAEMxIczP1vlHXNlCBVQ8ARzK9hxM" 
              onChange={handleCaptcha}
            />
            <div className='pt-20 '>
              <button className='bg-color5 hover:bg-color4 text-white font-bold  px-6 py-2 rounded ml-4 text-xl'>Submit</button>
            </div>
          </form>

        </div>

        <div className=' w-1/2'>
          <div className='bg-color5 bg-opacity-30 h-96 mt-14 rounded-lg shadow-lg w-full max-w-lg'>
            <h1 className='text-center text-black text-2xl pt-7'>Contact Details</h1>
            <div className='flex flex-row pt-14 pl-14 '>
              <img src={img2} className='h-10 w-10  ' />
              <h1 className='text-xl pl-7 '>+91 853 546 0665,</h1>
              <h1 className='text-xl pl-4 '>+91 789 999 1769</h1>
            </div>
            <div className='flex flex-row pt-7 pl-14 '>
              <img src={img3} className='h-10 w-10  ' />
              <h1 className='text-xl pl-7 '>info@agrivimaan.com</h1>
            </div>
            <div className='flex flex-row pt-7 pl-14 '>
              <img src={img4} className='h-10 w-10  ' />
              <h1 className='text-xl pl-7 '>Adarsha colony, Sindhanur 584 128</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact
