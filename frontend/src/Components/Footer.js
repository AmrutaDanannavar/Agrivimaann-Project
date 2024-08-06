import React from 'react';
import { Link } from 'react-router-dom';
import img12 from '../Images/f1.jpg';
import img13 from '../Images/t1.jpg';
import img14 from '../Images/i1.jpg';
import img15 from '../Images/y1.jpg';

const Footer = () => {
  return (
    <div >
      <div className='h-92 pl-14 pt-7 bg-color1 text-white pr-14'>

        <div className="flex flex-row gap-20 flex-wrap ">
          <div >
            <h2 className="text-xl font-bold mb-4">Agrivimaan</h2>
            <p>
              Leading the way in precision agriculture and
            </p>
            <p>sustainable farming solutions.</p>
          </div>

          {/* Navigation Links */}
          <div >

            <ul className=' flex flex-col gap-2 text-white text-sm pl-7 md:pl-14 ' >
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <Link to="/">Home</Link>
              <Link to="/about">AboutUs</Link>
              <li className='cursor-pointer' to="/products">Products</li>
              <Link to="/services">Services</Link>
              <Link to="/contactus">ContactUs</Link>
            </ul>
          </div>

          {/* Contact Info */}
          <div className='md:pl-28'>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <p>123 Agriculture Road, Green Valley, CA</p>
            <p>Email: info@agrivimaan.com</p>
            <p>Phone: (123) 456-7890</p>
            <div className=" flex flex-row gap-5 mt-4">
              <a href="https://facebook.com"><img src={img12} className='h-7 w-7 rounded-full ' /></a>
              <a href="https://twitter.com" ><img src={img13} className='h-7 w-7 rounded-full ' /></a>
              <a href="https://instagram.com" ><img src={img14} className='h-7 w-7 rounded-full ' /></a>
              <a href="https://youtube.com" ><img src={img15} className='h-7 w-7 rounded-full ' /></a>
            </div>
          </div>
        </div>
        <div className="border-t border-white pt-2 mt-4 text-center">
          <p>© 2024 Agrivimaan. All rights reserved.</p>
        </div>

      </div>

    </div>

  )
}

export default Footer
