import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BASE_URL } from '../config';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { format } from 'date-fns';

const DronePartsOrders = () => {

  const formatDateTime = (dateString) => {
    return format(new Date(dateString), 'MMMM d, yyyy h:mm a');
  };

  const [orders,setOrders] = useState([])
  useEffect(() => {
    fetchOrders(); // Fetch orders when component loads
}, []);

  const fetchOrders = async () => {
    try {
        const response = await axios.get(`${BASE_URL}getorders`);
        setOrders(response.data);
    } catch (error) {
        toast.error('Failed to fetch orders');
    }
};
  return (
    <div>
     
    <div className="container mx-auto p-4">
        <ToastContainer />

        {/* Orders Table */}
        <div className="">
            <h2 className="text-3xl text-center text-white bg-blue-900 font-bold mb-4">Order Details</h2>
            <table className="w-full mt-14 border border-gray-200">
                <thead>
                    <tr className='bg-blue-900 text-white text-xl'>
                        <th className='py-2 px-2 border-b border-r'>Sno</th>
                        <th className='py-2 px-2 border-b border-r'>Order ID</th>
                        <th className='py-2 px-2 border-b border-r'>Part Name</th>
                        <th className='py-2 px-2 border-b border-r'>Quantity</th>
                        <th className='py-2 px-2 border-b border-r'>Total Price</th>
                        <th className='py-2 px-2 border-b border-r'>Customer Name</th>
                        <th className='py-2 px-2 border-b border-r'>Order Date</th>
                        <th className='py-2 px-2 border-b border-r'>Shipping Date</th>
                        <th className='py-2 px-2 border-b border-r'>Customer Address</th>
                        <th className='py-2 px-2 border-b border-r'>Contact Number</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order,index) => (
                        <tr key={order.order_id}>
                            <td className='py-2 px-4 border-b border-r'>{index+1}</td>
                            <td className='py-2 px-4 border-b border-r'>{order.order_id}</td>
                            <td className='py-2 px-4 border-b border-r'>{order.part_name}</td>
                            <td className='py-2 px-4 border-b border-r'>{order.quantity}</td>
                            <td className='py-2 px-4 border-b border-r'>Rs.{order.price}</td>
                            <td className='py-2 px-4 border-b border-r'>{order.customer_name}</td>
                            <td className='py-2 px-4 border-b border-r'>{formatDateTime(order.order_date)}</td>
                            <td className='py-2 px-4 border-b border-r'>{formatDateTime(order.shipping_date)}</td>
                            <td className='py-2 px-4 border-b border-r'>{order.customer_address}</td>
                            <td className='py-2 px-4 border-b border-r'>{order.contact_number}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
    </div>
  )
}

export default DronePartsOrders
