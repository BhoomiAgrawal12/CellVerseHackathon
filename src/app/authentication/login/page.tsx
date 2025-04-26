
"use client";
import Link from "next/link";
import Logo from "@/app/PatientDashboard/layout/shared/logo/Logo";
import AuthLogin from "../auth/AuthLogin";

const Login2 = () => {
  return (
    <div className="w-full min-h-screen relative">
      {/* Background Gradient */}
      <div
        className="absolute inset-0 bg-gradient-to-r from-green-100 via-purple-100 to-blue-100 opacity-30 animate-gradient"
        style={{
          backgroundSize: "400% 400%",
        }}
      ></div>

      {/* Main Content */}
      <div className="flex justify-center items-center h-screen">
        {/* Login Card */}
        <div className="bg-white rounded-lg shadow-2xl p-8 w-full max-w-md relative z-10">
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <Logo />
          </div>

          {/* AuthLogin Component */}
          <AuthLogin
            subtext={
              <p className="text-center text-gray-600 mb-4">Your Journey to Holistic Health</p>
            }
            subtitle={
              <div className="flex justify-center space-x-1 mt-6">
                <p className="text-gray-600">New to Swasthika?</p>
                <Link
                  href="/authentication/register"
                  className="text-blue-500 hover:underline"
                >
                  Create an account
                </Link>
              </div>
            }
          />
        </div>
      </div>
    </div>
  );
};

export default Login2;
