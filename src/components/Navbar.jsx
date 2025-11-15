import React, { useState, useEffect } from "react";
import { assets } from "../assets/assets";

const Navbar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true);
  }, []);

  return (
    <nav className="w-full px-10 py-4 flex items-center justify-between fixed top-0 z-50 bg-transparent">
      {/* Desktop Links */}
      <div
        className={`hidden sm:flex gap-12 font-medium text-lg transition-all duration-[1500ms] ${
          animate ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
      >
        {["home", "about", "skills", "experience", "projects"].map((item) => (
          <a
            key={item}
            href={`#${item}`}
            className="bg-gradient-to-r from-blue-300 via-blue-400 to-cyan-300 bg-clip-text text-transparent hover:scale-110 transition duration-300"
          >
            {item.charAt(0).toUpperCase() + item.slice(1)}
          </a>
        ))}
      </div>

      {/* Desktop Connect Button */}
      <div
        className={`hidden sm:flex transition-all duration-[1500ms] ${
    animate ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
  }`}
>
  <button
    onClick={() => {
      const contactSection = document.getElementById("contact");
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: "smooth" });
      }
    }}
    className="bg-gradient-to-r from-blue-300 via-blue-400 to-cyan-300 text-white px-5 py-2 rounded-full shadow-lg shadow-blue-500/30 hover:shadow-blue-500/60 hover:scale-105 transition duration-300"
  >
    Connect
  </button>
      </div>

      {/* Mobile Hamburger Icon */}
      {!sidebarOpen && (
        <div className="sm:hidden absolute top-6 right-6 z-50">
          <img
            src={assets.menu}
            alt="menu"
            onClick={() => setSidebarOpen(true)}
            className="w-8 h-8 cursor-pointer"
          />
        </div>
      )}

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 right-0 h-screen w-64 bg-black bg-opacity-95 text-white flex flex-col gap-6 text-lg p-8 transition-transform transform ${
          sidebarOpen ? "translate-x-0" : "translate-x-full"
        } sm:hidden`}
      >
        <img
          src={assets.close}
          alt="close"
          className="w-8 absolute right-4 top-2 cursor-pointer"
          onClick={() => setSidebarOpen(false)}
        />

        {["home", "about", "skills", "experience", "projects", "contact"].map(
          (item) => (
            <a
              key={item}
              href={`#${item}`}
              onClick={() => setSidebarOpen(false)}
              className="bg-gradient-to-r from-blue-300 via-blue-400 to-cyan-300 bg-clip-text text-transparent transition duration-300"
            >
              {item.charAt(0).toUpperCase() + item.slice(1)}
            </a>
          )
        )}
      </div>
    </nav>
  );
};

export default Navbar;
