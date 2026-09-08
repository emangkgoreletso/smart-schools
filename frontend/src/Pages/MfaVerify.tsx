import React, { useState } from "react";
import { useAuth } from "../Auth/AuthProvider";
import { useNavigate } from "react-router-dom";

const MfaVerify: React.FC<{ email: string }> = ({ email }) => {
  const { verifyOtp } = useAuth();
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await verifyOtp(email, otp);
      navigate("/dashboard");
    } catch {
      setError("Invalid OTP");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 bg-white p-6 rounded-xl shadow">
      <h2 className="text-xl font-bold mb-4 text-maroon-700">
        Verify your login
      </h2>

      {error && <p className="text-red-600 text-sm">{error}</p>}

      <form onSubmit={handleVerify} className="space-y-4">
        <input
          type="text"
          placeholder="Enter OTP sent to email"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          className="w-full border rounded px-4 py-2"
        />

        <button className="w-full bg-maroon-700 text-white py-2 rounded">
          Verify
        </button>
      </form>
    </div>
  );
};

export default MfaVerify;
