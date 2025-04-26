import { motion } from 'framer-motion';
import { 
  MessageCircle, 
  HelpCircle,
  Eye
} from 'lucide-react';

import { format } from 'date-fns';

const AskCommunity: React.FC = () => {
  const questions = [
    {
      id: 'q1',
      title: 'What are the best practices for managing chronic pain?',
      author: 'John Doe',
      authorImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
      date: '2025-03-10',
      replies: 12,
      views: 156
    },
    {
      id: 'q2',
      title: 'How can I improve my sleep quality?',
      author: 'Jane Smith',
      authorImage: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
      date: '2025-03-12',
      replies: 8,
      views: 98
    },
    {
      id: 'q3',
      title: 'What are the latest treatments for migraines?',
      author: 'Michael Brown',
      authorImage: 'https://images.unsplash.com/photo-1552058544-f2b08422138a?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
      date: '2025-03-15',
      replies: 15,
      views: 210
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
        <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
          <HelpCircle size={20} className="text-success-500" />
          <span>Ask the Community</span>
        </h2>
        <button className="btn btn-success text-sm">Ask Question</button>
      </div>

      <div className="bg-gradient-to-r from-success-50 to-success-100 rounded-xl p-6 mb-6">
        <h3 className="text-xl font-bold text-success-800 mb-4 text-center">"Your Questions, Our Answers"</h3>
        <p className="text-center text-gray-700 mb-6">Get answers to your health-related questions from our community of experts and peers.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {questions.map((question) => (
            <motion.div
              key={question.id}
              whileHover={{ scale: 1.02 }}
              className="bg-white rounded-lg p-4 shadow-sm"
            >
              <h4 className="font-medium text-gray-900 mb-2">{question.title}</h4>
              <div className="flex items-center gap-3 mb-3">
                <img 
                  src={question.authorImage} 
                  alt={question.author} 
                  className="h-8 w-8 rounded-full object-cover"
                />
                <div className="text-xs">
                  <div className="font-medium text-gray-900">{question.author}</div>
                  <div className="text-gray-500">{format(new Date(question.date), 'MMM dd, yyyy')}</div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1 text-sm text-gray-600">
                    <MessageCircle size={16} />
                    <span>{question.replies} replies</span>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-gray-600">
                    <Eye size={16} />
                    <span>{question.views} views</span>
                  </div>
                </div>
                <button className="text-success-600 text-sm hover:underline">View Answers</button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="mt-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Most Active Discussions</h3>
        <div className="space-y-4">
          {[1, 2, 3].map((item) => (
            <motion.div
              key={item}
              whileHover={{ x: 5 }}
              className="bg-white p-4 rounded-lg border border-gray-100"
            >
              <h4 className="font-medium text-gray-900 mb-2">How to manage stress during medical residency?</h4>
              <div className="flex items-center gap-3 mb-3">
                <img 
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80" 
                  alt="Anna Williams" 
                  className="h-8 w-8 rounded-full object-cover"
                />
                <div className="text-xs">
                  <div className="font-medium text-gray-900">Anna Williams</div>
                  <div className="text-gray-500">March 18, 2025</div>
                </div>
              </div>
              <p className="text-sm text-gray-600 line-clamp-2 mb-3">I'm currently in my second year of residency and feeling overwhelmed. Any tips on managing stress and maintaining work-life balance?</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1 text-sm text-gray-600">
                    <MessageCircle size={16} />
                    <span>24 replies</span>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-gray-600">
                    <Eye size={16} />
                    <span>156 views</span>
                  </div>
                </div>
                <button className="text-success-600 text-sm hover:underline">Join Discussion</button>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="mt-4 flex justify-center">
          <button className="btn btn-outline-success">View More Discussions</button>
        </div>
      </div>
    </div>
  );
};

export default AskCommunity;