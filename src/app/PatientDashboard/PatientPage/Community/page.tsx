'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Search, 
  // MessageCircle, 
 
  BookOpen, 
  Users, 
  Smile, 
  Calendar, 
  HelpCircle,
  Bell,
  CheckCircle,
  Flag,

} from 'lucide-react';


import KnowledgeHub from '../../../../components/community/KnowledgeHub';
import HealingJourneys from '../../../../components/community/HealingJourney';
import LightHeartedCorner from '../../../../components/community/LightHeartedCorner';
import EventsActivities from '../../../../components/community/EventsActivities';
import AskCommunity from '../../../../components/community/AskCommunity';

const CommunityForum: React.FC = () => {
  const [activeTab, setActiveTab] = useState('knowledge-hub');
  const [searchQuery, setSearchQuery] = useState('');

  // const container = {
  //   hidden: { opacity: 0 },
  //   show: {
  //     opacity: 1,
  //     transition: {
  //       staggerChildren: 0.1
  //     }
  //   }
  // };
  
  // const item = {
  //   hidden: { opacity: 0, y: 20 },
  //   show: { opacity: 1, y: 0 }
  // };

  const tabs = [
    { id: 'knowledge-hub', label: 'Medical Knowledge Hub', icon: <BookOpen size={18} /> },
    { id: 'healing-journeys', label: 'Healing Journeys', icon: <Users size={18} /> },
    { id: 'light-hearted', label: 'Light-Hearted Corner', icon: <Smile size={18} /> },
    { id: 'events', label: 'Events & Activities', icon: <Calendar size={18} /> },
    { id: 'ask-community', label: 'Ask the Community', icon: <HelpCircle size={18} /> },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'knowledge-hub':
        return <KnowledgeHub />;
      case 'healing-journeys':
        return <HealingJourneys />;
      case 'light-hearted':
        return <LightHeartedCorner />;
      case 'events':
        return <EventsActivities />;
      case 'ask-community':
        return <AskCommunity />;
      default:
        return <KnowledgeHub />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-blue-700">Community Forum</h1>
          <p className="text-gray-400">Connect, share, and learn with fellow healthcare professionals and patients</p>
        </div>
        {/* <div className="flex gap-3">
          <button className="btn btn-outline-primary flex items-center gap-2">
            <Bell size={16} />
            <span>Notifications</span>
          </button>
          <button className="btn btn-primary flex items-center gap-2">
            <MessageCircle size={16} />
            <span>New Post</span>
          </button>
        </div> */}
      </div>
      
      <div className="bg-white rounded-xl shadow-sm p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search topics, discussions, events..."
            className="pl-10 pr-4 py-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      
      <div className="flex overflow-x-auto pb-2 gap-2">
        {tabs.map((tab) => (
          <motion.button
            key={tab.id}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap ${
              activeTab === tab.id 
                ? 'bg-primary-100 text-primary-700 font-medium' 
                : 'bg-white text-gray-600 hover:bg-gray-100'
            }`}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </motion.button>
        ))}
      </div>
      
      <div className="bg-white rounded-xl shadow-sm p-6">
        {renderTabContent()}
      </div>
      
      <div className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-xl shadow-sm p-6 border border-primary-100">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-primary-100 p-2 rounded-full">
            <Bell size={20} className="text-primary-600 text-blue-700" />
          </div>
          <h2 className="text-xl font-semibold text-blue-700">Community Guidelines</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-yellow-50 bg-opacity-80 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle size={18} className="text-green-600" />
              <h3 className="font-medium text-gray-800">Verified Information</h3>
            </div>
            <p className="text-sm text-gray-600">All medical advice is reviewed by verified healthcare professionals for accuracy.</p>
          </div>
          
          <div className="bg-green-100 bg-opacity-80 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Flag size={18} className="text-danger-600" />
              <h3 className="font-medium text-gray-800">Report System</h3>
            </div>
            <p className="text-sm text-gray-600">Flag inappropriate content to help maintain a safe, supportive environment.</p>
          </div>
          
          <div className=" bg-opacity-80 p-4 rounded-lg bg-red-100">
            <div className="flex items-center gap-2 mb-2">
              <Users size={18} className="text-secondary-600" />
              <h3 className="font-medium text-gray-800">Active Moderation</h3>
            </div>
            <p className="text-sm text-gray-600">Our team of moderators ensures discussions remain respectful and constructive.</p>
          </div>
        </div>
      </div>
    </div>
  );
};



export default CommunityForum;


