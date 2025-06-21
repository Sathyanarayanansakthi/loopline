import React from 'react';

const HeroSection = () => {
  return (
    <div className="bg-[#f9fafb] min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
      <div className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        
        {/* Left Content */}
        <div className="space-y-6 text-center md:text-left">
          <span className="inline-block bg-white text-blue-700 font-medium px-4 py-1 rounded-full border border-blue-200 text-sm shadow-sm">
            🔄 Continuous Feedback
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 leading-tight">
            Empower your team with <span className="bg-gradient-to-r from-blue-500 to-green-400 bg-clip-text text-transparent">real-time feedback</span>
          </h1>
          <p className="text-gray-600 text-base sm:text-lg max-w-lg mx-auto md:mx-0">
            EchoBoard makes it easy to share anonymous peer feedback, track performance, and foster a culture of growth and transparency across your organization.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start pt-4">
            <button className="bg-blue-700 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-800 transition shadow-lg w-full sm:w-auto">
              Try EchoBoard Free
            </button>
            <button className="bg-white text-blue-700 px-6 py-3 rounded-full font-semibold border border-blue-200 hover:bg-blue-50 transition shadow w-full sm:w-auto">
              See How It Works
            </button>
          </div>
        </div>

        {/* Right Image - Larger & Responsive */}
        <div className="flex justify-center md:justify-end">
          <img
            src="https://images.pexels.com/photos/3184328/pexels-photo-3184328.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
            alt="Team giving feedback"
            className="w-full max-w-lg sm:max-w-xl lg:max-w-2xl object-cover rounded-lg shadow-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
