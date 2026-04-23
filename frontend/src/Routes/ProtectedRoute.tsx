import React from "react";
import { Navigate } from "react-router-dom";

type User = {
  role?: string;
};

type Props = {
  children: React.ReactNode;
  allowedRoles?: string[];
};

const ProtectedRoute: React.FC<Props> = ({ children, allowedRoles }) => {
  const rawUser = localStorage.getItem("auth_user_v1");
  const token = localStorage.getItem("auth_token_v1");

  // Not logged in
  if (!rawUser || !token) {
    return <Navigate to="/login" replace />;
  }

  let user: User | null = null;

  try {
    user = JSON.parse(rawUser);
  } catch {
    // corrupted storage
    localStorage.removeItem("auth_user_v1");
    localStorage.removeItem("auth_token_v1");
    return <Navigate to="/login" replace />;
  }

  // Role protection
  if (allowedRoles && user?.role && !allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;