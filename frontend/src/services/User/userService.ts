import type {
  User,
  CreateUserForm,
  UpdateNameForm,
  ChangeEmailForm,
  ChangePasswordForm,
} from "@/features/users/schemas";
import { api } from "@/services/api";

export async function getUsers(): Promise<User[]> {
  const { data } = await api.get<User[]>("/users");
  return data;
}

export async function createUser(data: CreateUserForm): Promise<User> {
  const response = await api.post<User>("/users", data);
  return response.data;
}

// Atualiza apenas dados básicos (Nome)
export async function updateUserName(
  id: string,
  data: UpdateNameForm
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
