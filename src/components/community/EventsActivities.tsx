// 'use client';
// import React, { useState } from 'react';
// import { motion } from 'framer-motion';
// import { 
// Calendar,
// Users,
// MapPin,
// } from 'lucide-react';
// import { format } from 'date-fns';
// const EventsActivities: React.FC = () => {
//   const upcomingEvents = [
//     {
//       id: 'e1',
//       title: 'Annual Medical Conference 2025',
//       date: '2025-04-15',
//       location: 'New York City, NY',
//       image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
//       description: 'Join leading medical professionals for three days of cutting-edge research presentations, workshops, and networking opportunities.',
//       attendees: 1200
//     },
//     {
//       id: 'e2',
//       title: 'Mental Health Awareness Walk',
//       date: '2025-05-10',
//       location: 'Central Park, NY',
//       image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
//       description: 'A community walk to raise awareness about mental health issues and promote mental well-being.',
//       attendees: 500
//     },
//     {
//       id: 'e3',
//       title: 'Pediatric Care Symposium',
//       date: '2025-06-20',
//       location: 'Chicago, IL',
//       image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
//       description: 'A one-day symposium focusing on the latest advancements in pediatric care and child health.',
//       attendees: 300
//     }
//   ];

//   const pastEvents = [
//     {
//       id: 'pe1',
//       title: 'Cancer Research Summit 2024',
//       date: '2024-11-15',
//       location: 'San Francisco, CA',
//       image: 'https://images.unsplash.com/photo-1530021232320-687d8e3dba5b?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
//       description: 'A gathering of oncologists and researchers to discuss the latest breakthroughs in cancer treatment.',
//       attendees: 800
//     },
//     {
//       id: 'pe2',
//       title: 'Heart Health Fair 2024',
//       date: '2024-09-20',
//       location: 'Miami, FL',
//       image: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
//       description: 'A community event offering free heart health screenings and educational workshops.',
//       attendees: 400
//     }
//   ];

//   const container = {
//     hidden: { opacity: 0 },
//     show: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.1
//       }
//     }
//   };
  
//   const item = {
//     hidden: { opacity: 0, y: 20 },
//     show: { opacity: 1, y: 0 }
//   };

//   return (
//     <div className="space-y-6">
//       <div className="flex items-center justify-between mb-4">
//         <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
//           <Calendar size={20} className="text-danger-500" />
//           <span>Events & Activities</span>
//         </h2>
//         <button className="btn btn-danger text-sm">Create Event</button>
//       </div>

//       <div className="bg-gradient-to-r from-danger-50 to-danger-100 rounded-xl p-6 mb-6">
//         <h3 className="text-xl font-bold text-danger-800 mb-4 text-center">"Stay Connected, Stay Informed"</h3>
//         <p className="text-center text-gray-700 mb-6">Join our community events to learn, network, and make a difference in healthcare.</p>
        
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//           {upcomingEvents.map((event) => (
//             <motion.div
//               key={event.id}
//               whileHover={{ scale: 1.02 }}
//               className="bg-white rounded-lg p-4 shadow-sm"
//             >
//               <img 
//                 src={event.image} 
//                 alt={event.title} 
//                 className="w-full h-40 object-cover rounded-lg mb-3"
//               />
//               <h4 className="font-medium text-gray-900 mb-2">{event.title}</h4>
//               <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
//                 <Calendar size={16} />
//                 <span>{format(new Date(event.date), 'MMM dd, yyyy')}</span>
//               </div>
//               <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
//                 <MapPin size={16} />
//                 <span>{event.location}</span>
//               </div>
//               <p className="text-sm text-gray-600 line-clamp-2 mb-3">{event.description}</p>
//               <div className="flex items-center justify-between">
//                 <div className="flex items-center gap-1 text-sm text-gray-600">
//                   <Users size={16} />
//                   <span>{event.attendees} attendees</span>
//                 </div>
//                 <button className="text-danger-600 text-sm hover:underline">Learn More</button>
//               </div>
//             </motion.div>
//           ))}
//         </div>
//       </div>

//       <div className="mt-8">
//         <h3 className="text-lg font-semibold text-gray-900 mb-4">Past Events</h3>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           {pastEvents.map((event) => (
//             <motion.div
//               key={event.id}
//               whileHover={{ scale: 1.02 }}
//               className="bg-white rounded-lg p-4 shadow-sm"
//             >
//               <img 
//                 src={event.image} 
//                 alt={event.title} 
//                 className="w-full h-40 object-cover rounded-lg mb-3"
//               />
//               <h4 className="font-medium text-gray-900 mb-2">{event.title}</h4>
//               <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
//                 <Calendar size={16} />
//                 <span>{format(new Date(event.date), 'MMM dd, yyyy')}</span>
//               </div>
//               <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
//                 <MapPin size={16} />
//                 <span>{event.location}</span>
//               </div>
//               <p className="text-sm text-gray-600 line-clamp-2 mb-3">{event.description}</p>
//               <div className="flex items-center justify-between">
//                 <div className="flex items-center gap-1 text-sm text-gray-600">
//                   <Users size={16} />
//                   <span>{event.attendees} attendees</span>
//                 </div>
//                 <button className="text-danger-600 text-sm hover:underline">View Recap</button>
//               </div>
//             </motion.div>
//           ))}
//         </div>
//         <div className="mt-4 flex justify-center">
//           <button className="btn btn-outline-danger">View More Past Events</button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EventsActivities;
'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Users, MapPin } from 'lucide-react';
import { format } from 'date-fns';

