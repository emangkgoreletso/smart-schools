import React from "react";

const About: React.FC = () => {
  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold text-maroon-700 mb-4">About Us</h1>

      <p className="text-gray-700 leading-relaxed text-lg">
        Smart School System is a fully integrated digital platform designed to
        automate administrative, academic, and communication processes for
        schools. We provide unified portals for teachers, parents, students,
        school administrators, and finance teams — all wrapped in a clean,
        modern, and secure experience.
      </p>

      <p className="text-gray-700 leading-relaxed mt-4 text-lg">
        Our goal is simple: empower schools with technology that improves
        efficiency, enhances learning outcomes, and fosters meaningful
        engagement between educators, learners, and guardians.
      </p>
    </div>
  );
};

export default About;
