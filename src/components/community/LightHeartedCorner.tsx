// 'use client';
// import React from 'react';
// import { motion } from 'framer-motion';
// import { 
// Smile, 

// } from 'lucide-react';

// const LightHeartedCorner: React.FC = () => {
//   const jokes = [
//     {
//       id: 'j1',
//       content: "Doctor: 'I'm sorry but you suffer from a terminal illness and have only 10 to live.' Patient: '10 what? Years? Months? Weeks?' Doctor: 'Nine...'",
//       author: "Dr. Humor",
//       likes: 245
//     },
//     {
//       id: 'j2',
//       content: "Patient: 'Doctor, I've broken my arm in several places.' Doctor: 'Well, stop going to those places!'",
//       author: "Medical Laughs",
//       likes: 189
//     },
//     {
//       id: 'j3',
//       content: "Why don't scientists trust atoms? Because they make up everything!",
//       author: "Science Jokes",
//       likes: 156
//     },
//     {
//       id: 'j4',
//       content: "What did the cardiologist's valentine card say? 'I'm not being arrhythmic, but you make my heart skip a beat.'",
//       author: "Heart Humor",
//       likes: 203
//     }
//   ];


//   const quotes = [
//     {
//       id: 'q1',
//       content: "The greatest wealth is health.",
//       author: "Virgil",
//       image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
//     },
//     {
//       id: 'q2',
//       content: "Happiness is nothing more than good health and a bad memory.",
//       author: "Albert Schweitzer",
//       image: "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
//     },
//     {
//       id: 'q3',
//       content: "Health is not valued until sickness comes.",
//       author: "Thomas Fuller",
//       image: "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
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
//           <Smile size={20} className="text-warning-500" />
//           <span>Light-Hearted Corner (Laughter Therapy)</span>
//         </h2>
//         <button className="btn btn-warning text-sm">Submit Joke</button>
//       </div>

//       <div className="bg-gradient-to-r from-warning-50 to-warning-100 rounded-xl p-6 mb-6">
//         <h3 className="text-xl font-bold text-warning-800 mb-4 text-center">"Laughter is the Best Medicine"</h3>
//         <p className="text-center text-gray-700 mb-6">Studies show that laughter can reduce stress, boost immunity, and even relieve pain. Take a moment to enjoy some humor and brighten your day!</p>
        
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           <motion.div
//             whileHover={{ scale: 1.02 }}
//             className="bg-white rounded-lg p-4 shadow-sm"
//           >
//             <h4 className="font-medium text-gray-900 mb-2">Joke of the Day</h4>
//             <p className="text-gray-700 mb-3 italic">
//               "A man goes to the doctor and says, 'Doctor, there's a piece of lettuce sticking out of my ear.' The doctor takes a look and says, 'That's strange, that's just the tip of the iceberg!'"
//             </p>
//             <div className="flex justify-end">
//               <button className="flex items-center gap-1 text-warning-600">
//                 <Smile size={18} />
//                 <span>That's Funny!</span>
//               </button>
//             </div>
//           </motion.div>
          
//           <motion.div
//             whileHover={{ scale: 1.02 }}
//             className="bg-white rounded-lg p-4 shadow-sm"
//           >
//             <h4 className="font-medium text-gray-900 mb-2">Medical Meme</h4>
//             <div className="flex justify-center mb-3">
//               <img 
//                 src="https://images.unsplash.com/photo-1531747118685-ca8fa6e08806?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80" 
//                 alt="Medical Meme" 
//                 className="h-40 object-cover rounded-lg"
//               />
//             </div>
//             <div className="flex justify-end">
//               <button className="flex items-center gap-1 text-warning-600">
//                 <Smile size={18} />
//                 <span>Share This</span>
//               </button>
//             </div>
//           </motion.div>
//         </div>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         <div>
//           <h3 className="text-lg font-semibold text-gray-900 mb-4">Health & Wellness Jokes</h3>
//           <div className="space-y-4">
//             {jokes.map((joke) => (
//               <motion.div
//                 key={joke.id}
//                 whileHover={{ x: 5 }}
//                 className="bg-white p-4 rounded-lg border border-gray-100"
//               >
//                 <p className="text-gray-700 mb-2 italic">"{joke.content}"</p>
//                 <div className="flex items-center justify-between">
//                   <span className="text-xs text-gray-500">- {joke.author}</span>
//                   <button className="flex items-center gap-1 text-sm text-warning-600">
//                     <Smile size={16} />
//                     <span>{joke.likes}</span>
//                   </button>
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//           <div className="mt-4 flex justify-center">
//             <button className="btn btn-outline-warning">View More Jokes</button>
//           </div>
//         </div>
        
//         <div>
//           <h3 className="text-lg font-semibold text-gray-900 mb-4">Inspirational Quotes</h3>
//           <div className="space-y-4">
//             {quotes.map((quote) => (
//               <motion.div
//                 key={quote.id}
//                 whileHover={{ scale: 1.02 }}
//                 className="relative rounded-lg overflow-hidden h-48"
//               >
//                 <img 
//                   src={quote.image} 
//                   alt={quote.content} 
//                   className="w-full h-full object-cover"
//                 />
//                 <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center p-6">
//                   <div className="text-center">
//                     <p className="text-white font-medium mb-2 italic">"{quote.content}"</p>
//                     <p className="text-white text-sm">- {quote.author}</p>
//                   </div>
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//           <div className="mt-4 flex justify-center">
//             <button className="btn btn-outline-warning">View More Quotes</button>
//           </div>
//         </div>
//       </div>


      
//     </div> 
//   );
// };

