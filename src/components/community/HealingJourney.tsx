// 'use client';
// import React, { useState } from 'react';
// import { motion } from 'framer-motion';
// import { 
//   MessageCircle, 
//   Heart,  
//   Users, 
//   Award,
// } from 'lucide-react';

// const HealingJourneys: React.FC = () => {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [storyTitle, setStoryTitle] = useState('');
//   const [storyContent, setStoryContent] = useState('');

//   const stories = [
//     {
//       id: 's1',
//       title: 'My Journey Through Cancer Treatment',
//       excerpt: 'After being diagnosed with stage 2 breast cancer, I embarked on a challenging but ultimately successful treatment journey.',
//       image: 'https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
//       author: 'Emily Parker',
//       authorImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
//       date: '2025-03-10',
//       likes: 156,
//       comments: 42
//     },
//     {
//       id: 's2',
//       title: 'Recovery After My Heart Surgery',
//       excerpt: 'Six months ago, I underwent open-heart surgery. Here’s how I’ve been recovering and the lessons I’ve learned along the way.',
//       image: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
//       author: 'Robert Johnson',
//       authorImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
//       date: '2025-03-15',
//       likes: 124,
//       comments: 36
//     },
//     {
//       id: 's3',
//       title: 'Living with Chronic Pain: My Daily Strategies',
//       excerpt: 'Chronic pain has been part of my life for over a decade. These are the strategies that have helped me maintain quality of life.',
//       image: 'https://images.unsplash.com/photo-1518152006812-edab29b069ac?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
//       author: 'Sophia Martinez',
//       authorImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
//       date: '2025-03-20',
//       likes: 98,
//       comments: 27
//     }
//   ];

//   const milestones = [
//     {
//       id: 'm1',
//       title: 'First Day Without Pain Medication',
//       author: 'Michael Chen',
//       authorImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
//       date: '2025-03-25',
//       description: 'After 3 months of recovery, I finally had my first day without needing any pain medication!',
//       likes: 87
//     },
//     {
//       id: 'm2',
//       title: 'Completed My First 5K Walk Post-Surgery',
//       author: 'Jennifer Williams',
//       authorImage: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
//       date: '2025-03-22',
//       description: 'Six months after my knee replacement, I completed a 5K charity walk. Slow but steady!',
//       likes: 112
//     },
//     {
//       id: 'm3',
//       title: 'One Year Cancer-Free!',
//       author: 'David Thompson',
//       authorImage: 'https://images.unsplash.com/photo-1552058544-f2b08422138a?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
//       date: '2025-03-18',
//       description: 'Today marks one year since my last cancer treatment. Celebrating this incredible milestone!',
//       likes: 245
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

//   const handleSubmitStory = () => {
//     // Handle story submission logic here
//     console.log('Story Submitted:', { title: storyTitle, content: storyContent });
//     setIsModalOpen(false);
//     setStoryTitle('');
//     setStoryContent('');
//   };

//   return (
//     <div className="space-y-6">
//       <div className="flex items-center justify-between mb-4">
//         <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
//           <Users size={20} className="text-secondary-600" />
//           <span>Healing Journeys & Personal Stories</span>
//         </h2>
//         <button 
//           className="btn btn-secondary bg-blue-500 rounded p-2 text-white text-m"
//           onClick={() => setIsModalOpen(true)}
//         >
//           Share Your Story
//         </button>
//       </div>

