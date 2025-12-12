import { getToken } from "@/services/Auth/authService";
import { Navigate, Outlet } from "react-router-dom";

export function ProtectedRoute() {
  const token = getToken();

  // Se não tem token, joga para o login
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Se tem token, renderiza as rotas filhas (o AppLayout e o resto)
  return <Outlet />;
}
