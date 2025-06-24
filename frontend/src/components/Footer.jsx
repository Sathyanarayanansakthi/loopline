import React from 'react';
import { FaInstagram, FaLinkedin, FaGithub, FaGlobe } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-white text-gray-700 shadow-inner mt-16">
      <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col md:flex-row justify-between items-center gap-6">
        
        <div className="text-center md:text-left">
          <h2 className="text-2xl font-bold text-blue-700">Loopline</h2>
          <p className="text-sm text-gray-500 mt-1">
            A modern manager-employee feedback platform powered by React & FastAPI.
          </p>
        </div>

        {/* Center: Social Media Links */}
        <div className="flex gap-6 text-2xl">
          <a href="https://www.instagram.com/sathyanarayanansakthi/#" target="_blank" rel="noopener noreferrer" className="hover:text-pink-500 transition duration-300">
            <FaInstagram />
          </a>
          <a href="https://linkedin.com/in/sathya-narayanans" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 transition duration-300">
            <FaLinkedin />
          </a>
          <a href="https://github.com/Sathyanarayanansakthi" target="_blank" rel="noopener noreferrer" className="hover:text-black transition duration-300">
            <FaGithub />
          </a>
          <a href="https://sathyanarayanan.live" target="_blank" rel="noopener noreferrer" className="hover:text-green-600 transition duration-300">
            <FaGlobe />
          </a>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className=" text-center py-4 text-sm text-gray-400">
        © {new Date().getFullYear()} Loopline. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
