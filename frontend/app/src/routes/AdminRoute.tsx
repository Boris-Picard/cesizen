import { useAuth } from "@/context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

export function AdminRoute() {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated || !user?.roles?.includes("ROLE_ADMIN")) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
