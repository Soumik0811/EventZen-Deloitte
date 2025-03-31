import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, UserCog, Calendar, Mail, Phone, MapPin } from 'lucide-react';

function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      {/* Navigation Bar */}
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Calendar className="w-8 h-8 text-indigo-600" />
              <span className="ml-2 text-xl font-bold text-gray-800">EventFlow</span>
            </div>
            <div className="flex items-center space-x-6">
              <a href="#about" className="text-gray-600 hover:text-gray-900">About</a>
              <a href="#features" className="text-gray-600 hover:text-gray-900">Features</a>
              <a href="#contact" className="text-gray-600 hover:text-gray-900">Contact</a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="py-20 px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-5xl font-bold text-gray-800 mb-4">
          Streamline Your Event Management
        </h1>
        <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
          Simplify registration, track attendance, and manage events effortlessly with our comprehensive platform.
        </p>
        
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
          <button
            onClick={() => navigate('/auth/attendee')}
            className="p-8 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col items-center"
          >
            <Users className="w-16 h-16 text-blue-600 mb-4" />
            <h2 className="text-2xl font-semibold text-gray-800">Attendee</h2>
            <p className="mt-2 text-gray-600 text-center">
              Quick and easy event registration process
            </p>
          </button>

          <button
            onClick={() => navigate('/auth/organizer')}
            className="p-8 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col items-center"
          >
            <UserCog className="w-16 h-16 text-indigo-600 mb-4" />
            <h2 className="text-2xl font-semibold text-gray-800">Organizer</h2>
            <p className="mt-2 text-gray-600 text-center">
              Powerful tools for event management
            </p>
          </button>
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            Why Choose EventFlow?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Easy Registration</h3>
              <p className="text-gray-600">Simple and quick registration process for all your events</p>
            </div>
            <div className="text-center p-6">
              <div className="bg-indigo-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Attendee Management</h3>
              <p className="text-gray-600">Efficiently manage and track all your event participants</p>
            </div>
            <div className="text-center p-6">
              <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <UserCog className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Organizer Tools</h3>
              <p className="text-gray-600">Comprehensive tools for successful event organization</p>
            </div>
          </div>
        </div>
      </div>

      {/* About Section */}
      <div id="about" className="py-16 bg-gradient-to-br from-indigo-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
            About EventFlow
          </h2>
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-lg text-gray-600 mb-6">
              EventFlow is your all-in-one solution for seamless event management. We understand the challenges of organizing events, which is why we've created a platform that simplifies every aspect of the process.
            </p>
            <p className="text-lg text-gray-600">
              Whether you're an attendee looking to join exciting events or an organizer planning the next big gathering, EventFlow provides the tools you need for success.
            </p>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div id="contact" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            Get in Touch
          </h2>
          <div className="max-w-3xl mx-auto grid md:grid-cols-3 gap-8">
            <div className="flex items-center justify-center">
              <Mail className="w-6 h-6 text-indigo-600 mr-2" />
              <span className="text-gray-600">contact@eventflow.com</span>
            </div>
            <div className="flex items-center justify-center">
              <Phone className="w-6 h-6 text-indigo-600 mr-2" />
              <span className="text-gray-600">+91 8240161499</span>
            </div>
            <div className="flex items-center justify-center">
              <MapPin className="w-6 h-6 text-indigo-600 mr-2" />
              <span className="text-gray-600">Green Pearl Apartments, Potheri Kattankulathur.</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-300">© 2024 EventFlow. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default Home;