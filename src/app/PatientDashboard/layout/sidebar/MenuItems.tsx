import {
  IconHome2,
  IconUserCircle,
  IconVideo,
  IconHeartbeat,
  IconRun,
  IconUsers,
  IconLogin,
  IconUserPlus,
  IconListCheck,
  IconRobot,
} from "@tabler/icons-react";

const Menuitems = [
  {
    navlabel: true,
    subheader: "PATIENT DASHBOARD",
  },
  // {
  //   title: "Landing Page",
  //   icon: IconHome2,
  //   href: "/LandingPage",
  // },
  {
    title: "Patient Dashboard",
    icon: IconHome2,
    href: "/",
  },
  {
    title: "Profile",
    icon: IconUserCircle,
    href: "/PatientDashboard/PatientPage/profile",
  },
  {
    title: "Video Recommendations",
    icon: IconVideo,
    href: "/youtube",
  },
  {
    title: "Disease Prediction",
    icon: IconHeartbeat,
    href: "/PatientDashboard/DiseasePrediction",
  },
  {
    title: "Gamified Recovery",
    icon: IconRun,
    href: "/ptsd/games",
  },
  {
    title: "Task streak",
    icon: IconRun,
    href: "/streak",
  },
  {
    title: "Game Streak",
    icon: IconRun,
    href: "/gameprogress",
  },
  {
    title: "AI BOT",
    icon: IconRobot,
    href: "/AIBot",
  },
  {
    title: "Exercise & Activity",
    icon: IconRun,
    href: "/games",
  },
  {
    title: "Task Management",
    icon: IconListCheck,
    href: "/TaskManagement",
  },
  {
    title: "Community",
    icon: IconUsers,
    href: "/PatientDashboard/PatientPage/Community",
  },
  // {
  //   title: "Login",
  //   icon: IconLogin,
  //   href: "/authentication/login",
  // },
  // {
  //   title: "Register",
  //   icon: IconUserPlus,
  //   href: "/authentication/register",
  // },
];

export default Menuitems;
