import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BASE_URL } from '../config';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaEdit, FaTrash } from 'react-icons/fa';

const Pilots = () => {
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control the modal
  const [isEditing, setIsEditing] = useState(false); // State to track if editing
  const [currentPilotId, setCurrentPilotId] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [pilotDetails, setPilotDetails] = useState({
    pilot_name: '',
    license_number: '',
    experience_level: 'beginner',
    contact_number: '',
    email: '',
    status: 'active',
    photo: ''
  });

  const [allPilots, setAllPilots] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  useEffect(() => {
    fetchPilots(); // Fetch all pilots when component loads
  }, []);

  const fetchPilots = async () => {
    try {
      const response = await axios.get(`${BASE_URL}getpilots`);
      setAllPilots(response.data);
    } catch (error) {
      toast.error('Failed to fetch pilots');
    }
  };
  const handleChange = (e) => {
    setPilotDetails({ ...pilotDetails, [e.target.name]: e.target.value });
  };
  const validateInputs = () => {
    const licenseNumberPattern = /^LIC\d{6}$/;
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const phoneNumberPattern = /^\d{10}$/;

    if (!licenseNumberPattern.test(pilotDetails.license_number)) {
      toast.error('License number must be in the form LIC123456');
      return false;
    }
    if (!emailPattern.test(pilotDetails.email)) {
      toast.error('Email must be in the form name@gmail.com');
      return false;
    }
    if (!phoneNumberPattern.test(pilotDetails.contact_number)) {
      toast.error('Phone number must be 10 digits');
      return false;
    }
    return true;
  };
  const handlePhotoChange = (e) => {
    setPhoto(e.target.files[0]);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateInputs()) return;

    const formData = new FormData();
    formData.append('pilot_name', pilotDetails.pilot_name);
    formData.append('license_number', pilotDetails.license_number);
    formData.append('experience_level', pilotDetails.experience_level);
    formData.append('contact_number', pilotDetails.contact_number);
    formData.append('email', pilotDetails.email);
    formData.append('status', pilotDetails.status);
    formData.append('photo', photo); // Append the photo

    try {
      if (isEditing) {
        await axios.put(`${BASE_URL}updatepilot/${currentPilotId}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        toast.success('Pilot details updated');
      } else {
        await axios.post(`${BASE_URL}add_pilot`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        toast.success('New Pilot Added');
      }
      setPilotDetails({
        pilot_name: '',
        license_number: '',
        experience_level: 'beginner',
        contact_number: '',
        email: '',
        status: 'active',
      });
      setIsModalOpen(false); // Close the modal after successful submission
      setIsEditing(false);
      fetchPilots(); // Refresh pilot list after adding a new one
    } catch (error) {
      if (error.response?.status === 400) {
        toast.error(error.response.data.message || 'Pilot with this license number already exists');
      } else {
        toast.error('Something went wrong');
      }
    }
  };

  const handleEdit = (pilot) => {
    setPilotDetails({
      pilot_name: pilot.pilot_name,
      license_number: pilot.license_number,
      experience_level: pilot.experience_level,
      contact_number: pilot.contact_number,
      email: pilot.email,
      status: pilot.status,
    });
    setCurrentPilotId(pilot.id);
    setIsEditing(true);
    setIsModalOpen(true);
  };
  // Delete pilot
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this pilot?")) {
      try {
        await axios.delete(`${BASE_URL}deletepilot/${id}`);
        toast.success("Pilot deleted successfully");
        fetchPilots(); // Refresh the list of pilots after deletion
      } catch (error) {
        toast.error("Failed to delete pilot");
      }
    }
  };
  // Filter pilots based on search query
  const filteredPilots = allPilots.filter((pilot) =>
    pilot.pilot_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    pilot.license_number.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className=' min-h-screen'>
      <div className="p-4">
        <ToastContainer />
        <h1 className='text-center text-2xl mt-2 mb-7 font-bold text-white bg-teal-600 p-4'>Explore the Credentials of Our Skilled Pilots</h1>
        <div className='flex gap-10 justify-center'>
          <input type='text' className='w-96 border h-10 p-4 rounded' placeholder="Search pilot by name or license number" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />

          {/* Button to open the modal */}
          <button
            onClick={() => {
              setPilotDetails({
                pilot_name: '',
                license_number: '',
                experience_level: 'beginner',
                contact_number: '',
                email: '',
                status: 'active',
              });
              setIsEditing(false); //  it's set to false for adding new pilot
              setIsModalOpen(true);
            }}
            className="bg-teal-500 text-white px-4 py-2 rounded hover:bg-teal-800"
          >
            Add New Pilot
          </button>
        </div>

        {/* Modal Popup Form */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-4 border border-gray-300 w-96 rounded-lg shadow-md relative">
              <button
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                onClick={() => setIsModalOpen(false)}
              >
                X
              </button>
              <form onSubmit={handleSubmit} className="mb-4">
                <h2 className="text-xl font-bold mb-4">
                  {isEditing ? 'Update Pilot Details' : 'Add New Pilot'}
                </h2>
                <input
                  type="text"
                  name="pilot_name"
                  placeholder="Pilot Name"
                  className="p-2 border border-gray-300 rounded mb-2 w-full"
                  value={pilotDetails.pilot_name}
                  onChange={handleChange}
                  required
                />
                <input
                  type="text"
                  name="license_number"
                  placeholder="License Number"
                  className="p-2 border border-gray-300 rounded mb-2 w-full"
                  value={pilotDetails.license_number}
                  onChange={handleChange}
                  required
                />
                <select
                  name="experience_level"
                  className="p-2 border border-gray-300 rounded mb-2 w-full"
                  value={pilotDetails.experience_level}
                  onChange={handleChange}
                  required
                >
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="expert">Expert</option>
                </select>
                <input
                  type="text"
                  name="contact_number"
                  placeholder="Contact Number"
                  className="p-2 border border-gray-300 rounded mb-2 w-full"
                  value={pilotDetails.contact_number}
                  onChange={handleChange}
                  required
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  className="p-2 border border-gray-300 rounded mb-2 w-full"
                  value={pilotDetails.email}
                  onChange={handleChange}
                  required
                />
                <select
                  name="status"
                  className="p-2 border border-gray-300 rounded mb-2 w-full"
                  value={pilotDetails.status}
                  onChange={handleChange}
                  required
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
                <div className="mb-4">
                  <label htmlFor="photo" className="block text-gray-700 mb-2">Pilot Photo</label>
                  <input
                    type="file"
                    id="photo"
                    name="photo"
                    onChange={handlePhotoChange}
                    className="p-2 border border-gray-300 rounded w-full"
                  />
                </div>

                <button
                  type="submit"
                  className={`text-white px-4 py-2 rounded ${isEditing ? 'bg-blue-500 hover:bg-blue-600' : 'bg-green-500 hover:bg-green-600'
                    }`}
                >
                  {isEditing ? 'Update Pilot' : 'Add Pilot'}
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Table to display all pilot details */}
        <div className="mt-8">
          <table className="w-full bg-color1 border border-gray-200">
            <thead>
              <tr className='bg-teal-800 text-white text-xl'>
                <th className='py-2 px-2 border-b border-r'>S.No</th>
                <th className='py-2 px-4 border-b border-r'>photo</th>
                <th className='py-2 px-4 border-b border-r'>Pilot Name</th>
                <th className='py-2 px-4 border-b border-r'>License Number</th>
                <th className='py-2 px-4 border-b border-r'>Experience Level</th>
                <th className='py-2 px-4 border-b border-r'>Phone NO</th>
                <th className='py-2 px-4 border-b border-r'>Email</th>
                <th className='py-2 px-4 border-b border-r'>Status</th>
                <th className='py-2 px-4 border-b border-r'>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredPilots.map((pilot, index) => (
                <tr key={index}>

                  <td className='py-2 px-4 border-b border-r'>{index + 1}</td>
                  <td className='py-2 px-2 border-b border-r'>
                    {pilot.photo && (
                      <img
                        src={`${BASE_URL}${pilot.photo}`}
                        alt={pilot.pilot_name}
                        className='w-52 h-30 rounded p-2 '
                      />
                    )}
                  </td>
                  <td className='py-2 px-4 border-b border-r'>{pilot.pilot_name}</td>
                  <td className='py-2 px-4 border-b border-r'>{pilot.license_number}</td>
                  <td className='py-2 px-4 border-b border-r'>{pilot.experience_level}</td>
                  <td className='py-2 px-4 border-b border-r'>{pilot.contact_number}</td>
                  <td className='py-2 px-4 border-b border-r'>{pilot.email}</td>
                  <td className='py-2 px-4 border-b border-r'>{pilot.status}</td>
                  <td className='py-2 px-4 border-b border-r '>
                    <button onClick={() => handleEdit(pilot)} className='text-blue-500 hover:text-blue-700 '>
                      <FaEdit />
                    </button>
                    <button onClick={() => handleDelete(pilot.id)} className='text-red-500 hover:text-red-700 pl-4'>
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

}

export default Pilots
