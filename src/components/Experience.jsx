import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { assets } from "../assets/assets";
const TypingParagraph = ({ text, star }) => {
  const words = text.split(" ");
  const [done, setDone] = useState(false);

  const container = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.006 } },
  };

  const letter = {
    hidden: { opacity: 0, y: 4 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { ease: "easeOut" },
    },
  };

  return (
    <motion.p
      className="text-blue-200 text-lg sm:text-xl mb-8 text-center"
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.4 }}
      onViewportEnter={() => setDone(false)}
      onAnimationComplete={() => setDone(true)}
      style={{ whiteSpace: "normal" }}
    >
      {words.map((word, wi) => (
        <motion.span key={wi} className="inline-block mr-1">
          {Array.from(word).map((char, ci) => (
            <motion.span
              key={ci}
              variants={letter}
              className="inline-block"
            >
              {char}
            </motion.span>
          ))}
        </motion.span>
      ))}

      {/* Stars after typing */}
      <span className="inline-flex ml-2 gap-1 align-middle">
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0 }}
            animate={
              done
                ? { opacity: [0.2, 1, 0.2], y: [0, -3, 0] }
                : { opacity: 0 }
            }
            transition={{
              repeat: Infinity,
              duration: 1,
              ease: "easeInOut",
              delay: done ? i * 0.15 : 0,
            }}
          >
            <img src={assets.star} className="w-3 h-3" alt="" />
          </motion.span>
        ))}
      </span>
    </motion.p>
  );
};

const Experience = () => {
  const experiences = [
    {
      title: "AIML Tech Mentor",
      company: "KGisl MicroCollege",
      date: "June 2024 - Present",
      details: [
        "Deliver in-depth hands-on instruction on machine learning, data visualization, and Python for 100+ learners.",
        "Guided student projects involving data wrangling, predictive modeling, and real-world analytics.",
        "Trained professionals on data engineering, ML engineering, Excel, SQL, Power BI, and Tableau for analytics roles.",
      ],
    },
    {
      title: "Big Data Tech Mentor",
      company: "Lovely Professional University, UpGrad",
      date: "June 2023 - June 2024",
      details: [
        "Mentored 800+ BTech students on Hadoop, Spark, Hive, and project implementation.",
        "Supported AI/ML capstone development with feedback and model optimization.",
        "Delivered practical sessions on EDA, data preprocessing, and visualization.",
      ],
    },
    {
      title: "Data Analyst Tech Mentor (Freelance)",
      company: "SkilloVilla",
      date: "June 2023 - June 2024",
      details: [
        "Provided remote mentorship to working professionals in data analytics.",
        "Focused on real-world use cases and project-based skill building.",
      ],
    },
  ];

  const sectionRef = useRef(null);
  const [visibleCards, setVisibleCards] = useState([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            experiences.forEach((_, index) => {
              setTimeout(() => {
                setVisibleCards((prev) => [...prev, index]);
              }, index * 200); // stagger by 200ms
            });
          } else {
            // reset visible cards when section leaves viewport
            setVisibleCards([]);
          }
        });
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="relative w-full min-h-screen flex flex-col items-center justify-center px-8 py-16 text-white"
    >
      <div className="absolute inset-0 bg-black/40 -z-10"></div>

      <div className="relative z-10 text-center mb-12">
        <h2 className="text-4xl font-bold mb-12 bg-gradient-to-r from-blue-300 via-blue-400 to-cyan-300 bg-clip-text text-transparent">
          Chapters in My Galaxy
        </h2>
       <TypingParagraph
  text="Experiences that shaped me And constellations I followed"
  star={assets.star}
/>

      </div>

      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl">
        {experiences.map((exp, index) => (
          <div
            key={index}
            className={`bg-blue-400/20 border border-blue-400/20 backdrop-blur-sm rounded-2xl p-6 shadow-lg transition-all duration-700 transform ${
              visibleCards.includes(index)
                ? "opacity-100 translate-y-0 scale-100"
                : "opacity-0 translate-y-12 scale-95"
            } hover:shadow-2xl hover:bg-blue-400/30 hover:scale-105`}
          >
            <h3 className="text-2xl font-bold mb-1 bg-gradient-to-r from-blue-300 via-blue-400 to-cyan-300 bg-clip-text text-transparent">
              {exp.title}
            </h3>
            <p className="text-md font-semibold mb-2 text-blue-200">{exp.company}</p>
            <p className="text-sm mb-4 text-blue-100">{exp.date}</p>
            <ul className="list-disc list-inside space-y-1 text-sm text-blue-100">
              {exp.details.map((point, i) => (
                <li key={i}>{point}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Experience;
