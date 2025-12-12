import { z } from "zod";

// --- Create User (DTO: CreateUserDto) ---
export const createUserSchema = z.object({
  name: z.string().min(1, "O nome é obrigatório"),
  email: z.string().email("E-mail inválido"),
  password: z.string().min(6, "A senha deve ter no mínimo 6 caracteres"),
});

export type CreateUserForm = z.infer<typeof createUserSchema>;

// --- Update Name (DTO: UpdateUserDto) ---
export const updateNameSchema = z.object({
  name: z.string().min(3, "O nome deve ter entre 3 e 100 caracteres").max(100),
});

export type UpdateNameForm = z.infer<typeof updateNameSchema>;

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
  email: string;
  createdAt: string;
}
