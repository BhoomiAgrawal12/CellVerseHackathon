"use client";
import { useState, useCallback } from "react";
import Screening from "@/app/quiz";
import Chat from "@/app/chatComponent";
import DetailedAssessment from "@/app/detailedAssessment";

export default function Home() {
  const [detectedDiseases, setDetectedDiseases] = useState<string[]>([]);
  const [selectedDiseases, setSelectedDiseases] = useState<string[]>([]);
  const [assessmentData, setAssessmentData] = useState<Record<string, string> | null>(null);
  const [step, setStep] = useState<number>(0);

  // Handle going back in the steps
  const goBack = useCallback(() => {
    setStep((prev) => {
      if (prev === 2) {
        setSelectedDiseases([]);
      } else if (prev === 3) {
        setAssessmentData(null);
      }
      return Math.max(prev - 1, 0);
    });
  }, []);

  // Handle moving forward in the steps
  const goForward = useCallback(() => {
    if (step === 1 && selectedDiseases.length === 0) return;
    if (step === 2 && !assessmentData) return;
    setStep((prev) => Math.min(prev + 1, 3));
  }, [step, selectedDiseases, assessmentData]);

  // Handle disease detection from Screening component
  const handleDiseaseDetection = useCallback((diseases: string[]) => {
    setDetectedDiseases(diseases);
    setStep(1);
  }, []);

  // Handle multiple disease selection
  const handleDiseaseSelection = useCallback((disease: string) => {
    setSelectedDiseases((prevSelected) => {
      if (prevSelected.includes(disease)) {
        return prevSelected.filter((d) => d !== disease); // Remove if already selected
      } else {
        return [...prevSelected, disease]; // Add if not selected
      }
    });
  }, []);

  const proceedToNextStep = () => {
    if (selectedDiseases.length > 0) {
      setStep(2); // Move to Step 2 only if at least one disease is selected
    }
  };

  // Handle assessment completion
  const handleAssessmentComplete = useCallback((data: Record<string, string>) => {
    setAssessmentData(data);
    setStep(3);
  }, []);

  return (
    <div className="max-[1000px] mx-auto p-4">
      {/* Step 0: Initial Screening */}
      {step === 0 && (
        <Screening onDetectedDiseases={handleDiseaseDetection} />
      )}

      {/* Step 1: Disease Selection */}
      {step === 1 && detectedDiseases.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold mb-4 text-blue-900">
            Select Disease(s) for Detailed Assessment
          </h2>
          {detectedDiseases.map((disease) => (
            <button
              key={disease}
              className={`block w-full px-6 py-4 rounded my-2 transition-colors 
                ${selectedDiseases.includes(disease) ? "bg-blue-500 text-white" : "bg-blue-300 hover:bg-blue-400"}`}
              onClick={() => handleDiseaseSelection(disease)}
            >
              {disease}
            </button>
          ))}

          {/* Proceed Button (Enabled only if at least one disease is selected) */}
          <button
            className={`w-full px-6 py-4 rounded mt-4 text-white font-semibold transition-colors
              ${selectedDiseases.length > 0 ? "bg-green-500 hover:bg-green-600" : "bg-gray-400 cursor-not-allowed"}`}
            onClick={proceedToNextStep}
            disabled={selectedDiseases.length === 0}
          >
            Proceed to Next Step
          </button>
        </div>
      )}

      {/* Step 2: Detailed Assessment */}
      {step === 2 && selectedDiseases.length > 0 && !assessmentData && (
        <DetailedAssessment
          diseases={selectedDiseases}
          onComplete={handleAssessmentComplete}
        />
      )}

      {/* Step 3: Chat Interface */}
      {step === 3 && selectedDiseases.length > 0 && assessmentData && (
        <Chat
          diseases={selectedDiseases}
          responses={assessmentData}
        />
      )}

      {/* Navigation Controls */}
      {(step > 0 || step < 3) && (
        <div className="flex justify-between mt-4">
          {step > 0 && (
            <button
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition-colors"
              onClick={goBack}
            >
              Back
            </button>
          )}
          {step < 3 && (
            <button
              className="px-4 py-2 bg-blue-500 rounded text-white hover:bg-blue-600 transition-colors disabled:bg-blue-300"
              onClick={goForward}
              disabled={(step === 1 && selectedDiseases.length === 0) || (step === 2 && !assessmentData)}
            >
              Forward
            </button>
          )}
        </div>
      )}
    </div>
  );
}
