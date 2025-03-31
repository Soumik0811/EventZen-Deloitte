// import { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import toast from 'react-hot-toast';
// import { Calendar, MapPin, Users, LogOut } from 'lucide-react';
// import { format } from 'date-fns';

// interface Event {
//   _id: string;
//   eventName: string;
//   eventDateTime: string;
//   venueName: string;
//   capacityLimits: number;
//   pricing: number;
//   categoryTheme: string;
// }

// function AttendeeProfile() {
//   const navigate = useNavigate();
//   const [events, setEvents] = useState<Event[]>([]);
//   const attendeeToken = localStorage.getItem('attendeeToken');

//   useEffect(() => {
//     if (!attendeeToken) {
//       navigate('/auth/attendee');
//       return;
//     }
//     fetchEvents();
//   }, []);

//   const fetchEvents = async () => {
//     try {
//       const response = await axios.get('http://localhost:8080/api/events');
//       setEvents(response.data);
//     } catch (error) {
//       toast.error('Failed to fetch events');
//     }
//   };

//   const handleLogout = () => {
//     localStorage.removeItem('attendeeToken');
//     localStorage.removeItem('attendeeId');
//     navigate('/');
//   };

//   const handleRegister = (eventId: string) => {
//     navigate(`/attendee?eventId=${eventId}`);
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-7xl mx-auto">
//         <div className="flex justify-between items-center mb-8">
//           <h1 className="text-3xl font-bold text-gray-900">Available Events</h1>
//           <button
//             onClick={handleLogout}
//             className="flex items-center px-4 py-2 text-red-600 hover:text-red-800"
//           >
//             <LogOut className="w-5 h-5 mr-2" />
//             Logout
//           </button>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {events.map((event) => (
//             <div
//               key={event._id}
//               className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow p-6"
//             >
//               <h3 className="text-xl font-semibold text-gray-800 mb-4">{event.eventName}</h3>
              
//               <div className="space-y-3 mb-6">
//                 <div className="flex items-center text-gray-600">
//                   <Calendar className="w-5 h-5 mr-2" />
//                   {format(new Date(event.eventDateTime), 'PPP')}
//                 </div>
                
//                 {event.venueName && (
//                   <div className="flex items-center text-gray-600">
//                     <MapPin className="w-5 h-5 mr-2" />
//                     {event.venueName}
//                   </div>
//                 )}
                
//                 <div className="flex items-center text-gray-600">
//                   <Users className="w-5 h-5 mr-2" />
//                   {event.capacityLimits} attendees max
//                 </div>
//               </div>

//               <div className="flex justify-between items-center">
//                 <span className="text-lg font-semibold text-indigo-600">
//                   ${event.pricing}
//                 </span>
//                 <button
//                   onClick={() => handleRegister(event._id)}
//                   className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
//                 >
//                   Register
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default AttendeeProfile;


import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Calendar, MapPin, Users, LogOut, Home, Map, Ticket } from 'lucide-react';
import { format } from 'date-fns';

interface Event {
  eventId: string;
  eventName: string;
  eventDateTime: string;
  venueName: string;
  capacityLimits: number;
  pricing: number;
  categoryTheme: string;
}

interface Venue {
  _id: string;
  venueName: string;
  address: string;
  capacity: number;
  eventId: string;
}

