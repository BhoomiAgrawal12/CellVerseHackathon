import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Heart, AlertCircle } from 'lucide-react';

export const WelcomePage: React.FC = () => {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Welcome to HealthPredict
        </h1>
        <p className="text-xl text-gray-600">
          Your AI-powered health prediction assistant
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 items-center">
        <div className="rounded-lg overflow-hidden shadow-lg">
          <img
            src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
            alt="Medical Technology"
            className="w-full h-[400px] object-cover"
          />
        </div>

        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center mb-4">
              <Shield className="h-6 w-6 text-blue-600 mr-2" />
              <h2 className="text-xl font-semibold">Terms and Conditions</h2>
            </div>
            <ul className="list-disc pl-5 space-y-2 text-gray-600">
              <li>This tool is for informational purposes only</li>
              <li>Not a substitute for professional medical advice</li>
              <li>Consult healthcare providers for medical decisions</li>
              <li>Your data privacy is our priority</li>
            </ul>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center mb-4">
              <Heart className="h-6 w-6 text-red-600 mr-2" />
              <h2 className="text-xl font-semibold">Safety Measures</h2>
            </div>
            <ul className="list-disc pl-5 space-y-2 text-gray-600">
              <li>Regular system updates with latest medical data</li>
              <li>Encrypted data transmission</li>
              <li>24/7 emergency contact information provided</li>
              <li>Continuous monitoring for accuracy</li>
            </ul>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center mb-4">
              <AlertCircle className="h-6 w-6 text-yellow-600 mr-2" />
              <h2 className="text-xl font-semibold">Important Notice</h2>
            </div>
            <p className="text-gray-600">
              In case of emergency, immediately contact your local emergency services or visit the nearest hospital.
            </p>
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        <Link
          to="/patient"
          className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors text-lg font-semibold shadow-lg hover:shadow-xl"
        >
          Get Started
        </Link>
      </div>
    </div>
  );
};