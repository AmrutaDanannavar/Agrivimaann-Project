import {React,useEffect, useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../config';
import { FaTrash } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate} from 'react-router-dom';

const Requests = () => {
  const [requests, setRequests] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('user_token');
    axios.get(`${BASE_URL}getrequests`, {
      headers: {
        Authorization: `Bearer ${token}` 
      }
    })
    .then(response => {
      setRequests(response.data);
    })
    .catch(error => {
      console.error('There was an error fetching the requests!', error);
      if (error.response && error.response.status === 401) {
        // Token expired or invalid
        toast.error('Session expired. Please log in again.');
        localStorage.removeItem('user_token'); 
        navigate('/'); // Redirect to login page
      } else {
        toast.error('Error fetching data.');
      }
    });
  }, [navigate]);

  const handleDelete = (id) => {
    axios.delete(`${BASE_URL}deleterequest/${id}`)
      .then(response => {
        // Update the state to remove the deleted request
        setRequests(requests.filter(request => request.id !== id));
        toast.success('Request deleted successfully');
      })
      .catch(error => {
        console.error('There was an error deleting the request!', error);
        toast.error('There was an error deleting the request');
      });
  };
  return (
    <div className=' min-h-screen'>
      <ToastContainer/>
      <div className='container mx-auto p-4'>
        <h1 className='text-2xl text-center font-bold mb-4'>All Requests</h1>
        {requests.length > 0 ? (
          <table className='w-full bg-color1 border border-gray-200'>
            <thead>
              <tr className='bg-black text-white text-xl'>
                <th className='py-2 px-4 border-b border-r'>S.No</th>
                <th className='py-2 px-4 border-b border-r'>Name</th>
                <th className='py-2 px-3 border-b border-r'>Email</th>
                <th className='py-2 px-4 border-b border-r'>Phone NO</th>
                <th className='py-2 px-4 border-b border-r'>Messages</th>
                <th className='py-2 px-4 border-b border-r'>DetailsFor</th>
                <th className='py-2 px-4 border-b border-r'>Actions</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((request, index) => (
                <tr key={index}>
                  <td className='py-2 px-4 border-b border-r'>{index+1}</td>
                  <td className='py-2 px-4 border-b border-r'>{request.name}</td>
                  <td className='py-2 px-4 border-b border-r'>{request.email}</td>
                  <td className='py-2 px-4 border-b border-r'>{request.phone}</td>
                  <td className='py-2 px-4 border-b border-r'>{request.message}</td>
                  <td className='py-2 px-4 border-b border-r'>{request.detailsfor}</td>
                  <td className='py-2 px-4 border-b border-r text-center'>
                    <button onClick={() => handleDelete(request.id)}>
                      <FaTrash className='text-red-600 hover:text-red-800 cursor-pointer' />
                    </button>
                  </td>
                  
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No requests found.</p>
        )}
      </div>
    </div>
  )
}

export default Requests
