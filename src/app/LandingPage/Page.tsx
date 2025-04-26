import AboutSectionOne from "../../components/LandingPage/app/about/page";
import AboutSectionTwo from "../../components/LandingPage/components/About/AboutSectionTwo";
import Blog from "../../components/LandingPage/components/Blog";
import Brands from "../../components/LandingPage/components/Brands";
import ScrollUp from "../../components/LandingPage/components/Common/ScrollUp";
import Contact from "../../components/LandingPage/components/Contact";
import Features from "../../components/LandingPage/components/Features";
import Hero from "../../components/LandingPage/components/Hero";
import Pricing from "../../components/LandingPage/components/Pricing";
import Testimonials from "../../components/LandingPage/components/Testimonials";
import Video from "../../components/LandingPage/components/Video";

import Footer from "../../components/LandingPage/components/Footer";
import Header from "../../components/LandingPage/components/Header";



export default function Home() {
  return (
    <div className=" w-full h-screen">
      <Header />
      <ScrollUp />
      <Hero />
      <Features />
      <Video />
      <Brands />
      <AboutSectionOne />
      <AboutSectionTwo />
      <Testimonials />
      <Pricing />
      <Blog />
      <Contact />
      <Footer />
    </div>
  );
}

