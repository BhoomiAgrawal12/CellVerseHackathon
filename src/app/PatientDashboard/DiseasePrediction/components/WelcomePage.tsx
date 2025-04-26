'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Activity, Utensils, Brain, CheckCircle2 } from 'lucide-react';

interface WelcomePageProps {
  onGetStarted: () => void;
}

const WelcomePage: React.FC<WelcomePageProps> = ({ onGetStarted }) => {
  // const fadeIn = {
  //   hidden: { opacity: 0, y: 20 },
  //   visible: (i: number) => ({
  //     opacity: 1,
  //     y: 0,
  //     transition: {
  //       delay: i * 0.1,
  //       duration: 0.5,
  //     }
  //   })
  // };
  const fadeIn = {
    hidden: { opacity: 0, y: 30 },
    visible: (index: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: index * 0.2, duration: 0.6, ease: "easeOut" },
    }),
  };
  return (
    <div className="max-w-7xl mx-auto">
      {/* Hero Section */}
      <motion.section 
        className="text-center py-12 md:py-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <motion.h1 
          className="text-4xl md:text-6xl font-bold text-gray-800 mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          AI-Powered <span className="text-emerald-500">Health</span> Prediction
        </motion.h1>
        <motion.p 
          className="text-xl text-gray-600 max-w-3xl mx-auto mb-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          Discover personalized health insights, disease risk assessment, and lifestyle recommendations based on your symptoms and health data.
        </motion.p>
        <motion.button
          onClick={onGetStarted}
          className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-3 px-8 rounded-full shadow-lg flex items-center mx-auto transition-all duration-300 hover:scale-105"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Get Started <ArrowRight className="ml-2" size={20} />
        </motion.button>
      </motion.section>

      {/* How It Works Section */}
      {/* <section className="py-16 bg-white rounded-2xl shadow-md mb-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">How It Works</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">Our AI-powered platform analyzes your symptoms and health data to provide personalized health insights and recommendations.</p>
        </div>
        
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { 
                icon: <CheckCircle2 size={40} className="text-emerald-500" />, 
                title: "Enter Your Info", 
                description: "Provide basic health parameters and medical history" 
              },
              { 
                icon: <Brain size={40} className="text-purple-500" />, 
                title: "AI Analysis", 
                description: "Our advanced AI analyzes your symptoms and health data" 
              },
              { 
                icon: <Activity size={40} className="text-blue-500" />, 
                title: "Get Insights", 
                description: "Receive personalized health predictions and risk assessments" 
              },
              { 
                icon: <Utensils size={40} className="text-orange-500" />, 
                title: "Follow Plan", 
                description: "Access customized lifestyle and diet recommendations" 
              }
            ].map((step, index) => (
              <motion.div 
                key={index}
                className="flex flex-col items-center text-center p-6"
                custom={index}
                variants={fadeIn}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
              >
                <div className="mb-4 p-4 bg-gray-50 rounded-full">
                  {step.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
                
                {index < 3 && (
                  <motion.div 
                    className="hidden md:block absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-1/2"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    viewport={{ once: true }}
                  >
                    <ArrowRight className="text-gray-400" size={24} />
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

      </section> */}

<section className="py-16 bg-gradient-to-b from-white to-blue-50 rounded-2xl shadow-xl mb-16">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-800 mb-4">How It Works</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Our AI-powered platform analyzes your symptoms and health data to provide personalized insights.
        </p>
      </div>

      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
          {[
            {
              icon: <CheckCircle2 size={50} className="text-white" />,
              title: "Enter Your Info",
              description: "Provide basic health parameters and medical history",
              bgColor: "from-green-400 to-green-600",
            },
            {
              icon: <Brain size={50} className="text-white" />,
              title: "AI Analysis",
              description: "Our advanced AI analyzes your symptoms and health data",
              bgColor: "from-purple-500 to-purple-700",
            },
            {
              icon: <Activity size={50} className="text-white" />,
              title: "Get Insights",
              description: "Receive personalized health predictions and risk assessments",
              bgColor: "from-blue-500 to-blue-700",
            },
            {
              icon: <Utensils size={50} className="text-white" />,
              title: "Follow Plan",
              description: "Access customized lifestyle and diet recommendations",
              bgColor: "from-orange-400 to-orange-600",
            },
          ].map((step, index) => (
            <motion.div
              key={index}
              className="flex flex-col items-center text-center p-6 rounded-2xl shadow-lg bg-white relative overflow-hidden group"
              custom={index}
              variants={fadeIn}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              {/* Circle Background */}
              <div className={`absolute inset-0 bg-gradient-to-r ${step.bgColor} opacity-10 group-hover:opacity-30 transition-all duration-500`} />
              
              {/* Icon with Gradient Background */}
              <div className={`mb-4 p-5 rounded-full bg-gradient-to-r ${step.bgColor} shadow-lg`}>
                {step.icon}
              </div>
              
              {/* Title and Description */}
              <h3 className="text-xl font-semibold mb-2 text-gray-800">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>

              {/* Arrow Animation */}
              {index < 3 && (
                <motion.div
                  className="hidden md:block absolute right-[-25px] top-1/2 transform -translate-y-1/2"
                  initial={{ x: -10, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  viewport={{ once: true }}
                >
                  <ArrowRight className="text-gray-400" size={32} />
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Key Features</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">Comprehensive health analysis and personalized recommendations to improve your wellbeing.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "Symptom Checker",
              description: "Advanced symptom analysis with AI-powered disease prediction",
              color: "bg-blue-100 text-blue-600"
            },
            {
              title: "Lifestyle Recommendations",
              description: "Personalized exercise plans and stress management techniques",
              color: "bg-emerald-100 text-emerald-600"
            },
            {
              title: "Nutrition Planning",
              description: "Custom diet plans based on your health profile and needs",
              color: "bg-orange-100 text-orange-600"
            }
          ].map((feature, index) => (
            <motion.div 
              key={index}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
              whileHover={{ y: -5 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              viewport={{ once: true, margin: "-50px" }}
            >
              <div className={`p-6 ${feature.color} h-24 flex items-center justify-center`}>
                <h3 className="text-xl font-bold">{feature.title}</h3>
              </div>
              <div className="p-6">
                <p className="text-gray-600">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <motion.section 
        className="py-16 text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Ready to take control of your health?</h2>
        <motion.button
          onClick={onGetStarted}
          className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-3 px-8 rounded-full shadow-lg flex items-center mx-auto transition-all duration-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Get Started Now <ArrowRight className="ml-2" size={20} />
        </motion.button>
      </motion.section>
    </div>
  );
};

export default WelcomePage;
// 'use client';
// import React from 'react';
// import { motion } from 'framer-motion';
// import { Stethoscope } from 'lucide-react';
// import type { WelcomePageProps } from '../types';

// const WelcomePage: React.FC<WelcomePageProps> = ({ onGetStarted }) => {
//   return (
//     <div className="min-h-[80vh] flex flex-col items-center justify-center">
//       <motion.div
//         initial={{ scale: 0 }}
//         animate={{ scale: 1 }}
//         transition={{ duration: 0.5 }}
//         className="text-blue-600 mb-8"
//       >
//         <Stethoscope size={64} />
//       </motion.div>
      
//       <motion.h1
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ delay: 0.2 }}
//         className="text-4xl md:text-5xl font-bold text-gray-800 mb-6 text-center"
//       >
//         AI Symptom Checker
//       </motion.h1>
      
//       <motion.p
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ delay: 0.4 }}
//         className="text-lg text-gray-600 mb-8 text-center max-w-2xl px-4"
//       >
//         Get instant insights about your health symptoms using our advanced AI-powered diagnostic tool.
//       </motion.p>
      
//       <motion.button
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ delay: 0.6 }}
//         whileHover={{ scale: 1.05 }}
//         whileTap={{ scale: 0.95 }}
//         onClick={onGetStarted}
//         className="bg-blue-600 text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:bg-blue-700 transition-colors"
//       >
//         Get Started
//       </motion.button>
//     </div>
//   );
// };

// export default WelcomePage;