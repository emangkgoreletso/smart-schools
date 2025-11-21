// src/utils/MockAuthApi.ts
import { User, Role } from "../Types/User";

const delay = (ms = 600) => new Promise((r) => setTimeout(r, ms));

// very small in-memory "db" (for dev)
const usersKey = "mock_users_v1";
const loadUsers = (): User[] => {
  const raw = localStorage.getItem(usersKey);
  if (!raw) return [];
  try { return JSON.parse(raw); } catch { return []; }
};
const saveUsers = (u: User[]) => localStorage.setItem(usersKey, JSON.stringify(u));

/** Create a new user (register) */
export const registerUser = async (payload: {
  username: string;
  email: string;
  password: string;
  role: Role;
  firstName?: string;
  lastName?: string;
}) => {
  await delay();
  const users = loadUsers();

  if (users.find((u) => u.email === payload.email || u.username === payload.username)) {
    throw new Error("User with that email or username already exists");
  }

  const id = Math.random().toString(36).slice(2, 9);
  const newUser: User = {
    id,
    username: payload.username,
    email: payload.email,
    role: payload.role,
    firstName: payload.firstName,
    lastName: payload.lastName,
    name: payload.firstName
      ? payload.lastName
        ? `${payload.firstName} ${payload.lastName}`
        : payload.firstName
      : payload.username, // fallback
  };

  users.push(newUser);
  saveUsers(users);

  // NOTE: we don't store passwords in this mock; it's a simulation only.
  return newUser;
};

/** Login: validate credentials (simulated) */
export const loginUser = async (identifier: string, password: string) => {
  await delay();
  const users = loadUsers();
  const found = users.find(
    (u) => u.email.toLowerCase() === identifier.toLowerCase() || u.username.toLowerCase() === identifier.toLowerCase()
  );

  if (!found) {
    // keep behavior same as real systems: avoid leaking which one failed
    throw new Error("Invalid credentials");
  }

  // For the mock, any password is accepted but require MFA always
  return {
    user: found,
    requiresMfa: true,
    token: "mock-jwt-token-" + Math.random().toString(36).slice(2, 8),
  };
};

/** Send email OTP (simulated) — store in sessionStorage */
export const sendEmailOtp = async (email: string) => {
  await delay();
  const otp = (Math.floor(100000 + Math.random() * 900000)).toString(); // 6-digit
  const expires = Date.now() + 5 * 60 * 1000;
  sessionStorage.setItem(`mock_otp_${email}`, JSON.stringify({ otp, expires }));
  console.info(`[DEV] OTP for ${email}: ${otp} (expires in 5m)`);
  return { ok: true };
};

/** Verify email OTP */
export const verifyEmailOtp = async (email: string, otp: string) => {
  await delay();
  const raw = sessionStorage.getItem(`mock_otp_${email}`);
  if (!raw) throw new Error("OTP not found or expired");

  try {
    const { otp: stored, expires } = JSON.parse(raw);
    if (Date.now() > expires) {
      sessionStorage.removeItem(`mock_otp_${email}`);
      throw new Error("OTP expired");
    }
    if (stored !== otp) throw new Error("Invalid OTP");
    sessionStorage.removeItem(`mock_otp_${email}`);
    return { ok: true };
  } catch (err) {
    throw err;
  }
};

/** Password reset (send link simulation) */
export const requestPasswordReset = async (email: string) => {
  await delay();
  const users = loadUsers();
  const found = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
  if (!found) {
    console.info(`[DEV] Password reset requested for ${email} (no user check leak).`);
    return { ok: true };
  }

  const token = Math.random().toString(36).slice(2, 12);
  sessionStorage.setItem(`mock_pwreset_${email}`, JSON.stringify({ token, expires: Date.now() + 30 * 60 * 1000 }));
  console.info(`[DEV] Password reset link for ${email}: /reset-password?email=${encodeURIComponent(email)}&token=${token}`);
  return { ok: true };
};
