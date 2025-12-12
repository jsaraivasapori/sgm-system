import {
  MoreHorizontal,
  Pencil,
  Mail,
  Key,
  Trash2,
  Shield,
  UserCog,
  UserIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import type { User } from "@/features/users/schemas";

import type { ColumnDef } from "@/components/ui/data-table";
import type { ModalType } from "@/hooks/User/useUsersController";

// Configuração de Cores e Rótulos por Cargo
const roleConfig: Record<string, { label: string; color: string; icon: any }> =
  {
    ADMIN: {
      label: "Administrador",
      color:
        "bg-purple-100 text-purple-700 hover:bg-purple-200 border-purple-200", // Roxo: Poder/Admin
      icon: Shield,
    },
    SUPERVISOR: {
      label: "Supervisor",
      color: "bg-blue-100 text-blue-700 hover:bg-blue-200 border-blue-200", // Azul: Gestão
      icon: UserCog,
    },
    USER: {
      label: "Usuário",
      color:
        "bg-emerald-100 text-emerald-700 hover:bg-emerald-200 border-emerald-200", // Verde: Comum/Ok
      icon: UserIcon,
    },
  };

/** Interface para as funções de ação que a tabela precisa disparar */
interface ColumnActions {
  onOpenModal: (type: ModalType, user: User) => void;
  onDelete: (id: string) => void;
}

/**
 * Fábrica de colunas para a tabela de Usuários.
 * * @param actions Funções de callback para interatividade (abrir modal, deletar).
 * @returns Um array de definições de coluna compatível com o componente DataTable.
 * * Responsabilidade:
 * Definir COMO os dados do usuário (User) são transformados em visual (JSX).
 * Aqui configuramos Avatars, Badges de status e Menus de ação.
 */
export const getUserColumns = ({
  onOpenModal,
  onDelete,
}: ColumnActions): ColumnDef<User>[] => [
  {
    header: "Nome",
    accessorKey: "name",
    cell: (user) => (
      <div className="flex items-center gap-3">
        {/* Avatar com borda colorida suave */}
        <Avatar className="h-9 w-9 border-2 border-white shadow-sm">
          <AvatarImage
            src={`https://ui-avatars.com/api/?name=${user.name}&background=random&color=fff`}
          />
          <AvatarFallback className="bg-slate-100 text-slate-600 font-bold">
            {user.name.substring(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <span className="font-semibold text-gray-900">{user.name}</span>
          {/* Email aparece pequeno abaixo do nome em mobile */}
          <span className="text-xs text-gray-400 md:hidden">{user.email}</span>
        </div>
      </div>
    ),
  },
  {
    header: "E-mail",
    accessorKey: "email",
    className: "hidden md:table-cell text-gray-600",
  },
  {
    header: "Perfil", // Mudamos de Status para Perfil (Role)
    accessorKey: "role",
    cell: (user) => {
      // Pega a config baseada na role ou usa USER como padrão
      const config = roleConfig[user.role] || roleConfig.USER;
      const Icon = config.icon;

      return (
        <Badge
          className={`${config.color} border px-2 py-0.5 shadow-none flex w-fit items-center gap-1`}
        >
          <Icon className="h-3 w-3" />
          {config.label}
        </Badge>
      );
    },
  },
  {
    header: "Ações",
    className: "text-right",
    cell: (user) => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="h-8 w-8 p-0 hover:bg-slate-100 text-slate-500"
          >
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuLabel>
            Gerenciar {user.name.split(" ")[0]}
          </DropdownMenuLabel>
          <DropdownMenuSeparator />

          <DropdownMenuItem
            onClick={() => onOpenModal("editName", user)}
            className="cursor-pointer"
          >
            <Pencil className="mr-2 h-4 w-4 text-blue-500" /> {/* Ícone Azul */}
            <span>Editar Usuário</span>
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={() => onOpenModal("email", user)}
            className="cursor-pointer"
          >
            <Mail className="mr-2 h-4 w-4 text-amber-500" /> {/* Ícone Âmbar */}
            <span>Trocar E-mail</span>
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={() => onOpenModal("password", user)}
            className="cursor-pointer"
          >
            <Key className="mr-2 h-4 w-4 text-orange-500" />{" "}
            {/* Ícone Laranja */}
            <span>Redefinir Senha</span>
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem
            className="text-red-600 focus:text-red-600 focus:bg-red-50 cursor-pointer"
            onClick={() => onDelete(user.id)}
          >
            <Trash2 className="mr-2 h-4 w-4" />
            <span>Excluir Usuário</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
];
