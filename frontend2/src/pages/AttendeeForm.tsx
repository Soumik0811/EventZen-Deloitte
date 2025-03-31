// import React, { useState } from 'react';
// import axios from 'axios';
// //import toast from 'react-hot-toast';
// import { ArrowLeft } from 'lucide-react';

// export default function Register() {
//   const [formData, setFormData] = useState({
//     name: '',
//     phone: '',
//     email: '',
//     event_name: '',
//   });

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     try {
//           const response = await axios.post(`http://localhost:5000/api/attendees`, formData);
//           alert(response.data.message);
//           setFormData({
//             name: '',
//             phone: '',
//             email: '',
//             event_name: '',
//           });
//         } catch (error) {
//           console.error('Error during registration:', error);
//           alert('Registration failed');
//         }
//       };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-base-200 p-6">
//       <div className="rounded-lg shadow-lg p-8 w-full max-w-md">
//         <a href="/" className="btn btn-ghost text-primary hover:text-secondary mb-8 inline-flex items-center">
//           <ArrowLeft className="mr-2" /> Back to Home
//         </a>
//         <h1 className="text-2xl font-semibold mb-6 text-center">Attendee Registration</h1>
//         <form onSubmit={handleSubmit}>
//           {/* Name Field */}
//           <div className="mb-4">
//             <label className="block text-white text-sm mb-2">Name:</label>
//             <input
//               type="text"
//               name="name"
//               value={formData.name}
//               onChange={handleChange}
//               required
//               className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>

//           {/* Phone Field */}
//           <div className="mb-4">
//             <label className="block text-white text-sm mb-2">Phone:</label>
//             <input
//               type="text"
//               name="phone"
//               value={formData.phone}
//               onChange={handleChange}
//               required
//               className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>

//           {/* Email Field */}
//           <div className="mb-4">
//             <label className="block text-white text-sm mb-2">Email:</label>
//             <input
//               type="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               required
//               className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>

//           {/* Event Name Field */}
//           <div className="mb-6">
//             <label className="block text-white text-sm mb-2">Event Name:</label>
//             <input
//               type="text"
//               name="event_name"
//               value={formData.event_name}
//               onChange={handleChange}
//               required
//               className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>

//           {/* Submit Button */}
//           <button
//             type="submit"
//             className="w-full bg-purple-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-600"
//           >
//             Register
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ArrowLeft } from 'lucide-react';

// Define the Event interface
interface Event {
  eventId: string; // Backend uses `eventId` instead of `_id`
  eventName: string;
}

export default function Register() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    event_id: '', // Store the selected event's ID
    event_name: '', // Store the selected event's name
  });

  const [events, setEvents] = useState<Event[]>([]); // List of events fetched from the backend

  // Fetch events for the dropdown
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/events');
        setEvents(response.data); // Assuming the response contains an array of events
      } catch (error) {
        console.error('Error fetching events:', error);
        alert('Failed to load events');
      }
    };

    fetchEvents();
  }, []);

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    if (name === 'event_id') {
      // Find the selected event to populate `event_name`
      const selectedEvent = events.find((event) => event.eventId === value);
      setFormData((prev) => ({
        ...prev,
        event_id: value, // Store the `eventId` of the selected event
        event_name: selectedEvent?.eventName || '', // Populate the `event_name`
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Log the payload to debug
    console.log('Form Data:', formData);

    try {
      await axios.post('http://localhost:5000/api/attendees', formData);
      alert('Attendee registered successfully');
      setFormData({
        name: '',
        phone: '',
        email: '',
        event_id: '',
        event_name: '',
      });
    } catch (error) {
      console.error('Error during registration:', error);
      alert('Registration failed');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-base-200 p-6">
      <div className="rounded-lg shadow-lg p-8 w-full max-w-md">
      <a href="/attendee/profile" className="btn btn-ghost text-primary hover:text-secondary mb-8 inline-flex items-center">
          <ArrowLeft className="mr-2" /> Back to Home
         </a>
        <h1 className="text-2xl font-semibold mb-6 text-center">Attendee Registration</h1>
        <form onSubmit={handleSubmit}>
          {/* Name Field */}
          <div className="mb-4">
            <label className="block text-white text-sm mb-2">Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Phone Field */}
          <div className="mb-4">
            <label className="block text-white text-sm mb-2">Phone:</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Email Field */}
          <div className="mb-4">
            <label className="block text-white text-sm mb-2">Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Event Dropdown */}
          <div className="mb-6">
            <label className="block text-white text-sm mb-2">Event:</label>
            <select
              name="event_id"
              value={formData.event_id}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="" disabled>Select an Event</option>
              {events.map((event) => (
                <option key={event.eventId} value={event.eventId}>
                  {event.eventName}
                </option>
              ))}
            </select>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-purple-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-600"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}