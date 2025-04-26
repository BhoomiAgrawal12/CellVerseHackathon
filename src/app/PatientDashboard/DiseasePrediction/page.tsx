
// 'use client';
// import React, { useState } from 'react';
// import { motion } from 'framer-motion';
// // import { Activity, Home, Utensils, CheckCircle, ArrowRight } from 'lucide-react';
// import WelcomePage from './components/WelcomePage';
// import SymptomChecker from './components/SymptomChecker';
// import PredictionResult from './components/PredictionResult';
// import LifestyleRecommendations from './components/LifestyleRecommendations';
// import DietPlan from './components/DietPlan';
// import PatientInfoForm from './components/PatientInfoForm';


// function App() {
//   const [currentPage, setCurrentPage] = useState('welcome');
//   const [patientInfo, setPatientInfo] = useState({
//     age: '',
//     gender: '',
//     bloodPressure: '',
//     sugarLevel: '',
//     allergies: '',
//     existingConditions: '',
//   });
//   // // const [symptoms, setSymptoms] = useState<string[]>([]);
//   // // const [prediction, setPrediction] = useState<{ disease: string; confidence: number; description: string; recommendations: string[] }>({
//   // //   disease: '',
//   // //   confidence: 0,
//   // //   description: '',
//   // //   recommendations: [],
//   // // });

//   const handlePatientInfoSubmit = (info: any) => {
//     setPatientInfo(info);
//     setCurrentPage('symptoms');
//   };

//   // const handleSymptomSubmit = (selectedSymptoms: string[], additionalInfo: any) => {
//   //   setSymptoms(selectedSymptoms);
    
//   //   // Simulate AI prediction (in a real app, this would call an API)
//   //   const mockPredictions = [
//   //     {
//   //       disease: 'Common Cold',
//   //       confidence: 85,
//   //       description: 'A viral infectious disease of the upper respiratory tract that primarily affects the nose.',
//   //       recommendations: ['Rest', 'Stay hydrated', 'Take over-the-counter cold medications if needed']
//   //     },
//   //     {
//   //       disease: 'Seasonal Allergies',
//   //       confidence: 92,
//   //       description: 'An allergic reaction to pollen from trees, grasses, or weeds, or to airborne mold spores.',
//   //       recommendations: ['Avoid allergens', 'Use air purifiers', 'Consider antihistamines']
//   //     },
//   //     {
//   //       disease: 'Migraine',
//   //       confidence: 78,
//   //       description: 'A primary headache disorder characterized by recurrent headaches that are moderate to severe.',
//   //       recommendations: ['Rest in a dark, quiet room', 'Stay hydrated', 'Manage stress levels']
//   //     }
//   //   ];
    
//   //   // Simple mock logic to select a prediction based on symptoms
//   //   let selectedPrediction;
//   //   if (selectedSymptoms.includes('Runny nose') || selectedSymptoms.includes('Cough')) {
//   //     selectedPrediction = mockPredictions[0];
//   //   } else if (selectedSymptoms.includes('Sneezing') || selectedSymptoms.includes('Itchy eyes')) {
//   //     selectedPrediction = mockPredictions[1];
//   //   } else {
//   //     selectedPrediction = mockPredictions[2];
//   //   }
    
//   //   setPrediction(selectedPrediction);
//   //   setCurrentPage('prediction');
//   // };
//   const [userSymptoms, setUserSymptoms] = useState([]);
//   const [diseasePossibility, setDiseasePossibility] = useState([]);

//   const renderPage = () => {
//     switch (currentPage) {
//       case 'welcome':
//         return <WelcomePage onGetStarted={() => setCurrentPage('patientInfo')} />;
//       case 'patientInfo':
//         return <PatientInfoForm onSubmit={handlePatientInfoSubmit} />;
//       case 'symptoms':
//        return  <SymptomChecker
//        userSymptoms={userSymptoms}
//        updateSymptoms={setUserSymptoms}
//        updateDiseasePossibility={setDiseasePossibility}
//      />
//       case 'prediction':
//         return <PredictionResult 
//         disease_possibility={diseasePossibility}
          
//         />;
//       // case 'lifestyle':
//       //   return <LifestyleRecommendations 
//       //     prediction={prediction} 
//       //     patientInfo={patientInfo} 
//       //     onBack={() => setCurrentPage('prediction')} 
//       //     onNext={() => setCurrentPage('diet')} 
//       //   />;
//       // case 'diet':
//       //   return <DietPlan 
//       //     prediction={prediction} 
//       //     patientInfo={patientInfo} 
//       //     onBack={() => setCurrentPage('lifestyle')} 
//       //   />;
//       default:
//         return <WelcomePage onGetStarted={() => setCurrentPage('patientInfo')} />;
//     }
//   };

//   return (
//     <div className="min-h-screen w-full bg-gradient-to-br from-blue-50 to-purple-50">
   
 
      
