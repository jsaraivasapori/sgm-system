import { Plus, Search, Filter } from "lucide-react";
import { useMemo } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Componentes Modulares
import { DataTable } from "@/components/ui/data-table";
import { getUserColumns } from "@/features/users/components/columns";

// Modais
import { CreateUserDialog } from "@/features/users/components/CreateUserDialog";
import { EditUserDialog } from "@/features/users/components/EditUserDialog";
import { ChangePasswordDialog } from "@/features/users/components/ChangePasswordDialog";
import { ChangeEmailDialog } from "@/features/users/components/ChangeEmailDialog";
import { useUsersController } from "@/hooks/User/useUsersController";

/**
 * Página Principal de Gerenciamento de Usuários.
 */
export default function UsersPage() {
  // Extrai lógica e estado do Controller
  const {
    users,
    isLoading,
    searchTerm,
    setSearchTerm,
    handleDelete,
    openModal,
    closeModal,
    dialogOpen,
    selectedUser,
    currentPage,
    totalPages,
    handlePageChange,
    // 1. NOVOS ESTADOS VINDOS DO CONTROLLER
    statusFilter,
    setStatusFilter,
    roleFilter,
    setRoleFilter,
  } = useUsersController();

  // Gera as colunas injetando as funções do controller
  const columns = useMemo(
    () =>
      getUserColumns({
        onOpenModal: openModal,
        onDelete: handleDelete,
      }),
    [openModal, handleDelete]
  );

  return (
    <div className="space-y-6 p-4 md:p-8 bg-gray-50/50 min-h-screen">
      {/* Cabeçalho e Controles */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            Usuários
          </h2>
          <p className="text-sm text-gray-500">Gerencie o acesso ao sistema.</p>
        </div>

        <div className="flex flex-col sm:flex-row w-full md:w-auto gap-3">
          {/* Barra de Busca */}
          <div className="relative w-full md:w-72">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar usuário..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex h-10 w-full rounded-md border border-gray-200 bg-white px-3 py-2 pl-9 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all shadow-sm"
            />
          </div>

          {/* 2. MENU DE FILTROS COM LÓGICA DE TOGGLE */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2 bg-white shadow-sm">
                <Filter className="h-4 w-4 text-gray-500" />
                Filtros
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>Status</DropdownMenuLabel>
              <DropdownMenuSeparator />

              {/* Opção Todos */}
              <DropdownMenuCheckboxItem
                checked={statusFilter === "all"}
                onCheckedChange={() => setStatusFilter("all")}
              >
                Todos
              </DropdownMenuCheckboxItem>

              {/* Opção Ativos (Com toggle) */}
              <DropdownMenuCheckboxItem
                checked={statusFilter === "active"}
                onCheckedChange={() =>
                  setStatusFilter(statusFilter === "active" ? "all" : "active")
                }
              >
                Ativos
              </DropdownMenuCheckboxItem>

              {/* Opção Inativos (Com toggle) */}
              <DropdownMenuCheckboxItem
                checked={statusFilter === "inactive"}
                onCheckedChange={() =>
                  setStatusFilter(
                    statusFilter === "inactive" ? "all" : "inactive"
                  )
                }
              >
                Inativos
              </DropdownMenuCheckboxItem>

              <DropdownMenuSeparator />
              <DropdownMenuLabel>Permissão</DropdownMenuLabel>
              <DropdownMenuSeparator />

              {/* Opção Admin (MAIÚSCULO conforme Controller) */}
              <DropdownMenuCheckboxItem
                checked={roleFilter === "ADMIN"}
                onCheckedChange={() =>
                  setRoleFilter(roleFilter === "ADMIN" ? "all" : "ADMIN")
                }
              >
                Administrador
              </DropdownMenuCheckboxItem>

              {/* Opção User (MAIÚSCULO conforme Controller) */}
              <DropdownMenuCheckboxItem
                checked={roleFilter === "USER"}
                onCheckedChange={() =>
                  setRoleFilter(roleFilter === "USER" ? "all" : "USER")
                }
              >
                Usuário Comum
              </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Botão Novo Usuário */}
          <Button
            onClick={() => openModal("create")}
            className="bg-blue-600 hover:bg-blue-700 text-white shadow-sm hover:shadow-md transition-all gap-2"
          >
            <Plus className="h-4 w-4" />
            <span className="hidden sm:inline">Novo Usuário</span>
            <span className="sm:hidden">Novo</span>
          </Button>
        </div>
      </div>

      {/* Tabela Modular */}
      <DataTable
        data={users}
        columns={columns}
        isLoading={isLoading}
        pageIndex={currentPage || 1}
        pageCount={totalPages || 1}
        onPageChange={handlePageChange}
      />

      {/* Modais */}
      <CreateUserDialog
        open={dialogOpen === "create"}
        onOpenChange={(open: boolean) => !open && closeModal()}
      />

      {selectedUser && (
        <>
          <EditUserDialog
            user={selectedUser}
            open={dialogOpen === "editName"}
            onOpenChange={(open: boolean) => !open && closeModal()}
          />
          <ChangeEmailDialog
            user={selectedUser}
            open={dialogOpen === "email"}
            onOpenChange={(open: boolean) => !open && closeModal()}
          />
          <ChangePasswordDialog
            user={selectedUser}
            open={dialogOpen === "password"}
            onOpenChange={(open: boolean) => !open && closeModal()}
          />
        </>
      )}
    </div>
  );
}
