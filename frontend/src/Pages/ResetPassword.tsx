import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const ResetPassword: React.FC = () => {
  const { token } = useParams<{ token: string }>();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!token) {
      setError("Invalid or missing reset token");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }

    if (password !== confirm) {
      setError("Passwords do not match");
      return;
    }

    // 🔐 Simulate backend reset
    console.log("Password reset with token:", token);

    setSuccess(true);
    setTimeout(() => navigate("/"), 2000);
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-white p-6 rounded shadow text-center">
          <h3 className="font-semibold">Password reset successful</h3>
          <p className="text-sm text-gray-600">Redirecting to login…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form onSubmit={submit} className="bg-white p-6 rounded shadow w-full max-w-md">
        <h3 className="text-lg font-semibold mb-4">Set new password</h3>

        <input
          type="password"
          placeholder="New password"
          className="w-full p-3 border rounded mb-3"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Confirm new password"
          className="w-full p-3 border rounded mb-3"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          required
        />

        {error && <div className="text-red-600 mb-3">{error}</div>}

        <button className="w-full bg-maroon-700 text-white p-3 rounded">
          Reset password
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
