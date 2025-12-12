import { useState } from "react";

/**
 * Hook responsável por controlar o estado de visibilidade da Sidebar (menu lateral) em dispositivos móveis.
 * * Isola a lógica de UI (`useState`) dos componentes de apresentação, permitindo que
 * o Header (que abre o menu) e a Sidebar (que fecha o menu) compartilhem a mesma lógica
 * através de um componente pai ou contexto, se necessário.
 * * @returns Um objeto contendo:
 * - `isOpen`: Booleano indicando se o menu está aberto.
 * - `toggleSidebar`: Função para alternar o estado (abrir/fechar).
 * - `closeSidebar`: Função para forçar o fechamento do menu.
 */
export function useSidebar() {
  const [isOpen, setIsOpen] = useState(false);

  function toggleSidebar() {
    setIsOpen((prev) => !prev);
  }

  function closeSidebar() {
    setIsOpen(false);
  }

  return { isOpen, toggleSidebar, closeSidebar };
}
