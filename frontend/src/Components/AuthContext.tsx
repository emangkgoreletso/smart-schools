// src/Components/AuthContext.tsx
import React, { createContext, useContext, useState, ReactNode } from "react";
import { User, Role } from "../Types/User";
import { sendEmailOtp, verifyEmailOtp, loginUser } from "../Utils/MockAuthApi";

interface AuthContextType {
  user: User | null;
  signIn: (identifier: string, password: string) => Promise<{ user: User | null; requiresMfa: boolean; token?: string }>;
  register: (args: {
    username: string;
    email: string;
    password: string;
    role: Role;
    firstName: string;
    lastName: string;
  }) => Promise<void>;
  sendOtp: (email: string) => Promise<void>;
  verifyOtp: (email: string, otp: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(
    JSON.parse(localStorage.getItem("smart_user") || "null")
  );

  const signIn = async (identifier: string, password: string) => {
    const res = await loginUser(identifier, password);
    if (res.user) {
      setUser(res.user);
      localStorage.setItem("smart_user", JSON.stringify(res.user));
    }
    return res;
  };

  const register = async (args: {
    username: string;
    email: string;
    password: string;
    role: Role;
    firstName: string;
    lastName: string;
  }) => {
    // Create a new User object with required id and name
    const id = Date.now().toString(); // temporary unique ID
    const newUser: User = {
      id,
      name: `${args.firstName} ${args.lastName}`,
      username: args.username,
      email: args.email,
      role: args.role,
      firstName: args.firstName,
      lastName: args.lastName,
    };

    // Save user locally (simulating backend)
    setUser(newUser);
    localStorage.setItem("smart_user", JSON.stringify(newUser));

    // Optional: simulate sending verification email
    await sendEmailOtp(args.email);
  };

  const sendOtp = async (email: string) => {
    await sendEmailOtp(email);
  };

  const verifyOtp = async (email: string, otp: string) => {
    await verifyEmailOtp(email, otp);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("smart_user");
  };

  return (
    <AuthContext.Provider value={{ user, signIn, register, sendOtp, verifyOtp, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
};
