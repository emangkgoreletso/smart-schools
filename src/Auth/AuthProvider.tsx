// src/Auth/AuthProvider.tsx
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { User } from "../Types/User";

/* ================= TYPES ================= */

export type AuthContextType = {
  user: User | null;
  token: string | null;
  loading: boolean;

  // Auth
  signIn: (
    identifier: string,
    password: string
  ) => Promise<{
    requiresMfa: boolean;
    user?: User;
    token?: string;
  }>;

  finalizeLogin: (user: User, token: string) => void;
  signOut: () => void;

  // MFA
  sendOtp: (email: string) => Promise<void>;
  verifyOtp: (email: string, otp: string) => Promise<void>;

  // Registration
  register: (payload: {
    username: string;
    email: string;
    password: string;
    role: User["role"];
    firstName: string;
    lastName: string;
  }) => Promise<User>;

  // Password reset
  requestPasswordReset: (email: string) => Promise<void>;
  resetPassword: (token: string, newPassword: string) => Promise<void>;
};

/* ================= CONTEXT ================= */

const AuthContext = createContext<AuthContextType | undefined>(undefined);

/* ================= STORAGE KEYS ================= */

const USER_KEY = "auth_user_v1";
const TOKEN_KEY = "auth_token_v1";

/* ================= PROVIDER ================= */

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(() => {
    const raw = localStorage.getItem(USER_KEY);
    return raw ? JSON.parse(raw) : null;
  });

  const [token, setToken] = useState<string | null>(() =>
    localStorage.getItem(TOKEN_KEY)
  );

  const [loading, setLoading] = useState(false);

  /* ================= PERSISTENCE ================= */

  useEffect(() => {
    if (user) localStorage.setItem(USER_KEY, JSON.stringify(user));
    else localStorage.removeItem(USER_KEY);
  }, [user]);

  useEffect(() => {
    if (token) localStorage.setItem(TOKEN_KEY, token);
    else localStorage.removeItem(TOKEN_KEY);
  }, [token]);

  /* ================= AUTH ================= */

  const signIn = async (identifier: string, password: string) => {
    setLoading(true);

    try {
      const users: any[] = JSON.parse(
        localStorage.getItem("auth_users_v1") || "[]"
      );

      const user = users.find(
        (u) =>
          (u.email === identifier || u.username === identifier) &&
          u.password === password
      );

      if (!user) {
        throw new Error("Invalid credentials");
      }

      return {
        user,
        requiresMfa: false, // <- as requested
        token: "mock-token-" + Math.random().toString(36).slice(2, 10),
      };
    } finally {
      setLoading(false);
    }
  };

  const finalizeLogin = (user: User, token: string) => {
    setUser(user);
    setToken(token);
  };

  const signOut = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem(USER_KEY);
    localStorage.removeItem(TOKEN_KEY);
  };

  /* ================= MFA ================= */

  const sendOtp = async (email: string) => {
    // Implement your MFA logic here
    return;
  };

  const verifyOtp = async (email: string, otp: string) => {
    // Implement your MFA logic here
    return;
  };

  /* ================= REGISTRATION ================= */

  const register = async (data: any) => {
    const users = JSON.parse(
      localStorage.getItem("auth_users_v1") || "[]"
    );

    if (users.some((u: any) => u.email === data.email)) {
      throw new Error("User already exists");
    }

    const newUser = {
      id: Date.now().toString(),
      ...data,
      mfaEnabled: false,
    };

    users.push(newUser);
    localStorage.setItem("auth_users_v1", JSON.stringify(users));

    return newUser;
  };

  /* ================= PASSWORD RESET ================= */

  const requestPasswordReset = async (email: string) => {
    // Implement reset logic here
    return;
  };

  const resetPassword = async (token: string, newPassword: string) => {
    // Implement reset logic here
    return;
  };

  /* ================= CONTEXT VALUE ================= */

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        signIn,
        finalizeLogin,
        signOut,
        sendOtp,
        verifyOtp,
        register,
        requestPasswordReset,
        resetPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

/* ================= HOOK ================= */

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return ctx;
};
