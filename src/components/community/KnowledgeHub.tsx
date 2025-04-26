
'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  MessageCircle, 
  Heart, 
  Share2, 
  BookOpen, 
  CheckCircle,
  Filter,
  TrendingUp,
  Clock,
  Award,
} from 'lucide-react';

const KnowledgeHub: React.FC = () => {
  const featuredArticles = [
    {
      id: 'a1',
      title: 'Understanding Hypertension: Causes, Symptoms, and Management',
      excerpt: 'A comprehensive guide to high blood pressure, its risk factors, and effective treatment strategies.',
      image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
      author: 'Dr. Sarah Johnson',
      authorImage: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
      category: 'Cardiology',
      date: '2025-03-15',
      readTime: '8 min read',
      verified: true,
      link: 'https://www.healthline.com/health/high-blood-pressure-hypertension'
    },
    {
      id: 'a2',
      title: 'The Impact of Sleep on Cardiovascular Health',
      excerpt: 'New research reveals the critical connection between sleep quality and heart health.',
      image: 'https://i0.wp.com/www.somnologymd.com/wp-content/uploads/2023/08/2023-08-blog-heart-WP.png?fit=4000%2C2090&ssl=1',
      author: 'Dr. James Wilson',
      authorImage: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
      category: 'Cardiology',
      date: '2025-03-28',
      readTime: '12 min read',
      verified: true,
      link: 'https://www.heart.org/en/health-topics/sleep-disorders/sleep-and-heart-health'
    },
    {
      id: 'a3',
      title: 'Recent Advances in Cardiovascular Research',
      excerpt: 'A deep dive into the latest studies on heart disease prevention and treatment.',
      image: 'https://images.unsplash.com/photo-1493836512294-502baa1986e2?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
      author: 'Dr. Emily Rodriguez',
      authorImage: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
      category: 'Cardiology',
      date: '2025-04-05',
      readTime: '10 min read',
      verified: true,
      link: 'https://onlinelibrary.wiley.com/doi/full/10.1002/kjm2.12800'
    }
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-blue-800 flex items-center gap-2">
        <BookOpen size={20} className="text-primary-600" />
        <span>Medical Knowledge Hub</span>
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {featuredArticles.map((article) => (
          <motion.a
            key={article.id}
            href={article.link}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ y: -5 }}
            className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 block"
          >
            <img 
              src={article.image} 
              alt={article.title} 
              className="w-full h-40 object-cover"
            />
            <div className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-medium text-primary-700 bg-primary-50 px-2 py-1 rounded-full">{article.category}</span>
                {article.verified && (
                  <span className="text-xs font-medium text-green-700 bg-green-50 px-2 py-1 rounded-full flex items-center gap-1">
                    <CheckCircle size={12} />
                    <span>Verified</span>
                  </span>
                )}
              </div>
              <h3 className="font-medium text-gray-900 mb-2">{article.title}</h3>
              <p className="text-sm text-gray-600 mb-3 line-clamp-2">{article.excerpt}</p>
              <div className="flex items-center gap-2">
                <img 
                  src={article.authorImage} 
                  alt={article.author} 
                  className="h-8 w-8 rounded-full object-cover"
                />
                <div className="text-xs">
                  <div className="font-medium text-gray-900">{article.author}</div>
                  <div className="text-gray-500 flex items-center gap-1">
                    <Clock size={12} />
                    <span>{article.readTime}</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.a>
        ))}
      </div>
    </div>
  );
};

export default KnowledgeHub;
