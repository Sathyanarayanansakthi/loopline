import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className="bg-white text-blue-700 px-10 py-3 shadow">
      <div className="flex justify-between items-center">

        {/* Logo */}
        <Link to="/">
          <h2 className="font-bold text-2xl cursor-pointer">LoopLine</h2>
        </Link>

        {/* Navigation Links */}
        <div className="flex gap-8 text-black">
          <Link to="/about">
            <h2 className="cursor-pointer hover:text-blue-600">About</h2>
          </Link>
          <Link to="/features">
            <h2 className="cursor-pointer hover:text-blue-600">Features</h2>
          </Link>
          <Link to="/tech">
            <h2 className="cursor-pointer hover:text-blue-600">Technology Used</h2>
          </Link>
        </div>

        {/* Auth Buttons */}
        <div className="flex gap-4">
          <Link to="/signup">
            <button className="bg-blue-600 text-white rounded-2xl px-6 py-2 hover:bg-blue-700 transition duration-300">
              Signup
            </button>
          </Link>
          <Link to="/login">
            <button className="border border-blue-500 text-blue-500 px-6 py-2 rounded-2xl hover:bg-blue-500 hover:text-white transition duration-300">
              Login
            </button>
          </Link>
        </div>

      </div>
    </div>
  );
};

export default Navbar;
