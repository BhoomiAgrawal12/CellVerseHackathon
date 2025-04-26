import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// ✅ Define Patient Details Type
interface PatientDetails {
  name: string;
  age: number;
  gender: string;
  hasHighBP: boolean;
  hasDiabetes: boolean;
  hasHighCholesterol: boolean;
  hasAllergies: string[];
  otherConditions: string;
}

// ✅ Define Zustand Store Interface
interface PredictionStore {
  patientDetails: PatientDetails;
  selectedSymptoms: string[];
  predictedDisease: string | null;

  // Actions to update state
  setPatientDetails: (details: PatientDetails) => void;
  setSymptoms: (symptoms: string[]) => void;
  setPredictedDisease: (disease: string | null) => void;
}

// ✅ Create Zustand Store with Persistence
export const usePredictionStore = create<PredictionStore>()(
  persist(
    (set) => ({
      // Initial State
      patientDetails: {
        name: '',
        age: 0,
        gender: '',
        hasHighBP: false,
        hasDiabetes: false,
        hasHighCholesterol: false,
        hasAllergies: [],
        otherConditions: '',
      },
      selectedSymptoms: [],
      predictedDisease: null,

      // ✅ Update patient details
      setPatientDetails: (details) =>
        set((state) => ({ ...state, patientDetails: details })),

      // ✅ Update selected symptoms
      setSymptoms: (symptoms) =>
        set((state) => ({ ...state, selectedSymptoms: symptoms })),

      // ✅ Update predicted disease (allows null)
      setPredictedDisease: (disease) =>
        set((state) => ({ ...state, predictedDisease: disease })),
    }),
    { name: 'prediction-storage' } // ✅ Local Storage Key for Persistence
  )
);
