import { X, LogOut } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useAuthNavigation } from "../../hooks/useAuthNavigation";
import { twMerge } from "tailwind-merge";

interface MobileSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileSidebar = ({ isOpen, onClose }: MobileSidebarProps) => {
  const { logout, menuItems } = useAuthNavigation();

  return (
    <>
      {/* Overlay Escuro */}
      <div
        className={twMerge(
          "fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 md:hidden",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={onClose}
      />

      {/* Sidebar Panel */}
      <aside
        className={twMerge(
          "fixed top-0 left-0 bottom-0 w-64 bg-white z-50 shadow-xl transform transition-transform duration-300 md:hidden flex flex-col",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="p-4 border-b border-gray-100 flex items-center justify-between">
          <span className="font-bold text-blue-900">Menu</span>
          <button
            onClick={onClose}
            className="p-2 text-gray-500 hover:bg-gray-100 rounded-md"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto p-4 flex flex-col gap-2">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={onClose} // Fecha ao clicar
              className={({ isActive }) => `
                block px-4 py-3 rounded-lg text-base font-medium transition-colors
                ${
                  isActive
                    ? "bg-blue-50 text-blue-700"
                    : "text-gray-600 hover:bg-gray-50"
                }
              `}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-100">
          <button
            onClick={() => {
              onClose();
              logout();
            }}
            className="w-full flex items-center justify-center gap-2 text-red-600 bg-red-50 hover:bg-red-100 px-4 py-3 rounded-lg font-medium transition-colors"
          >
            <LogOut size={18} />
            Sair do Sistema
          </button>
        </div>
      </aside>
    </>
  );
};
