// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import toast from 'react-hot-toast';
// import { ArrowLeft, Trash2, Edit2, Save } from 'lucide-react';

// // Define the Attendee interface
// interface Attendee {
//   _id: string;
//   name: string;
//   phone: string;
//   email: string;
//   event_name: string;
//   ticket_status: string;
//   payment_status: string;
//   confirmation_sent: boolean;
//   registration_date: string;
// }

// const OrganizerDashboard = () => {
//   const navigate = useNavigate();
//   const [attendees, setAttendees] = useState<Attendee[]>([]);
//   const [editingId, setEditingId] = useState<string | null>(null);
//   const [editForm, setEditForm] = useState<Partial<Attendee>>({});

//   // Fetch all attendees from the API
//   useEffect(() => {
//     fetchAttendees();
//   }, []);

//   const fetchAttendees = async () => {
//     try {
//       const response = await axios.get('http://localhost:5000/api/attendees');
//       if (Array.isArray(response.data)) {
//         setAttendees(response.data);
//       } else if (response.data && Array.isArray(response.data.attendees)) {
//         setAttendees(response.data.attendees);
//       } else {
//         console.error('Invalid API response:', response.data);
//         toast.error('Failed to fetch attendees');
//       }
//     } catch (error) {
//       console.error('Error fetching attendees:', error);
//       toast.error('Failed to fetch attendees');
//     }
//   };

//   // Handle attendee deletion
//   const handleDelete = async (_id: string) => {
//     try {
//       await axios.delete(`http://localhost:5000/api/attendees/${_id}`);
//       toast.success('Attendee deleted successfully');
//       fetchAttendees();
//     } catch (error) {
//       console.error('Error deleting attendee:', error);
//       toast.error('Failed to delete attendee');
//     }
//   };

//   // Handle editing an attendee
//   const handleEdit = (attendee: Attendee) => {
//     setEditingId(attendee._id);
//     setEditForm({
//       name: attendee.name,
//       phone: attendee.phone,
//       email: attendee.email,
//       event_name: attendee.event_name,
//       ticket_status: attendee.ticket_status,
//       payment_status: attendee.payment_status,
//     });
//   };

//   // Handle updating an attendee
//   const handleUpdate = async () => {
//     if (!editForm || !editingId) return;

//     try {
//       await axios.put(`http://localhost:5000/api/attendees/${editingId}`, editForm);
//       toast.success('Attendee updated successfully');
//       setEditingId(null);
//       setEditForm({});
//       fetchAttendees();
//     } catch (error) {
//       console.error('Error updating attendee:', error);
//       toast.error('Failed to update attendee');
//     }
//   };

//   // Handle input changes for the edit form
//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//     const { name, value } = e.target;
//     setEditForm((prev) => ({ ...prev, [name]: value }));
//   };

//   return (
//     <div className="min-h-screen bg-base-200 p-6">
//       {/* Back Button */}
//       <button
//         onClick={() => navigate('/')}
//         className="btn btn-ghost text-primary hover:text-secondary mb-8"
//       >
//         <ArrowLeft className="w-5 h-5 mr-2" />
//         Back to Home
//       </button>

//       {/* Dashboard Header */}
//       <div className="rounded-lg shadow-xl p-8">
//         <h2 className="text-3xl font-bold text-primary mb-6">Attendee Management Dashboard</h2>

//         {/* Display Attendees Table */}
//         {attendees.length === 0 ? (
//           <p className="text-center text-gray-500">No attendees found.</p>
//         ) : (
//           <div className="overflow-x-auto">
//             <table className="table w-full">
//               {/* Table Head */}
//               <thead>
//                 <tr className="text-primary">
//                   <th>Name</th>
//                   <th>Phone</th>
//                   <th>Email</th>
//                   <th>Event Name</th>
//                   <th>Ticket Status</th>
//                   <th>Payment Status</th>
//                   <th>Action</th>
//                 </tr>
//               </thead>
//               {/* Table Body */}
//               <tbody>
//                 {attendees.map((attendee) => (
//                   <tr key={attendee._id} className="hover:bg-base-100">
//                     {/* Name */}
//                     <td>
//                       {editingId === attendee._id ? (
//                         <input
//                           type="text"
//                           name="name"
//                           value={editForm.name || ''}
//                           onChange={handleChange}
//                           className="input input-bordered input-primary w-full max-w-xs"
//                         />
//                       ) : (
//                         attendee.name
//                       )}
//                     </td>

