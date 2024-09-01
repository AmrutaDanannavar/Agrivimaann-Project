import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../config'; 
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import img1 from '../Images/logo.png';
import img3 from '../Images/bg7.jpg';

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
                // Save the token and username to local storage
                localStorage.setItem('user_token', response.data.user_token);
                localStorage.setItem('username', response.data.username);

                // Redirect to dashboard
                toast.success("Login successful");
                setTimeout(() => {
                    navigate('/dashboard');
                }, 2000);
            } else {
                toast.error('Login failed. Please try again.');
            }
        } catch (error) {
            toast.error('Login failed. Please check your email and password.');
        }
    };

    return (
        <div style={{ backgroundImage: `url(${img3})` }} className='bg-no-repeat bg-cover h-auto'>
            <ToastContainer />
            <div className='flex gap-20'>
                <div className='w-full'>
                    <div className='flex gap-5 items-center justify-left h-20'>
                        <img src={img1} className='h-10 w-10 ml-4' alt="Logo" />
                        <h1 className='text-blue-900 text-2xl font-bold'>AGRIVIMAANN</h1>
                    </div>
                    <div className='p-14 h-screen'>
                        <div className="w-96 bg-white h-80 opacity-80 rounded-lg shadow-lg">
                            <h1 className='text-2xl font-bold text-black text-center pt-7 '>Admin Login</h1>
                            <form onSubmit={handleLogin}>
                                <div className='pl-14 pt-4'>
                                    <div className="relative mb-6">
                                        <label className="absolute -top-3 left-4 bg-white px-1 text-black">E-mail</label>
                                        <input
                                            type="email"
                                            placeholder="Enter Email"
                                            className="w-72 p-3 pl-4 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="relative mb-6">
                                        <label className="absolute -top-3 left-4 bg-white px-1 text-black">Password</label>
                                        <input
                                            type="password"
                                            placeholder="Enter Password"
                                            className="w-72 p-3 pl-4 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <button type='submit' className='w-72 p-3 pl-4 border border-gray-300 text-white text-xl font-bold bg-green-500 hover:bg-green-700'>Login</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminLogin;
