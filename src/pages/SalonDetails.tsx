import React from 'react';
import { useParams } from 'react-router-dom';
import { MapPin, Clock, Phone, Star, Calendar } from 'lucide-react';

export default function SalonDetails() {
  const { id } = useParams();

  return (
    <div className="max-w-6xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="h-64 bg-gray-200"></div>
        <div className="p-6">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold mb-2">Salon Name</h1>
              <div className="flex items-center text-yellow-400 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-current" />
                ))}
                <span className="ml-2 text-gray-600">(128 reviews)</span>
              </div>
            </div>
            <button className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 flex items-center">
              <Calendar className="w-5 h-5 mr-2" />
              Book Appointment
            </button>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mt-8">
            <div>
              <h2 className="text-xl font-semibold mb-4">About Us</h2>
              <p className="text-gray-600">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>

              <div className="mt-6 space-y-3 text-gray-600">
                <div className="flex items-center">
                  <MapPin className="w-5 h-5 mr-3" />
                  <span>123 Main St, City, State 12345</span>
                </div>
                <div className="flex items-center">
                  <Clock className="w-5 h-5 mr-3" />
                  <span>Open 9:00 AM - 8:00 PM</span>
                </div>
                <div className="flex items-center">
                  <Phone className="w-5 h-5 mr-3" />
                  <span>(555) 123-4567</span>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-4">Services</h2>
              <div className="space-y-4">
                {[
                  { name: 'Haircut', duration: '30 min', price: '$30' },
                  { name: 'Hair Color', duration: '2 hrs', price: '$120' },
                  { name: 'Manicure', duration: '45 min', price: '$45' },
                ].map((service, i) => (
                  <div
                    key={i}
                    className="flex justify-between items-center p-4 bg-gray-50 rounded-lg"
                  >
                    <div>
                      <h3 className="font-medium">{service.name}</h3>
                      <p className="text-sm text-gray-500">{service.duration}</p>
                    </div>
                    <div className="text-lg font-semibold">{service.price}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}