//       {/* Modal for Story Submission */}
//       {isModalOpen && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
//             <h1 className="text-2xl font-bold text-blue-900 mb-4">Share Your Story</h1>
//             <input
//               type="text"
//               placeholder="Story Title"
//               value={storyTitle}
//               onChange={(e) => setStoryTitle(e.target.value)}
//               className="w-full p-2 border border-gray-300 rounded-lg mb-4"
//             />
//             <textarea
//               placeholder="Write your story here..."
//               value={storyContent}
//               onChange={(e) => setStoryContent(e.target.value)}
//               className="w-full p-2 border border-gray-300 rounded-lg mb-4 h-40"
//             />
//             <div className="flex justify-end gap-3">
//               <button
//                 className="btn bg-red-500 p-3 rounded btn-outline-secondary"
//                 onClick={() => setIsModalOpen(false)}
//               >
//                 Cancel
//               </button>
//               <button
//                 className="btn bg-green-500 p-3 rounded btn-secondary"
//                 onClick={handleSubmitStory}
//               >
//                 Submit
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       <div className="bg-gradient-to-r from-secondary-50 to-accent-50 rounded-xl p-6 mb-6">
//         <div className="flex flex-col md:flex-row gap-6">
//           <div className="md:w-1/2">
//             <h3 className="text-lg font-semibold text-secondary-800 mb-2">Featured Story</h3>
//             <h2 className="text-2xl font-bold text-gray-900 mb-3">From Wheelchair to Marathon: My Recovery Journey</h2>
//             <p className="text-gray-700 mb-4">After a devastating car accident left me with multiple fractures, doctors weren't sure if I'd walk again. Three years later, I completed my first marathon. This is my story of perseverance, pain, and triumph.</p>
//             <div className="flex items-center gap-3 mb-4">
//               <img 
//                 src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80" 
//                 alt="Thomas Anderson" 
//                 className="h-10 w-10 rounded-full object-cover"
//               />
//               <div>
//                 <div className="font-medium text-gray-900">Thomas Anderson</div>
//                 <div className="text-xs text-gray-500">March 15, 2025</div>
//               </div>
//             </div>
//             <a 
//               href="https://www.jamiegane.com/blog/2018/4/25/wheelchair-user-to-marathon-runner-one-year-on" 
//               className="btn btn-secondary" 
//               target="_blank" 
//               rel="noopener noreferrer"
//             >
//               Read Full Story
//             </a>
//           </div>
//           <div className="md:w-1/2">
//             <img 
//               src="https://images.unsplash.com/photo-1594882645126-14020914d58d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
//               alt="Marathon Runner" 
//               className="rounded-lg w-full h-64 object-cover"
//             />
//           </div>
//         </div>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         {stories.map((story) => (
//           <motion.div
//             key={story.id}
//             variants={item}
//             whileHover={{ y: -5 }}
//             className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100"
//           >
//             <img 
//               src={story.image} 
//               alt={story.title} 
//               className="w-full h-40 object-cover"
//             />
//             <div className="p-4">
//               <h3 className="font-medium text-gray-900 mb-2">{story.title}</h3>
//               <p className="text-sm text-gray-600 mb-3 line-clamp-2">{story.excerpt}</p>
//               <div className="flex items-center gap-3 mb-3">
//                 <img 
//                   src={story.authorImage} 
//                   alt={story.author} 
//                   className="h-8 w-8 rounded-full object-cover"
//                 />
//                 <div className="text-xs">
//                   <div className="font-medium text-gray-900">{story.author}</div>
//                   <div className="text-gray-500">{story.date}</div>
//                 </div>
//               </div>
//               <div className="flex items-center justify-between">
//                 <div className="flex items-center gap-3">
//                   <div className="flex items-center gap-1 text-sm">
//                     <Heart size={16} className="text-danger-500" />
//                     <span>{story.likes}</span>
//                   </div>
//                   <div className="flex items-center gap-1 text-sm">
//                     <MessageCircle size={16} className="text-primary-500" />
//                     <span>{story.comments}</span>
//                   </div>
//                 </div>
//                 <button className="text-secondary-600 text-sm hover:underline">Read More</button>
//               </div>
//             </div>
//           </motion.div>
//         ))}
//       </div>

