import React, { useState } from "react";

const Register: React.FC = () => {
  const [form, setForm] = useState({
    name: "",
    surname: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const validateForm = () => {
    if (
      !form.name ||
      !form.surname ||
      !form.username ||
      !form.email ||
      !form.password ||
      !form.confirmPassword ||
      !form.role
    ) {
      return "All fields are required.";
    }

    if (form.password !== form.confirmPassword) {
      return "Passwords do not match.";
    }

    if (form.password.length < 6) {
      return "Password must be at least 6 characters.";
    }

    return null;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationError = validateForm();

    if (validationError) {
      setError(validationError);
      return;
    }

    // Placeholder success (API later)
    setSuccess("Account created successfully! A verification email has been sent.");
  };

  return (
    <div className="flex justify-center items-center py-12 px-4">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-lg border border-gray-200">
        
        <h2 className="text-2xl font-bold text-maroon-700 text-center mb-6">
          Create Your Account
        </h2>

        {error && <p className="text-red-600 text-center mb-4">{error}</p>}
        {success && <p className="text-green-600 text-center mb-4">{success}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Name */}
          <div>
            <label className="block text-sm font-semibold">Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2"
              placeholder="Enter your first name"
            />
          </div>

          {/* Surname */}
          <div>
            <label className="block text-sm font-semibold">Surname</label>
            <input
              type="text"
              name="surname"
              value={form.surname}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2"
              placeholder="Enter your surname"
            />
          </div>

          {/* Username */}
          <div>
            <label className="block text-sm font-semibold">Username</label>
            <input
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2"
              placeholder="Choose a username"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-semibold">Email Address</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2"
              placeholder="Enter your email"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-semibold">Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2"
              placeholder="Enter password"
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-semibold">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2"
              placeholder="Re-enter password"
            />
          </div>

          {/* Role Selection */}
          <div>
            <label className="block text-sm font-semibold">Select Role</label>
            <select
              name="role"
              value={form.role}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2"
            >
              <option value="">-- Choose Role --</option>
              <option value="student">Student</option>
              <option value="parent">Parent / Guardian</option>
              <option value="teacher">Teacher</option>
              <option value="staff">Leadership / HOD / Admin</option>
            </select>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-maroon-700 text-white py-2 rounded-lg hover:bg-maroon-800 transition font-semibold"
          >
            Register
          </button>

        </form>
      </div>
    </div>
  );
};

export default Register;
