import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { getUsers, deleteUser } from "@/services/User/userService";
import type { User } from "@/features/users/schemas";
import { useDebounce } from "../useBebounce";

export type ModalType = "create" | "editName" | "email" | "password" | null;

// Tipos para os filtros
export type StatusFilterType = "all" | "active" | "inactive";
export type RoleFilterType = "all" | "ADMIN" | "USER" | "SUPERVISOR";

/**
 * Hook Customizado (Controller) para gerenciamento de Usuários.
 */
export function useUsersController() {
  const queryClient = useQueryClient();

  // --- Estados Locais ---
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");

  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  // 1. NOVOS ESTADOS DE FILTRO
  const [statusFilter, setStatusFilter] = useState<StatusFilterType>("all");
  const [roleFilter, setRoleFilter] = useState<RoleFilterType>("all");

  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [dialogOpen, setDialogOpen] = useState<ModalType>(null);

  // --- Data Fetching (Query) ---
  const { data, isLoading, isPlaceholderData, isError } = useQuery({
    // 2. ADICIONEI OS FILTROS NA QUERY KEY
    // Isso garante que o React Query refaça a busca quando o filtro mudar
    queryKey: ["users", page, debouncedSearchTerm, statusFilter, roleFilter],

    // 3. ENVIANDO OS FILTROS PARA A API
    queryFn: () =>
      getUsers({
        page,
        limit: pageSize,
        search: searchTerm,
        // Convertendo "all" para undefined para não enviar nada se não tiver filtro
        status: statusFilter === "all" ? undefined : statusFilter,
        role: roleFilter === "all" ? undefined : roleFilter,
      }),
    placeholderData: (previousData) => previousData,
  });

  // console.log("Resposta da API:", data);

  // Normalização dos dados
  const users = data?.items || (Array.isArray(data) ? data : []);
  const totalPages = data?.meta?.totalPages || 1;

  // --- Mutações (Delete) ---
  const deleteMutation = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      toast.success("Usuário removido.");
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: () => toast.error("Erro ao remover usuário."),
  });

  // --- Handlers (Ações) ---

  const handleDelete = (id: string) => {
    if (confirm("Tem certeza que deseja excluir este usuário?")) {
      deleteMutation.mutate(id);
    }
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  // 4. RESETAR PAGINAÇÃO AO FILTRAR
  // Adicionei statusFilter e roleFilter nas dependências
  useEffect(() => {
    setPage(1);
  }, [debouncedSearchTerm, searchTerm, statusFilter, roleFilter]);

  const openModal = (type: ModalType, user?: User) => {
    if (user) setSelectedUser(user);
    setDialogOpen(type);
  };

  const closeModal = () => {
    setDialogOpen(null);
    setTimeout(() => setSelectedUser(null), 300);
  };

  return {
    // Dados
    users,
    totalPages,
    currentPage: page,
    isLoading: isLoading && !isPlaceholderData,
    isError,
    searchTerm,
    selectedUser,
    dialogOpen,

    // Novos Estados Expostos
    statusFilter,
    roleFilter,

    // Funções
    setSearchTerm,
    setStatusFilter, // Expondo setter do status
    setRoleFilter, // Expondo setter do role
    handleDelete,
    handlePageChange,
    openModal,
    closeModal,
  };
}
