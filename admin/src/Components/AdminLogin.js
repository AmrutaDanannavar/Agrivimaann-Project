import React from 'react';
import img1 from '../Images/logo.png';
import img2 from '../Images/a1.jpg';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../config';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const AdminLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        
        try {

            const payload = { email, password };
            const response = await axios.post(`${BASE_URL}adminlogin`, payload);
            payload.password = '';

            if (response.data.user_token) {
                // Save the token to localStorage or state management
                localStorage.setItem('user_token', response.data.user_token);
                localStorage.setItem('username', response.data.username);
                localStorage.setItem('image', response.data.image);

                // Redirect to dashboard
                toast.success("login successful")
                setTimeout(() => {
                    navigate('/dashboard');
                }, 3000);
                
            } else {
                toast.error('Login failed. Please try again.');
            }
        } catch (error) {
            toast.error('Login failed. Please check your email and password.');
        }
    };


    return (
        <div>
            <ToastContainer />
            <div className='flex gap-20'>
                <div className='w-1/2'>
                    <div className=' flex gap-5 items-center bg-white h-20'>
                        <img src={img1} className='h-14  ml-4' />
                        <h1 className=' text-color5 text-2xl font-bold'>AGRIVIMAANN</h1>
                    </div>
                    <div className=' p-14 h-screen '>
                        <div className="w-96 bg-white h-96  rounded-lg shadow-lg">
                            <h1 className='text-2xl font-bold text-color5 text-center mb-6'>Admin Login</h1>
                            <form onSubmit={handleLogin}>
                                <div className='pl-14 pt-4'>
                                <div className=" relative mb-6">
                                    <label className=" absolute -top-3 left-4 bg-white px-1 text-gray-500"
                                    >  E-mail </label>
                                    <input  type="email" placeholder="Enter Email" className="w-72 p-3 pl-4 border border-gray-300  focus:outline-none focus:ring-2 focus:ring-blue-500"
                                     value={email}
                                     onChange={(e) => setEmail(e.target.value)}
                                     required
                                    />
                                </div>
                                <div className=" relative mb-6">
                                    <label className=" absolute -top-3 left-4 bg-white px-1 text-gray-500"
                                    >  Password</label>
                                    <input  type="password" placeholder="Enter Password" className="w-72 p-3 pl-4 border border-gray-300  focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    />
                                </div>
                                <div className=''>
                                    <button type='submit' className='w-72 p-3 pl-4 border border-gray-300  text-white text-xl font-bold bg-color5 hover:bg-color4'>Login</button>
                                </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <div className=''>
                    <img src={img2} />
                </div>


            </div>

        </div>
    )
}

export default AdminLogin