//                     {/* Phone */}
//                     <td>
//                       {editingId === attendee._id ? (
//                         <input
//                           type="text"
//                           name="phone"
//                           value={editForm.phone || ''}
//                           onChange={handleChange}
//                           className="input input-bordered input-primary w-full max-w-xs"
//                         />
//                       ) : (
//                         attendee.phone
//                       )}
//                     </td>

//                     {/* Email */}
//                     <td>
//                       {editingId === attendee._id ? (
//                         <input
//                           type="email"
//                           name="email"
//                           value={editForm.email || ''}
//                           onChange={handleChange}
//                           className="input input-bordered input-primary w-full max-w-xs"
//                         />
//                       ) : (
//                         attendee.email
//                       )}
//                     </td>

//                     {/* Event Name */}
//                     <td>
//                       {editingId === attendee._id ? (
//                         <input
//                           type="text"
//                           name="event_name"
//                           value={editForm.event_name || ''}
//                           onChange={handleChange}
//                           className="input input-bordered input-primary w-full max-w-xs"
//                         />
//                       ) : (
//                         attendee.event_name
//                       )}
//                     </td>

//                     {/* Ticket Status */}
//                     <td>
//                       {editingId === attendee._id ? (
//                         <select
//                           name="ticket_status"
//                           value={editForm.ticket_status || ''}
//                           onChange={handleChange}
//                           className="select select-primary w-full max-w-xs"
//                         >
//                           <option value="Pending">Pending</option>
//                           <option value="Confirmed">Confirmed</option>
//                           <option value="Cancelled">Cancelled</option>
//                         </select>
//                       ) : (
//                         attendee.ticket_status
//                       )}
//                     </td>

//                     {/* Payment Status */}
//                     <td>
//                       {editingId === attendee._id ? (
//                         <select
//                           name="payment_status"
//                           value={editForm.payment_status || ''}
//                           onChange={handleChange}
//                           className="select select-primary w-full max-w-xs"
//                         >
//                           <option value="Unpaid">Unpaid</option>
//                           <option value="Paid">Paid</option>
//                           <option value="Refunded">Refunded</option>
//                         </select>
//                       ) : (
//                         attendee.payment_status
//                       )}
//                     </td>

//                     {/* Actions */}
//                     <td>
//                       {editingId === attendee._id ? (
//                         <button
//                           onClick={handleUpdate}
//                           className="btn btn-success btn-sm"
//                         >
//                           <Save className="w-4 h-4 mr-1" />
//                           Save
//                         </button>
//                       ) : (
//                         <>
//                           <button
//                             onClick={() => handleEdit(attendee)}
//                             className="btn btn-primary btn-sm mr-2"
//                           >
//                             <Edit2 className="w-4 h-4 mr-1" />
//                             Edit
//                           </button>
//                           <button
//                             onClick={() => handleDelete(attendee._id)}
//                             className="btn btn-error btn-sm"
//                           >
//                             <Trash2 className="w-4 h-4 mr-1" />
//                             Delete
//                           </button>
//                         </>
//                       )}
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default OrganizerDashboard;


// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import toast from 'react-hot-toast';
// import { ArrowLeft, Plus, Calendar, Users, MapPin } from 'lucide-react';
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

// function OrganizerDashboard() {
//   const navigate = useNavigate();
//   const [events, setEvents] = useState<Event[]>([]);

//   useEffect(() => {
//     fetchEvents();
//   }, []);

