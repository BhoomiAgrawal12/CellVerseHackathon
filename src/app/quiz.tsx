// "use client";
// import { useState, useEffect } from "react";

// export default function Screening({ onDetectedDiseases }: { onDetectedDiseases: (diseases: string[]) => void }) {
//   const [questions, setQuestions] = useState<{ [key: string]: string }>({});
//   const [responses, setResponses] = useState<{ [key: string]: string }>({});
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     async function fetchQuestions() {
//         try {
//             const res = await fetch("http://127.0.0.1:8000/screening-questions",);
//             const data = await res.json();
            
//             console.log("API Response:", data);
            
//             if (data) {
//               setQuestions(data);
              
//             } else {    
//               setQuestions({});
//             }
            
//           } catch (error) {
//             console.error("Error fetching screening questions:", error);
//             setQuestions({});
//           }
//           finally{
//             setLoading(false)
//           }
//     }
//     fetchQuestions();
//   }, []);

//   const handleSubmit = async () => {
//     const res = await fetch("http://127.0.0.1:8000/screening", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ responses }),
//     });
//     const data = await res.json();
//     onDetectedDiseases(data.diseases);
//   };

//   return (
//     <div className="p-4">
//       <h2 className="text-xl font-bold">Mental Health Screening</h2>
//       {loading ? (
//         <p>Loading questions...</p>
//       ) : (
//         questions && Object.keys(questions).length > 0 ? (
//             Object.entries(questions).map(([key, question]) => (
//               <div key={key} className="mb-2">
//                 <label className="block">{question}</label>
//                 <select
//                   className="border p-1"
//                   onChange={(e) => setResponses({ ...responses, [key]: e.target.value })}
//                 >
//                   <option value="">Select</option>
//                   <option value="yes">Yes</option>
//                   <option value="no">No</option>
//                 </select>
//               </div>
//             ))
//           ) : (
//             <p>No questions available.</p>
//           )
//       )}
//       <button className="bg-blue-500 text-white px-4 py-2 mt-4" onClick={handleSubmit} disabled={loading}>
//         {loading ? "Processing..." : "Submit"}
//       </button>
//     </div>
//   );
// }

'use client';
import { useState, useEffect, useRef } from 'react';
import { Send, Stethoscope } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'bot' | 'user';
}

const botAvatar = "https://static.vecteezy.com/system/resources/previews/047/544/597/non_2x/medical-robot-assistant-is-ready-to-help-concept-of-medicine-of-the-future-personalized-healthcare-ai-enabled-diagnostics-and-telemedicine-innovations-vector.jpg";
const userAvatar = "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop";

export default function ChatScreening({ onDetectedDiseases }: { onDetectedDiseases: (diseases: string[]) => void }) {
  const [messages, setMessages] = useState<Message[]>([{
    id: '1',
    text: "Hello! Let's begin your mental health screening. Please answer the following questions.",
    sender: 'bot',
  }]);
  const [questions, setQuestions] = useState<{ [key: string]: string }>({});
  const [responses, setResponses] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(true);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const [input, setInput] = useState("");

  useEffect(() => {
    async function fetchQuestions() {
      try {
        const res = await fetch("http://127.0.0.1:8000/screening-questions");
        const data = await res.json();
        setQuestions(data || {});
      } catch (error) {
        console.error("Error fetching screening questions:", error);
        setQuestions({});
      } finally {
        setLoading(false);
      }
    }
    fetchQuestions();
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleUserResponse = (answer: string) => {
    if (loading || !Object.keys(questions).length) return;
    
    const questionKeys = Object.keys(questions);
    const currentKey = questionKeys[currentQuestionIndex];
    setResponses((prev) => ({ ...prev, [currentKey]: answer }));
    
    setMessages((prev) => [...prev, { id: Date.now().toString(), text: answer, sender: 'user' }]);
    
    setTimeout(() => {
      if (currentQuestionIndex + 1 < questionKeys.length) {
        setCurrentQuestionIndex((prev) => prev + 1);
        setMessages((prev) => [...prev, { id: Date.now().toString(), text: questions[questionKeys[currentQuestionIndex + 1]], sender: 'bot' }]);
      } else {
        handleSubmit();
      }
    }, 1000);
  };

  const handleSubmit = async () => {
    setMessages((prev) => [...prev, { id: Date.now().toString(), text: "Submitting your responses...", sender: 'bot' }]);
    
    const res = await fetch("http://127.0.0.1:8000/screening", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ responses }),
    });
    const data = await res.json();
    onDetectedDiseases(data.diseases);
    
    setMessages((prev) => [...prev, { id: Date.now().toString(), text: `Screening complete. Possible conditions: ${data.diseases.join(', ')}`, sender: 'bot' }]);
  };

  return (
    <div className="flex max-w-9xl h-screen antialiased text-gray-800">
      <div className="flex flex-col w-full flex-auto h-full p-6">
        <div className="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-gray-100 h-full p-4">
          <div className="flex flex-row items-center justify-center h-12 w-full">
            <div className="flex items-center justify-center mb-8 rounded-2xl text-indigo-700 bg-indigo-100 h-10 w-10">
              <Stethoscope className="w-6 h-6" />
            </div>
            <div className="ml-2 font-bold text-blue-700 mb-8 text-4xl">Swasthika AI Chat</div>
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
          <div className="flex items-center space-x-2 p-4 bg-white rounded-xl">
            <button className="bg-gray-300 px-4 py-2 rounded" onClick={() => handleUserResponse('Yes')}>Yes</button>
            <button className="bg-gray-300 px-4 py-2 rounded" onClick={() => handleUserResponse('No')}>No</button>
            <input 
              type="text" 
              className="flex-grow p-2 border rounded" 
              value={input} 
              onChange={(e) => setInput(e.target.value)} 
              placeholder="Type your response..." 
              onKeyDown={(e) => e.key === 'Enter' && input.trim() && (handleUserResponse(input), setInput(''))}
            />
            <button onClick={() => { if (input.trim()) { handleUserResponse(input); setInput(''); } }}>
              <Send className="w-6 h-6 text-blue-500" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
