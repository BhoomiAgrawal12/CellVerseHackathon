
// "use client";
// // import RehabChatbot from "@/components/chatComponent"
// import { useState } from "react";
// import Screening from "@/components/quiz";
// import Chat from "@/components/chatComponent";
// import DetailedAssessment from "@/components/detailedAssessment";
// export default function Home() {
//   const [detectedDiseases, setDetectedDiseases] = useState<string[]>([]);
//   const [selectedDisease, setSelectedDisease] = useState<string | null>(null);
//   const [assessmentData, setAssessmentData] = useState<Record<string, string> | null>(null);
//   return (
//     <div className="max-w-2xl mx-auto p-4">
//       {!detectedDiseases.length ? (
//         <Screening onDetectedDiseases={setDetectedDiseases} />
//       ) : !selectedDisease ? (
//         <div>
//           <h2 className="text-xl font-bold">Select Disease for Detailed Assessment</h2>
//           {detectedDiseases.map((disease) => (
//             <button key={disease} className="block p-2 bg-blue-300 my-2" onClick={() => setSelectedDisease(disease)}>
//               {disease}
//             </button>
//           ))}
//         </div>
//       ) : !assessmentData ? (
//         <DetailedAssessment disease={selectedDisease} onComplete={setAssessmentData} />
//       ) : (
//         <Chat disease={selectedDisease} responses={assessmentData} />
//       )}
//     </div>
//   );
// }

import { redirect } from "next/navigation";

export default function HomePage() {
  redirect("/PatientDashboard"); // Redirects to PatientDashboard
}