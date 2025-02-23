import React from 'react';
import { Link } from 'react-router-dom';
import { Search, Calendar, Star } from 'lucide-react';

export default function Home() {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Find and Book the Perfect Salon
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Discover top-rated salons and book your next appointment with ease
        </p>
        <Link
          to="/salons"
          className="bg-indigo-600 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-indigo-700 transition-colors"
        >
          Find a Salon
        </Link>
      </div>

      <div className="grid md:grid-cols-3 gap-8 my-12">
        <div className="text-center p-6">
          <Search className="w-12 h-12 text-indigo-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">Search Salons</h3>
          <p className="text-gray-600">
            Browse through our curated list of professional salons
          </p>
        </div>
        <div className="text-center p-6">
          <Calendar className="w-12 h-12 text-indigo-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">Book Appointments</h3>
          <p className="text-gray-600">
            Schedule your visit at your preferred time
          </p>
        </div>
        <div className="text-center p-6">
          <Star className="w-12 h-12 text-indigo-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">Leave Reviews</h3>
          <p className="text-gray-600">
            Share your experience and help others find great service
          </p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-8 my-12">
        <h2 className="text-2xl font-bold text-center mb-8">
          Featured Salons
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Placeholder for featured salons - will be populated from database */}
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="h-48 bg-gray-200 rounded-lg mb-4"></div>
            <h3 className="font-semibold">Loading...</h3>
            <p className="text-gray-600">Please wait...</p>
          </div>
        </div>
      </div>
    </div>
  );
}