import React from "react";

const Contact: React.FC = () => {
  return (
    <div className="p-10 max-w-xl">
      <h1 className="text-3xl font-bold text-maroon-700 mb-6">Contact Us</h1>

      <form className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Your Name"
          className="border p-3 rounded-md"
        />
        <input
          type="email"
          placeholder="Your Email"
          className="border p-3 rounded-md"
        />
        <textarea
          placeholder="Your Message"
          className="border p-3 rounded-md h-32"
        ></textarea>

        <button className="bg-maroon-700 text-white py-3 rounded-full font-semibold hover:bg-maroon-800">
          Send Message
        </button>
      </form>
    </div>
  );
};

export default Contact;