const EventsActivities: React.FC = () => {
  const upcomingEvents = [
    {
      id: 'e1',
      title: 'Morning Yoga at Cubbon Park',
      date: '2025-03-20',
      location: 'Cubbon Park, Bangalore',
      image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
      description: 'Start your day with a rejuvenating yoga session amidst the serene greenery of Cubbon Park.',
      attendees: 50
    },
    {
      id: 'e2',
      title: 'Meditation & Mindfulness Workshop',
      date: '2025-04-10',
      location: 'Indiranagar, Bangalore',
      image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
      description: 'Learn mindfulness techniques to reduce stress and improve mental well-being.',
      attendees: 30
    },
    {
      id: 'e3',
      title: 'Healthy Cooking Class',
      date: '2025-05-15',
      location: 'Koramangala, Bangalore',
      image: 'https://images.unsplash.com/photo-1498837167922-d004275ee312?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
      description: 'Discover how to prepare delicious and nutritious meals with expert chefs.',
      attendees: 20
    }
  ];

  const pastEvents = [
    {
      id: 'pe1',
      title: 'Sunset Yoga at Lalbagh',
      date: '2024-10-15',
      location: 'Lalbagh Botanical Garden, Bangalore',
      image: 'https://images.unsplash.com/photo-1603988363607-e1e4a69562e3?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
      description: 'A relaxing yoga session during the beautiful sunset at Lalbagh.',
      attendees: 40
    },
    {
      id: 'pe2',
      title: 'Wellness Walk at Ulsoor Lake',
      date: '2024-08-20',
      location: 'Ulsoor Lake, Bangalore',
      image: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
      description: 'A guided walk around Ulsoor Lake to promote physical and mental well-being.',
      attendees: 25
    }
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
          <Calendar size={20} className="text-green-500" />
          <span>Health & Wellness Events in Bangalore</span>
        </h2>
        <button className="btn btn-green text-sm bg-green-500 hover:bg-green-600 text-white">
          Create Event
        </button>
      </div>

      {/* Upcoming Events Section */}
      <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-xl p-6 mb-6">
        <h3 className="text-xl font-bold text-green-800 mb-4 text-center">"Nurture Your Mind, Body, and Soul"</h3>
        <p className="text-center text-gray-700 mb-6">Join our health and wellness events to stay active, relaxed, and connected.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {upcomingEvents.map((event) => (
            <motion.div
              key={event.id}
              whileHover={{ scale: 1.02 }}
              className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
            >
              <img 
                src={event.image} 
                alt={event.title} 
                className="w-full h-40 object-cover rounded-lg mb-3"
              />
              <h4 className="font-medium text-gray-900 mb-2">{event.title}</h4>
              <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                <Calendar size={16} className="text-green-500" />
                <span>{format(new Date(event.date), 'MMM dd, yyyy')}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                <MapPin size={16} className="text-green-500" />
                <span>{event.location}</span>
              </div>
              <p className="text-sm text-gray-600 line-clamp-2 mb-3">{event.description}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-sm text-gray-600">
                  <Users size={16} className="text-green-500" />
                  <span>{event.attendees} attendees</span>
                </div>
                <button className="text-green-600 text-sm hover:underline">Learn More</button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Past Events Section */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Past Events</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {pastEvents.map((event) => (
            <motion.div
              key={event.id}
              whileHover={{ scale: 1.02 }}
              className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
            >
              <img 
                src={event.image} 
                alt={event.title} 
                className="w-full h-40 object-cover rounded-lg mb-3"
              />
              <h4 className="font-medium text-gray-900 mb-2">{event.title}</h4>
              <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                <Calendar size={16} className="text-green-500" />
                <span>{format(new Date(event.date), 'MMM dd, yyyy')}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                <MapPin size={16} className="text-green-500" />
                <span>{event.location}</span>
              </div>
              <p className="text-sm text-gray-600 line-clamp-2 mb-3">{event.description}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-sm text-gray-600">
                  <Users size={16} className="text-green-500" />
                  <span>{event.attendees} attendees</span>
                </div>
                <button className="text-green-600 text-sm hover:underline">View Recap</button>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="mt-4 flex justify-center">
          <button className="btn btn-outline-green text-green-500 hover:bg-green-50">
            View More Past Events
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventsActivities;