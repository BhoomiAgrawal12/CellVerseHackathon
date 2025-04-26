'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, User, Heart, Droplet, AlertCircle } from 'lucide-react';

interface PatientInfoFormProps {
  onSubmit: (info: any) => void;
}

const PatientInfoForm: React.FC<PatientInfoFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    age: '',
    gender: '',
    bloodPressure: '',
    sugarLevel: '',
    allergies: '',
    existingConditions: '',
    height: '',
    weight: '',
    smokingStatus: 'non-smoker',
    alcoholConsumption: 'none',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="max-w-6xl mx-auto">
      <motion.div 
        className="bg-white rounded-2xl shadow-lg overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="bg-gradient-to-r from-emerald-500 to-blue-500 py-6 px-8">
          <h2 className="text-2xl font-bold text-white">Basic Health Information</h2>
          <p className="text-emerald-50">Please provide your health details to get personalized recommendations</p>
        </div>
        
        <form onSubmit={handleSubmit} className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div 
              className="col-span-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              <label className=" text-gray-700 font-medium mb-2 flex items-center">
                <User size={18} className="mr-2 text-emerald-500" />
                Age
              </label>
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                placeholder="Enter your age"
              />
            </motion.div>
            
            <motion.div 
              className="col-span-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <label className=" text-gray-700 font-medium mb-2 flex items-center">
                <User size={18} className="mr-2 text-emerald-500" />
                Gender
              </label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
              >
                <option value="">Select gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </motion.div>
            
            <motion.div 
              className="col-span-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <label className=" text-gray-700 font-medium mb-2 flex items-center">
                <Heart size={18} className="mr-2 text-emerald-500" />
                Blood Pressure (mmHg)
              </label>
              <input
                type="text"
                name="bloodPressure"
                value={formData.bloodPressure}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                placeholder="e.g., 120/80"
              />
            </motion.div>
            
            <motion.div 
              className="col-span-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <label className=" text-gray-700 font-medium mb-2 flex items-center">
                <Droplet size={18} className="mr-2 text-emerald-500" />
                Blood Sugar Level (mg/dL)
              </label>
              <input
                type="text"
                name="sugarLevel"
                value={formData.sugarLevel}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                placeholder="e.g., 100"
              />
            </motion.div>
            
            <motion.div 
              className="col-span-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <label className=" text-gray-700 font-medium mb-2 flex items-center">
                <User size={18} className="mr-2 text-emerald-500" />
                Height (cm)
              </label>
              <input
                type="number"
                name="height"
                value={formData.height}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                placeholder="Enter your height"
              />
            </motion.div>
            
            <motion.div 
              className="col-span-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <label className=" text-gray-700 font-medium mb-2 flex items-center">
                <User size={18} className="mr-2 text-emerald-500" />
                Weight (kg)
              </label>
              <input
                type="number"
                name="weight"
                value={formData.weight}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                placeholder="Enter your weight"
              />
            </motion.div>
            
            <motion.div 
              className="col-span-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              <label className=" text-gray-700 font-medium mb-2 flex items-center">
                <User size={18} className="mr-2 text-emerald-500" />
                Smoking Status
              </label>
              <select
                name="smokingStatus"
                value={formData.smokingStatus}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
              >
                <option value="non-smoker">Non-smoker</option>
                <option value="former-smoker">Former smoker</option>
                <option value="occasional">Occasional smoker</option>
                <option value="regular">Regular smoker</option>
              </select>
            </motion.div>
            
            <motion.div 
              className="col-span-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <label className=" text-gray-700 font-medium mb-2 flex items-center">
                <User size={18} className="mr-2 text-emerald-500" />
                Alcohol Consumption
              </label>
              <select
                name="alcoholConsumption"
                value={formData.alcoholConsumption}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
              >
                <option value="none">None</option>
                <option value="occasional">Occasional</option>
                <option value="moderate">Moderate</option>
                <option value="heavy">Heavy</option>
              </select>
            </motion.div>
            
            <motion.div 
              className="col-span-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
            >
              <label className=" text-gray-700 font-medium mb-2 flex items-center">
                <AlertCircle size={18} className="mr-2 text-emerald-500" />
                Allergies
              </label>
              <textarea
                name="allergies"
                value={formData.allergies}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                placeholder="List any allergies you have"
                rows={2}
              />
            </motion.div>
            
            <motion.div 
              className="col-span-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.0 }}
            >
              <label className=" text-gray-700 font-medium mb-2 flex items-center">
                <AlertCircle size={18} className="mr-2 text-emerald-500" />
                Existing Medical Conditions
              </label>
              <textarea
                name="existingConditions"
                value={formData.existingConditions}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                placeholder="List any existing medical conditions"
                rows={2}
              />
            </motion.div>
          </div>
          
          <motion.div 
            className="mt-8 flex justify-end"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1 }}
          >
            <motion.button
              type="submit"
              className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-2 px-6 rounded-lg shadow-md flex items-center transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Continue to Symptoms <ArrowRight className="ml-2" size={18} />
            </motion.button>
          </motion.div>
        </form>
      </motion.div>
      
      <motion.div 
        className="mt-6 text-center text-gray-500 text-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        <p>Your health information is private and secure. We use it only to provide personalized recommendations.</p>
      </motion.div>
    </div>
  );
};

export default PatientInfoForm;