// export default LightHeartedCorner;
'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { Smile } from 'lucide-react';

const LightHeartedCorner: React.FC = () => {
  const jokes = [
    {
      id: 'j1',
      content: "Doctor: 'I'm sorry but you suffer from a terminal illness and have only 10 to live.' Patient: '10 what? Years? Months? Weeks?' Doctor: 'Nine...'",
      author: "Dr. Humor",
      likes: 245
    },
    {
      id: 'j2',
      content: "Patient: 'Doctor, I've broken my arm in several places.' Doctor: 'Well, stop going to those places!'",
      author: "Medical Laughs",
      likes: 189
    },
    {
      id: 'j3',
      content: "Why don't scientists trust atoms? Because they make up everything!",
      author: "Science Jokes",
      likes: 156
    },
    {
      id: 'j4',
      content: "What did the cardiologist's valentine card say? 'I'm not being arrhythmic, but you make my heart skip a beat.'",
      author: "Heart Humor",
      likes: 203
    }
  ];

  const quotes = [
    {
      id: 'q1',
      content: "The greatest wealth is health.",
      author: "Virgil",
      image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
    },
    {
      id: 'q2',
      content: "Happiness is nothing more than good health and a bad memory.",
      author: "Albert Schweitzer",
      image: "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
    },
    {
      id: 'q3',
      content: "Health is not valued until sickness comes.",
      author: "Thomas Fuller",
      image: "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
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
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-yellow-800 flex items-center gap-2">
          <Smile size={20} className="text-yellow-500" />
          <span>Light-Hearted Corner (Laughter Therapy)</span>
        </h2>
        <button className="btn btn-warning bg-yellow-500 hover:bg-yellow-600 text-sm text-white">
          Submit Joke
        </button>
      </div>

      <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl p-6 mb-6">
        <h3 className="text-xl font-bold text-yellow-800 mb-4 text-center">"Laughter is the Best Medicine"</h3>
        <p className="text-center text-gray-700 mb-6">Studies show that laughter can reduce stress, boost immunity, and even relieve pain. Take a moment to enjoy some humor and brighten your day!</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-white rounded-lg p-4 shadow-sm"
          >
            <h4 className="font-medium text-gray-900 mb-2">Joke of the Day</h4>
            <p className="text-gray-700 mb-3 italic">
              "A man goes to the doctor and says, 'Doctor, there's a piece of lettuce sticking out of my ear.' The doctor takes a look and says, 'That's strange, that's just the tip of the iceberg!'"
            </p>
            <div className="flex justify-end">
              <button className="flex items-center gap-1 text-yellow-600 hover:text-yellow-700">
                <Smile size={18} />
                <span>That's Funny!</span>
              </button>
            </div>
          </motion.div>
          
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-white rounded-lg p-4 shadow-sm"
          >
            <h4 className="font-medium text-gray-900 mb-2">Medical Meme</h4>
            <div className="flex justify-center mb-3">
              <img 
                src="https://images.unsplash.com/photo-1531747118685-ca8fa6e08806?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80" 
                alt="Medical Meme" 
                className="h-40 object-cover rounded-lg"
              />
            </div>
            <div className="flex justify-end">
              <button className="flex items-center gap-1 text-yellow-600 hover:text-yellow-700">
                <Smile size={18} />
                <span>Share This</span>
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-semibold text-yellow-800 mb-4">Health & Wellness Jokes</h3>
          <div className="space-y-4">
            {jokes.map((joke) => (
              <motion.div
                key={joke.id}
                whileHover={{ x: 5 }}
                className="bg-teal-50 p-4 rounded-lg border border-gray-100"
              >
                <p className="text-gray-700 mb-2 italic">"{joke.content}"</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">- {joke.author}</span>
                  <button className="flex items-center gap-1 text-sm text-yellow-600 hover:text-yellow-700">
                    <Smile size={16} />
                    <span>{joke.likes}</span>
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="mt-4 flex justify-center">
            <button className="btn btn-outline-warning bg-yellow-50 hover:bg-yellow-100 text-yellow-600">
              View More Jokes
            </button>
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-semibold text-teal-800 mb-4">Inspirational Quotes</h3>
          <div className="space-y-4">
            {quotes.map((quote) => (
              <motion.div
                key={quote.id}
                whileHover={{ scale: 1.02 }}
                className="relative rounded-lg overflow-hidden h-48"
              >
                <img 
                  src={quote.image} 
                  alt={quote.content} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center p-6">
                  <div className="text-center">
                    <p className="text-white font-medium mb-2 italic">"{quote.content}"</p>
                    <p className="text-white text-sm">- {quote.author}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="mt-4 flex justify-center">
            <button className="btn btn-outline-teal bg-teal-50 hover:bg-teal-100 text-teal-600">
              View More Quotes
            </button>
          </div>
        </div>
      </div>
    </div> 
  );
};

export default LightHeartedCorner;