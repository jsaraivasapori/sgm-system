import { getToken } from "@/services/Auth/authService";
import type { JSX } from "react";
import { Navigate } from "react-router-dom";

interface PublicRouteProps {
  children: JSX.Element;
}

/**
 * Rota Pública Restrita.
 * * Se o usuário já estiver logado (tiver token), ele é redirecionado
 * automaticamente para o Dashboard ao tentar acessar páginas públicas como Login.
 */
export function PublicRoute({ children }: PublicRouteProps) {
  const token = getToken();

  // Se tem token, joga pro início (Dashboard)
  if (token) {
    return <Navigate to="/" replace />;
  }

  // Se não tem token, deixa renderizar a página de Login
  return children;
}
