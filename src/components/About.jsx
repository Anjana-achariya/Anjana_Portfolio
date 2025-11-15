import React from "react";
import { motion } from "framer-motion";
import { assets } from "../assets/assets";

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

      onViewportEnter={() => setDone(false)}      
      onAnimationComplete={() => setDone(true)}   
      style={{ whiteSpace: "normal" }}
    >
      {words.map((word, wi) => (
        <motion.span key={wi} className="inline-block mr-1">
          {Array.from(word).map((char, ci) => (
            <motion.span key={ci} variants={letter} className="inline-block">
              {char}
            </motion.span>
          ))}
        </motion.span>
      ))}

      {/* Stars appear when typing finishes */}
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
            <img src={assets.star} alt="" className="w-3 h-3" />
          </motion.span>
        ))}
      </span>
    </motion.p>
  );
};

const About = () => {
  return (
    <section
      id="about"
      className="relative w-full min-h-screen flex flex-col items-center justify-center px-8 py-16"
      style={{
        backgroundImage: `url(${assets.hero})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/60 -z-10"></div>

      {/* Animated container */}
      <motion.div
        className="relative z-10 text-center max-w-3xl space-y-6"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ duration: 0.8 }}
      >
        {/* Title */}
        <h2 className="text-4xl sm:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-300 via-blue-400 to-cyan-300 bg-clip-text text-transparent">
          A Glimpse of Me
        </h2>

        {/* Email */}
        <p className="text-grey-200 text-lg sm:text-xl mb-8">
          anjanar266@gmail.com
        </p>

        {/* Typing paragraph with stars */}
        <TypingParagraph
          star={assets.star}
          text={`I’m a Data Analyst & AI explorer with a heart full of curiosity. Like stars guiding the night sky, I follow patterns, stories, and ideas. My work blends logic with creativity — turning raw data into insights, building AI-powered solutions, and constantly learning along the way.`}
        />
      </motion.div>
    </section>
  );
};

export default About;
