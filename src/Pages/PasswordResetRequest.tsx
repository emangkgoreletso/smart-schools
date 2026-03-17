// src/pages/PasswordResetRequest.tsx
import React, { useState } from "react";
import { useAuth } from "../Auth/AuthProvider";

const PasswordResetRequest: React.FC = () => {
  const { requestPasswordReset } = useAuth();
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      await requestPasswordReset(email);
      setSent(true);
    } catch (err: any) {
      setError(err?.message || "Failed to request password reset");
    }
  };

  if (sent) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-white p-6 rounded shadow">
          <h3 className="font-semibold">Reset link sent</h3>
          <p className="text-sm text-gray-600">Check your email for instructions (simulated).</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form onSubmit={submit} className="bg-white p-6 rounded shadow w-full max-w-md">
        <h3 className="text-lg font-semibold mb-2">Reset password</h3>
        <input value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Email" className="w-full p-3 border rounded mb-2" required />
        {error && <div className="text-red-600 mb-2">{error}</div>}
        <button type="submit" className="w-full bg-maroon-700 text-white p-2 rounded">Send reset link</button>
      </form>
    </div>
  );
};

export default PasswordResetRequest;
