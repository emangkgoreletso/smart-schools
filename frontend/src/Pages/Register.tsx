import React, { useState } from "react";
import { useAuth } from "../Components/AuthContext";
import { useNavigate } from "react-router-dom";

const Register: React.FC = () => {
  const { sendOtp, verifyOtp } = useAuth();
  const navigate = useNavigate();

  const [step, setStep] = useState<1 | 2>(1);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [otp, setOtp] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const requestOtp = async () => {
    try {
      await sendOtp(form.email);
      setStep(2);
    } catch (err) {
      alert("Failed to send OTP");
    }
  };

  const confirmOtp = async () => {
    try {
      await verifyOtp(form.email, otp);

      // save temporary user in localStorage (mock register)
      const newUser = {
        id: Date.now().toString(),
        name: form.email.split("@")[0],
        email: form.email,
        role: "student",
        username: form.email,
      };

      localStorage.setItem("smart_user", JSON.stringify(newUser));

      alert("Registration successful");
      navigate("/login");
    } catch (err) {
      alert("Invalid OTP");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Create Account</h2>

        {step === 1 && (
          <>
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="border p-2 w-full mb-3"
              value={form.email}
              onChange={handleChange}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="border p-2 w-full mb-4"
              value={form.password}
              onChange={handleChange}
            />

            <button
              onClick={requestOtp}
              className="w-full bg-maroon-700 text-white py-2 rounded"
            >
              Register
            </button>
          </>
        )}

        {step === 2 && (
          <>
            <p className="mb-2 text-sm">Enter the OTP sent to your email</p>

            <input
              type="text"
              placeholder="OTP"
              className="border p-2 w-full mb-4"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />

            <button
              onClick={confirmOtp}
              className="w-full bg-green-600 text-white py-2 rounded"
            >
              Verify OTP
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Register;
