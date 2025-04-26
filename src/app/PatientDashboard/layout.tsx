
"use client";
import { styled, Container, Box } from "@mui/material";
// import React, { useState } from "react";
// import Header from "@/app/PatientDashboard/layout/header/Header";
// import Sidebar from "@/app/PatientDashboard/layout/sidebar/Sidebar";

const MainWrapper = styled("div")(() => ({
  display: "flex",
  minHeight: "100vh",
  width: "100%",
}));

const PageWrapper = styled("div")(() => ({
  display: "flex",
  flexGrow: 1,
  flexDirection: "column",
  zIndex: 1,
  backgroundColor: "transparent",
}));

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  // const [isMobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  return (
    <MainWrapper>
      {/* <Sidebar
        isSidebarOpen={true} // Keeping the sidebar always open if no toggle is needed
        isMobileSidebarOpen={isMobileSidebarOpen}
        onSidebarClose={() => setMobileSidebarOpen(false)}
      /> */}
      <PageWrapper>
        {/* <Header toggleMobileSidebar={() => setMobileSidebarOpen(true)} /> */}
        <Container
          maxWidth={false} // Disables default max width
          sx={{
            paddingTop: "20px",
            width: "100%",
            maxWidth: "100vw",
            margin: 0,
            paddingLeft: 0,
            paddingRight: 0,
          }}
        >
          <Box sx={{ minHeight: "calc(100vh - 170px)", width: "100%", display: "flex", padding: 0, margin: 0 }}>
            {children} {/* Ensures the correct content is displayed */}
          </Box>
        </Container>
      </PageWrapper>
    </MainWrapper>
  );
}
