import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BASE_URL } from '../config';
import { toast, ToastContainer } from 'react-toastify';
import { FaEye, FaEdit, FaTrash, FaTimes } from 'react-icons/fa';

const DroneSprayingServices = () => {
  const [expandedServiceId, setExpandedServiceId] = useState(null);
  const [services, setServices] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentServiceId, setCurrentServiceId] = useState(null);
  const [serviceDetails, setServiceDetails] = useState({
    service_name: '',
    description: '',
    area_covered: '',
    price: '',
    filled_type: '',
    duration: '',
  });
  
  // State for search query
  const [searchQuery, setSearchQuery] = useState('');
  
  const [showDetails, setShowDetails] = useState(false);

  const handleChange = (e) => {
    setServiceDetails({ ...serviceDetails, [e.target.name]: e.target.value });
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isEditing) {
        await axios.put(`${BASE_URL}updateservice/${currentServiceId}`, serviceDetails);
        toast.success('Service details updated');
      } else {
        await axios.post(`${BASE_URL}add-services`, serviceDetails);
        toast.success('New Service Added');
      }
      setServiceDetails({
        service_name: '',
        description: '',
        area_covered: '',
        price: '',
        filled_type: '',
        duration: '',
      });
      setIsModalOpen(false);
      setIsEditing(false);
      fetchServices();
    } catch (error) {
      toast.error('Something went wrong');
    }
  };

  const handleEdit = (service) => {
    setServiceDetails(service);
    setCurrentServiceId(service.service_id);
    setIsEditing(true);
    setIsModalOpen(true);
  };

  const handleShowDetails = (serviceId) => {
    if (expandedServiceId === serviceId) {
      setExpandedServiceId(null);
      setShowDetails(false);
    } else {
      setExpandedServiceId(serviceId);
      setShowDetails(true);
    }
  };

  const fetchServices = async () => {
    try {
      const response = await axios.get(`${BASE_URL}getservices`);
      setServices(response.data);
    } catch (error) {
      toast.error('Failed to fetch services');
    }
  };

  const handleDelete = async (service_id) => {
    if (window.confirm('Are you sure you want to delete this service?')) {
      try {
        await axios.delete(`${BASE_URL}deleteservice/${service_id}`);
        toast.success('Service deleted successfully');
        fetchServices();
      } catch (error) {
        toast.error('Failed to delete service');
      }
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  // Filter services based on search query
  const filteredServices = services.filter((service) => 
    service.service_name.toLowerCase().includes(searchQuery) ||
    service.price.toString().includes(searchQuery) ||
    service.filled_type.toLowerCase().includes(searchQuery)
  );

  return (
    <div className='min-h-screen'>
      <ToastContainer />
      <h1 className='text-center text-3xl mt-2 mb-7 font-bold text-purple-600 p-4'>Innovative Drone Services for the Modern World</h1>
      {showDetails ? (
        <>
          {expandedServiceId && (
            <div className="relative bg-white p-4 border rounded-lg shadow-md mt-4 w-full max-w-lg mx-auto">
              {services
                .filter((service) => service.service_id === expandedServiceId)
                .map((service) => (
                  <div key={service.service_id}>
                    <button
                      className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                      onClick={() => setShowDetails(false)}
                    >
                      <FaTimes size={24} />
                    </button>
                    <h3 className="text-xl font-bold">{service.service_name}</h3>
                    <p className="text-gray-600 mt-2"><strong>Description:</strong> {service.description}</p>
                    <p className="text-lg font-semibold mt-2"><strong>Price:</strong> Rs.{service.price}/-</p>
                    <p className="mt-2"><strong>Filled Type:</strong> {service.filled_type}</p>
                    <p className="mt-2"><strong>Covered Area:</strong> {service.area_covered}</p>
                    <p className="mt-2"><strong>Duration:</strong> {service.duration}</p>
                  </div>
                ))}
            </div>
          )}
        </>
      ) : (
        <>
          <div className=" flex items-center justify-center gap-5 p-4">
            <input
              type="text"
              placeholder="Search by Name, Price, or Filled Type"
              value={searchQuery}
              onChange={handleSearchChange}
              className="p-2  border border-gray-300 rounded  w-full max-w-xs"
            />
            <button
              onClick={() => {
                setServiceDetails({
                  service_name: '',
                  description: '',
                  area_covered: '',
                  price: '',
                  filled_type: '',
                  duration: '',
                });
                setIsEditing(false);
                setIsModalOpen(true);
              }}
              className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-800"
            >
              Add New Service
            </button>
          </div>

          {/* Services Table */}
          <table className="w-full mt-4 border border-gray-200">
            <thead>
              <tr className='bg-purple-600 text-white text-xl'>
                <th className='py-2 px-2 border-b border-r'>S.No</th>
                <th className='py-2 px-2 border-b border-r'>Service Name</th>
                <th className='py-2 px-2 border-b border-r'>Filled Type</th>
                <th className='py-2 px-2 border-b border-r'>Price</th>
                <th className='py-2 px-2 border-b border-r'>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredServices.map((service, index) => (
                <tr key={service.service_id} className="text-center">
                  <td className='py-2 px-4 border-b border-r'>{index + 1}</td>
                  <td className="py-2 px-4 border-b border-r">{service.service_name}</td>
                  <td className="py-2 px-4 border-b border-r">{service.filled_type}</td>
                  <td className="py-2 px-4 border-b border-r">Rs.{service.price}/-</td>
                  <td className="py-3 px-4 border-b flex justify-center gap-4">
                    <FaEye
                      className="text-blue-500 cursor-pointer"
                      onClick={() => handleShowDetails(service.service_id)}
                    />
                    <FaEdit
                      className="text-green-500 cursor-pointer"
                      onClick={() => handleEdit(service)}
                    />
                    <FaTrash
                      className="text-red-500 cursor-pointer"
                      onClick={() => handleDelete(service.service_id)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-4 border border-gray-300 w-96 rounded-lg shadow-md relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              onClick={() => setIsModalOpen(false)}
            >
              X
            </button>
            <form onSubmit={handleSubmit}>
              <h2 className="text-xl font-bold mb-4">
                {isEditing ? 'Update Service Details' : 'Add New Service'}
              </h2>
              <input
                type="text"
                name="service_name"
                placeholder="Service Name"
                className="p-2 border border-gray-300 rounded mb-2 w-full"
                value={serviceDetails.service_name}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="description"
                placeholder="Description"
                className="p-2 border border-gray-300 rounded mb-2 w-full"
                value={serviceDetails.description}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="area_covered"
                placeholder="Covered Area"
                className="p-2 border border-gray-300 rounded mb-2 w-full"
                value={serviceDetails.area_covered}
                onChange={handleChange}
                required
              />
              <input
                type="number"
                name="price"
                placeholder="Price"
                className="p-2 border border-gray-300 rounded mb-2 w-full"
                value={serviceDetails.price}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="filled_type"
                placeholder="Filled Type"
                className="p-2 border border-gray-300 rounded mb-2 w-full"
                value={serviceDetails.filled_type}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="duration"
                placeholder="Duration"
                className="p-2 border border-gray-300 rounded mb-2 w-full"
                value={serviceDetails.duration}
                onChange={handleChange}
                required
              />
              <button
                type="submit"
                className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-800 w-full"
              >
                {isEditing ? 'Update Service' : 'Add Service'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default DroneSprayingServices;
