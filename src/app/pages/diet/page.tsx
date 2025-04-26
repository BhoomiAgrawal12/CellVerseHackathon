"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { FaUtensils, FaAppleAlt, FaExclamationTriangle, FaClipboardList, FaHeartbeat, FaDownload, FaShareAlt, FaRedo } from "react-icons/fa";

interface DietPlan {
  focus: string;
  keyNutrients: string[];
  foodsToLimit: string[];
  mealPlan: {
    breakfast: { option: string }[];
    lunch: { option: string }[];
    dinner: { option: string }[];
    snacks: { option: string }[];
  };
  importantConsiderations: Record<string, string>;
}

export default function Diet() {
  const [diet, setDiet] = useState<DietPlan | null>(null);
  const searchParams = useSearchParams();
  const router = useRouter();

  const disease = searchParams.get("disease") || "";
  const diseaseString = searchParams.get("disease") || "";
  const diseaseList = diseaseString.split(",").map(d => d.trim()).filter(Boolean); // Trim spaces and remove empty entries
  const responsesString = searchParams.get("responses");
  let responses = {};
  try {
    responses = responsesString ? JSON.parse(decodeURIComponent(responsesString)) : {};
  } catch (error) {
    console.error("Error parsing responses:", error);
  }

  useEffect(() => {
    const fetchDiet = async () => {
      try {
        const res = await fetch("http://127.0.0.1:8000/diet", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ diseases: diseaseList, responses }),
        });

        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        const result = await res.json();
        console.log("API Response:", result);

        if (result.diet_plan) {
          const cleanedDietPlan = result.diet_plan.replace(/^```json\n|\n```$/g, "");
          console.log("Cleaned Diet Plan:", cleanedDietPlan);

          const parsedDiet: DietPlan = JSON.parse(cleanedDietPlan);
          setDiet(parsedDiet);
        } else {
          console.error("Invalid response format: No diet_plan found");
        }
      } catch (error) {
        console.error("Error fetching diet plan:", error);
      }
    };

    if (diseaseList.length > 0) fetchDiet();
  }, []);

  const downloadDietPlan = () => {
    if (!diet) return;
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(diet, null, 2));
    const downloadAnchor = document.createElement("a");
    downloadAnchor.href = dataStr;
    downloadAnchor.download = "Diet_Plan.json";
    downloadAnchor.click();
  };

  const shareDietPlan = async () => {
    if (!diet) return;
    const text = `Diet Plan for ${disease}\n\nFocus: ${diet.focus}\n\nKey Nutrients:\n${diet.keyNutrients.join(", ")}\n\nFoods to Limit:\n${diet.foodsToLimit.join(", ")}\n\nMeal Plan:\nBreakfast: ${diet.mealPlan.breakfast.map(m => m.option).join(", ")}\nLunch: ${diet.mealPlan.lunch.map(m => m.option).join(", ")}\nDinner: ${diet.mealPlan.dinner.map(m => m.option).join(", ")}\nSnacks: ${diet.mealPlan.snacks.map(m => m.option).join(", ")}\n\nConsiderations:\n${Object.entries(diet.importantConsiderations).map(([key, val]) => `${key}: ${val}`).join("\n")}`;

    try {
      await navigator.clipboard.writeText(text);
      alert("Diet Plan copied to clipboard!");
    } catch (error) {
      console.error("Failed to copy:", error);
    }
  };

  return (
    <div className="p-6 bg-pastel-blue min-h-screen flex flex-col items-center">
      <h2 className="text-3xl font-bold text-blue-700 mb-6 flex items-center gap-2">
        <FaHeartbeat /> Diet Chart
      </h2>

      {diet ? (
        <div className="w-full max-w-3xl space-y-6">
          {/* Focus */}
          <div className="bg-pastel-green shadow-lg rounded-2xl p-4 border-l-8 border-green-500">
            <h3 className="text-xl font-semibold text-gray-700 flex items-center gap-2"><FaClipboardList /> Focus</h3>
            <p className="text-gray-600">{diet.focus || "No focus information available."}</p>
          </div>

          {/* Key Nutrients */}
          <div className="bg-pastel-yellow shadow-lg rounded-2xl p-4 border-l-8 border-yellow-500">
            <h3 className="text-xl font-semibold text-gray-700 flex items-center gap-2"><FaAppleAlt /> Key Nutrients</h3>
            <ul className="list-disc pl-5 text-gray-600">
              {diet.keyNutrients?.length ? diet.keyNutrients.map((nutrient, index) => (
                <li key={index}>{nutrient}</li>
              )) : <li>No key nutrients available</li>}
            </ul>
          </div>

          {/* Foods to Limit */}
          <div className="bg-pastel-red shadow-lg rounded-2xl p-4 border-l-8 border-red-500">
            <h3 className="text-xl font-semibold text-gray-700 flex items-center gap-2"><FaExclamationTriangle /> Foods to Limit</h3>
            <ul className="list-disc pl-5 text-gray-600">
              {diet.foodsToLimit?.length ? diet.foodsToLimit.map((food, index) => (
                <li key={index}>{food}</li>
              )) : <li>No foods to limit available</li>}
            </ul>
          </div>

          {/* Meal Plan */}
          <div className="bg-pastel-purple shadow-lg rounded-2xl p-4 border-l-8 border-purple-500">
            <h3 className="text-xl font-semibold text-gray-700 flex items-center gap-2"><FaUtensils /> Meal Plan</h3>
            {diet.mealPlan && Object.entries(diet.mealPlan).map(([mealType, options]) => (
              <div key={mealType} className="mt-3">
                <h4 className="text-md font-bold capitalize text-gray-800">{mealType}</h4>
                <ul className="list-disc pl-5 text-gray-600">
                  {options.length ? options.map(({ option }, index) => (
                    <li key={index}>{option}</li>
                  )) : <li>No options available</li>}
                </ul>
              </div>
            ))}
          </div>

          {/* Important Considerations */}
          <div className="bg-pastel-blue shadow-lg rounded-2xl p-4 border-l-8 border-blue-500">
            <h3 className="text-xl font-semibold text-gray-700 flex items-center gap-2"><FaClipboardList /> Important Considerations</h3>
            <ul className="list-disc pl-5 text-gray-600">
              {diet.importantConsiderations && Object.entries(diet.importantConsiderations).map(([key, value]) => (
                <li key={key}><strong>{key}:</strong> {value}</li>
              ))}
            </ul>
          </div>

          {/* Buttons */}
          <div className="flex gap-4 mt-6">
            <button className="bg-green-500 text-white px-4 py-2 rounded-lg flex items-center gap-2" onClick={downloadDietPlan}>
              <FaDownload /> Download
            </button>
            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center gap-2" onClick={shareDietPlan}>
              <FaShareAlt /> Share
            </button>
            <button className="bg-red-500 text-white px-4 py-2 rounded-lg flex items-center gap-2" onClick={() => router.push("/AIBot")}>
              <FaRedo /> Restart Assessment
            </button>
          </div>
        </div>
      ) : (
        <p className="text-gray-600">Loading diet plan...</p>
      )}
    </div>
  );
}