//       <div className="mt-8">
//         <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
//           <Award size={18} className="text-warning-500" />
//           <span>Progress Milestones</span>
//         </h3>
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//           {milestones.map((milestone) => (
//             <motion.div
//               key={milestone.id}
//               whileHover={{ scale: 1.03 }}
//               className="bg-gradient-to-br from-accent-50 to-white rounded-xl p-4 border border-accent-100"
//             >
//               <div className="flex items-center gap-3 mb-3">
//                 <img 
//                   src={milestone.authorImage} 
//                   alt={milestone.author} 
//                   className="h-10 w-10 rounded-full object-cover"
//                 />
//                 <div>
//                   <div className="font-medium text-gray-900">{milestone.author}</div>
//                   <div className="text-xs text-gray-500">{milestone.date}</div>
//                 </div>
//               </div>
//               <h3 className="font-medium text-gray-900 mb-2">{milestone.title}</h3>
//               <p className="text-sm text-gray-600 mb-3">{milestone.description}</p>
//               <div className="flex items-center justify-between">
//                 <button className="flex items-center gap-1 text-sm text-danger-600 hover:text-danger-700">
//                   <Heart size={16} />
//                   <span>{milestone.likes}</span>
//                 </button>
//                 <button className="text-xs text-accent-600 hover:underline">Congratulate</button>
//               </div>
//             </motion.div>
//           ))}
//         </div>
//         <div className="mt-4 flex justify-center">
//           <button className="btn btn-outline-accent">View More Milestones</button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default HealingJourneys;
'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  MessageCircle, 
  Heart,  
  Users, 
  Award,
} from 'lucide-react';

