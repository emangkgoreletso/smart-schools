import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#800000] text-white py-6 mt-10">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center space-y-3 md:space-y-0">
        {/* Left Side */}
        <p className="text-sm text-gray-200 text-center md:text-left">
          © {new Date().getFullYear()} <span className="font-semibold">Smart Schools</span>.  
          All rights reserved.
        </p>

        {/* Center Links */}
        <div className="flex space-x-4 text-sm text-gray-300">
          <a href="/about" className="hover:text-white transition">About</a>
          <a href="/contact" className="hover:text-white transition">Contact</a>
          <a href="/privacy" className="hover:text-white transition">Privacy Policy</a>
        </div>

        {/* Right Side */}
        <div className="flex space-x-4">
          <a href="#" aria-label="Facebook" className="hover:text-gray-200">
            <i className="fab fa-facebook-f"></i>
          </a>
          <a href="#" aria-label="Twitter" className="hover:text-gray-200">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="#" aria-label="LinkedIn" className="hover:text-gray-200">
            <i className="fab fa-linkedin-in"></i>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
