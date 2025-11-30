import React, { useState, useEffect, useRef } from "react";
import { assets } from "../assets/assets";
import { motion } from "framer-motion";

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

const Projects = () => {
  const projectsData = [
    {
      title: "Question Generator & Summarizer",
      description: [
        "Built an AI-driven tool that converts PDFs, DOCX, and text into summaries and auto-generated MCQs (single/multiple-choice, true–false, subjective).",
        "Powered by GPT-4.1 for generation and Sentence-Transformers (gte-small) for embeddings.",
        "Allows export in Excel, CSV, JSON, DOCX, and PDF formats.",
        "Implemented context storage and retrieval using ChromaDB for improved text handling.",
        "Designed a clean, interactive UI using Gradio, supporting export to TXT, CSV, XLSX, DOCX, PDF.",
        "Fully deployed on Hugging Face Spaces with secure API integration and fast inference.",
        '<a href="https://huggingface.co/spaces/anjanaR/quest_gen" target="_blank" rel="noopener noreferrer" class="text-blue-400 underline">View Project</a>',
      ],
    },
    {
      title: "Reddit RAG AI/ML Advice Bot",
      description: [
        "Built a Retrieval-Augmented Generation (RAG) chatbot using Python, Gradio, ChromaDB, and OpenAI.",
        "Scraped and stored real Reddit discussions on AI/ML for semantic search.",
        "Retrieves the most relevant community responses and summarizes them into clear bullet-point advice.",
        "Deployed on Hugging Face Spaces with a public, interactive web UI.",
        '<a href="https://huggingface.co/spaces/anjanaR/AI_ML_advice_bot" target="_blank" rel="noopener noreferrer" class="text-blue-400 underline">View Project</a>',
      ],
    },
    {
      title: "AI Summarizer & Multi-Modal Extractor",
      description: [
        "Built a multimodal AI summarizer that processes PDFs, text, audio, and YouTube videos using FastAPI + React.",
        "Used GPT-4o-mini for summarization and Whisper (gpt-4o-transcribe) for high-accuracy speech-to-text with
automatic YouTube audio extraction.",
        " Deployed on Render with a fast, interactive UI featuring file uploads, drag-drop, and formatted summary
output",
        '<a href="https://summarizer-frontend-fw54.onrender.com/" target="_blank" rel="noopener noreferrer" class="text-blue-400 underline">View Project</a>',
      ],
    },
    {
      title: "Anime Q&A Chatbot (LLM-based)",
      description: [
        "Built using Haystack pipelines with TinyLlama and Mistral via Ollama for local inference.",
        "Integrated BM25Retriever, InMemoryDocumentStore, PromptBuilder, and deployed with Gradio.",
        '<a href="https://github.com/Anjana-achariya/TinyLlama" target="_blank" rel="noopener noreferrer" class="text-blue-400 underline">View Project</a>',
      ],
    },
    {
      title: "Stock Market Dashboard – Tableau",
      description: [
        "Created dynamic dashboards using real-time data scraped from Yahoo Finance.",
        "Displayed market gainers, losers, actives with interactive visuals.",
        '<a href="https://public.tableau.com/views/STOCK_17475813199520/Dashboard1" target="_blank" rel="noopener noreferrer" class="text-blue-400 underline">View Project</a>',
      ],
    },
  ];

  const [expanded, setExpanded] = useState(null);
  const sectionRef = useRef(null);
  const [visibleProjects, setVisibleProjects] = useState([]);

  // Reveal-on-scroll animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            projectsData.forEach((_, index) => {
              setTimeout(() => {
                setVisibleProjects((prev) => [...prev, index]);
              }, index * 200);
            });
          } else {
            setVisibleProjects([]);
          }
        });
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const toggleProject = (index) => {
    setExpanded(expanded === index ? null : index);
  };

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="w-full min-h-screen flex flex-col justify-center items-center px-10 py-16 relative text-white"
    >
      <div className="absolute inset-0 bg-black/60 -z-10"></div>

      <div className="relative z-10 w-full max-w-3xl flex flex-col gap-6">
        {/* Section Title */}
        <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-blue-300 via-blue-400 to-cyan-300 bg-clip-text text-transparent">
          Wanna See What I’ve Built?
        </h2>

        <TypingParagraph
          text="Each project is a new adventure — a star in the sky of my journey. Below are a few shining examples of where I've been, and I can't wait for the next step in this creative voyage."
          star={assets.star}
        />

        {/* Project Cards */}
        {projectsData.map((project, index) => (
          <div
            key={index}
            className={`bg-blue-400/20 border border-blue-400/20 backdrop-blur-sm rounded-2xl p-6 shadow-lg transition-all duration-700 transform ${
              visibleProjects.includes(index)
                ? "opacity-100 translate-y-0 scale-100"
                : "opacity-0 translate-y-12 scale-95"
            } hover:shadow-2xl hover:bg-blue-400/30 hover:scale-105`}
          >
            {/* Card Header */}
            <button
              onClick={() => toggleProject(index)}
              className="w-full text-left px-4 py-3 flex justify-between items-center font-semibold text-lg bg-clip-text text-transparent bg-gradient-to-r from-blue-300 via-blue-400 to-cyan-300"
            >
              {project.title}
              <span className="text-blue-300 text-xl">
                {expanded === index ? "-" : "+"}
              </span>
            </button>

            {/* Description */}
            <div
              className={`transition-all duration-500 ease-in-out overflow-hidden ${
                expanded === index ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              <div className="px-4 py-3 flex flex-col gap-2 text-blue-100">
                {project.description.map((line, i) => (
                  <p
                    key={i}
                    dangerouslySetInnerHTML={{ __html: line }}
                    className="text-blue-100"
                  />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;

