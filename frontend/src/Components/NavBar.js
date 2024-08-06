import React from 'react';
import img1 from '../Images/l1.jpg';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { FaChevronDown } from 'react-icons/fa';
import { FaBars, FaTimes } from 'react-icons/fa'

const NavBar = () => {
    const [nav, setNav] = useState(false);
    const [isdropdown, setdropdown] = useState(false);
    const [isdropdowncontact, setdropdowncontact] = useState(false)

    const toggleDropdown = () => {
        setdropdown(!isdropdown);
    };
    const toggleDropdownContact = () => {
        setdropdowncontact(!isdropdowncontact);
    };
    return (

        <div>
            <div className=' flex flex-row gap-5 md:flex-row items-center md:h-20 bg-color1 p-4 md:p-0 '>
                <img src={img1} className='h-14 rounded-full ml-4' />
                <h1 className=' text-white text-2xl'>AGRIVIMAAN</h1>
                <ul className='flex gap-8 text-white pl-28 text-xl pr-4 hidden md:flex  '>
                    <Link to="/">Home</Link>
                    <Link to="/about">AboutUs</Link>

                    <li onClick={toggleDropdown} className='relative cursor-pointer flex items-center '>
                        <span className='mr-2'>Products</span>
                        <FaChevronDown className='ml-2' />
                        {isdropdown && (
                            <div className=' absolute top-full left-0 mt-2 w-40 bg-white text-black rounded shadow-lg '>
                                <Link to="/products/11l-quad" className='block py-2 px-4 text-center hover:bg-color3 border-b border-white' >11L-Quad</Link>

                                <Link to="/products/11l-hexa" className='block py-2 px-4 text-center hover:bg-color3'>11L-Hexa</Link>
                            </div>
                        )}
                    </li>
                    <Link to="/services">Services</Link>
                    <Link to="/gallery">Gallery</Link>
                    <li onClick={toggleDropdownContact} className='relative cursor-pointer flex items-center'>
                        <span className='mr-2'>Contact</span>
                        <FaChevronDown className='ml-2' />
                        {isdropdowncontact && (
                            <div className='absolute top-full left-0 mt-2 w-40 bg-white text-black rounded shadow-lg '>
                                <Link to="/contactus" className='block py-2 px-4 text-center hover:bg-color3 border-b border-white' >Contact</Link>

                                <Link to="/faq" className='block py-2 px-4 text-center hover:bg-color3'>FAQ's</Link>
                            </div>
                        )}
                    </li>

                    <Link to="/booknow"><button className='bg-lime-500 hover:bg-lime-700 text-white font-bold  px-2 rounded'>Book Now</button></Link>
                </ul>

                <div onClick={() => setNav(!nav)} className='pr-4  z-10 cursor-pointer text-gray-500 md:hidden'>
                    {nav ? <FaTimes size={30} /> : <FaBars size={30} />}

                </div>

                {nav && (
                    <ul className='flex flex-col gap-10  text-xl justify-center items-center fixed top-0 left-0 w-full h-screen bg-color1  text-white'>
                        <Link to="/" onClick={() => setNav(!nav)}>Home</Link>
                        <Link to="/about" onClick={() => setNav(!nav)}>AboutUs</Link>

                        <li onClick={toggleDropdown} className='relative cursor-pointer flex items-center '>
                            <span className='mr-2' onClick={() => setNav(!nav)}>Products</span>
                            <FaChevronDown className='ml-2' />
                            {isdropdown && (
                                <div className=' absolute top-full left-0 mt-2 w-40 bg-white text-black rounded shadow-lg '>
                                    <Link to="/products/11l-quad" className='block py-2 px-4 text-center hover:bg-color3 border-b border-white' onClick={() => setNav(!nav)} >11L-Quad</Link>

                                    <Link to="/products/11l-hexa" className='block py-2 px-4 text-center hover:bg-color3' onClick={() => setNav(!nav)}>11L-Hexa</Link>
                                </div>
                            )}
                        </li>
                        <Link to="/services" onClick={() => setNav(!nav)}>Services</Link>
                        <Link to="/gallery" >Gallery</Link>
                        <li onClick={toggleDropdownContact} className='relative cursor-pointer flex items-center'>
                            <span className='mr-2' onClick={() => setNav(!nav)}>Contact</span>
                            <FaChevronDown className='ml-2' />
                            {isdropdowncontact && (
                                <div className='absolute top-full left-0 mt-2 w-40 bg-white text-black rounded shadow-lg '>
                                    <Link to="/contactus" className='block py-2 px-4 text-center hover:bg-color3 border-b border-white' onClick={() => setNav(!nav)} >Contact</Link>

                                    <Link to="/faq" className='block py-2 px-4 text-center hover:bg-color3 ' onClick={() => setNav(!nav)}>FAQ's</Link>
                                </div>
                            )}
                        </li>

                        <Link to="/booknow"><button className='bg-lime-500 hover:bg-lime-700 text-white font-bold  px-2 rounded}' onClick={() => setNav(!nav)}>Book Now</button></Link>
                    </ul>

                )}
            </div>
        </div>
    )
}

export default NavBar
