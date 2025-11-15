import React from "react";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <section
      id="home"
      className="relative w-full h-screen flex justify-center items-center px-10 text-white"
    >
      {/* Optional subtle overlay */}
      <div className="absolute inset-0 bg-black/40 -z-10"></div>

      {/* Animated Content */}
      <motion.div
        className="relative z-10 max-w-3xl text-center flex flex-col items-center"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-4xl sm:text-5xl font-bold mb-4">
          Hey there, I'm{" "}
          <span className="bg-gradient-to-r from-blue-300 via-blue-400 to-cyan-300 bg-clip-text text-transparent">
            Anjana
          </span>
          .
        </h1>

        <h2 className="text-2xl sm:text-3xl font-semibold mb-6 bg-gradient-to-r from-blue-300 via-blue-400 to-cyan-300 bg-clip-text text-transparent">
          Data Analyst • Scientist
        </h2>

        {/* <p className="text-lg sm:text-xl max-w-lg text-blue-100 mb-12">
          Passionate about turning raw data into meaningful insights. Experienced in analyzing datasets to drive strategic decisions and uncover trends.
        </p> */}

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          <button
            onClick={() => {
              const projectsSection = document.getElementById("projects");
              if (projectsSection) {
                projectsSection.scrollIntoView({ behavior: "smooth" });
              }
            }}
            className="bg-gradient-to-r from-blue-300 via-blue-400 to-cyan-300 text-white font-semibold py-3 px-6 sm:w-48 flex justify-center items-center rounded-full shadow-lg shadow-blue-500/30 hover:shadow-blue-500/60 hover:scale-105 transition duration-300"
          >
            My Projects
          </button>

          <button
            onClick={() => {
              const contactSection = document.getElementById("contact");
              if (contactSection) {
                contactSection.scrollIntoView({ behavior: "smooth" });
              }
            }}
            className="bg-blue-400/20 border border-blue-400 text-blue-300 font-semibold py-3 px-6 sm:w-48 flex justify-center items-center rounded-full 
                       backdrop-blur-sm hover:bg-blue-400/40 hover:text-white hover:scale-105 transition duration-300"
          >
            Say Hello
          </button>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;