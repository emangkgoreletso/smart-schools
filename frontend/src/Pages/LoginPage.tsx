// src/Pages/LoginPage.tsx
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../Components/AuthContext";
import MFAModal from "../Components/MFAModal";

const LoginPage: React.FC = () => {
  const { signIn, sendOtp, verifyOtp } = useAuth();
  const navigate = useNavigate();

  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [step, setStep] = useState<"form" | "mfa">("form");
  const [mfaEmail, setMfaEmail] = useState("");
  const [pendingUser, setPendingUser] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const res = await signIn(identifier, password);

      if (res.requiresMfa && res.user) {
        setPendingUser(res.user);
        setMfaEmail(res.user.email);

        await sendOtp(res.user.email);

        setStep("mfa");
      } else if (res.user && res.token) {
        localStorage.setItem("auth_user_v1", JSON.stringify(res.user));
        localStorage.setItem("auth_token_v1", res.token);
        navigate("/dashboard");
      }
    } catch (err: any) {
      setError(err?.message || "Login failed");
    }
  };

  const handleVerify = async (otp: string) => {
    if (!pendingUser) throw new Error("No pending user");

    await verifyOtp(mfaEmail, otp);

    localStorage.setItem("auth_user_v1", JSON.stringify(pendingUser));
    localStorage.setItem(
      "auth_token_v1",
      "mock-final-token-" + Math.random().toString(36).slice(2, 8)
    );

    window.location.href = "/dashboard";
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow">
        <h2 className="text-3xl font-bold text-center mb-6 text-maroon-700">
          Login
        </h2>

        <form onSubmit={submit} className="space-y-4">
          <input
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            placeholder="Email"
            className="w-full p-3 border rounded"
            required
          />

          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            type="password"
            className="w-full p-3 border rounded"
            required
          />

          {error && <div className="text-red-600">{error}</div>}

          <button
            type="submit"
            className="w-full bg-maroon-700 text-white p-3 rounded-lg font-semibold hover:bg-maroon-800"
          >
            Login
          </button>
        </form>

        {/* Register + Forgot password */}
        <div className="mt-6 text-sm text-center text-gray-700">
          <p>
            Don't have an account?{" "}
            <Link to="/register" className="text-maroon-700 font-semibold hover:underline">
              Register
            </Link>
          </p>

              <p className="mt-2">
            <Link to="/password-reset" className="text-maroon-700 hover:underline">
              Forgot your password?
            </Link>
          </p>
        </div>
      </div>

      {step === "mfa" && pendingUser && (
        <MFAModal
          email={mfaEmail}
          onVerify={handleVerify}
          onCancel={() => setStep("form")}
        />
      )}
    </div>
  );
};

export default LoginPage;
