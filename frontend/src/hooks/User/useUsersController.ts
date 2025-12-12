import { useState, useMemo } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { getUsers, deleteUser } from "@/services/User/userService";
import type { User } from "@/features/users/schemas";

// Definindo os tipos de modais possíveis
export type ModalType = "create" | "editName" | "email" | "password" | null;

export function useUsersController() {
  const queryClient = useQueryClient();

  // Estados
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [dialogOpen, setDialogOpen] = useState<ModalType>(null);

  // 1. Fetch
  const {
    data: users,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });

  // 2. Filtro (Lógica de busca)
  const filteredUsers = useMemo(() => {
    if (!users) return [];
    const term = searchTerm.toLowerCase();
    return users.filter((user) => {
      const nameMatch = user.name?.toLowerCase().includes(term);
      const emailMatch = user.email?.toLowerCase().includes(term);
      return nameMatch || emailMatch;
    });
  }, [users, searchTerm]);

  // 3. Delete
  const deleteMutation = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      toast.success("Usuário removido.");
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: () => toast.error("Erro ao remover usuário."),
  });

  const handleDelete = (id: string) => {
    if (confirm("Tem certeza que deseja excluir este usuário?")) {
      deleteMutation.mutate(id);
    }
  };

  // 4. Helpers para Modais
  const openModal = (type: ModalType, user?: User) => {
    if (user) setSelectedUser(user);
    setDialogOpen(type);
  };

  const closeModal = () => {
    setDialogOpen(null);
    setTimeout(() => setSelectedUser(null), 300); // Pequeno delay para animação (opcional)
  };

  return {
    // Dados
    users: filteredUsers,
    isLoading,
    isError,
    searchTerm,
    selectedUser,
    dialogOpen,

    // Ações
    setSearchTerm,
    handleDelete,
    openModal,
    closeModal,
  };
}
