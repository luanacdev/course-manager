import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-gray-800">404 - Page Not Found</h1>
      <Link
        to="/"
        className="mt-6 px-8 py-3 bg-blue-600 text-white text-lg rounded-md hover:bg-blue-500"
      >
        Go to Home
      </Link>
    </div>
  );
};

export default NotFoundPage;