//   const fetchEvents = async () => {
//     try {
//       const response = await axios.get('http://localhost:8080/api/events');
//       setEvents(response.data);
//     } catch (error) {
//       toast.error('Failed to fetch events');
//       console.error('Error fetching events:', error);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-7xl mx-auto">
//         <div className="flex justify-between items-center mb-8">
//           <button
//             onClick={() => navigate('/')}
//             className="flex items-center text-gray-600 hover:text-gray-800"
//           >
//             <ArrowLeft className="w-5 h-5 mr-2" />
//             Back to Home
//           </button>
//           <button
//             onClick={() => navigate('/create-event')}
//             className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
//           >
//             <Plus className="w-5 h-5 mr-2" />
//             Create New Event
//           </button>
//         </div>

//         <div className="bg-white rounded-xl shadow-lg p-8">
//           <h2 className="text-3xl font-bold text-gray-800 mb-8">Your Events</h2>

//           {events.length === 0 ? (
//             <div className="text-center py-12">
//               <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
//               <p className="text-gray-500 text-lg">No events created yet</p>
//               <p className="text-gray-400">Create your first event to get started</p>
//             </div>
//           ) : (
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//               {events.map((event) => (
//                 <div
//                   key={event._id}
//                   onClick={() => navigate(`/event/${event._id}`)}
//                   className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow cursor-pointer border border-gray-100 overflow-hidden"
//                 >
//                   <div className="bg-gradient-to-r from-indigo-500 to-purple-500 h-32 flex items-center justify-center">
//                     <Calendar className="w-12 h-12 text-white" />
//                   </div>
//                   <div className="p-6">
//                     <h3 className="text-xl font-semibold text-gray-800 mb-2">{event.eventName}</h3>
//                     <div className="space-y-2">
//                       <div className="flex items-center text-gray-600">
//                         <Calendar className="w-4 h-4 mr-2" />
//                         {format(new Date(event.eventDateTime), 'PPP')}
//                       </div>
//                       {event.venueName && (
//                         <div className="flex items-center text-gray-600">
//                           <MapPin className="w-4 h-4 mr-2" />
//                           {event.venueName}
//                         </div>
//                       )}
//                       <div className="flex items-center text-gray-600">
//                         <Users className="w-4 h-4 mr-2" />
//                         {event.capacityLimits} attendees max
//                       </div>
//                     </div>
//                     <div className="mt-4 flex justify-between items-center">
//                       <span className="text-sm font-medium text-indigo-600">
//                         ${event.pricing}
//                       </span>
//                       <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
//                         {event.categoryTheme}
//                       </span>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default OrganizerDashboard;

// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import toast from 'react-hot-toast';
// import { ArrowLeft, Plus, Calendar, Users, MapPin, Trash2 } from 'lucide-react';
// import { format } from 'date-fns';

// // Define the Event interface
// interface Event {
//   eventId: string;
//   eventName: string;
//   eventDateTime: string;
//   venueName: string;
//   capacityLimits: number;
//   pricing: number;
//   categoryTheme: string;
// }


// function OrganizerDashboard() {
//   const navigate = useNavigate();
//   const [events, setEvents] = useState<Event[]>([]);

//   // Fetch all events from the API
//   useEffect(() => {
//     fetchEvents();
//   }, []);

//   const fetchEvents = async () => {
//     try {
//       const response = await axios.get('http://localhost:8080/api/events');
//       if (Array.isArray(response.data)) {
//         setEvents(response.data);
//       } else {
//         console.error('Invalid API response:', response.data);
//         toast.error('Failed to fetch events');
//       }
//     } catch (error) {
//       console.error('Error fetching events:', error);
//       toast.error('Failed to fetch events');
//     }
//   };

