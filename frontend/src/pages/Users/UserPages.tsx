import {
  Plus,
  MoreHorizontal,
  Pencil,
  Key,
  Mail,
  Trash2,
  Loader2,
  Search,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Importa os modais
import { CreateUserDialog } from "@/features/users/components/CreateUserDialog";
import { EditNameDialog } from "@/features/users/components/EditNameDialog";
import { ChangePasswordDialog } from "@/features/users/components/ChangePasswordDialog";
import { ChangeEmailDialog } from "@/features/users/components/ChangeEmailDialog";
import { useUsersController } from "@/hooks/User/useUsersController";

// Importa nossa lógica separada

export default function UsersPage() {
  // Chamamos o hook e pegamos tudo o que precisamos
  const {
    users,
    isLoading,
    isError,
    searchTerm,
    setSearchTerm,
    handleDelete,
    openModal,
    closeModal,
    dialogOpen,
    selectedUser,
  } = useUsersController();

  if (isLoading) {
    return (
      <div className="flex justify-center p-10">
        <Loader2 className="animate-spin" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-10 text-red-500">
        Erro ao carregar usuários do sistema.
      </div>
    );
  }

  return (
    <div className="space-y-4 p-4 md:p-8">
      {/* --- CABEÇALHO --- */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <h2 className="text-2xl font-bold tracking-tight">Usuários</h2>

        <div className="flex flex-col sm:flex-row w-full md:w-auto gap-2 items-stretch sm:items-center">
          <div className="relative w-full md:w-72">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Buscar por nome ou email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 pl-9 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
          </div>

          <Button onClick={() => openModal("create")}>
            <Plus className="mr-2 h-4 w-4" /> Novo Usuário
          </Button>
        </div>
      </div>

      {/* --- TABELA --- */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead className="hidden md:table-cell">E-mail</TableHead>
              <TableHead className="w-25">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.length > 0 ? (
              users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell className="hidden md:table-cell text-muted-foreground">
                    {user.email}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Opções</DropdownMenuLabel>

                        <DropdownMenuItem
                          onClick={() => openModal("editName", user)}
                        >
                          <Pencil className="mr-2 h-4 w-4" /> Editar Nome
                        </DropdownMenuItem>

                        <DropdownMenuItem
                          onClick={() => openModal("email", user)}
                        >
                          <Mail className="mr-2 h-4 w-4" /> Trocar E-mail
                        </DropdownMenuItem>

                        <DropdownMenuItem
                          onClick={() => openModal("password", user)}
                        >
                          <Key className="mr-2 h-4 w-4" /> Redefinir Senha
                        </DropdownMenuItem>

                        <DropdownMenuSeparator />

                        <DropdownMenuItem
                          className="text-red-600 focus:text-red-600"
                          onClick={() => handleDelete(user.id)}
                        >
                          <Trash2 className="mr-2 h-4 w-4" /> Excluir
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={3} className="h-24 text-center">
                  Nenhum usuário encontrado.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* --- MODAIS (GERENCIADOS PELO CONTROLLER) --- */}
      <CreateUserDialog
        open={dialogOpen === "create"}
        onOpenChange={(open) => !open && closeModal()}
      />

      {selectedUser && (
        <>
          <EditNameDialog
            user={selectedUser}
            open={dialogOpen === "editName"}
            onOpenChange={(open) => !open && closeModal()}
          />
          <ChangeEmailDialog
            user={selectedUser}
            open={dialogOpen === "email"}
            onOpenChange={(open) => !open && closeModal()}
          />
          <ChangePasswordDialog
            user={selectedUser}
            open={dialogOpen === "password"}
            onOpenChange={(open) => !open && closeModal()}
          />
        </>
      )}
    </div>
  );
}