// "use client";
// import { useState, useEffect } from "react";
// import { useSearchParams } from "next/navigation";
// interface DietPlan {
//   focus: string;
//   keyNutrients: string[];
//   foodsToLimit: string[];
//   mealPlan: {
//     breakfast: { option: string }[];
//     lunch: { option: string }[];
//     dinner: { option: string }[];
//     snacks: { option: string }[];
//   };
//   importantConsiderations: Record<string, string>;
// }
// export default function Diet() {
//   const [diet, setDiet] = useState<DietPlan| null>(null);
//   const searchParams = useSearchParams(); 

//   const disease = searchParams.get("disease") || ""; 
//   const responsesString = searchParams.get("responses");

//   let responses = {};
//   try {
//     responses = responsesString ? JSON.parse(decodeURIComponent(responsesString)) : {};
//   } catch (error) {
//     console.error("Error parsing responses:", error);
//   }


//   useEffect(() => {
//     const fetchDiet = async () => {


//       try {
//         const res = await fetch("http://127.0.0.1:8000/diet", {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ disease, responses }),
//         });

//         if (!res.ok) {
//           throw new Error(`HTTP error! Status: ${res.status}`);
//         }
//         const result=await res.json();
//         console.log("API Response:", result); 

//         if (result.diet_plan) {
//           const cleanedDietPlan = result.diet_plan.replace(/^```json\n|\n```$/g, "");
//           console.log("Cleaned Diet Plan:", cleanedDietPlan); 
        
