import { z } from "zod";

export const UserRoleEnum = z.enum(["ADMIN", "SUPERVISOR", "USER"]);

// Extraímos o tipo TypeScript do Enum (ex: "ADMIN" | "SUPERVISOR" | "USER")
export type UserRole = z.infer<typeof UserRoleEnum>;

// --- Create User (DTO: CreateUserDto) ---
export const createUserSchema = z.object({
  name: z.string().min(1, "O nome é obrigatório"),
  email: z.string().email("E-mail inválido"),
  password: z.string().min(6, "A senha deve ter no mínimo 6 caracteres"),
  role: UserRoleEnum,
});

export type CreateUserForm = z.infer<typeof createUserSchema>;

// --- Update Name (DTO: UpdateUserDto) ---
export const updateUserSchema = z.object({
  name: z.string().min(3, "O nome deve ter entre 3 e 100 caracteres").max(100),
  role: UserRoleEnum,
});

export type UpdateUserForm = z.infer<typeof updateUserSchema>;

// --- Change Email (DTO: ChangeEmailDto) ---
export const changeEmailSchema = z.object({
  newEmail: z.string().email("Forneça um e-mail válido"),
});

export type ChangeEmailForm = z.infer<typeof changeEmailSchema>;

// --- Change Password (DTO: ChangePasswordDto) ---
export const changePasswordSchema = z.object({
  newPassword: z
    .string()
    .min(6, "A nova senha deve ter no mínimo 6 caracteres"),
});

export type ChangePasswordForm = z.infer<typeof changePasswordSchema>;

// --- Tipo da Entidade Usuário (Resposta do GET) ---
export interface User {
  id: string;
  name: string;
  role: UserRole;
  email: string;
  createdAt: string;
}

// --- Parâmetros de Busca (Query Params) ---
export interface GetUsersParams {
  page?: number;
  limit?: number;
  search?: string;
  status?: "active" | "inactive";
  role?: UserRole;
}

// --- Resposta Paginada Genérica (Padrão NestJS geralmente é assim) ---
export interface PaginatedResponse<T> {
  items: T[];
  meta: {
    totalItems: number;
    itemCount: number;
    itemsPerPage: number;
    totalPages: number;
    currentPage: number;
  };
}

// --- Tipo específico para retorno de usuários ---
export type UserPaginatedResponse = PaginatedResponse<User>;
