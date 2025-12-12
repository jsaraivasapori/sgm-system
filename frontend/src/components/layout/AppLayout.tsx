import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { MobileSidebar } from "./MobileSidebar";
import { useSidebar } from "@/hooks/useSideBar";

export const AppLayout = () => {
  // Lógica de estado da UI isolada no hook
  const { isOpen, toggleSidebar, closeSidebar } = useSidebar();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Menu Superior Responsivo */}
      <Header onToggleSidebar={toggleSidebar} />

      {/* Menu Lateral (Apenas Mobile) */}
      <MobileSidebar isOpen={isOpen} onClose={closeSidebar} />

      {/* Área de Conteúdo Principal */}
      <main className="flex-1 w-full max-w-7xl mx-auto p-4 md:p-6">
        {/* Aqui serão renderizadas as páginas filhas */}
        <Outlet />
      </main>
    </div>
  );
};