function AttendeeProfile() {
  const navigate = useNavigate();
  const [events, setEvents] = useState<Event[]>([]);
  const [venues, setVenues] = useState<Venue[]>([]);
  const [activeSection, setActiveSection] = useState('events');
  const [attendeeEmail, setAttendeeEmail] = useState<string>('');
  const attendeeToken = localStorage.getItem('attendeeToken');

  useEffect(() => {
    if (!attendeeToken) {
      navigate('/auth/attendee');
      return;
    }

    try {
      const tokenPayload = JSON.parse(atob(attendeeToken.split('.')[1]));
      setAttendeeEmail(tokenPayload.email);
      fetchEvents();
      fetchVenues();
    } catch (error) {
      console.error('Error decoding token:', error);
      navigate('/auth/attendee');
    }
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/events');
      setEvents(response.data);
    } catch (error) {
      toast.error('Failed to fetch events');
    }
  };

  const fetchVenues = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/venues');
      setVenues(response.data);
    } catch (error) {
      toast.error('Failed to fetch venues');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('attendeeToken');
    localStorage.removeItem('attendeeId');
    navigate('/');
  };

  const handleRegister = (eventId: string) => {
    navigate(`/attendee?eventId=${eventId}`);
  };

  return (
    <div className="min-h-screen bg-[#0F172A] flex">
      {/* Sidebar */}
      <div className="w-64 bg-[#1E293B] border-r border-gray-800">
        <div className="p-6 border-b border-gray-800">
          <div className="flex items-center space-x-3">
            <Ticket className="w-10 h-10 text-indigo-500" />
            <div>
              <h3 className="font-medium text-white">Attendee Dashboard</h3>
              <p className="text-sm text-gray-400">{attendeeEmail}</p>
            </div>
          </div>
        </div>
        
        <nav className="p-4 space-y-2">
          
          <button
            onClick={() => setActiveSection('events')}
            className={`w-full flex items-center space-x-3 px-4 py-2 rounded-lg ${
              activeSection === 'events' 
                ? 'bg-indigo-600 text-white' 
                : 'text-gray-400 hover:text-white hover:bg-gray-800'
            }`}
          >
            <Calendar className="w-5 h-5" />
            <span>Events</span>
          </button>
          
          <button
            onClick={() => setActiveSection('venues')}
            className={`w-full flex items-center space-x-3 px-4 py-2 rounded-lg ${
              activeSection === 'venues' 
                ? 'bg-indigo-600 text-white' 
                : 'text-gray-400 hover:text-white hover:bg-gray-800'
            }`}
          >
            <Map className="w-5 h-5" />
            <span>Venues</span>
          </button>

          <button
            onClick={handleLogout}
            className="w-full flex items-center space-x-3 px-4 py-2 rounded-lg text-red-400 hover:text-red-300 hover:bg-gray-800 mt-8"
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <header className="bg-[#1E293B] shadow-lg border-b border-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <h1 className="text-2xl font-bold text-white">
              {activeSection === 'events' ? 'Available Events' : 'Event Venues'}
            </h1>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {activeSection === 'events' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {events.map((event) => (
                <div 
                  key={event.eventId} 
                  className="bg-[#1E293B] rounded-lg overflow-hidden border border-gray-800 hover:border-indigo-500 transition-all duration-300"
                >
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-white mb-4">{event.eventName}</h3>
                    
                    <div className="space-y-3 text-gray-300">
                      <div className="flex items-center">
                        <Calendar className="w-5 h-5 mr-2 text-indigo-400" />
                        {format(new Date(event.eventDateTime), 'PPP')}
                      </div>
                      
                      {event.venueName && (
                        <div className="flex items-center">
                          <MapPin className="w-5 h-5 mr-2 text-indigo-400" />
                          {event.venueName}
                        </div>
                      )}
                      
                      <div className="flex items-center">
                        <Users className="w-5 h-5 mr-2 text-indigo-400" />
                        {event.capacityLimits} attendees max
                      </div>
                    </div>

                    <div className="mt-6 flex justify-between items-center">
                      <span className="text-lg font-semibold text-indigo-400">
                        ${event.pricing}
                      </span>
                      <button
                        onClick={() => handleRegister(event.eventId)}
                        className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-500 hover:to-purple-500 transition-all duration-300"
                      >
                        Register
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeSection === 'venues' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {venues.map((venue) => (
                <div 
                  key={venue._id} 
                  className="bg-[#1E293B] rounded-lg overflow-hidden border border-gray-800 p-6"
                >
                  <h3 className="text-xl font-semibold text-white mb-4">{venue.venueName}</h3>
                  
                  <div className="space-y-3 text-gray-300">
                    <div className="flex items-center">
                      <MapPin className="w-5 h-5 mr-2 text-indigo-400" />
                      {venue.address}
                    </div>
                    {venue.eventId && (
                      <div className="flex items-center">
                        <Calendar className="w-5 h-5 mr-2 text-indigo-400" />
                        {events.find((event) => event.eventId === venue.eventId)?.eventName || 'Event not found'}
                      </div>
                    )}

                    
                    <div className="flex items-center">
                      <Users className="w-5 h-5 mr-2 text-indigo-400" />
                      Capacity: {venue.capacity}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default AttendeeProfile;