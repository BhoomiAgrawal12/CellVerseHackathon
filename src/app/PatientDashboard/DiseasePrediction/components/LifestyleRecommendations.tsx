// 'use client';
// import React from 'react';
// import { motion } from 'framer-motion';
// import { Activity, Heart, Brain, Moon, ArrowLeft, ArrowRight } from 'lucide-react';

// interface LifestyleRecommendationsProps {
//   prediction: {
//     disease: string;
//     confidence: number;
//     description: string;
//     recommendations: string[];
//   };
//   patientInfo: any;
//   onBack: () => void;
//   onNext: () => void;
// }

// const LifestyleRecommendations: React.FC<LifestyleRecommendationsProps> = ({ 
//   prediction, 
//   patientInfo, 
//   onBack, 
//   onNext 
// }) => {
//   // Generate exercise recommendations based on condition and patient info
//   const getExerciseRecommendations = () => {
//     const age = parseInt(patientInfo.age) || 30;
    
//     // Base recommendations
//     const recommendations = [
//       {
//         title: "Walking",
//         description: "Start with 15-20 minutes daily, gradually increasing to 30-45 minutes.",
//         intensity: "Low to moderate",
//         frequency: "5-7 days per week",
//         benefits: "Improves cardiovascular health, helps maintain healthy weight, reduces stress"
//       },
//       {
//         title: "Stretching",
//         description: "Gentle stretching exercises for 10-15 minutes to improve flexibility.",
//         intensity: "Low",
//         frequency: "Daily",
//         benefits: "Improves flexibility, reduces muscle tension, helps prevent injuries"
//       }
//     ];
    
//     // Add condition-specific recommendations
//     if (prediction.disease === "Common Cold") {
//       recommendations.push({
//         title: "Rest",
//         description: "Focus on rest during acute symptoms. Resume light activity when feeling better.",
//         intensity: "Very low",
//         frequency: "As needed during illness",
//         benefits: "Allows body to direct energy toward fighting infection"
//       });
//     } else if (prediction.disease === "Seasonal Allergies") {
//       recommendations.push({
//         title: "Indoor Exercise",
//         description: "Consider indoor exercises during high pollen days.",
//         intensity: "Moderate",
//         frequency: "3-5 days per week",
//         benefits: "Avoids exposure to allergens while maintaining activity"
//       });
//     } else if (prediction.disease === "Migraine") {
//       recommendations.push({
//         title: "Yoga",
//         description: "Gentle yoga focusing on breathing and relaxation.",
//         intensity: "Low",
//         frequency: "2-3 days per week",
//         benefits: "Reduces stress, improves circulation, may help prevent migraines"
//       });
//     }
    
//     // Age-specific adjustments
//     if (age > 60) {
//       recommendations.push({
//         title: "Balance Exercises",
//         description: "Simple balance exercises like standing on one foot or heel-to-toe walks.",
//         intensity: "Low",
//         frequency: "2-3 days per week",
//         benefits: "Improves stability, helps prevent falls, maintains independence"
//       });
//     } else if (age < 40) {
//       recommendations.push({
//         title: "Strength Training",
//         description: "Light to moderate strength training with resistance bands or light weights.",
//         intensity: "Moderate",
//         frequency: "2-3 days per week",
//         benefits: "Builds muscle, improves metabolism, enhances overall fitness"
//       });
//     }
    
//     return recommendations;
//   };

//   const exerciseRecommendations = getExerciseRecommendations();
  
//   // Stress management recommendations
//   const stressManagementTips = [
//     {
//       title: "Deep Breathing",
//       description: "Practice deep breathing for 5 minutes, 3 times daily. Inhale slowly through your nose for 4 counts, hold for 2, and exhale through your mouth for 6 counts.",
//       icon: <Brain size={24} className="text-purple-500" />
//     },
//     {
//       title: "Mindful Meditation",
//       description: "Set aside 10-15 minutes daily for mindful meditation. Focus on your breath and observe thoughts without judgment.",
//       icon: <Brain size={24} className="text-purple-500" />
//     },
//     {
//       title: "Sleep Hygiene",
//       description: "Aim for 7-9 hours of quality sleep. Maintain a consistent sleep schedule and create a restful environment.",
//       icon: <Moon size={24} className="text-indigo-500" />
//     },
//     {
//       title: "Social Connection",
//       description: "Maintain social connections with friends and family. Share your feelings and concerns with trusted individuals.",
//       icon: <Heart size={24} className="text-pink-500" />
//     }
//   ];
  
