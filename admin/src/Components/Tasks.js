import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BASE_URL } from '../config';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { format } from 'date-fns';



const Tasks = () => {
  const formatDateTime = (dateString) => {
    return format(new Date(dateString), 'MMMM d, yyyy h:mm a');
  };
  
  const [dueDate, setDueDate] = useState('');
  const [status, setStatus] = useState('Pending');
  const [pilots, setAllPilots] = useState([]);
  const [services, setService] = useState([]);
  const [selectedService, setSelectedService] = useState('');
  const [selectedPilot, setSelectedPilot] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchPilots();
    fetchServices();
    fetchTasks();
  }, []);

  const fetchPilots = async () => {
    try {
      const response = await axios.get(`${BASE_URL}getpilots`);
      if (response.status === 200) {
        setAllPilots(response.data);
      } else {
        toast.error('Failed to fetch pilots: Unexpected response');
      }
    } catch (error) {
      toast.error('Failed to fetch pilots');
    }
  };

  const fetchServices = async () => {
    try {
      const response = await axios.get(`${BASE_URL}getservices`);
      if (response.status === 200) {
        setService(response.data);
      } else {
        toast.error('Failed to fetch services: Unexpected response');
      }
    } catch (error) {
      toast.error('Failed to fetch services');
    }
  };

  const fetchTasks = async () => {
    try {
      const response = await axios.get(`${BASE_URL}gettasks`);
      if (response.status === 200) {
        setTasks(response.data);
      } else {
        toast.error('Failed to fetch tasks: Unexpected response');
      }
    } catch (error) {
      toast.error('Failed to fetch tasks');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const taskData = {
      service_id: selectedService,
      due_date: dueDate,
      status,
      pilot_id: selectedPilot
    };

    axios.post(`${BASE_URL}assign-task`, taskData)
      .then(response => {
        toast.success('Task assigned successfully');
        fetchTasks();
        setShowModal(false); // Close modal on success
        setSelectedService('');
        setDueDate('');
        setStatus('Pending');
        setSelectedPilot('');
      })
      .catch(error => {
        toast.error('Error assigning task');
      });
  };

  const handleDelete = async (task_id) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await axios.delete(`${BASE_URL}deletetask/${task_id}`);
        toast.success('Task deleted successfully');
        fetchTasks();
      } catch (error) {
        toast.error('Error deleting task');
      }
    }
  };

  const handleStatusChange = async (task_id, newStatus) => {
    try {
      await axios.put(`${BASE_URL}update-task-status/${task_id}`, { status: newStatus });
      toast.success('Task status updated successfully');
      fetchTasks();
    } catch (error) {
      toast.error('Error updating task status');
    }
  };

  const filteredTasks = Array.isArray(tasks) ? tasks.filter(task =>
    task.service_name && task.service_name.toLowerCase().includes(searchQuery.toLowerCase())
  ) : [];

  return (
    <div className='p-4 h-screen w-full '>
      <div className='flex gap-10 justify-center mb-6'>
        <input
          type='text'
          className='w-96 border h-10 p-4 rounded'
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search tasks"
        />
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-800"
        >
          Assign Task
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full bg-color1 border border-gray-200">
          <thead className="bg-gray-800 text-white">
            <tr  className='bg-blue-500 text-white text-xl'>
              <th className='py-2 px-2 border-b border-r'>S.No</th>
              <th className='py-2 px-2 border-b border-r'>Task Name</th>
              <th className='py-2 px-2 border-b border-r'>Pilot</th>
              <th className='py-2 px-2 border-b border-r'>Due Date</th>
              <th className='py-2 px-2 border-b border-r'>Status</th>
              <th className='py-2 px-2 border-b border-r'>Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {filteredTasks.map((task,index) => (
              <tr key={index} className={task.status}>
                <td className='py-2 px-4 border-b border-r'>{index + 1}</td>
                <td className='py-2 px-4 border-b border-r'>{task.service_name}</td>
                <td className='py-2 px-4 border-b border-r'>{task.pilot_name}</td>
                <td className='py-2 px-4 border-b border-r'>{formatDateTime(task.due_date)}</td>
                <td className='py-2 px-4 border-b border-r'>
                  <select
                    value={task.status}
                    onChange={(e) => handleStatusChange(task.task_id, e.target.value)}
                    className={`px-2 py-1 rounded ${task.status}`}
                  >
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                  </select>
                </td>
                <td className='py-2 px-4 border-b border-r'>
                  <button
                    onClick={() => handleDelete(task.task_id)}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded shadow-lg w-96 max-w-lg">
            <div className='flex justify-between items-center mb-4'>
              <h2 className="text-2xl font-bold">Assign Task to Pilot</h2>
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="text-black text-xl"
              >
                &times;
              </button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700">Task Name</label>
                <select
                  value={selectedService}
                  onChange={(e) => setSelectedService(e.target.value)}
                  className="w-full px-3 py-2 border rounded"
                  required
                >
                  <option value="">Select Service</option>
                  {services.map(service => (
                    <option key={service.service_id} value={service.service_id}>
                      {service.service_name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-4">
                <label className="block text-gray-700">Due Date</label>
                <input
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="w-full px-3 py-2 border rounded"
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700">Status</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full px-3 py-2 border rounded"
                >
                  <option value="Pending">Pending</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>

              <div className="mb-4">
                <label className="block text-gray-700">Assign to Pilot</label>
                <select
                  value={selectedPilot}
                  onChange={(e) => setSelectedPilot(e.target.value)}
                  className="w-full px-3 py-2 border rounded"
                  required
                >
                  <option value="">Select Pilot</option>
                  {pilots.map(pilot => (
                    <option key={pilot.pilot_id} value={pilot.pilot_id}>
                      {pilot.pilot_name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Assign Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <ToastContainer />
    </div>
  );
};

export default Tasks;