//           const parsedDiet: DietPlan = JSON.parse(cleanedDietPlan);
//           setDiet(parsedDiet);
//         } else {
//           console.error("Invalid response format: No diet_plan found");
//         }
        

//       } catch (error) {
//         console.error("Error fetching diet plan:", error);
//       } 
//     };

//     if (disease) fetchDiet();
//   }, []);

//   return (
//     <div className="p-4">
//     <h2 className="text-lg font-bold">Diet Chart</h2>

//     {diet ? (
//       <div>
//         {/* Focus */}
//         <h3 className="text-md font-semibold">Focus</h3>
//         <p>{diet.focus || "No focus information available."}</p>

//         {/* Key Nutrients */}
//         <h3 className="text-md font-semibold mt-2">Key Nutrients</h3>
//         <ul className="list-disc pl-4">
//           {diet.keyNutrients?.length ? (
//             diet.keyNutrients.map((nutrient, index) => <li key={index}>{nutrient}</li>)
//           ) : (
//             <li>No key nutrients available</li>
//           )}
//         </ul>

//         {/* Foods to Limit */}
//         <h3 className="text-md font-semibold mt-2">Foods to Limit</h3>
//         <ul className="list-disc pl-4">
//           {diet.foodsToLimit?.length ? (
//             diet.foodsToLimit.map((food, index) => <li key={index}>{food}</li>)
//           ) : (
//             <li>No foods to limit available</li>
//           )}
//         </ul>

//         {/* Meal Plan */}
//         <h3 className="text-md font-semibold mt-2">Meal Plan</h3>
//         {diet.mealPlan &&
//           Object.entries(diet.mealPlan).map(([mealType, options]) => (
//             <div key={mealType} className="mt-2">
//               <h4 className="text-sm font-bold capitalize">{mealType}</h4>
//               <ul className="list-disc pl-4">
//                 {options.length ? (
//                   options.map(({ option }, index) => <li key={index}>{option}</li>)
//                 ) : (
//                   <li>No options available</li>
//                 )}
//               </ul>
//             </div>
//           ))}

//         {/* Important Considerations */}
//         <h3 className="text-md font-semibold mt-2">Important Considerations</h3>
//         <ul className="list-disc pl-4">
//           {diet.importantConsiderations &&
//             Object.entries(diet.importantConsiderations).map(([key, value]) => (
//               <li key={key}>
//                 <strong>{key}:</strong> {value}
//               </li>
//             ))}
//         </ul>
//       </div>
//     ) : (
//       <p>Loading diet plan...</p>
//     )}
//   </div>
//   );
  
// };
// "use client";

// import { useState, useEffect } from "react";
// import { useSearchParams } from "next/navigation";
// import { FaUtensils, FaAppleAlt, FaExclamationTriangle, FaClipboardList, FaHeartbeat } from "react-icons/fa";

// interface DietPlan {
//   focus: string;
//   keyNutrients: string[];
//   foodsToLimit: string[];
//   mealPlan: {
//     breakfast: { option: string }[];
//     lunch: { option: string }[];
//     dinner: { option: string }[];
//     snacks: { option: string }[];
//   };
//   importantConsiderations: Record<string, string>;
// }

// export default function Diet() {
//   const [diet, setDiet] = useState<DietPlan | null>(null);
//   const searchParams = useSearchParams();

//   const disease = searchParams.get("disease") || "";
//   const responsesString = searchParams.get("responses");

//   let responses = {};
//   try {
//     responses = responsesString ? JSON.parse(decodeURIComponent(responsesString)) : {};
//   } catch (error) {
//     console.error("Error parsing responses:", error);
//   }

//   useEffect(() => {
//     const fetchDiet = async () => {
//       try {
//         const res = await fetch("http://127.0.0.1:8000/diet", {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ disease, responses }),
//         });

