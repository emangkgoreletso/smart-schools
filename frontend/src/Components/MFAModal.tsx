// src/Components/MFAModal.tsx
import React, { useState } from "react";
import { useAuth } from "../Auth/AuthProvider";
import { useNavigate } from "react-router-dom";

type Props = {
  email?: string; // if set, will send OTP
  onCancel: () => void;
  redirectTo?: string; // where to go after successful login
   onVerify: (otp: string) => void;
  //onSubmit: (otp: string) => Promise<void>;  
};

const MFAModal: React.FC<Props> = ({ email: initialEmail = "", onCancel, redirectTo }) => {
  const { sendOtp, verifyOtp } = useAuth();
  const [step, setStep] = useState<"inputEmail" | "otp">(() => (initialEmail ? "otp" : "inputEmail"));
  const [email, setEmail] = useState(initialEmail);
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await sendOtp(email);
      setStep("otp");
    } catch (err: any) {
      setError(err?.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await verifyOtp(email, otp);
      // Redirect after login
      if (redirectTo) navigate(redirectTo);
      else navigate("/dashboard");
      onCancel();
    } catch (err: any) {
      setError(err?.message || "Failed to verify OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black opacity-40" onClick={onCancel} />
      <form
        onSubmit={step === "inputEmail" ? handleSendOtp : handleVerifyOtp}
        className="relative bg-white dark:bg-gray-800 rounded-lg p-6 z-10 w-full max-w-md shadow-lg text-center"
      >
        <h3 className="text-lg font-semibold mb-2">
          {step === "inputEmail" ? "Enter Your Email" : "Enter OTP"}
        </h3>

        {step === "inputEmail" && (
          <>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border rounded mb-3"
              placeholder="you@example.com"
              required
            />
          </>
        )}

        {step === "otp" && (
          <>
            <p className="text-sm text-gray-600 mb-4">
              OTP sent to <strong>{email}</strong>
            </p>
            <input
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full p-3 border rounded mb-3"
              placeholder="123456"
              inputMode="numeric"
              required
            />
          </>
        )}

        {error && <div className="text-red-600 mb-2">{error}</div>}

        <div className="flex flex-col gap-2">
          <button
            type="submit"
            disabled={loading}
            className="bg-maroon-700 text-white px-4 py-2 rounded font-semibold hover:bg-maroon-800"
          >
            {loading
              ? "Processing..."
              : step === "inputEmail"
              ? "Send OTP"
              : "Verify OTP"}
          </button>

          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 rounded border hover:bg-gray-100"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default MFAModal;
