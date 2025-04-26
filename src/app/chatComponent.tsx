// "use client";
// import { useState } from "react";
// import Link from "next/link";
// export default function Chat({ diseases, responses }: { diseases: string[]; responses: Record<string, string>; }) {
//   const [chatHistory, setChatHistory] = useState<{ role: string; content: string }[]>([]);
//   const [input, setInput] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleChat = async () => {
//     if (!input.trim()) return;
//     if (!input.trim()) return;
//     setLoading(true);
//     const updatedHistory = [...chatHistory, { role: "user", content: input }];
//     try {
//       const res = await fetch("http://127.0.0.1:8000/chat", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ diseases, responses, chat_history: updatedHistory })
//       });
//       if (!res.ok) {
//         throw new Error(`HTTP error! Status: ${res.status}`);
//       }
//       const data = await res.json();
//       setChatHistory([...updatedHistory,{ role: "bot", content: data.response }]);
//     } catch (error) {
//       console.error("Chat Request Failed:", error);
//     } finally {
//       setLoading(false);
//       setInput("");
//     }
//   };

//   return (
//     <div className="p-4">
//       <h2 className="text-lg font-bold">AI Chat</h2>
//       <div className="border p-4 mt-2 bg-gray-100 rounded-lg max-h-64 overflow-y-auto">
//         {chatHistory.map((msg, index) => (
//           <p key={index} className={msg.role === "bot" ? "text-blue-700" : "text-black"}>
//             <strong>{msg.role === "bot" ? "AI:" : "You:"}</strong> {msg.content}
//           </p>
//         ))}
//       </div>
//       <input
//         className="border p-2 w-full mt-2"
//         placeholder="Ask something..."
//         value={input}
//         onChange={(e) => setInput(e.target.value)}
//       />
//       <button className="bg-purple-500 text-white px-4 py-2 mt-2" onClick={handleChat} disabled={loading}>
//         {loading ? "Thinking..." : "Send"}
//       </button>
      
//       {/* Buttons for Separate Pages */}
//       <div className="mt-4 flex gap-4">
//       <Link
//           href={`/pages/diet?disease=${encodeURIComponent(diseases.join(','))}&responses=${encodeURIComponent(JSON.stringify(responses))}`}
//         >
//           <button className="bg-green-500 text-white px-4 py-2">View Diet Chart</button>
//         </Link>
      
//         <Link href="/pages/recovery">
//           <button className="bg-blue-500 text-white px-4 py-2">Recovery Suggestions</button>
//         </Link>
//       </div>
//     </div>
//   );
// }
// import { useState } from "react";
// import Link from "next/link";
// import { Stethoscope } from "lucide-react";
// const botAvatar = "https://static.vecteezy.com/system/resources/previews/047/544/597/non_2x/medical-robot-assistant-is-ready-to-help-concept-of-medicine-of-the-future-personalized-healthcare-ai-enabled-diagnostics-and-telemedicine-innovations-vector.jpg";
// const userAvatar = "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop";

// type ChatProps = {
//   diseases: string[];
//   responses: Record<string, string>;
// };

// type Message = {
//   role: "user" | "bot";
//   content: string;
// };

// export default function Chat({ diseases, responses }: ChatProps) {
//   const [chatHistory, setChatHistory] = useState<Message[]>([]);
//   const [input, setInput] = useState<string>("");
//   const [loading, setLoading] = useState<boolean>(false);

//   const handleChat = async () => {
//     if (!input.trim()) return;
//     setLoading(true);
//     const updatedHistory: Message[] = [...chatHistory, { role: "user", content: input }];
//     try {
//       const res = await fetch("http://127.0.0.1:8000/chat", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ diseases, responses, chat_history: updatedHistory })
//       });
//       if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
//       const data = await res.json();
//       setChatHistory([...updatedHistory, { role: "bot", content: data.response }]);
//     } catch (error) {
//       console.error("Chat Request Failed:", error);
//     } finally {
//       setLoading(false);
//       setInput("");
//     }
//   };

