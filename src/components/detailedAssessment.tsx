// "use client";
// import { useState, useEffect } from "react";

// export default function DetailedAssessment({ 
//   disease, 
//   onComplete 
// }: { 
//   disease: string; 
//   onComplete: (responses: Record<string, string>) => void; 
// }) {
//   const [questions, setQuestions] = useState<string[]>([]);
//   const [responses, setResponses] = useState<Record<string, string>>({});
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     async function fetchQuestions() {
//       setLoading(true);
//       setError(null); // Reset error before new fetch
//       try {
//         const res = await fetch("http://127.0.0.1:8000/detailed_assessment", {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ disease,responses: {} }),
//         });

//         if (!res.ok) {
//           const errorText = await res.text(); // Get error message from API
//           throw new Error(`Error ${res.status}: ${errorText}`);
//         }

//         const data = await res.json();
//         setQuestions(data.questions || []);
//       } catch (error) {
//         setError(error instanceof Error ? error.message : "Failed to load questions.");
//       } finally {
//         setLoading(false);
//       }
//     }
//     fetchQuestions();
//   }, [disease]);

//   const handleSubmit = () => {
//     if (Object.keys(responses).length !== questions.length) {
//       alert("Please answer all questions before submitting.");
//       return;
//     }
//     onComplete(responses);
//   };

//   return (
//     <div className="p-4">
//       <h2 className="text-lg font-bold">{disease} Assessment</h2>

//       {loading && <p>Loading questions...</p>}

//       {error && <p className="text-red-500">{error}</p>}

//       {!loading && !error && questions.map((q, index) => (
//         <div key={index} className="mb-2">
//           <label className="block">{q}</label>
//           <textarea
//             className="border p-1 w-full"
//             value={responses[q] || ""}
//             onChange={(e) => setResponses({ ...responses, [q]: e.target.value })}
//           />
//         </div>
//       ))}

//       <button 
//         className="bg-green-500 text-white px-4 py-2 mt-4 disabled:opacity-50"
//         onClick={handleSubmit}
//         disabled={loading}
//       >
//         Submit
//       </button>
//     </div>
//   );
// }
"use client";
import { useState, useEffect, useRef } from "react";
import { Send, Stethoscope } from "lucide-react";

const botAvatar = "https://static.vecteezy.com/system/resources/previews/047/544/597/non_2x/medical-robot-assistant-is-ready-to-help-concept-of-medicine-of-the-future-personalized-healthcare-ai-enabled-diagnostics-and-telemedicine-innovations-vector.jpg";
const userAvatar = "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop";

export default function DetailedAssessment({ 
  disease, 
  onComplete 
}: { 
  disease: string; 
  onComplete: (responses: Record<string, string>) => void; 
}) {
  const [questions, setQuestions] = useState<string[]>([]);
  const [responses, setResponses] = useState<Record<string, string>>({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [messages, setMessages] = useState<{ id: string; text: string; sender: 'bot' | 'user' }[]>([]);
  const [input, setInput] = useState("");
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function fetchQuestions() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch("http://127.0.0.1:8000/detailed_assessment", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ disease, responses: {} }),
        });

        if (!res.ok) {
          const errorText = await res.text();
          throw new Error(`Error ${res.status}: ${errorText}`);
        }

        const data = await res.json();
        setQuestions(data.questions || []);
        if (data.questions.length > 0) {
          setMessages([{ id: "1", text: data.questions[0], sender: "bot" }]);
        }
      } catch (error) {
        setError(error instanceof Error ? error.message : "Failed to load questions.");
      } finally {
        setLoading(false);
      }
    }
    fetchQuestions();
  }, [disease]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleUserResponse = (answer: string) => {
    if (loading || currentQuestionIndex >= questions.length) return;

    const currentQuestion = questions[currentQuestionIndex];
    setResponses((prev) => ({ ...prev, [currentQuestion]: answer }));

    setMessages((prev) => [
      ...prev,
      { id: Date.now().toString(), text: answer, sender: "user" },
    ]);

    setTimeout(() => {
      if (currentQuestionIndex + 1 < questions.length) {
        setCurrentQuestionIndex((prev) => prev + 1);
        setMessages((prev) => [
          ...prev,
          { id: Date.now().toString(), text: questions[currentQuestionIndex + 1], sender: "bot" },
        ]);
      } else {
        handleSubmit();
      }
    }, 1000);
  };

  const handleSubmit = () => {
    onComplete(responses);
    setMessages((prev) => [
      ...prev,
      { id: Date.now().toString(), text: "Assessment completed. Thank you!", sender: "bot" },
    ]);
  };

  return (
    <div className="flex max-w-9xl h-screen antialiased text-gray-800">
      <div className="flex flex-col w-full flex-auto h-full p-6">
        <div className="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-gray-100 h-full p-4">
          <div className="flex flex-row items-center justify-center h-12 w-full mb-4">
            <div className="flex items-center justify-center rounded-2xl text-indigo-700 bg-indigo-100 h-10 w-10">
              <Stethoscope className="w-6 h-6" />
            </div>
            <div className="ml-2 font-bold text-blue-700 text-4xl">Swasthika AI Chat</div>
          </div>

          <div className="flex flex-col h-full overflow-y-auto mb-4">
            <div className="grid grid-cols-4 gap-y-2">
              {messages.map((msg) => (
                <div key={msg.id} className={`p-3 rounded-lg ${msg.sender === 'bot' ? 'col-start-1 col-end-8' : 'col-start-6 col-end-13'}`}> 
                  <div className={`flex ${msg.sender === 'bot' ? 'flex-row' : 'flex-row-reverse'}`}> 
                    <img src={msg.sender === 'bot' ? botAvatar : userAvatar} className="h-10 w-10 rounded-full" />
                    <div className={`relative ml-3 text-xl ${msg.sender === 'bot' ? 'bg-white' : 'bg-indigo-100'} py-2 px-4 shadow rounded-xl`}> 
                      {msg.text}
                    </div>
                  </div>
                </div>
              ))}
              <div ref={chatEndRef} />
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <input type="text" className="flex-grow p-2 border rounded" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Type your response..." />
            <button onClick={() => { if (input.trim()) { handleUserResponse(input); setInput(''); } }}>
              <Send className="w-6 h-6 text-blue-500" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
// "use client";
// import { useState } from "react";

// export default function Chat({ 
//   disease, 
//   responses 
// }: { 
//   disease: string; 
//   responses: Record<string, string>; 
// }) {
//   const [aiResponse, setAiResponse] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleChat = async () => {
//     setLoading(true);
//     try {
//       const res = await fetch("http://127.0.0.1:8000/chat", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ disease, responses }),
//       });

//       if (!res.ok) {
//         throw new Error(`Error: ${res.status} - ${res.statusText}`);
//       }

//       const data = await res.json();
//       setAiResponse(data.response);
//     } catch (error) {
//       console.error("AI Chat Request Failed:", error);
//       setAiResponse("⚠️ Failed to get AI response. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="p-4">
//       <h2 className="text-2xl text-blue-900 font-bold">AI Consultation</h2>
//       <button 
//         className="bg-purple-500 rounded text-white px-4 py-2 mt-4 disabled:opacity-50"
//         onClick={handleChat} 
//         disabled={loading}
//       >
//         {loading ? "Consulting AI..." : "Get Advice"}
//       </button>

//       {aiResponse && (
//         <div className="border p-4 mt-4 bg-gray-100 rounded-lg">
//           <h3 className="font-bold text-purple-600">AI Response:</h3>
//           {/* Display formatted AI response */}
//           <div 
//             className="text-gray-700 mt-2" 
//             dangerouslySetInnerHTML={{ __html: aiResponse.replace(/\n/g, "<br>") }} 
//           />
//         </div>
//       )}
//     </div>
//   );
// }
