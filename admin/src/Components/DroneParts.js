import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BASE_URL } from '../config';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const DroneParts = () => {
    const [partName, setPartName] = useState('');
    const [partType, setPartType] = useState('');
    const [stockQuantity, setStockQuantity] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState(null);
    const [droneParts, setDroneParts] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [photo, setPhoto] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [showOrderForm, setShowOrderForm] = useState(false);
    const [quantity, setQuantity] = useState(1);
    const [customerName, setCustomerName] = useState('');
    const [orderDate,setOrderDate] = useState('')
    const [customerAddress, setCustomerAddress] = useState('');
    const [contactNumber, setContactNumber] = useState('');
    const [selectedPart, setSelectedPart] = useState(null);
    const[shippingDate,setShippingDate] = useState('')

    useEffect(() => {
        fetchParts(); // Fetch all parts when component loads
    }, []);

    const fetchParts = async () => {
        try {
            const response = await axios.get(`${BASE_URL}getparts`);
            setDroneParts(response.data);
        } catch (error) {
            toast.error('Failed to fetch drone parts');
        }
    };
    const handlePhotoChange = (e) => {
        setPhoto(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('part_name', partName);
        formData.append('part_type', partType);
        formData.append('stock_quantity', stockQuantity);
        formData.append('price', price);
        formData.append('image', photo); // Use `photo` state here

        try {
            const response = await axios.post(`${BASE_URL}addpart`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            toast.success('Drone part added successfully');
            setPartName('');
            setPartType('');
            setStockQuantity('');
            setPrice('');
            setPhoto(null); // Reset file input
            setShowForm(false); // Hide the form after successful submission
            fetchParts(); // Refresh the parts list
        } catch (error) {
            console.error('Error adding drone part:', error.response?.data || error);
            toast.error(error.response?.data?.message || 'Failed to add drone part');
        }
    };

    const handleOrderSubmit = async (e) => {
        e.preventDefault();

        if (selectedPart && quantity > selectedPart.stock_quantity) {
            toast.error('Ordered quantity exceeds available stock');
            return;
        }

        const orderDetails = {
            part_id: selectedPart.part_id,
            part_name: selectedPart.part_name,
            part_type: selectedPart.part_type,
            price: selectedPart.price * quantity,
            quantity:quantity,
            customer_name: customerName,
            customer_address: customerAddress,
            contact_number: contactNumber,
            order_date: new Date().toISOString().split('T')[0] ,
            shipping_date :new Date().toISOString().split('T')[0]
        };

        try {
            await axios.post(`${BASE_URL}orders`, orderDetails);
            toast.success('Order placed successfully');
            setQuantity(1);
            setCustomerName('');
            setOrderDate('');
            setCustomerAddress('');
            setContactNumber('');
            setShippingDate('');
            setSelectedPart(null);
            setShowOrderForm(false); // Close the order form
            fetchParts(); // Refresh the parts list to reflect the updated stock
        } catch (error) {
            console.error('Error placing order:', error.response?.data || error);
            toast.error(error.response?.data?.message || 'Failed to place order');
        }
    };

    const handleQuantityChange = (e) => {
        const newQuantity = e.target.value;
        setQuantity(newQuantity);
        setPrice(selectedPart.price * newQuantity);
    };
    const filteredDroneParts = droneParts.filter(part =>
        part.part_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        part.part_type.toLowerCase().includes(searchQuery.toLowerCase())
    );


    return (
        <div className="container mx-auto p-4">
            <ToastContainer />

            <h1 className='text-center text-3xl mt-2 mb-14 font-bold text-white bg-teal-800 p-4'>Discover Essential Components for Your Drone</h1>
            <div className='flex gap-10 justify-center'>
                <input type='text' className='w-96 border h-10 p-4 rounded' placeholder="Search Drone Parts by name or  By Part Type " value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />

                {/* Button to open the modal */}
                <button
                    onClick={() => setShowForm(true)}
                    className="bg-teal-500 text-white px-4 py-2 rounded hover:bg-teal-800"
                >
                    Add New Part
                </button>
            </div>

            {/* Modal Popup Form */}
            {showForm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-4 border border-gray-300 w-96 rounded-lg shadow-md relative">
                        <button
                            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                            onClick={() => setShowForm(false)}
                        >
                            X
                        </button>
                        <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 bg-white shadow-lg rounded-lg">
                            <h2 className="text-2xl font-bold mb-4">Add New Drone Part</h2>
                            <input
                                type="text"
                                placeholder="Part Name"
                                value={partName}
                                onChange={(e) => setPartName(e.target.value)}
                                className="mb-4 p-2 border border-gray-300 rounded w-full"
                                required
                            />
                            <input
                                type="text"
                                placeholder="Part Type"
                                value={partType}
                                onChange={(e) => setPartType(e.target.value)}
                                className="mb-4 p-2 border border-gray-300 rounded w-full"
                                required
                            />
                            <input
                                type="number"
                                placeholder="Stock Quantity"
                                value={stockQuantity}
                                onChange={(e) => setStockQuantity(e.target.value)}
                                className="mb-4 p-2 border border-gray-300 rounded w-full"
                                required
                            />
                            <input
                                type="number"
                                placeholder="Price"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                className="mb-4 p-2 border border-gray-300 rounded w-full"
                                required
                            />
                            <input
                                type="file"
                                onChange={handlePhotoChange}
                                className="mb-4 p-2 border border-gray-300 rounded w-full"
                                required
                            />
                            <button
                                type="submit"
                                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                            >
                                Add Drone Part
                            </button>
                        </form>
                    </div>
                </div>
            )}

            <div className="flex justify-center flex-wrap gap-5 mt-6">
                {filteredDroneParts.map((part) => (
                    <div key={part.part_id} className="bg-white w-64 p-2 shadow-lg rounded-lg">
                        <img src={`${BASE_URL}${part.image_path}`} alt={part.part_name} className="w-full h-40 w-40 object-cover rounded-t-lg mb-4" />
                        <h3 className="text-xl font-bold mb-2">{part.part_name}</h3>
                        <p className="text-gray-600">Type: {part.part_type}</p>
                        <p className="text-gray-600">Stock: {part.stock_quantity}</p>
                        <p className="text-gray-600">Price:  Rs.{part.price}</p>
                        <button
                            onClick={() => {
                                setSelectedPart(part);
                                setPrice(part.price);
                                setQuantity(1);
                                setShowOrderForm(true);
                            }}
                            className="bg-teal-500 text-white px-4 py-2 mt-2 rounded hover:bg-teal-800 w-full"
                        >
                            Order Now
                        </button>
                    </div>
                ))}
            </div>
            {/* order now form  */}
            {showOrderForm && selectedPart && (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white p-4 rounded-lg w-auto shadow-lg relative max-h-screen overflow-y-auto">
            <button
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                onClick={() => setShowOrderForm(false)}
            >
                X
            </button>
            <h2 className="text-2xl font-bold mb-4">Order {selectedPart.part_name}</h2>
            <form onSubmit={handleOrderSubmit}>
                <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                        <label className="block mb-2 text-sm font-bold">Part Type:</label>
                        <input
                            type="text"
                            value={selectedPart.part_type}
                            readOnly
                            className="p-2 border border-gray-300 rounded w-full"
                        />
                    </div>
                    <div>
                        <label className="block mb-2 text-sm font-bold">Price per Unit:</label>
                        <input
                            type="number"
                            value={selectedPart.price}
                            readOnly
                            className="p-2 border border-gray-300 rounded w-full"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                        <label className="block mb-2 text-sm font-bold">Quantity:</label>
                        <input
                            type="number"
                            min="1"
                            max={selectedPart.stock_quantity}
                            value={quantity}
                            onChange={handleQuantityChange}
                            className="p-2 border border-gray-300 rounded w-full"
                            required
                        />
                    </div>
                    <div>
                        <label className="block mb-2 text-sm font-bold">Total Price:</label>
                        <input
                            type="number"
                            value={price}
                            readOnly
                            className="p-2 border border-gray-300 rounded w-full"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                        <label className="block mb-2 text-sm font-bold">Customer Name:</label>
                        <input
                            type="text"
                            value={customerName}
                            onChange={(e) => setCustomerName(e.target.value)}
                            className="p-2 border border-gray-300 rounded w-full"
                            required
                        />
                    </div>
                    <div>
                        <label className="block mb-2 text-sm font-bold">Order Date:</label>
                        <input
                            type="date"
                            value={orderDate}
                            onChange={(e) => setOrderDate(e.target.value)}
                            className="p-2 border border-gray-300 rounded w-full"
                            required
                        />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                        <label className="block mb-2 text-sm font-bold">Shipping Date:</label>
                        <input
                            type="date"
                            value={shippingDate}
                            onChange={(e) => setShippingDate(e.target.value)}
                            className="p-2 border border-gray-300 rounded w-full"
                            required
                        />
                    </div>
                </div>

                <div className="mb-4">
                    <label className="block mb-2 text-sm font-bold">Customer Address:</label>
                    <textarea
                        value={customerAddress}
                        onChange={(e) => setCustomerAddress(e.target.value)}
                        className="p-2 border border-gray-300 rounded w-full"
                        rows="3"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block mb-2 text-sm font-bold">Contact Number:</label>
                    <input
                        type="text"
                        value={contactNumber}
                        onChange={(e) => setContactNumber(e.target.value)}
                        className="p-2 border border-gray-300 rounded w-full"
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 w-full"
                >
                    Place Order
                </button>
            </form>
        </div>
    </div>
)}



        </div>
    );
};

export default DroneParts;
