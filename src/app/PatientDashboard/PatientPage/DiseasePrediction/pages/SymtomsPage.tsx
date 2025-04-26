import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import { usePredictionStore } from '../store/usePredictionStore';

const AVAILABLE_SYMPTOMS = [
  'Fever', 'Cough', 'Fatigue', 'Difficulty Breathing', 'Headache',
  'Sore Throat', 'Body Aches', 'Nausea', 'Diarrhea', 'Loss of Taste/Smell',
  'Chest Pain', 'Dizziness', 'Runny Nose', 'Joint Pain', 'Rash',
  'Abdominal Pain', 'Vomiting', 'Chills', 'Sweating', 'Loss of Appetite'
];

export const SymptomsPage: React.FC = () => {
  const navigate = useNavigate();
  const { selectedSymptoms, setSymptoms } = usePredictionStore();
  const [search, setSearch] = React.useState('');
  const [selected, setSelected] = React.useState<string[]>(selectedSymptoms);

  const filteredSymptoms = AVAILABLE_SYMPTOMS.filter(symptom =>
    symptom.toLowerCase().includes(search.toLowerCase())
  );

  const toggleSymptom = (symptom: string) => {
    setSelected(prev =>
      prev.includes(symptom)
        ? prev.filter(s => s !== symptom)
        : [...prev, symptom]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSymptoms(selected);
    navigate('/prediction');
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-8">Select Your Symptoms</h1>

      <div className="bg-white shadow-lg rounded-lg p-8">
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            className="pl-10 w-full rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500"
            placeholder="Search symptoms..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2">Selected Symptoms ({selected.length})</h2>
          <div className="flex flex-wrap gap-2">
            {selected.map(symptom => (
              <span
                key={symptom}
                className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium flex items-center"
              >
                {symptom}
                <button
                  onClick={() => toggleSymptom(symptom)}
                  className="ml-2 text-blue-600 hover:text-blue-800"
                >
                  ×
                </button>
              </span>
            ))}
            {selected.length === 0 && (
              <span className="text-gray-500 text-sm">No symptoms selected</span>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {filteredSymptoms.map(symptom => (
            <button
              key={symptom}
              onClick={() => toggleSymptom(symptom)}
              className={`p-3 rounded-lg text-left transition-colors ${
                selected.includes(symptom)
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
              }`}
            >
              {symptom}
            </button>
          ))}
        </div>

        <div className="mt-8 flex justify-end">
          <button
            onClick={handleSubmit}
            disabled={selected.length === 0}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            Get Prediction
          </button>
        </div>
      </div>
    </div>
  );
};