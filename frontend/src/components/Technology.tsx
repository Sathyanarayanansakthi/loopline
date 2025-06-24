import React from 'react';
import {
  FaReact,
  FaDocker,
  FaGithub,
  FaPython,
  FaJsSquare,
} from 'react-icons/fa';
import { SiTailwindcss, SiFastapi, SiVercel, SiPostgresql } from 'react-icons/si';

const technologies = [
  { name: 'React.js', icon: <FaReact className="text-blue-400" /> },
  { name: 'Tailwind CSS', icon: <SiTailwindcss className="text-cyan-400" /> },
  { name: 'FastAPI', icon: <SiFastapi className="text-green-500" /> },
  { name: 'Python', icon: <FaPython className="text-yellow-400" /> },
  { name: 'JavaScript', icon: <FaJsSquare className="text-yellow-300" /> },
  { name: 'PostgreSQL', icon: <SiPostgresql className="text-blue-700" /> },
  { name: 'Docker', icon: <FaDocker className="text-blue-500" /> },
  { name: 'GitHub', icon: <FaGithub className="text-black" /> },
  { name: 'Vercel', icon: <SiVercel className="text-black" /> },
];

const Technology = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <div className="flex-grow py-10 px-4 md:px-20">
        <h1 className="text-3xl font-bold text-center mb-10">Technology Stack</h1>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {technologies.map((tech, index) => (
            <div
              key={index}
              className="flex flex-col items-center bg-white p-4 rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <div className="text-5xl mb-3">{tech.icon}</div>
              <p className="text-center font-semibold text-gray-700">{tech.name}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t mt-10 py-6">
        <div className="max-w-screen-xl mx-auto px-4 text-center">
          <p className="text-gray-800 text-sm">
            © {new Date().getFullYear()} Built with Love using React, Tailwind CSS, FastAPI & PostgreSQL.
          </p>
          <p className="text-gray-400 text-xs mt-2">
            Deployed with Vercel • Dockerized Backend • Version-controlled via GitHub
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Technology;
