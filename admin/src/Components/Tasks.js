import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BASE_URL } from '../config';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Tasks = () => {
  const [taskName, setTaskName] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [status, setStatus] = useState('Pending');
  const [pilots, setAllPilots] = useState([]);
  const [selectedPilot, setSelectedPilot] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [tasks, setTasks] = useState([])
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchPilots();
    fetchTasks();
  }, []);

  const fetchPilots = async () => {
    try {
      const response = await axios.get(`${BASE_URL}getpilots`);
      if (response.status === 200) {
        console.log("Fetched Pilots:", response.data);
        setAllPilots(response.data);
      } else {
        console.error("Unexpected response status:", response.status);
        toast.error('Failed to fetch pilots: Unexpected response');
      }
    } catch (error) {
      console.error('Error fetching pilots:', error.message);
      toast.error('Failed to fetch pilots');
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
      task_name: taskName,
      description,
      due_date: dueDate,
      status,
      pilot_id: selectedPilot
    };

    axios.post(`${BASE_URL}assign-task`, taskData)
      .then(response => {
        toast.success('Task assigned successfully');
        setShowModal(false); // Close modal on success
      })
      .catch(error => {
        console.error('There was an error assigning the task!', error);
        toast.error('Error assigning task');
      });
  };
  const handleDelete = async (task_id) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await axios.delete(`${BASE_URL}deletetask/${task_id}`);
        toast.success('Task deleted successfully');
        fetchTasks(); // Refresh the list of tasks after deletion
      } catch (error) {
        console.error('There was an error deleting the task!', error);
        toast.error('Error deleting task');
      }
    }
  };
  const filteredTasks = tasks.filter(task =>
    task.task_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className='p-4'>

      <div className='flex gap-10 justify-center'>
        <input type='text' className='w-96 border h-10 p-4 rounded'onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search tasks" />
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Assign Task
        </button>

      </div>

      {/* displaying tasks details */}

      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6'>
        {filteredTasks.map(task => (
          <div key={task.id} className="bg-white shadow-md rounded-lg p-4">
            <h3 className="text-xl font-bold">{task.task_name}</h3>
            <p><strong>Pilot:</strong> {task.pilot_name}</p>
            <p><strong>Due Date:</strong> {task.due_date}</p>
            <p><strong>Status:</strong> {task.status}</p>
            <div className="flex justify-between mt-4">
              <button className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
              >
                Edit
              </button>
              <button  onClick={() => handleDelete(task.task_id)} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>


      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded shadow-lg w-96 max-w-lg">
            <div className='flex gap-5'>
              <h2 className="text-2xl font-bold mb-4">Assign Task to Pilot</h2>
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="w-20 text-black pl-14 pb-4 rounded"
              >
                X
              </button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">

                <label className="block text-gray-700">Task Name</label>
                <input
                  type="text" placeholder='Task Name'
                  value={taskName}
                  onChange={(e) => setTaskName(e.target.value)}
                  className="w-full px-3 py-2 border rounded"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700">Description</label>
                <textarea
                  value={description} placeholder='Description'
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3 py-2 border rounded"
                ></textarea>
              </div>

              <div className="mb-4">
                <label className="block text-gray-700">Due Date</label>
                <input
                  type="date" placeholder='Due Date'
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="w-full px-3 py-2 border rounded"
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700">Status</label>
                <select
                  value={status} placeholder='Status'
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
                  value={selectedPilot} placeholder='Assign to Pilot'
                  onChange={(e) => setSelectedPilot(e.target.value)}
                  className="w-full px-3 py-2 border rounded"
                  required
                >
                  <option value="">Select Pilot</option>
                  {pilots.map(pilot => (
                    <option key={pilot.id} value={pilot.id}>
                      {pilot.pilot_name}
                    </option>
                  ))}
                </select>
              </div>

              <button
                type="submit"
                className="w-full bg-green-500 hover:bg-green-900 text-white py-2 rounded"
              >
                Assign Task
              </button>

            </form>
          </div>
        </div>
      )}

      <ToastContainer />
    </div>
  );
}

export default Tasks;
