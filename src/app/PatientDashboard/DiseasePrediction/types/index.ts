export interface PatientInfo {
  age: string;
  gender: string;
  bloodPressure: string;
  sugarLevel: string;
  allergies: string;
  existingConditions: string;
}

export interface DiseasePrediction {
  disease: string;
  probability: number;
  description: string;
  precautions: string[];
}

export interface WelcomePageProps {
  onGetStarted: () => void;
}

export interface PatientInfoFormProps {
  onSubmit: (info: PatientInfo) => void;
}

export interface SymptomCheckerProps {
  userSymptoms: string[];
  updateSymptoms: (symptoms: string[]) => void;
  updateDiseasePossibility: (diseases: DiseasePrediction[]) => void;
}

export interface PredictionResultProps {
  diseasePossibility: DiseasePrediction[];
}