//   // Handle event deletion
//   const handleDeleteEvent = async (eventId: string) => {
//     try {
//       await axios.delete(`http://localhost:8080/api/events/${eventId}`);
//       toast.success('Event deleted successfully');
//       fetchEvents(); // Refresh the list of events after deletion
//     } catch (error) {
//       console.error('Error deleting event:', error);
//       toast.error('Failed to delete event');
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-7xl mx-auto">
//         {/* Header Section */}
//         <div className="flex justify-between items-center mb-8">
//           <button
//             onClick={() => navigate('/')}
//             className="flex items-center text-gray-600 hover:text-gray-800"
//           >
//             <ArrowLeft className="w-5 h-5 mr-2" />
//             Back to Home
//           </button>
//           <button
//             onClick={() => navigate('/create-event')}
//             className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
//           >
//             <Plus className="w-5 h-5 mr-2" />
//             Create New Event
//           </button>
//         </div>

//         {/* Events Section */}
//         <div className="bg-white rounded-xl shadow-lg p-8">
//           <h2 className="text-3xl font-bold text-gray-800 mb-8">Your Events</h2>

//           {events.length === 0 ? (
//             <div className="text-center py-12">
//               <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
//               <p className="text-gray-500 text-lg">No events created yet</p>
//               <p className="text-gray-400">Create your first event to get started</p>
//             </div>
//           ) : (
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//               {events.map((event) => (
//                 <div key={event.eventId} className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow border border-gray-100 overflow-hidden">
//                   {/* Event Card Content */}
//                   <div
//                     onClick={() => navigate(`/event/${event.eventId}`)} // Navigate to EventDashboard
//                     className="cursor-pointer"
//                   >
//                     <div className="bg-gradient-to-r from-indigo-500 to-purple-500 h-32 flex items-center justify-center">
//                       <Calendar className="w-12 h-12 text-white" />
//                     </div>
//                     <div className="p-6">
//                       <h3 className="text-xl font-semibold text-gray-800 mb-2">{event.eventName}</h3>
//                       <div className="space-y-2">
//                         <div className="flex items-center text-gray-600">
//                           <Calendar className="w-4 h-4 mr-2" />
//                           {format(new Date(event.eventDateTime), 'PPP')}
//                         </div>
//                         {event.venueName && (
//                           <div className="flex items-center text-gray-600">
//                             <MapPin className="w-4 h-4 mr-2" />
//                             {event.venueName}
//                           </div>
//                         )}
//                         <div className="flex items-center text-gray-600">
//                           <Users className="w-4 h-4 mr-2" />
//                           {event.capacityLimits} attendees max
//                         </div>
//                       </div>
//                       <div className="mt-4 flex justify-between items-center">
//                         <span className="text-sm font-medium text-indigo-600">
//                           ${event.pricing}
//                         </span>
//                         <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
//                           {event.categoryTheme}
//                         </span>
//                       </div>
//                     </div>
//                   </div>
//                   {/* Delete Button */}
//                   <div className="p-4 bg-gray-50 border-t border-gray-100">
//                     <button
//                       onClick={(e) => {
//                         e.stopPropagation(); // Prevent card click from triggering navigation
//                         handleDeleteEvent(event.eventId);
//                       }}
//                       className="flex items-center text-red-600 hover:text-red-800 w-full justify-center"
//                     >
//                       <Trash2 className="w-4 h-4 mr-2" />
//                       Delete Event
//                     </button>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default OrganizerDashboard;

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { ArrowLeft, Plus, Calendar, Users, MapPin, Trash2 } from 'lucide-react';
import { format } from 'date-fns';

// Define the Event interface
interface Event {
  eventId: string;
  eventName: string;
  eventDateTime: string;
  venueName: string;
  capacityLimits: number;
  pricing: number;
  categoryTheme: string;
  orgId: string; // Updated to represent the organizer's ID
}

