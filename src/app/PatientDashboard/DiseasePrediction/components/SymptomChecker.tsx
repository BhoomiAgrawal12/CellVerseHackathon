// 'use client';
// import React, { useState } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { X, Search, Plus } from 'lucide-react';
// import { Symptoms } from '../data/symptom';
// import type { SymptomCheckerProps, DiseasePrediction } from '../types';

// const SymptomChecker: React.FC<SymptomCheckerProps> = ({
//   userSymptoms,
//   updateSymptoms,
//   updateDiseasePossibility,
// }) => {
//   const [searched, setSearched] = useState<string>('');
//   const API_URL = 'https://telmedsphere.onrender.com/predict';

//   const addSymptom = (symptom: string) => {
//     if (!userSymptoms.includes(symptom)) {
//       updateSymptoms([...userSymptoms, symptom]);
//       setSearched('');
//     }
//   };

//   const deleteSymptom = (symptomToDelete: string) => {
//     updateSymptoms(userSymptoms.filter(s => s !== symptomToDelete));
//   };

//   const sendSymptoms = async () => {
//     try {
//       const response = await fetch(API_URL, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(userSymptoms),
//       });
//       const result = await response.json();
//       updateDiseasePossibility(result as DiseasePrediction[]);
//     } catch (error) {
//       console.error('Error sending symptoms:', error);
//     }
//   };

//   return (
//     <div className="max-w-4xl mx-auto p-6">
//       <h2 className="text-2xl font-bold text-gray-800 mb-6">Select Your Symptoms</h2>
      
//       <div className="relative mb-6">
//         <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
//         <input
//           type="text"
//           placeholder="Search symptoms..."
//           value={searched}
//           onChange={(e) => setSearched(e.target.value)}
//           className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//         />
//       </div>

//       <div className="grid grid-cols-3 gap-4 mb-6">
//         {Symptoms.map((symptom) => (
//           <motion.div
//             key={symptom}
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             whileHover={{ scale: 1.05 }}
//             onClick={() => addSymptom(symptom)}
//             className="cursor-pointer bg-blue-300 p-3 rounded-lg text-center shadow-sm hover:bg-gray-200 transition-all"
//           >
//             {symptom}
//           </motion.div>
//         ))}
//       </div>

//       <div className="mb-6">
//         <h3 className="text-lg font-semibold text-gray-700 mb-4">Selected Symptoms</h3>
//         <div className="flex flex-wrap gap-2">
//           <AnimatePresence>
//             {userSymptoms.map((symptom) => (
//               <motion.div
//                 key={symptom}
//                 initial={{ opacity: 0, scale: 0.8 }}
//                 animate={{ opacity: 1, scale: 1 }}
//                 exit={{ opacity: 0, scale: 0.8 }}
//                 className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full flex items-center gap-2"
//               >
//                 <span>{symptom}</span>
//                 <button
//                   onClick={() => deleteSymptom(symptom)}
//                   className="hover:text-blue-600"
//                 >
//                   <X size={16} />
//                 </button>
//               </motion.div>
//             ))}
//           </AnimatePresence>
//         </div>
//       </div>

//       <div className="flex gap-4">
//         <motion.button
//           whileHover={{ scale: 1.02 }}
//           whileTap={{ scale: 0.98 }}
//           onClick={sendSymptoms}
//           disabled={userSymptoms.length === 0}
//           className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
//         >
//           Analyze Symptoms
//         </motion.button>
        
//         <motion.button
//           whileHover={{ scale: 1.02 }}
//           whileTap={{ scale: 0.98 }}
//           onClick={() => updateSymptoms([])}
//           className="px-6 py-3 border border-gray-300 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
//         >
//           Reset
//         </motion.button>
//       </div>
//     </div>
//   );
// };

// export default SymptomChecker;
'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Search } from 'lucide-react';
import { Symptoms } from '../data/symptom';
import type { SymptomCheckerProps, DiseasePrediction } from '../types';

const SymptomChecker: React.FC<SymptomCheckerProps> = ({
  userSymptoms,
  updateSymptoms,
  updateDiseasePossibility,
}) => {
  const [searched, setSearched] = useState<string>('');
  const API_URL = 'https://telmedsphere.onrender.com/predict';

  const addSymptom = (symptom: string) => {
    if (!userSymptoms.includes(symptom)) {
      updateSymptoms([...userSymptoms, symptom]);
      setSearched('');
    }
  };

  const deleteSymptom = (symptomToDelete: string) => {
    updateSymptoms(userSymptoms.filter(s => s !== symptomToDelete));
  };

  const sendSymptoms = async () => {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userSymptoms),
      });
      const result = await response.json();
      updateDiseasePossibility(result as DiseasePrediction[]);
    } catch (error) {
      console.error('Error sending symptoms:', error);
    }
  };

  // Filter symptoms based on search query
  const filteredSymptoms = Symptoms.filter(symptom =>
    symptom.toLowerCase().includes(searched.toLowerCase())
  );

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Select Your Symptoms</h2>
      
      {/* Search Input */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        <input
          type="text"
          placeholder="Search symptoms..."
          value={searched}
          onChange={(e) => setSearched(e.target.value)}
          className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {/* Symptoms Grid */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {filteredSymptoms.length > 0 ? (
          filteredSymptoms.map((symptom) => (
            <motion.div
              key={symptom}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              whileHover={{ scale: 1.05 }}
              onClick={() => addSymptom(symptom)}
              className="cursor-pointer bg-blue-300 p-3 rounded-lg text-center shadow-sm hover:bg-gray-200 transition-all"
            >
              {symptom}
            </motion.div>
          ))
        ) : (
          <p className="col-span-3 text-gray-500 text-center">No symptoms found.</p>
        )}
      </div>

      {/* Selected Symptoms */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">Selected Symptoms</h3>
        <div className="flex flex-wrap gap-2">
          <AnimatePresence>
            {userSymptoms.map((symptom) => (
              <motion.div
                key={symptom}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full flex items-center gap-2"
              >
                <span>{symptom}</span>
                <button
                  onClick={() => deleteSymptom(symptom)}
                  className="hover:text-blue-600"
                >
                  <X size={16} />
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex gap-4">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={sendSymptoms}
          disabled={userSymptoms.length === 0}
          className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          Analyze Symptoms
        </motion.button>
        
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => updateSymptoms([])}
          className="px-6 py-3 border border-gray-300 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
        >
          Reset
        </motion.button>
      </div>
    </div>
  );
};

export default SymptomChecker;
