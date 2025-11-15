import React from "react";
import { motion } from "framer-motion";
import { assets } from "../assets/assets"; // make sure your icons are here: email, call, linkedin, social, hf

// ⭐ Typing Animation Paragraph (Contact Version)
const TypingParagraphContact = ({ text, star }) => {
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
    // CENTERING wrapper with a sensible max width so the paragraph doesn't span the whole page
    <motion.div
      className="max-w-3xl mx-auto text-center"
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.4 }}
      onViewportEnter={() => setDone(false)}
      onAnimationComplete={() => setDone(true)}
    >
      <motion.p
        className="text-blue-200 text-lg sm:text-xl mb-8"
        style={{ whiteSpace: "normal" }}
        aria-hidden
      >
        {words.map((word, wi) => (
          <motion.span key={wi} className="inline-block mr-1">
            {Array.from(word).map((char, ci) => (
              <motion.span
                key={ci}
                variants={letter}
                className="inline-block"
                style={{ willChange: "transform, opacity" }}
              >
                {char}
              </motion.span>
            ))}
          </motion.span>
        ))}

        {/* Stars at the end */}
        <span className="inline-flex ml-2 gap-1 align-middle">
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0 }}
              animate={
                done ? { opacity: [0.2, 1, 0.2], y: [0, -3, 0] } : { opacity: 0 }
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
      {/* sr-only full text for screen readers */}
      <span className="sr-only">{text}</span>
    </motion.div>
  );
};

// List of icons with links
const icons = [
  { src: assets.email, href: "mailto:anjanar266@gmail.com", alt: "Email" },
  { src: assets.call, href: "tel:+916383122707", alt: "Phone" },
  { src: assets.linkedin, href: "https://www.linkedin.com/in/anjana-ramachandran-achariya/", alt: "LinkedIn" },
  { src: assets.social, href: "https://github.com/Anjana-achariya", alt: "GitHub" },
  { src: assets.hf, href: "https://huggingface.co/anjanaR", alt: "Hugging Face" },
];

// Floating animation variant
const floatVariants = {
  float: {
    y: [0, -10, 0], // up and down
    transition: { duration: 3, repeat: Infinity, ease: "easeInOut" },
  },
};

const ContactIcons = () => {
  return (
    <div className="flex justify-center items-center gap-6 mt-12">
      {icons.map((icon, index) => (
        <motion.a
          key={icon.alt}
          href={icon.href}
          target="_blank"
          rel="noopener noreferrer"
          className="w-14 h-14 flex justify-center items-center"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.6, delay: index * 0.3 }}
          animate="float"
          variants={floatVariants}
          whileHover={{ scale: 1.2 }} // subtle hover bounce
        >
          <img src={icon.src} alt={icon.alt} className="w-full h-full" />
        </motion.a>
      ))}
    </div>
  );
};

const Contact = () => {
  return (
    <section
      id="contact"
      className="w-full min-h-screen flex flex-col items-center justify-center px-10 py-16 relative text-white"
    >
      {/* Optional background overlay */}
      <div className="absolute inset-0 bg-black/50 -z-10"></div>

      {/* Friendly Title */}
      <h2 className="text-4xl sm:text-5xl font-bold text-center mb-4 bg-gradient-to-r from-blue-300 via-blue-400 to-cyan-300 bg-clip-text text-transparent">
        Let’s Chat!
      </h2>

      <TypingParagraphContact
        star={assets.star}
        text="I believe that every conversation is an opportunity for growth. Whether you want to brainstorm ideas, collaborate on a project, or simply share thoughts over a cup of coffee, I’d love to hear from you. Reach out!"
      />

      <ContactIcons />
    </section>
  );
};

export default Contact;
