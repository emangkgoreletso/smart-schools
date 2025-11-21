// src/routes/ProtectedRoute.tsx
import React from "react";
import { Navigate } from "react-router-dom";

type Props = {
  children: React.ReactNode;
  allowedRoles?: string[]; // optional role filtering
};

const ProtectedRoute: React.FC<Props> = ({ children, allowedRoles }) => {
  const rawUser = localStorage.getItem("auth_user_v1");
  const token = localStorage.getItem("auth_token_v1");
  if (!rawUser || !token) {
    return <Navigate to="/login" replace />;
  }
  if (allowedRoles && rawUser) {
    try {
      const user = JSON.parse(rawUser) as { role?: string };
      if (!allowedRoles.includes(user.role || "")) {
        return <Navigate to="/dashboard" replace />;
      }
    } catch {}
  }
  return <>{children}</>;
};

export default ProtectedRoute;
