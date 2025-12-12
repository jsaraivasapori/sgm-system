import type {
  User,
  CreateUserForm,
  UpdateUserForm,
  ChangeEmailForm,
  ChangePasswordForm,
  UserPaginatedResponse,
  GetUsersParams,
} from "@/features/users/schemas";
import { api } from "@/services/api";

export async function getUsers(
  params: GetUsersParams
): Promise<UserPaginatedResponse> {
  // O axios transforma o objeto params em query string: ?page=1&limit=10&search=...
  const { data } = await api.get<UserPaginatedResponse>("/users", {
    params: {
      page: params.page || 1,
      limit: params.limit || 10,
      search: params.search || "",
      status: params.status,
      role: params.role,
    },
  });
  return data;
}

export async function createUser(data: CreateUserForm): Promise<User> {
  const response = await api.post<User>("/users", data);
  return response.data;
}

// Atualiza apenas dados básicos (Nome)
export async function updateUser(
  id: string,
  data: UpdateUserForm
): Promise<User> {
  const response = await api.patch<User>(`/users/${id}`, data);
  return response.data;
}

// Rota específica de e-mail
export async function changeUserEmail(
  id: string,
  data: ChangeEmailForm
): Promise<void> {
  await api.patch(`/users/${id}/email`, data);
}

// Rota específica de senha
export async function changeUserPassword(
  id: string,
  data: ChangePasswordForm
): Promise<void> {
  await api.patch(`/users/${id}/password`, data);
}

export async function deleteUser(id: string): Promise<void> {
  await api.delete(`/users/${id}`);
}
