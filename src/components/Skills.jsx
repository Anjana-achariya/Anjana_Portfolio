import React, { useState } from "react";
import { motion } from "framer-motion";
import { assets } from "../assets/assets"; // needed for star

const TypingParagraph = ({ text, star }) => {
  const words = text.split(" ");
  const [done, setDone] = React.useState(false);

  const container = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.006 },
    },
  };

  const letter = {
    hidden: { opacity: 0, y: 4 },
    visible: { opacity: 1, y: 0, transition: { ease: "easeOut" } },
  };

  return (
    <motion.p
      className="text-blue-200 text-lg sm:text-xl mb-8 text-center"
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.4 }}
      
      // ⭐ Reset stars each time the paragraph scrolls into view
      onViewportEnter={() => {
        setDone(false);
      }}

      // ⭐ Show stars only when typing finishes (each time!)
      onAnimationComplete={() => {
        setDone(true);
      }}

      style={{ whiteSpace: "normal" }}
    >
      {/* typing letters */}
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

      {/* animated stars */}
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
            <img src={star} alt="" className="w-3 h-3" />
          </motion.span>
        ))}
      </span>
    </motion.p>
  );
};


// ------------------------------
// MAIN SKILLS SECTION
// ------------------------------
const ResumeSkillsAccordionAnimated = () => {
  const skillsData = {
    "Programming & Core Languages": ["Python", "R", "SQL"],
    "Machine Learning & Deep Learning": [
      "Supervised / Unsupervised Learning (Regression, Classification, Clustering, Association)",
      "Deep Learning (Neural Networks, CNN, RNN, LSTM)",
      "Natural Language Processing (NLP) (Transformers, NLTK, spaCy, HuggingFace)",
      "Model Evaluation & Hyperparameter Tuning",
    ],
    "Big Data & Data Engineering": [
      "PySpark",
      "Hadoop Ecosystem (HDFS, MapReduce, Hive)",
      "Data Preprocessing & Feature Engineering",
    ],
    "Tools & Frameworks": [
      "TensorFlow / Keras / PyTorch",
      "Scikit-learn",
      "Pandas & NumPy",
      "Matplotlib / Seaborn / Plotly",
      "Jupyter Notebook / Google Colab",
    ],
    "Deployment & Production": [
      "Flask / FastAPI / Streamlit / Gradio",
      "Version Control (Git/GitHub)",
      "React.js & JavaScript",
    ],
  };

  const [expanded, setExpanded] = useState("Programming & Core Languages");
  const toggleCard = (category) => setExpanded(expanded === category ? null : category);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.2 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <section
      id="skills"
      className="w-full min-h-screen flex flex-col justify-center items-center px-10 py-16 relative text-white"
    >
      <div className="absolute inset-0 bg-black/40 -z-10"></div>

      <motion.div
        className="relative z-10 w-full max-w-3xl flex flex-col gap-6"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.3 }}
      >
        <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-blue-300 via-blue-400 to-cyan-300 bg-clip-text text-transparent">
          Tech & Tools I Love
        </h2>

        {/* 👉 Typing animation paragraph (centered, same style, only text animates) */}
        <TypingParagraph
          text="Skills are like stars — countless, bright, and waiting to guide me in my next adventure. Here’s a little constellation of what I’ve gathered so far!"
          star={assets.star}
        />

        {/* Accordion Cards */}
        {Object.entries(skillsData).map(([category, skills]) => (
          <motion.div
            key={category}
            className="bg-blue-400/20 border border-blue-400/20 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
            variants={cardVariants}
          >
            <button
              onClick={() => toggleCard(category)}
              className="w-full text-left px-6 py-4 flex justify-between items-center font-semibold text-lg bg-clip-text text-transparent bg-gradient-to-r from-blue-300 via-blue-400 to-cyan-300 hover:bg-blue-300/10 transition"
            >
              {category}
              <span className="text-blue-300 text-xl">{expanded === category ? "-" : "+"}</span>
            </button>

            <div
              className={`transition-all duration-500 ease-in-out overflow-hidden ${
                expanded === category ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              <div className="px-6 pb-6 flex flex-col gap-3">
                {skills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="bg-blue-400/20 border border-blue-400/20 text-blue-300 px-4 py-2 rounded-md text-base hover:bg-blue-400/30 transition"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default ResumeSkillsAccordionAnimated;