//       <main className="container mx-auto px-4 py-4">
//         <motion.div
//           key={currentPage}
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           exit={{ opacity: 0, y: -20 }}
//           transition={{ duration: 0.3 }}
//         >
//           {renderPage()}
//         </motion.div>
//       </main>
//       </div>
//   );
// }

// export default App;

// 'use client';
// import React, { useState } from 'react';
// import { motion } from 'framer-motion';
// import WelcomePage from './components/WelcomePage';
// import SymptomChecker from './components/SymptomChecker';
// import PredictionResult from './components/PredictionResult';
// import PatientInfoForm from './components/PatientInfoForm';

// interface PatientInfo {
//   age: string;
//   gender: string;
//   bloodPressure: string;
//   sugarLevel: string;
//   allergies: string;
//   existingConditions: string;
// }

// interface DiseasePossibility {
//   disease: string; // Change from 'name' to 'disease'
//   probability: number; // Change from 'confidence' to 'probability'
//   description: string; // Add missing property
//   precautions: string[]; // Add missing property
// }


// function App() {
//   const [currentPage, setCurrentPage] = useState<string>('welcome');
//   const [patientInfo, setPatientInfo] = useState<PatientInfo>({
//     age: '',
//     gender: '',
//     bloodPressure: '',
//     sugarLevel: '',
//     allergies: '',
//     existingConditions: '',
//   });

//   const [userSymptoms, setUserSymptoms] = useState<string[]>([]);
//   const [diseasePossibility, setDiseasePossibility] = useState<DiseasePossibility[]>([]);

//   const handlePatientInfoSubmit = (info: PatientInfo) => {
//     setPatientInfo(info);
//     setCurrentPage('symptoms');
//   };

//   const renderPage = () => {
//     switch (currentPage) {
//       case 'welcome':
//         return <WelcomePage onGetStarted={() => setCurrentPage('patientInfo')} />;
//       case 'patientInfo':
//         return <PatientInfoForm onSubmit={handlePatientInfoSubmit} />;
//       case 'symptoms':
//         return (
//           <SymptomChecker
//             userSymptoms={userSymptoms}
//             updateSymptoms={setUserSymptoms}
//             updateDiseasePossibility={setDiseasePossibility}
//           />
//         );
//         case 'prediction':
//           // return <PredictionResult diseasePossibility={diseasePossibility} />;
//           return <PredictionResult diseasePossibility={diseasePossibility as DiseasePrediction[]} />;

        
//       default:
//         return <WelcomePage onGetStarted={() => setCurrentPage('patientInfo')} />;
//     }
//   };

//   return (
//     <div className="min-h-screen w-full bg-gradient-to-br from-blue-50 to-purple-50">
//       <main className="container mx-auto px-4 py-4">
//         <motion.div
//           key={currentPage}
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           exit={{ opacity: 0, y: -20 }}
//           transition={{ duration: 0.3 }}
//         >
//           {renderPage()}
//         </motion.div>
//       </main>
//     </div>
//   );
// }

// export default App;
'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import WelcomePage from './components/WelcomePage';
import SymptomChecker from './components/SymptomChecker';
import PredictionResult from './components/PredictionResult';
import PatientInfoForm from './components/PatientInfoForm';
import type { PatientInfo, DiseasePrediction } from './types';

function App() {
  const [currentPage, setCurrentPage] = useState<'welcome' | 'patientInfo' | 'symptoms' | 'prediction'>('welcome');
  const [patientInfo, setPatientInfo] = useState<PatientInfo>({
    age: '',
    gender: '',
    bloodPressure: '',
    sugarLevel: '',
    allergies: '',
    existingConditions: '',
  });
  const [userSymptoms, setUserSymptoms] = useState<string[]>([]);
  const [diseasePossibility, setDiseasePossibility] = useState<DiseasePrediction[]>([]);

  const handlePatientInfoSubmit = (info: PatientInfo) => {
    setPatientInfo(info);
    setCurrentPage('symptoms');
  };

  const handlePredictionComplete = (predictions: DiseasePrediction[]) => {
    setDiseasePossibility(predictions);
    setCurrentPage('prediction');
  };

  const pageComponents = {
    welcome: <WelcomePage onGetStarted={() => setCurrentPage('patientInfo')} />,
    patientInfo: <PatientInfoForm onSubmit={handlePatientInfoSubmit} />,
    symptoms: (
      <SymptomChecker
        userSymptoms={userSymptoms}
        updateSymptoms={setUserSymptoms}
        updateDiseasePossibility={handlePredictionComplete}
      />
    ),
    prediction: <PredictionResult diseasePossibility={diseasePossibility} />,
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-50 to-indigo-50">
      <main className="container mx-auto px-4 py-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {pageComponents[currentPage]}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}

export default App;