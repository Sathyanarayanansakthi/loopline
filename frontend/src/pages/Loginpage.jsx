import React from 'react';

const LoginPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200">
      <div className="w-full max-w-md p-8 bg-white rounded-3xl shadow-2xl animate-fade-in">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">
         Login
        </h2>
        <form className="space-y-6">
          <div className="relative">
            <input
              type="email"
              id="email"
              required
              className="peer w-full px-4 pt-6 pb-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 placeholder-transparent"
              placeholder="you@example.com"
            />
            <label
              htmlFor="email"
              className="absolute left-4 top-2 text-sm text-gray-500 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-sm peer-focus:text-indigo-600"
            >
              Email
            </label>
          </div>

          <div className="relative">
            <input
              type="password"
              id="password"
              required
              className="peer w-full px-4 pt-6 pb-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 placeholder-transparent"
            />
            <label
              htmlFor="password"
              className="absolute left-4 top-2 text-sm text-gray-500 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-sm peer-focus:text-indigo-600"
            >
              Password
            </label>
          </div>

          <div className="flex items-center justify-between text-sm">
            <a href="/signup" className="text-gray-600 hover:underline text-center">
              Sign up
            </a>
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-indigo-700 transition duration-300"
          >
            Sign In
          </button>
{/* 
          <div className="flex items-center gap-2 my-4">
            <hr className="flex-grow border-gray-300" />
            <span className="text-sm text-gray-400">or</span>
            <hr className="flex-grow border-gray-300" />
          </div> */}

          {/* <button className="w-full flex items-center justify-center gap-2 border border-gray-300 py-2 px-4 rounded-lg hover:bg-gray-100 transition">
            <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-5 h-5" />
            <span className="text-sm font-medium text-gray-600">Continue with Google</span>
          </button> */}
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
