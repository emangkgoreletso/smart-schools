import React from "react";
import { Link } from "react-router-dom";
import HeroImage from "../Pictures/Placeholder banner.jpg";

const HomePage: React.FC = () => {
  return (
    <div className="w-full">
      <section className="relative w-full h-screen">
        {/* Hero Image */}
        <img
          src={HeroImage}
          alt="School Hero"
          className="w-full h-full object-cover"
        />

        {/* Overlay with text/buttons */}
        <div className="absolute inset-0 flex flex-col items-center justify-start pt-10 text-center px-6">
          <h1 className="text-4xl md:text-5xl font-bold text-maroon-700 ">
            Welcome to Smart School System
          </h1>
          <p className="mt-4 text-lg md:text-xl text-gray pt-100 max-w-2xl">
            A modern digital platform that automates school processes, enhances
            learning, and connects teachers, parents, and students.
          </p>

          <div className="mt-8 flex flex-wrap justify-center pt-80 gap-6">
            <Link
              to="/dashboard"
              className="bg-maroon-700 text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-maroon-800"
            >
              Go to Dashboard
            </Link>

            <Link
              to="/contact"
              className="border border-maroon-700 text-maroon-700 px-6 py-3 rounded-full text-lg font-semibold hover:bg-maroon-700 hover:text-white"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
