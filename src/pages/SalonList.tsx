import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Clock, Phone } from 'lucide-react';

export default function SalonList() {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Salons Near You</h1>
        <div className="flex gap-4">
          <input
            type="text"
            placeholder="Search salons..."
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
          <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
            <option value="">Sort by</option>
            <option value="rating">Rating</option>
            <option value="distance">Distance</option>
            <option value="price">Price</option>
          </select>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Placeholder salon cards - will be populated from database */}
        {[1, 2, 3].map((i) => (
          <Link key={i} to={`/salons/${i}`} className="block">
            <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-48 bg-gray-200"></div>
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">Salon Name {i}</h3>
                <div className="space-y-2 text-gray-600">
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span>123 Main St, City</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-2" />
                    <span>Open 9:00 AM - 8:00 PM</span>
                  </div>
                  <div className="flex items-center">
                    <Phone className="w-4 h-4 mr-2" />
                    <span>(555) 123-4567</span>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}