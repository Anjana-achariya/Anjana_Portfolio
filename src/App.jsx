import React from "react";
import bgVideo from "./assets/bgvideo.mp4";
import Navbar from "./components/Navbar"
import Hero from "./components/Hero";
import WelcomeSection from "./components/WelcomeSection";
import About from "./components/About";
import ResumeSkillsAccordionAnimated from "./components/Skills";
import Experience from "./components/Experience";
import Project from "./components/Project";
import Contact from "./components/Contact";

const App = () => {
  return (
   
    <div className="relative min-h-screen text-white overflow-hidden">
      {/* Global Video Background */}
      <video
        src={bgVideo}
        autoPlay
        loop
        muted
        playsInline
        className="fixed top-0 left-0 w-full h-full object-cover -z-10"
      ></video>

      {/* Optional overlay for darkening background */}
      <div className="fixed inset-0 bg-black/50 -z-10"></div>

      {/* Sections */}
      <Navbar />
      <Hero />
      <WelcomeSection/>
       <About />
       <ResumeSkillsAccordionAnimated />
      <Experience />
      <Project />
      <Contact /> 
    </div>
    
  );
};

export default App;
