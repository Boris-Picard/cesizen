import { useAuth } from "@/context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

export function PublicRoute() {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
