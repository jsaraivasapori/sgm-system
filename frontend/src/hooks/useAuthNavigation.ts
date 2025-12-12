import { useNavigate } from "react-router-dom";

/**
 * Hook responsável por gerenciar a navegação relacionada à autenticação e fornecer a estrutura do menu do sistema.
 * * Centraliza a lógica de logout e a definição das rotas disponíveis no menu principal,
 * garantindo que componentes visuais não precisem conhecer as URLs diretamente.
 * * @returns Um objeto contendo:
 * - `logout`: Função que limpa a sessão e redireciona para o login.
 * - `menuItems`: Array com os itens de navegação (label e path).
 */
export function useAuthNavigation() {
  const navigate = useNavigate();

  /**
   * Função que limpa o Local Storage e redireciona para a página de Login
   */
  function logout() {
    localStorage.removeItem("access_token");
    navigate("login");
  }

  const menuItems = [
    { label: "Dashboard", path: "/dashboard" }, // Será implementado por último
    { label: "Usuários", path: "/usuarios" },
    { label: "Apoiadores", path: "/apoiadores" },
    { label: "Bens para Doação", path: "/bens" },
    { label: "Beneficiários", path: "/beneficiarios" },
    { label: "Processos Codevasf", path: "/processos" },
  ];
  return { logout, menuItems };
}
