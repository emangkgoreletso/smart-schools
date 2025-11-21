// src/Auth/AuthProvider.tsx
import React, { createContext, useContext, useEffect, useState } from "react";
import { User } from "../Types/User";
import * as api from "../Utils/MockAuthApi";

type AuthContextType = {
  user: User | null;
  token: string | null;
  loading: boolean;
  signIn: (identifier: string, password: string) => Promise<{ requiresMfa: boolean; user?: User; token?: string }>;
  signOut: () => void;
  sendOtp: (email: string) => Promise<void>;
  verifyOtp: (email: string, otp: string) => Promise<void>;
  register: (payload: {
    username: string;
    email: string;
    password: string;
    role: User["role"];
    firstName?: string;
    lastName?: string;
  }) => Promise<User>;
  requestPasswordReset: (email: string) => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const tokenKey = "auth_token_v1";
const userKey = "auth_user_v1";

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const raw = localStorage.getItem(userKey);
    return raw ? JSON.parse(raw) : null;
  });
  const [token, setToken] = useState<string | null>(() => localStorage.getItem(tokenKey));
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) localStorage.setItem(userKey, JSON.stringify(user));
    else localStorage.removeItem(userKey);
  }, [user]);

  useEffect(() => {
    if (token) localStorage.setItem(tokenKey, token);
    else localStorage.removeItem(tokenKey);
  }, [token]);

  const signIn = async (identifier: string, password: string) => {
    setLoading(true);
    try {
      const res = await api.loginUser(identifier, password);
      // we don't finalize login until MFA verified; but pass back user/token
      return { requiresMfa: res.requiresMfa, user: res.user, token: res.token };
    } finally {
      setLoading(false);
    }
  };

  const signOut = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem(userKey);
    localStorage.removeItem(tokenKey);
  };

  const sendOtp = async (email: string) => {
    await api.sendEmailOtp(email);
  };

  const verifyOtp = async (email: string, otp: string) => {
    await api.verifyEmailOtp(email, otp);
  };

  const register = async (payload: {
    username: string;
    email: string;
    password: string;
    role: User["role"];
    firstName?: string;
    lastName?: string;
  }) => {
    const u = await api.registerUser(payload);
    return u;
  };

  const requestPasswordReset = async (email: string) => {
    await api.requestPasswordReset(email);
  };

  return (
    <AuthContext.Provider
      value={{ user, token, loading, signIn, signOut, sendOtp, verifyOtp, register, requestPasswordReset }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
};
