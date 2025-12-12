import axios, { AxiosError, type InternalAxiosRequestConfig } from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_API_URL,
  timeout: 10000, //10 segundos
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * Função interceptadora para injetar o token em todas as requisições.
 */
function authInterceptor(config: InternalAxiosRequestConfig) {
  const token = localStorage.getItem("access_token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
}
/**
 * Função interceptadora para lidar com erros globais (ex: Token Expirado).
 */
function errorInterceptor(error: AxiosError) {
  //Se errou a senha ou usuario na pagina de login n recarrega a pagina
  if (error.config?.url?.includes("/login")) {
    return Promise.reject(error);
  }
  // Se o erro for 401 (Não autorizado), significa que o token é inválido ou expirou
  if (error.response?.status === 401) {
    localStorage.removeItem("access_token");
    // Força o reload para a página de login
    window.location.href = "/login";
  }
  return Promise.reject(error);
}

// Registra os interceptadores
api.interceptors.request.use(authInterceptor);
api.interceptors.response.use((response) => response, errorInterceptor);
