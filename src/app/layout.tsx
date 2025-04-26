"use client";

import Sidebar from "@/app/PatientDashboard/layout/sidebar/Sidebar";
import Header from "@/app/PatientDashboard/layout/header/Header";
import React, { useState, ReactNode } from "react";
import "./globals.css";
import { SessionProvider } from "next-auth/react";

interface RootLayoutProps {
  children?: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  const [isMobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  return (
    <html lang="en">
      <body className="bg-gray-100 text-gray-900">
        <SessionProvider>
          <div className="flex min-h-screen">
            {/* Sidebar */}
            <Sidebar
              isSidebarOpen={true}
              isMobileSidebarOpen={isMobileSidebarOpen}
              onSidebarClose={() => setMobileSidebarOpen(false)}
            />

            {/* Main content area */}
            <div className="flex flex-col flex-1">
              <Header toggleMobileSidebar={() => setMobileSidebarOpen(true)} />

              {/* Center content */}
              <main className="flex-1 flex justify-center items-center p-8">
                <div className="w-full min-w-4xl p-6 rounded-lg shadow-md">
                  {children}
                </div>
              </main>
            </div>
          </div>
        </SessionProvider>
      </body>
    </html>
  );
}