const HealingJourneys: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [storyTitle, setStoryTitle] = useState('');
  const [storyContent, setStoryContent] = useState('');

  const stories = [
    {
      id: 's1',
      title: 'My Journey Through Cancer Treatment',
      excerpt: 'After being diagnosed with stage 2 breast cancer, I embarked on a challenging but ultimately successful treatment journey.',
      image: 'https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
      author: 'Emily Parker',
      authorImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
      date: '2025-03-10',
      likes: 156,
      comments: 42
    },
    {
      id: 's2',
      title: 'Recovery After My Heart Surgery',
      excerpt: 'Six months ago, I underwent open-heart surgery. Here’s how I’ve been recovering and the lessons I’ve learned along the way.',
      image: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
      author: 'Robert Johnson',
      authorImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
      date: '2025-03-15',
      likes: 124,
      comments: 36
    },
    {
      id: 's3',
      title: 'Living with Chronic Pain: My Daily Strategies',
      excerpt: 'Chronic pain has been part of my life for over a decade. These are the strategies that have helped me maintain quality of life.',
      image: 'https://images.unsplash.com/photo-1518152006812-edab29b069ac?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
      author: 'Sophia Martinez',
      authorImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
      date: '2025-03-20',
      likes: 98,
      comments: 27
    }
  ];

  const milestones = [
    {
      id: 'm1',
      title: 'First Day Without Pain Medication',
      author: 'Michael Chen',
      authorImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
      date: '2025-03-25',
      description: 'After 3 months of recovery, I finally had my first day without needing any pain medication!',
      likes: 87
    },
    {
      id: 'm2',
      title: 'Completed My First 5K Walk Post-Surgery',
      author: 'Jennifer Williams',
      authorImage: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
      date: '2025-03-22',
      description: 'Six months after my knee replacement, I completed a 5K charity walk. Slow but steady!',
      likes: 112
    },
    {
      id: 'm3',
      title: 'One Year Cancer-Free!',
      author: 'David Thompson',
      authorImage: 'https://images.unsplash.com/photo-1552058544-f2b08422138a?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
      date: '2025-03-18',
      description: 'Today marks one year since my last cancer treatment. Celebrating this incredible milestone!',
      likes: 245
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

  const handleSubmitStory = () => {
    // Handle story submission logic here
    console.log('Story Submitted:', { title: storyTitle, content: storyContent });
    setIsModalOpen(false);
    setStoryTitle('');
    setStoryContent('');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-purple-800 flex items-center gap-2">
          <Users size={20} className="text-purple-600" />
          <span>Healing Journeys & Personal Stories</span>
        </h2>
        <button 
          className="btn btn-secondary bg-purple-600 rounded p-2 text-white text-m hover:bg-purple-700"
          onClick={() => setIsModalOpen(true)}
        >
          Share Your Story
        </button>
      </div>

      {/* Modal for Story Submission */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
            <h1 className="text-2xl font-bold text-purple-900 mb-4">Share Your Story</h1>
            <input
              type="text"
              placeholder="Story Title"
              value={storyTitle}
              onChange={(e) => setStoryTitle(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg mb-4"
            />
            <textarea
              placeholder="Write your story here..."
              value={storyContent}
              onChange={(e) => setStoryContent(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg mb-4 h-40"
            />
            <div className="flex justify-end gap-3">
              <button
                className="btn bg-red-500 p-3 rounded btn-outline-secondary hover:bg-red-600"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="btn bg-green-500 p-3 rounded btn-secondary hover:bg-green-600"
                onClick={handleSubmitStory}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 mb-6">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-1/2">
            <h3 className="text-lg font-semibold text-purple-800 mb-2">Featured Story</h3>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">From Wheelchair to Marathon: My Recovery Journey</h2>
            <p className="text-gray-700 mb-4">After a devastating car accident left me with multiple fractures, doctors weren't sure if I'd walk again. Three years later, I completed my first marathon. This is my story of perseverance, pain, and triumph.</p>
            <div className="flex items-center gap-3 mb-4">
              <img 
                src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80" 
                alt="Thomas Anderson" 
                className="h-10 w-10 rounded-full object-cover"
              />
              <div>
                <div className="font-medium text-gray-900">Thomas Anderson</div>
                <div className="text-xs text-gray-500">March 15, 2025</div>
              </div>
            </div>
            <a 
              href="https://www.jamiegane.com/blog/2018/4/25/wheelchair-user-to-marathon-runner-one-year-on" 
              className="btn btn-secondary hover:text-purple-700" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              Read Full Story
            </a>
          </div>
          <div className="md:w-1/2">
            <img 
              src="https://images.unsplash.com/photo-1594882645126-14020914d58d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
              alt="Marathon Runner" 
              className="rounded-lg w-full h-64 object-cover"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stories.map((story) => (
          <motion.div
            key={story.id}
            variants={item}
            whileHover={{ y: -5 }}
            className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100"
          >
            <img 
              src={story.image} 
              alt={story.title} 
              className="w-full h-40 object-cover"
            />
            <div className="p-4">
              <h3 className="font-medium text-gray-900 mb-2">{story.title}</h3>
              <p className="text-sm text-gray-600 mb-3 line-clamp-2">{story.excerpt}</p>
              <div className="flex items-center gap-3 mb-3">
                <img 
                  src={story.authorImage} 
                  alt={story.author} 
                  className="h-8 w-8 rounded-full object-cover"
                />
                <div className="text-xs">
                  <div className="font-medium text-gray-900">{story.author}</div>
                  <div className="text-gray-500">{story.date}</div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1 text-sm">
                    <Heart size={16} className="text-pink-500" />
                    <span>{story.likes}</span>
                  </div>
                  <div className="flex items-center gap-1 text-sm">
                    <MessageCircle size={16} className="text-blue-500" />
                    <span>{story.comments}</span>
                  </div>
                </div>
                <button className="text-purple-600 text-sm hover:underline">Read More</button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-8">
        <h3 className="text-lg font-semibold text-purple-800 mb-4 flex items-center gap-2">
          <Award size={18} className="text-yellow-500" />
          <span>Progress Milestones</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {milestones.map((milestone) => (
            <motion.div
              key={milestone.id}
              whileHover={{ scale: 1.03 }}
              className="bg-gradient-to-br from-pink-50 to-white rounded-xl p-4 border border-pink-100"
            >
              <div className="flex items-center gap-3 mb-3">
                <img 
                  src={milestone.authorImage} 
                  alt={milestone.author} 
                  className="h-10 w-10 rounded-full object-cover"
                />
                <div>
                  <div className="font-medium text-gray-900">{milestone.author}</div>
                  <div className="text-xs text-gray-500">{milestone.date}</div>
                </div>
              </div>
              <h3 className="font-medium text-gray-900 mb-2">{milestone.title}</h3>
              <p className="text-sm text-gray-600 mb-3">{milestone.description}</p>
              <div className="flex items-center justify-between">
                <button className="flex items-center gap-1 text-sm text-pink-600 hover:text-pink-700">
                  <Heart size={16} />
                  <span>{milestone.likes}</span>
                </button>
                <button className="text-xs text-purple-600 hover:underline">Congratulate</button>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="mt-4 flex justify-center">
          <button className="btn btn-outline-purple">View More Milestones</button>
        </div>
      </div>
    </div>
  );
};

export default HealingJourneys;