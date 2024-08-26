import {React,useEffect, useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../config';

const Requests = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    // Fetch requests from the API when the component mounts
    axios.get(`${BASE_URL}getrequests`)
      .then(response => {
        setRequests(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the requests!', error);
      });
  }, []);
  return (
    <div className=' min-h-screen'>
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