function OrganizerDashboard() {
  const navigate = useNavigate();
  const [events, setEvents] = useState<Event[]>([]);
  const [organizerId, setOrganizerId] = useState<string>('');

  // Fetch organizer ID from JWT token and fetch events
  useEffect(() => {
    const token = localStorage.getItem('organizerToken');
    if (!token) {
      console.error('No token found in localStorage');
      toast.error('Session expired. Please log in again.');
      navigate('/organizer'); // Redirect to login if no token is found
      return;
    }

    try {
      // Decode the JWT token to extract the organizer's ID
      const tokenPayload = JSON.parse(atob(token.split('.')[1]));
      console.log('Decoded Token Payload:', tokenPayload); // Log the payload for debugging

      if (!tokenPayload.id) {
        console.error('ID not found in token payload');
        toast.error('Invalid token: ID not found');
        navigate('/organizer'); // Redirect to login if ID is missing
        return;
      }

      const id = tokenPayload.id; // Extract the ID
      setOrganizerId(id);
      fetchEvents(id); // Fetch events for this organizer
    } catch (error) {
      console.error('Error decoding token:', error);
      toast.error('Failed to decode token');
      navigate('/organizer'); // Redirect to login if token decoding fails
    }
  }, [navigate]);

  // Fetch events for a specific organizer
  const fetchEvents = async (orgId: string) => {
    try {
      const response = await axios.get(`http://localhost:8080/api/events/org/${orgId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('organizerToken')}`,
        },
      });

      console.log('API Response:', response.data);

      // Validate the response data
      if (Array.isArray(response.data)) {
        setEvents(response.data);
      } else {
        console.error('Invalid API response:', response.data);
        toast.error('Failed to fetch events');
      }
    } catch (error) {
      console.error('Error fetching events:', error);
      toast.error('Failed to fetch events');
    }
  };

  // Handle event deletion
  const handleDeleteEvent = async (eventId: string) => {
    try {
      await axios.delete(`http://localhost:8080/api/events/${eventId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('organizerToken')}`,
        },
      });
      toast.success('Event deleted successfully');
      fetchEvents(organizerId); // Refresh the list of events after deletion
    } catch (error) {
      console.error('Error deleting event:', error);
      toast.error('Failed to delete event');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-8">
          <button
            onClick={() => navigate('/')}
            className="flex items-center text-gray-600 hover:text-gray-800"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Home
          </button>
          <button
            onClick={() => navigate('/create-event')}
            className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            <Plus className="w-5 h-5 mr-2" />
            Create New Event
          </button>
        </div>

        {/* Events Section */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">Your Events</h2>

          {events.length === 0 ? (
            <div className="text-center py-12">
              <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">No events created yet</p>
              <p className="text-gray-400">Create your first event to get started</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {events.map((event) => (
                <div key={event.eventId} className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow border border-gray-100 overflow-hidden">
                  {/* Event Card Content */}
                  <div
                    onClick={() => navigate(`/event/${event.eventId}`)} // Navigate to EventDashboard
                    className="cursor-pointer"
                  >
                    <div className="bg-gradient-to-r from-indigo-500 to-purple-500 h-32 flex items-center justify-center">
                      <Calendar className="w-12 h-12 text-white" />
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-semibold text-gray-800 mb-2">{event.eventName}</h3>
                      <div className="space-y-2">
                        <div className="flex items-center text-gray-600">
                          <Calendar className="w-4 h-4 mr-2" />
                          {format(new Date(event.eventDateTime), 'PPP')}
                        </div>
                        {event.venueName && (
                          <div className="flex items-center text-gray-600">
                            <MapPin className="w-4 h-4 mr-2" />
                            {event.venueName}
                          </div>
                        )}
                        <div className="flex items-center text-gray-600">
                          <Users className="w-4 h-4 mr-2" />
                          {event.capacityLimits} attendees max
                        </div>
                      </div>
                      <div className="mt-4 flex justify-between items-center">
                        <span className="text-sm font-medium text-indigo-600">
                          ${event.pricing}
                        </span>
                        <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                          {event.categoryTheme}
                        </span>
                      </div>
                    </div>
                  </div>
                  {/* Delete Button */}
                  <div className="p-4 bg-gray-50 border-t border-gray-100">
                    <button
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent card click from triggering navigation
                        handleDeleteEvent(event.eventId);
                      }}
                      className="flex items-center text-red-600 hover:text-red-800 w-full justify-center"
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete Event
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default OrganizerDashboard;