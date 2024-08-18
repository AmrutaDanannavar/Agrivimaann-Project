import React from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import img1 from '../Images/al1.jpg';
import  { useState } from 'react';

const AdminLogin = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Hardcoded credentials
    const adminUsername = 'AmrutaD';
    const adminPassword = 'Amruta@123';

    if (username === adminUsername && password === adminPassword) {
        onLogin(true); // Successfully logged in
        toast.success('Successfully logged in!');
      } else {
        setError('Invalid username or password');
        toast.error('Invalid username or password');
      }

  };
  return (
    <div>
      <div  style={{ backgroundImage: `url(${img1})` }} className='h-[100vh] bg-color5 bg-cover bg-no-repeat '>
        <div className='flex justify-end '>
            <div className='bg-color4 bg-opacity-50 mt-28 mr-56 rounded-lg shadow-lg  h-72 w-full max-w-lg'>
                <form className='p-14'onSubmit={handleSubmit} >
                    <div className='p-4 text-xl text-black'>
                        <label>UserName</label>
                        <input type='text' className='w-64 h-10 ml-4 text-black  border border-gray-300 rounded' value={username}  onChange={(e) => setUsername(e.target.value)} required />
                    </div>
                    <div className='p-4 text-xl text-black'>
                        <label>Password</label>
                        <input type='password'className='w-64 h-10 text-black  ml-5 border border-gray-300 rounded'value={password}  onChange={(e) => setPassword(e.target.value)} required />
                    </div>
                    <button type='submit' className='bg-color5 hover:color1 text-white font-bold  px-8 py-2 rounded ml-40 text-xl mt-4'>Login</button>
                </form>

            </div>

        </div>

      </div>
      <ToastContainer />
    </div>
  )
}

export default AdminLogin