//   // Daily activity goals
//   const dailyActivityGoals = [
//     "Take at least 8,000 steps daily",
//     "Stand up and stretch every hour during sedentary activities",
//     "Perform 10 minutes of light physical activity after each meal",
//     "Practice deep breathing exercises during moments of stress",
//     "Spend at least 15 minutes outdoors in natural light"
//   ];

//   return (
//     <div className="max-w-7xl mx-auto">
//       <motion.div 
//         className="bg-white rounded-2xl shadow-lg overflow-hidden"
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5 }}
//       >
//         <div className="bg-gradient-to-r from-blue-500 to-emerald-500 py-6 px-8">
//           <h2 className="text-2xl font-bold text-white">Lifestyle Recommendations</h2>
//           <p className="text-blue-50">Personalized activity and wellness plan for {prediction.disease}</p>
//         </div>
        
//         <div className="p-8">
//           {/* Exercise Plan */}
//           <motion.section 
//             className="mb-10"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 0.1 }}
//           >
//             <div className="flex items-center mb-6">
//               <div className="bg-blue-100 p-3 rounded-full mr-4">
//                 <Activity size={24} className="text-blue-600" />
//               </div>
//               <h3 className="text-xl font-bold text-gray-800">Personalized Exercise Plan</h3>
//             </div>
            
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               {exerciseRecommendations.map((exercise, index) => (
//                 <motion.div 
//                   key={index}
//                   className="bg-gray-50 rounded-xl p-6 border border-gray-200 hover:shadow-md transition-shadow"
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: 0.2 + index * 0.1 }}
//                   whileHover={{ y: -5 }}
//                 >
//                   <h4 className="text-lg font-semibold text-gray-800 mb-2">{exercise.title}</h4>
//                   <p className="text-gray-600 mb-4">{exercise.description}</p>
//                   <div className="grid grid-cols-2 gap-2 text-sm">
//                     <div>
//                       <span className="font-medium text-blue-600">Intensity:</span>
//                       <p className="text-gray-700">{exercise.intensity}</p>
//                     </div>
//                     <div>
//                       <span className="font-medium text-blue-600">Frequency:</span>
//                       <p className="text-gray-700">{exercise.frequency}</p>
//                     </div>
//                   </div>
//                   <div className="mt-3">
//                     <span className="font-medium text-blue-600 text-sm">Benefits:</span>
//                     <p className="text-gray-700 text-sm">{exercise.benefits}</p>
//                   </div>
//                 </motion.div>
//               ))}
//             </div>
//           </motion.section>
          
//           {/* Stress Management */}
//           <motion.section 
//             className="mb-10"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 0.4 }}
//           >
//             <div className="flex items-center mb-6">
//               <div className="bg-purple-100 p-3 rounded-full mr-4">
//                 <Brain size={24} className="text-purple-600" />
//               </div>
//               <h3 className="text-xl font-bold text-gray-800">Stress Management & Mental Wellness</h3>
//             </div>
            
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               {stressManagementTips.map((tip, index) => (
//                 <motion.div 
//                   key={index}
//                   className="bg-gray-50 rounded-xl p-6 border border-gray-200 hover:shadow-md transition-shadow"
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: 0.5 + index * 0.1 }}
//                   whileHover={{ y: -5 }}
//                 >
//                   <div className="flex items-center mb-3">
//                     {tip.icon}
//                     <h4 className="text-lg font-semibold text-gray-800 ml-2">{tip.title}</h4>
//                   </div>
//                   <p className="text-gray-600">{tip.description}</p>
//                 </motion.div>
//               ))}
//             </div>
//           </motion.section>
          
//           {/* Daily Activity Goals */}
//           <motion.section 
//             className="mb-6"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 0.7 }}
//           >
//             <div className="flex items-center mb-6">
//               <div className="bg-emerald-100 p-3 rounded-full mr-4">
//                 <Heart size={24} className="text-emerald-600" />
//               </div>
//               <h3 className="text-xl font-bold text-gray-800">Daily Activity Goals</h3>
//             </div>
            
//             <div className="bg-emerald-50 rounded-xl p-6 border border-emerald-100">
//               <ul className="space-y-3">
//                 {dailyActivityGoals.map((goal, index) => (
//                   <motion.li 
//                     key={index} 
//                     className="flex items-start"
//                     initial={{ opacity: 0, x: -10 }}
//                     animate={{ opacity: 1, x: 0 }}
//                     transition={{ delay: 0.8 + index * 0.1 }}
//                   >
//                     <div className="bg-white p-1 rounded-full mr-3 mt-0.5">
//                       <Activity size={16} className="text-emerald-500" />
//                     </div>
//                     <span className="text-gray-700">{goal}</span>
//                   </motion.li>
//                 ))}
//               </ul>
//             </div>
//           </motion.section>
          
//           {/* Important Note */}
//           <motion.div 
//             className="bg-amber-50 p-6 rounded-xl border border-amber-100 mb-8"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 0.9 }}
//           >
//             <h4 className="text-lg font-semibold text-amber-700 mb-2">Important Note</h4>
//             <p className="text-amber-700">
//               Always start any new exercise program gradually and listen to your body. If you experience pain, 
//               dizziness, or unusual discomfort, stop the activity and consult with a healthcare professional.
//             </p>
//           </motion.div>
          
//           {/* Navigation Buttons */}
//           <motion.div 
//             className="flex justify-between mt-8"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 1.0 }}
//           >
//             <motion.button
//               onClick={onBack}
//               className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-6 rounded-lg flex items-center transition-all duration-300"
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//             >
//               <ArrowLeft className="mr-2" size={18} />
//               Back to Prediction
//             </motion.button>
            
//             <motion.button
//               onClick={onNext}
//               className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-2 px-6 rounded-lg flex items-center transition-all duration-300"
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//             >
//               View Diet Plan
//               <ArrowRight className="ml-2" size={18} />
//             </motion.button>
//           </motion.div>
//         </div>
//       </motion.div>
//     </div>
//   );
// };

// export default LifestyleRecommendations;
'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { Activity, Heart,  ArrowLeft, ArrowRight } from 'lucide-react';

interface Prediction {
  disease: string;
  confidence: number;
  description: string;
  recommendations: string[];
}

interface PatientInfo {
  age?: number | string;
  gender?: string;
}

interface LifestyleRecommendationsProps {
  prediction: Prediction;
  patientInfo: PatientInfo;
  onBack: () => void;
  onNext: () => void;
}

const LifestyleRecommendations: React.FC<LifestyleRecommendationsProps> = ({ 
  prediction, 
  patientInfo, 
  onBack, 
  onNext 
}) => {
  const age = Number(patientInfo.age) || 30;

  const getExerciseRecommendations = () => {
    const recommendations = [
      {
        title: "Walking",
        description: "Start with 15-20 minutes daily, gradually increasing to 30-45 minutes.",
        intensity: "Low to moderate",
        frequency: "5-7 days per week",
        benefits: "Improves cardiovascular health, helps maintain healthy weight, reduces stress"
      },
      {
        title: "Stretching",
        description: "Gentle stretching exercises for 10-15 minutes to improve flexibility.",
        intensity: "Low",
        frequency: "Daily",
        benefits: "Improves flexibility, reduces muscle tension, helps prevent injuries"
      }
    ];

    if (prediction.disease === "Common Cold") {
      recommendations.push({
        title: "Rest",
        description: "Focus on rest during acute symptoms. Resume light activity when feeling better.",
        intensity: "Very low",
        frequency: "As needed during illness",
        benefits: "Allows body to direct energy toward fighting infection"
      });
    } else if (prediction.disease === "Seasonal Allergies") {
      recommendations.push({
        title: "Indoor Exercise",
        description: "Consider indoor exercises during high pollen days.",
        intensity: "Moderate",
        frequency: "3-5 days per week",
        benefits: "Avoids exposure to allergens while maintaining activity"
      });
    } else if (prediction.disease === "Migraine") {
      recommendations.push({
        title: "Yoga",
        description: "Gentle yoga focusing on breathing and relaxation.",
        intensity: "Low",
        frequency: "2-3 days per week",
        benefits: "Reduces stress, improves circulation, may help prevent migraines"
      });
    }

    if (age > 60) {
      recommendations.push({
        title: "Balance Exercises",
        description: "Simple balance exercises like standing on one foot or heel-to-toe walks.",
        intensity: "Low",
        frequency: "2-3 days per week",
        benefits: "Improves stability, helps prevent falls, maintains independence"
      });
    } else if (age < 40) {
      recommendations.push({
        title: "Strength Training",
        description: "Light to moderate strength training with resistance bands or light weights.",
        intensity: "Moderate",
        frequency: "2-3 days per week",
        benefits: "Builds muscle, improves metabolism, enhances overall fitness"
      });
    }

    return recommendations;
  };

  const exerciseRecommendations = getExerciseRecommendations();

  // const stressManagementTips = [
  //   { title: "Deep Breathing", description: "Practice deep breathing for 5 minutes, 3 times daily.", icon: <Brain size={24} className="text-purple-500" /> },
  //   { title: "Mindful Meditation", description: "Set aside 10-15 minutes daily for meditation.", icon: <Brain size={24} className="text-purple-500" /> },
  //   { title: "Sleep Hygiene", description: "Aim for 7-9 hours of quality sleep.", icon: <Moon size={24} className="text-indigo-500" /> },
  //   { title: "Social Connection", description: "Maintain social connections with friends and family.", icon: <Heart size={24} className="text-pink-500" /> }
  // ];

  const dailyActivityGoals = [
    "Take at least 8,000 steps daily",
    "Stand up and stretch every hour during sedentary activities",
    "Perform 10 minutes of light physical activity after each meal",
    "Practice deep breathing exercises during moments of stress",
    "Spend at least 15 minutes outdoors in natural light"
  ];

  return (
    <div className="max-w-7xl mx-auto">
      <motion.div className="bg-white rounded-2xl shadow-lg overflow-hidden" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <div className="bg-gradient-to-r from-blue-500 to-emerald-500 py-6 px-8">
          <h2 className="text-2xl font-bold text-white">Lifestyle Recommendations</h2>
          <p className="text-blue-50">Personalized wellness plan for {prediction.disease}</p>
        </div>

        <div className="p-8">
          <motion.section className="mb-10" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
            <div className="flex items-center mb-6">
              <div className="bg-blue-100 p-3 rounded-full mr-4">
                <Activity size={24} className="text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800">Personalized Exercise Plan</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {exerciseRecommendations.map((exercise, index) => (
                <motion.div key={index} className="bg-gray-50 rounded-xl p-6 border border-gray-200 hover:shadow-md transition-shadow" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 + index * 0.1 }} whileHover={{ y: -5 }}>
                  <h4 className="text-lg font-semibold text-gray-800 mb-2">{exercise.title}</h4>
                  <p className="text-gray-600">{exercise.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.section>

          <motion.section className="mb-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}>
            <div className="flex items-center mb-6">
              <div className="bg-emerald-100 p-3 rounded-full mr-4">
                <Heart size={24} className="text-emerald-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800">Daily Activity Goals</h3>
            </div>
            <ul className="bg-emerald-50 p-6 rounded-xl border">
              {dailyActivityGoals.map((goal, index) => (
                <motion.li key={index} className="flex items-start">
                  <Activity size={16} className="text-emerald-500 mr-2" />
                  {goal}
                </motion.li>
              ))}
            </ul>
          </motion.section>

          <div className="flex justify-between mt-8">
            <button onClick={onBack} className="bg-gray-200 hover:bg-gray-300 py-2 px-6 rounded-lg flex items-center">
              <ArrowLeft className="mr-2" size={18} /> Back
            </button>
            <button onClick={onNext} className="bg-emerald-500 hover:bg-emerald-600 py-2 px-6 rounded-lg flex items-center">
              View Diet Plan <ArrowRight className="ml-2" size={18} />
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default LifestyleRecommendations;
