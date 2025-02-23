import React from 'react';
import { useParams } from 'react-router-dom';
import { Calendar, Clock, User } from 'lucide-react';

export default function BookingPage() {
  const { salonId } = useParams();

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Book an Appointment</h1>

      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-xl font-semibold mb-4">Select Service</h2>
            <div className="space-y-4">
              {[
                { name: 'Haircut', duration: '30 min', price: '$30' },
                { name: 'Hair Color', duration: '2 hrs', price: '$120' },
                { name: 'Manicure', duration: '45 min', price: '$45' },
              ].map((service, i) => (
                <label
                  key={i}
                  className="flex items-center p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100"
                >
                  <input
                    type="radio"
                    name="service"
                    value={service.name}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500"
                  />
                  <div className="ml-4 flex-1">
                    <h3 className="font-medium">{service.name}</h3>
                    <p className="text-sm text-gray-500">{service.duration}</p>
                  </div>
                  <div className="text-lg font-semibold">{service.price}</div>
                </label>
              ))}
            </div>

            <h2 className="text-xl font-semibold mt-8 mb-4">Select Staff</h2>
            <div className="space-y-4">
              {[
                { name: 'John Doe', speciality: 'Senior Stylist' },
                { name: 'Jane Smith', speciality: 'Color Specialist' },
              ].map((staff, i) => (
                <label
                  key={i}
                  className="flex items-center p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100"
                >
                  <input
                    type="radio"
                    name="staff"
                    value={staff.name}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500"
                  />
                  <div className="ml-4">
                    <h3 className="font-medium">{staff.name}</h3>
                    <p className="text-sm text-gray-500">{staff.speciality}</p>
                  </div>
                </label>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">Select Date & Time</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date
                </label>
                <div className="relative">
                  <input
                    type="date"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                  <Calendar className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Time
                </label>
                <div className="relative">
                  <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
                    <option value="">Select time</option>
                    <option>9:00 AM</option>
                    <option>10:00 AM</option>
                    <option>11:00 AM</option>
                    <option>2:00 PM</option>
                    <option>3:00 PM</option>
                  </select>
                  <Clock className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Your Name
                </label>
                <div className="relative">
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Enter your name"
                  />
                  <User className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
                </div>
              </div>

              <button className="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 mt-6">
                Confirm Booking
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}