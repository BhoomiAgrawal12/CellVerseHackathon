

'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, Download, Share2 } from 'lucide-react';
import type { PredictionResultProps } from '../types';

const PredictionResult: React.FC<PredictionResultProps> = ({ diseasePossibility }) => {
  const sortedDiseases = [...diseasePossibility]
    .filter(d => d.probability)
    .sort((a, b) => b.probability - a.probability);

  const handleDownload = () => {
    // Logic to download the results
    const element = document.createElement("a");
    const file = new Blob([JSON.stringify(sortedDiseases, null, 2)], { type: 'application/json' });
    element.href = URL.createObjectURL(file);
    element.download = "diagnosis_report.json";
    document.body.appendChild(element);
    element.click();
  };

  const handleShare = () => {
    // Logic to share the results
    if (navigator.share) {
      navigator.share({
        title: 'Diagnosis Report',
        text: 'Check out my diagnosis report!',
        url: window.location.href,
      }).catch(console.error);
    } else {
      alert('Sharing is not supported in this browser.');
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-8">
        <div className="flex items-center">
          <AlertTriangle className="text-yellow-400 mr-3" size={24} />
          <p className="text-sm text-yellow-700">
            This is an AI-powered prediction and should not be considered as a replacement for professional medical advice.
            Please consult with a healthcare provider for proper diagnosis and treatment.
          </p>
        </div>
      </div>

      <h2 className="text-4xl font-bold text-blue-800 mb-6 font-semibold">Diagnosis Report</h2>

      <div className="flex justify-between mb-6">
        <button onClick={handleDownload} className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-md shadow hover:bg-blue-600 transition">
          <Download className="mr-2" size={16} /> Download
        </button>
        <button onClick={handleShare} className="flex items-center bg-green-500 text-white px-4 py-2 rounded-md shadow hover:bg-green-600 transition">
          <Share2 className="mr-2" size={16} /> Share
        </button>
      </div>

      {sortedDiseases.length > 0 ? (
        <div className="space-y-6">
          {sortedDiseases.map((disease, index) => (
            <motion.div
              key={disease.disease}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-pastel-100 rounded-lg shadow-lg p-6 border border-gray-200"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-blue-800">{disease.disease}</h3>
                <div className="text-right">
                  <div className="text-sm text-gray-500">Probability</div>
                  <div className="text-lg font-bold text-blue-600">
                    {(disease.probability * 100).toFixed(1)}%
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <h4 className="text-lg font-medium text-blue-700 semibold mb-2">Description</h4>
                <p className="text-gray-600">
                  {disease.description || "No description available."}
                </p>
              </div>

              <div>
                <h4 className="text-lg font-medium text-blue-700  semibold mb-2">Precautions</h4>
                {disease.precautions && disease.precautions.length > 0 ? (
                  <ul className="list-disc list-inside space-y-2">
                    {disease.precautions.map((precaution, i) => (
                      <li key={i} className="text-gray-600">{precaution}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-blue-600">No precautions available.</p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <p className="text-gray-600">No diseases predicted.</p>
      )}
    </div>
  );
};

export default PredictionResult;