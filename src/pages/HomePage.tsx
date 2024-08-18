import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-gray-800">Welcome to EduLibrary</h1>
      <p className="mt-4 text-lg text-gray-600">Manage your virtual courses effortlessly.</p>
      <Link
        to="/courses"
        className="mt-6 px-8 py-3 bg-blue-600 text-white text-lg rounded-md hover:bg-blue-500"
      >
        View Courses
      </Link>
    </div>
  );
};

export default HomePage;
