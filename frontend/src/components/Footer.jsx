import React from 'react';
import { FaInstagram, FaLinkedin, FaGithub, FaGlobe } from 'react-icons/fa';

const Footer = () => {
  return (
    <div className='bg-white text-blue-700 px-10 py-6 shadow mt-10'>
      <div className='flex flex-col md:flex-row justify-between items-center gap-4'>
        
        {/* Logo or Name */}
        <h2 className='font-bold text-2xl'>Loopline</h2>

        {/* Social Links */}
        <div className='flex gap-6 text-2xl'>
          <a href='https://instagram.com/yourprofile' target='_blank' rel='noopener noreferrer'>
            <FaInstagram className='hover:text-pink-500 transition duration-200' />
          </a>
          <a href='https://linkedin.com/in/yourprofile' target='_blank' rel='noopener noreferrer'>
            <FaLinkedin className='hover:text-blue-500 transition duration-200' />
          </a>
          <a href='https://github.com/yourprofile' target='_blank' rel='noopener noreferrer'>
            <FaGithub className='hover:text-gray-800 transition duration-200' />
          </a>
          <a href='https://yourwebsite.com' target='_blank' rel='noopener noreferrer'>
            <FaGlobe className='hover:text-green-600 transition duration-200' />
          </a>
        </div>

      </div>
    </div>
  );
};

export default Footer;