//   return (
//     <div className="p-4 w-full max-w-9xl h-[80vh]mx-auto bg-gray-50 rounded-lg shadow-md">
//     <div className="flex flex-row items-center justify-center h-12 w-full mb-4">
//             <div className="flex items-center justify-center rounded-2xl text-indigo-700 bg-indigo-100 h-10 w-10">
//               <Stethoscope className="w-6 h-6" />
//             </div>
//             <div className="ml-2 font-bold text-blue-700 text-4xl">Swasthika AI Chat</div>
//           </div>
//       <div className="border p-4 bg-white rounded-lg max-h-[60vh] overflow-y-auto space-y-3">
//         {chatHistory.map((msg, index) => (
//           <div key={index} className={`flex items-start ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
//             {msg.role === "bot" && <img src={botAvatar} className="w-8 h-8 rounded-full mr-2" alt="Bot" />}
//             <div className={`px-3 py-2 rounded-lg max-w-lg ${msg.role === "bot" ? "bg-blue-100" : "bg-purple-200"}`}>
//               <p className="text-sm">{msg.content}</p>
//             </div>
//             {msg.role === "user" && <img src={userAvatar} className="w-8 h-8 rounded-full ml-2" alt="User" />}
//           </div>
//         ))}
//       </div>
//       <div className="flex mt-3 gap-2">
//         <input
//           className="border p-2 flex-grow rounded-lg"
//           placeholder="Type your response..."
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//         />
//         <button
//           className="bg-purple-500 text-white px-4 py-2 rounded-lg"
//           onClick={handleChat}
//           disabled={loading}
//         >
//           {loading ? "Thinking..." : "Send"}
//         </button>
//       </div>
//       <div className="mt-4 flex gap-4 justify-center">
//         <Link href={`/pages/diet?disease=${encodeURIComponent(diseases.join(','))}&responses=${encodeURIComponent(JSON.stringify(responses))}`}>
//           <button className="bg-green-500 text-white px-4 py-2 rounded-lg">View Diet Chart</button>
//         </Link>
//         <Link href="/pages/recovery">
//           <button className="bg-blue-500 text-white px-4 py-2 rounded-lg">Recovery Suggestions</button>
//         </Link>
//       </div>
//     </div>
//   );
// }
import { useState } from "react";
import Link from "next/link";
import { Stethoscope } from "lucide-react";

const botAvatar =
  "https://static.vecteezy.com/system/resources/previews/047/544/597/non_2x/medical-robot-assistant-is-ready-to-help-concept-of-medicine-of-the-future-personalized-healthcare-ai-enabled-diagnostics-and-telemedicine-innovations-vector.jpg";
const userAvatar =
  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop";

type ChatProps = {
  diseases: string[];
  responses: Record<string, string>;
};

type Message = {
  role: "user" | "bot";
  content: string;
};

export default function Chat({ diseases, responses }: ChatProps) {
  const [chatHistory, setChatHistory] = useState<Message[]>([]);
  const [input, setInput] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleChat = async () => {
    if (!input.trim()) return;
    setLoading(true);
    const updatedHistory: Message[] = [
      ...chatHistory,
      { role: "user", content: input },
    ];
    try {
      const res = await fetch("http://127.0.0.1:8000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ diseases, responses, chat_history: updatedHistory }),
      });
      if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
      const data = await res.json();
      setChatHistory([...updatedHistory, { role: "bot", content: data.response }]);
    } catch (error) {
      console.error("Chat Request Failed:", error);
    } finally {
      setLoading(false);
      setInput("");
    }
  };

  return (
    <div className="p-4 w-full max-w-5xl mx-auto bg-gray-50 rounded-lg shadow-md">
      {/* Header */}
      <div className="flex items-center justify-center mb-4">
        <div className="flex items-center justify-center rounded-full text-indigo-700 bg-indigo-100 h-12 w-12">
          <Stethoscope className="w-6 h-6" />
        </div>
        <h1 className="ml-3 font-bold text-blue-700 text-3xl">Swasthika AI Chat</h1>
      </div>

      {/* Chat Container */}
      <div className="border p-4 bg-white rounded-lg max-h-[90vh] overflow-y-auto space-y-3">
        {chatHistory.map((msg, index) => (
          <div key={index} className={`flex items-start ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
            {msg.role === "bot" && <img src={botAvatar} className="w-8 h-8 rounded-full mr-2" alt="Bot" />}
            <p className={`px-4 py-2 rounded-lg max-w-lg text-sm ${msg.role === "bot" ? "bg-blue-100" : "bg-purple-200"}`}>
              {msg.content}
            </p>
            {msg.role === "user" && <img src={userAvatar} className="w-8 h-8 rounded-full ml-2" alt="User" />}
          </div>
        ))}
      </div>

      {/* Input & Buttons */}
      <div className="flex mt-3 gap-2">
        <input
          className="border p-2 flex-grow rounded-lg"
          placeholder="Type your response..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          className="bg-purple-500 text-white px-4 py-2 rounded-lg"
          onClick={handleChat}
          disabled={loading}
        >
          {loading ? "Thinking..." : "Send"}
        </button>
      </div>

      {/* Additional Buttons */}
      <div className="mt-4 flex gap-4 justify-center">
        <Link href={`/pages/diet?disease=${encodeURIComponent(diseases.join(","))}&responses=${encodeURIComponent(JSON.stringify(responses))}`}>
          <button className="bg-green-500 text-white px-4 py-2 rounded-lg">View Diet Chart</button>
        </Link>
        <Link href="/pages/recovery">
          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg">Recovery Suggestions</button>
        </Link>
      </div>
    </div>
  );
}