//         if (!res.ok) {
//           throw new Error(`HTTP error! Status: ${res.status}`);
//         }
//         const result = await res.json();
//         console.log("API Response:", result);

//         if (result.diet_plan) {
//           const cleanedDietPlan = result.diet_plan.replace(/^```json\n|\n```$/g, "");
//           console.log("Cleaned Diet Plan:", cleanedDietPlan);

//           const parsedDiet: DietPlan = JSON.parse(cleanedDietPlan);
//           setDiet(parsedDiet);
//         } else {
//           console.error("Invalid response format: No diet_plan found");
//         }
//       } catch (error) {
//         console.error("Error fetching diet plan:", error);
//       }
//     };

//     if (disease) fetchDiet();
//   }, []);

//   return (
//     <div className="p-6 bg-pastel-blue min-h-screen flex flex-col items-center">
//       <h2 className="text-3xl font-bold text-blue-700 mb-6 flex items-center gap-2">
//         <FaHeartbeat /> Diet Chart
//       </h2>
//       {diet ? (
//         <div className="w-full max-w-3xl space-y-6">
//           {/* Focus */}
//           <div className="bg-pastel-green shadow-lg rounded-2xl p-4 border-l-8 border-green-500">
//             <h3 className="text-xl font-semibold text-gray-700 flex items-center gap-2"><FaClipboardList /> Focus</h3>
//             <p className="text-gray-600">{diet.focus || "No focus information available."}</p>
//           </div>

//           {/* Key Nutrients */}
//           <div className="bg-pastel-yellow shadow-lg rounded-2xl p-4 border-l-8 border-yellow-500">
//             <h3 className="text-xl font-semibold text-gray-700 flex items-center gap-2"><FaAppleAlt /> Key Nutrients</h3>
//             <ul className="list-disc pl-5 text-gray-600">
//               {diet.keyNutrients?.length ? diet.keyNutrients.map((nutrient, index) => (
//                 <li key={index}>{nutrient}</li>
//               )) : <li>No key nutrients available</li>}
//             </ul>
//           </div>

//           {/* Foods to Limit */}
//           <div className="bg-pastel-red shadow-lg rounded-2xl p-4 border-l-8 border-red-500">
//             <h3 className="text-xl font-semibold text-gray-700 flex items-center gap-2"><FaExclamationTriangle /> Foods to Limit</h3>
//             <ul className="list-disc pl-5 text-gray-600">
//               {diet.foodsToLimit?.length ? diet.foodsToLimit.map((food, index) => (
//                 <li key={index}>{food}</li>
//               )) : <li>No foods to limit available</li>}
//             </ul>
//           </div>

//           {/* Meal Plan */}
//           <div className="bg-pastel-purple shadow-lg rounded-2xl p-4 border-l-8 border-purple-500">
//             <h3 className="text-xl font-semibold text-gray-700 flex items-center gap-2"><FaUtensils /> Meal Plan</h3>
//             {diet.mealPlan && Object.entries(diet.mealPlan).map(([mealType, options]) => (
//               <div key={mealType} className="mt-3">
//                 <h4 className="text-md font-bold capitalize text-gray-800">{mealType}</h4>
//                 <ul className="list-disc pl-5 text-gray-600">
//                   {options.length ? options.map(({ option }, index) => (
//                     <li key={index}>{option}</li>
//                   )) : <li>No options available</li>}
//                 </ul>
//               </div>
//             ))}
//           </div>

//           {/* Important Considerations */}
//           <div className="bg-pastel-blue shadow-lg rounded-2xl p-4 border-l-8 border-blue-500">
//             <h3 className="text-xl font-semibold text-gray-700 flex items-center gap-2"><FaClipboardList /> Important Considerations</h3>
//             <ul className="list-disc pl-5 text-gray-600">
//               {diet.importantConsiderations && Object.entries(diet.importantConsiderations).map(([key, value]) => (
//                 <li key={key}><strong>{key}:</strong> {value}</li>
//               ))}
//             </ul>
//           </div>
//         </div>
//       ) : (
//         <p className="text-gray-600">Loading diet plan...</p>
//       )}
//     </div>
//   );
// }

