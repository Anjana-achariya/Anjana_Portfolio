import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import star from "../assets/star.png"; // <-- adjust path if needed

const WelcomeSection = () => {
  const text =
    "You've stumbled upon my corner of the digital universe, where passion, creativity, and a bit of stardust collide. Let's go on a journey together. But first, would you like to know who I am and what sparks my curiosity?";

  // words to avoid mid-word breaks
  const words = text.split(" ");

  // animation timing controls (tweak if you want faster/slower typing)
  const delayChildren = 0; // seconds
  const staggerChildren = 0.005; // seconds per letter
  const bufferMs = 280; // small buffer after last letter before showing stars (ms)

  // count letters that are actually animated (exclude spaces)
  const lettersCount = Array.from(text).filter((c) => c !== " ").length;

  // local state to show stars only after typing finished
  const [showStars, setShowStars] = useState(false);

  // ref to store timer id so we can clear it on unmount / re-enter
  const timerRef = useRef(null);

  useEffect(() => {
    return () => {
      // cleanup on unmount
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  const startTimerToShowStars = () => {
    // compute estimated time in ms
    const estimatedMs =
      (delayChildren + lettersCount * staggerChildren) * 1000 + bufferMs;

    // clear previous timer if any
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(() => {
      setShowStars(true);
      timerRef.current = null;
    }, Math.max(100, Math.round(estimatedMs)));
  };

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren,
        staggerChildren,
      },
    },
  };

  const letter = {
    hidden: { opacity: 0, y: 6 },
    visible: { opacity: 1, y: 0, transition: { ease: "easeOut" } },
  };

  const letterGradientClass =
    "inline-block bg-gradient-to-r from-blue-200 via-blue-200 to-cyan-200 bg-clip-text text-transparent";

  return (
    <section id="welcome" className="w-full px-6 md:px-20 py-24 relative">
      {/* Optional dark overlay */}
      <div className="absolute inset-0 bg-black/40 -z-10"></div>

      <motion.div
        className="max-w-4xl mx-auto text-center"
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.4 }}
        onViewportEnter={() => {
          // reset stars (in case user scrolls away & back)
          setShowStars(false);
          startTimerToShowStars();
        }}
      >
        {/* screen-reader full copy */}
        <span className="sr-only">{text}</span>

        <p
          className="max-w-3xl mx-auto text-lg md:text-xl leading-relaxed "
          style={{ whiteSpace: "normal" }}
        >
          {words.map((word, wi) => (
            <motion.span key={`word-${wi}`} className="inline-block mr-2">
              {Array.from(word).map((char, ci) => (
                <motion.span
                  key={`char-${wi}-${ci}`}
                  variants={letter}
                  aria-hidden
                  className={letterGradientClass}
                  style={{
                    willChange: "transform, opacity",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  {char}
                </motion.span>
              ))}
            </motion.span>
          ))}

          {/* stars: only render / animate after showStars is true */}
          <span className="inline-flex ml-2 gap-1 align-middle" aria-hidden>
            {[0, 1, 2].map((i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 0, scale: 0.95 }}
                animate={
                  showStars
                    ? { opacity: [0.15, 1, 0.15], y: [0, -4, 0], scale: [0.95, 1, 0.95] }
                    : { opacity: 0, y: 0, scale: 0.95 }
                }
                transition={{
                  repeat: Infinity,
                  duration: 1.1,
                  ease: "easeInOut",
                  delay: showStars ? i * 0.18 : 0,
                }}
                className="inline-flex items-center justify-center"
              >
                <img
                  src={star}
                  alt=""
                  className="w-3 h-3"
                  style={{
                    filter: "drop-shadow(0 0 6px rgba(0,140,255,0.45))",
                  }}
                />
              </motion.span>
            ))}
          </span>
        </p>
      </motion.div>
    </section>
  );
};

export default WelcomeSection;
