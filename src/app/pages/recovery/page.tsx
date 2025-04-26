"use client";
import { useRouter } from "next/navigation";

const RecoveryPage = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen w-full bg-gray-100 flex items-center justify-center p-6">
      <div className="w-full max-w-5xl bg-white shadow-xl rounded-lg p-10">
        <h1 className="text-4xl font-bold text-blue-700 text-center">Your Recovery Journey</h1>
        <p className="mt-4 text-lg text-gray-700 text-center">
          Your AI-generated daily tasks plan and improvement schedule is updated in:
          <span onClick={() => router.push("/TaskManagement")} className="text-blue-500 font-semibold">your Task Management tab</span>.
          Check it out— it will update automatically every day and week based on your progress.
        </p>

        <div className="mt-8 bg-gray-200 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold text-green-600 text-center">Recovery Stages</h2>
          <p className="mt-2 text-lg text-gray-800 text-center">
            This is a 5-week structured journey with simple and gamified steps to help you recover efficiently.
            Your recovery stage depends on how well you follow the plan:
          </p>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6 text-lg">
            <div className="p-6 bg-red-100 border-l-8 border-red-600 rounded-lg text-red-700 shadow-md">
              <h3 className="font-bold text-xl">⚠️ Severe Stage</h3>
              <p>If progress is below 30% → Immediate action needed</p>
            </div>
          <div className="p-6 bg-yellow-100 border-l-8 border-yellow-600 rounded-lg text-yellow-700 shadow-md">
            <h3 className="font-bold text-xl">⚖️ Moderate Stage</h3>
            <p>If progress is 30%-60% → Needs improvement, stay consistent</p>
          </div>

          <div className="p-6 bg-green-100 border-l-8 border-green-600 rounded-lg text-green-700 shadow-md">
            <h3 className="font-bold text-xl">✅ Mild Stage</h3>
            <p>If progress is above 60%→ You're doing well, keep going!</p>
          </div>
        </div>        </div>


      <div className="mt-10 p-8 bg-blue-50 border-l-8 border-blue-500 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-blue-700 text-center">🎯 How This Works</h2>
        <p className="mt-3 text-lg text-gray-800 text-center">
          Each week, you'll get new personalized tasks that are simple, engaging, and easy to implement.
          Stick to your schedule, track your progress, and move through the 5-week journey step by step.
          Keep pushing forward—even small wins matter! 🚀
        </p>
      </div>

      <div className="mt-12 flex justify-center">
        <button
          onClick={() => router.push("/TaskManagement")}
          className="bg-blue-600 text-white px-8 py-3 text-lg font-semibold rounded-lg hover:bg-blue-700 transition"
        >
          🔗 Go to Task Management
        </button>
      </div>
    </div>
    </div >
  );
};

export default RecoveryPage;
