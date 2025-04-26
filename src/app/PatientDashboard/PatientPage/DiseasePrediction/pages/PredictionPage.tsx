import React from 'react';
import { usePredictionStore } from '../store/usePredictionStore';
import { Activity, Apple, Droplet, AlertTriangle } from 'lucide-react';

export const PredictionPage: React.FC = () => {
  const { patientDetails, selectedSymptoms } = usePredictionStore();

  // This would normally come from an API
  const predictedDisease = "Type 2 Diabetes";

  const dietPlan = {
    macronutrients: [
      { name: "Protein", amount: "20-30% of daily calories" },
      { name: "Carbohydrates", amount: "45-55% of daily calories" },
      { name: "Healthy Fats", amount: "20-35% of daily calories" }
    ],
    micronutrients: [
      { name: "Vitamin D", sources: "Fatty fish, eggs, fortified foods" },
      { name: "Magnesium", sources: "Nuts, seeds, leafy greens" },
      { name: "Chromium", sources: "Whole grains, broccoli, grape juice" }
    ],
    hydration: "Drink 8-10 glasses of water daily",
    specialConsiderations: [
      "Monitor carbohydrate intake",
      "Eat at regular intervals",
      "Include fiber-rich foods",
      "Limit processed sugars"
    ],
    foodsToAvoid: [
      "Sugary beverages",
      "Refined carbohydrates",
      "Processed snacks",
      "High-fat dairy products"
    ]
  };

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Disease Prediction</h1>
          <Activity className="h-8 w-8 text-blue-600" />
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-xl font-semibold mb-4">Patient Information</h2>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p><strong>Name:</strong> {patientDetails.name}</p>
              <p><strong>Age:</strong> {patientDetails.age}</p>
              <p><strong>Gender:</strong> {patientDetails.gender}</p>
            </div>

            <h2 className="text-xl font-semibold mt-6 mb-4">Reported Symptoms</h2>
            <div className="flex flex-wrap gap-2">
              {selectedSymptoms.map(symptom => (
                <span
                  key={symptom}
                  className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                >
                  {symptom}
                </span>
              ))}
            </div>
          </div>

          <div className="bg-blue-50 p-6 rounded-lg">
            <h2 className="text-2xl font-bold text-blue-900 mb-4">Predicted Condition</h2>
            <p className="text-3xl font-bold text-blue-600">{predictedDisease}</p>
            <p className="mt-4 text-blue-800">
              This prediction is based on the symptoms and medical history provided.
              Please consult a healthcare professional for proper diagnosis.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Recommended Diet Plan</h2>
          <Apple className="h-6 w-6 text-green-600" />
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Macronutrients</h3>
            <div className="space-y-3">
              {dietPlan.macronutrients.map((macro, index) => (
                <div key={index} className="bg-gray-50 p-3 rounded">
                  <p className="font-medium">{macro.name}</p>
                  <p className="text-gray-600">{macro.amount}</p>
                </div>
              ))}
            </div>

            <h3 className="text-lg font-semibold mt-6 mb-4">Micronutrients</h3>
            <div className="space-y-3">
              {dietPlan.micronutrients.map((micro, index) => (
                <div key={index} className="bg-gray-50 p-3 rounded">
                  <p className="font-medium">{micro.name}</p>
                  <p className="text-gray-600">{micro.sources}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="mb-6">
              <div className="flex items-center mb-3">
                <Droplet className="h-5 w-5 text-blue-600 mr-2" />
                <h3 className="text-lg font-semibold">Hydration</h3>
              </div>
              <p className="text-gray-700">{dietPlan.hydration}</p>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3">Special Considerations</h3>
              <ul className="list-disc pl-5 space-y-2">
                {dietPlan.specialConsiderations.map((consideration, index) => (
                  <li key={index} className="text-gray-700">{consideration}</li>
                ))}
              </ul>
            </div>

            <div>
              <div className="flex items-center mb-3">
                <AlertTriangle className="h-5 w-5 text-red-600 mr-2" />
                <h3 className="text-lg font-semibold">Foods to Avoid</h3>
              </div>
              <ul className="list-disc pl-5 space-y-2">
                {dietPlan.foodsToAvoid.map((food, index) => (
                  <li key={index} className="text-gray-700">{food}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PredictionPage;