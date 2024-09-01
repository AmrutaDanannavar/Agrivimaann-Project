import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BASE_URL } from '../config';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { format } from 'date-fns';

const DronePartsOrders = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const formatDateTime = (dateString) => {
    return format(new Date(dateString), 'MMMM d, yyyy h:mm a');
  };

  useEffect(() => {
    fetchOrders(); 
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get(`${BASE_URL}getorders`);
      const data = Array.isArray(response.data) ? response.data : [];
      setOrders(data);
    } catch (error) {
      toast.error('Failed to fetch orders');
    }
  };

  const showOrderDetails = (order) => {
    setSelectedOrder(order);
  };

  const closeOrderDetails = () => {
    setSelectedOrder(null);
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await axios.put(`${BASE_URL}updateorderstatus/${orderId}`, {
        status: newStatus 
      });
      toast.success('Order status updated successfully');
      fetchOrders(); 
    } catch (error) {
      toast.error('Failed to update order status');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <ToastContainer />
      
      <h2 className="text-3xl text-center p-4 text-white bg-blue-900 font-bold mb-4">Order Details</h2>

      {!selectedOrder ? (
        <table className="w-full mt-14 border border-gray-200">
          <thead>
            <tr className='bg-blue-900 text-white text-xl'>
              <th className='py-2 px-2 border-b border-r'>Sno</th>
              <th className='py-2 px-2 border-b border-r'>Part Name</th>
              <th className='py-2 px-2 border-b border-r'>Customer Name</th>
              <th className='py-2 px-2 border-b border-r'>Status</th>
              <th className='py-2 px-2 border-b border-r'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr key={order.order_id}>
                <td className='py-2 px-4 border-b border-r'>{index + 1}</td>
                <td className='py-2 px-4 border-b border-r'>{order.part_name}</td>
                <td className='py-2 px-4 border-b border-r'>{order.customer_name}</td>
                <td className='py-2 px-4 border-b border-r'>
                  <select
                    value={order.status}
                    onChange={(e) => handleStatusChange(order.order_id, e.target.value)}
                    className="p-2 border rounded"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Delivered">Delivered</option>
                  </select>
                </td>
                <td className='py-2 px-4 border-b border-r'>
                  <button 
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                    onClick={() => showOrderDetails(order)}
                  >
                    Show Order Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg relative w-96 max-w-4xl">
            <button
              onClick={closeOrderDetails}
              className="absolute top-2 right-2 text-red-500 hover:text-red-700"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <h3 className="text-2xl font-bold mb-4">Order Details</h3>
            <p><strong>Customer Name:</strong> {selectedOrder.customer_name}</p>
            <p><strong>Customer Address:</strong> {selectedOrder.customer_address}</p>
            <p><strong>Total Price:</strong> Rs.{selectedOrder.price}</p>
            <p><strong>Contact Number:</strong> {selectedOrder.contact_number}</p>
            <p><strong>Order Date:</strong> {formatDateTime(selectedOrder.order_date)}</p>
            <p><strong>Order ID:</strong> {selectedOrder.order_id}</p>
            
          </div>
        </div>
      )}
    </div>
  );
};

export default DronePartsOrders;
