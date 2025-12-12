import { Menu, LogOut } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useAuthNavigation } from "../../hooks/useAuthNavigation";

interface HeaderProps {
  onToggleSidebar: () => void;
}

export const Header = ({ onToggleSidebar }: HeaderProps) => {
  const { logout, menuItems } = useAuthNavigation();

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50 h-16 px-4 shadow-sm">
      <div className="max-w-7xl mx-auto h-full flex items-center justify-between">
        {/* Logo e Menu Hamburguer (Mobile) */}
        <div className="flex items-center gap-4">
          <button
            onClick={onToggleSidebar}
            className="md:hidden p-2 hover:bg-gray-100 rounded-md text-gray-600 transition-colors"
          >
            <Menu size={24} />
          </button>

          <h1 className="text-xl font-bold text-blue-900 tracking-tight">
            SGM{" "}
            <span className="font-normal text-gray-500 text-sm hidden sm:inline">
              - Soluções Políticas
            </span>
          </h1>
        </div>

        {/* Menu Desktop */}
        <nav className="hidden md:flex items-center gap-1">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => `
                px-3 py-2 rounded-md text-sm font-medium transition-colors
                ${
                  isActive
                    ? "bg-blue-50 text-blue-700"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }
              `}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* Botão de Logout */}
        <button
          onClick={logout}
          className="flex items-center gap-2 text-sm text-red-600 hover:text-red-700 hover:bg-red-50 px-3 py-2 rounded-md transition-colors font-medium"
        >
          <span className="hidden md:inline">Sair</span>
          <LogOut size={18} />
        </button>
      </div>
    </header>
  );
};
