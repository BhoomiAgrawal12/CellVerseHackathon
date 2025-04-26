
"use client";
import Link from "next/link";
import Logo from "@/app/PatientDashboard/layout/shared/logo/Logo";
import AuthRegister from "../auth/AuthRegister";

const Register2 = () => (
  <div className="w-full min-h-screen relative">
    <div className="relative h-screen">
      {/* Gradient Background */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background: "radial-gradient(#d2f1df, #d3d7fa, #bad8f4)",
          backgroundSize: "400% 400%",
          animation: "gradient 15s ease infinite",
        }}
      ></div>

      {/* Main Content */}
      <div className="flex min-h-screen items-center justify-center ">
        <div className="w-full max-w-[500px] space-y-8 rounded-lg bg-white p-8 shadow-xl z-10">
          {/* Logo */}
          <div className="flex justify-center">
            <Logo />
          </div>

          <AuthRegister
            subtext={
              <p className="mb-4 text-center text-gray-600">
                Your Journey to Holistic Health
              </p>
            }
            subtitle={
              <div className="mt-6 flex justify-center space-x-1">
                <p className="text-gray-600">Already have an Account?</p>
                <Link
                  href="/authentication/login"
                  className="text-blue-600 hover:underline"
                >
                  Sign In
                </Link>
              </div>
            }
          />
        </div>
      </div>

      {/* Animation Styles */}
      <style jsx global>{`
        @keyframes gradient {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
      `}</style>
    </div>
  </div>
);

export default Register2;
