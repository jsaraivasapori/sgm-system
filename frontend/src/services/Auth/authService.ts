import { api } from "../api";

// Podemos reutilizar os tipos ou defini-los aqui
export interface LoginResponse {
  access_token: string;
  user?: {
    id: string;
    email: string;
    name: string;
  };
}

// Vamos tipar o payload de entrada
export interface LoginRequest {
  email: string;
  password: string;
}

/**
 * Realiza a requisição de login para obter o token JWT.
 */
export async function login(credentials: LoginRequest): Promise<LoginResponse> {
  const { data } = await api.post<LoginResponse>("/auth/login", credentials);
  console.log(data);

  return data;
}

/**
 * Remove o token do armazenamento local.
 */
export function logout(): void {
  localStorage.removeItem("access_token");
}

/**
 * Recupera o token atual (útil para verificar sessão).
 */
export function getToken(): string | null {
  return localStorage.getItem("access_token");
}
