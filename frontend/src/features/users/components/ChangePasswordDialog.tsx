import React, { useState } from "react";
import { Lock, Loader2, Eye, EyeOff, AlertCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { User } from "../schemas";

// Interface alinhada com o UsersPage
interface ChangePasswordDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user: User;
}

export function ChangePasswordDialog({
  open,
  onOpenChange,
  user,
}: ChangePasswordDialogProps) {
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Limpa erro ao digitar
    if (error) setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validações
    if (formData.newPassword.length < 6) {
      setError("A nova senha deve ter pelo menos 6 caracteres.");
      return;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      setError("A nova senha e a confirmação não coincidem.");
      return;
    }

    setIsLoading(true);

    try {
      // TODO: Aqui você chamaria sua API (ex: usersService.changePassword)
      // Como a UsersPage não passa a função onSave, simulamos aqui:
      console.log("Alterando senha para o usuário:", user.id);
      console.log("Dados:", formData);

      // await updatePassword(user.id, formData.currentPassword, formData.newPassword);

      // Simulação de delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Limpa formulário e fecha
      setFormData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      onOpenChange(false);
    } catch (err) {
      setError("Erro ao alterar senha. Verifique sua senha atual.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-orange-100 text-orange-600 rounded-lg w-fit">
              <Lock size={20} />
            </div>
            <div>
              <DialogTitle>Alterar Senha</DialogTitle>
              <DialogDescription>
                Alterando a senha de acesso para <strong>{user?.name}</strong>.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 py-2">
          {/* Senha Atual */}
          <div className="space-y-2">
            <Label htmlFor="currentPassword">Senha Atual</Label>
            <Input
              id="currentPassword"
              name="currentPassword"
              type="password"
              value={formData.currentPassword}
              onChange={handleChange}
              required
              className="focus-visible:ring-orange-500"
            />
          </div>

          {/* Nova Senha */}
          <div className="space-y-2 relative">
            <Label htmlFor="newPassword">Nova Senha</Label>
            <div className="relative">
              <Input
                id="newPassword"
                name="newPassword"
                type={showPassword ? "text" : "password"}
                value={formData.newPassword}
                onChange={handleChange}
                required
                className="pr-10 focus-visible:ring-orange-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {/* Confirmar Senha */}
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirmar Nova Senha</Label>
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              className={
                formData.confirmPassword &&
                formData.newPassword !== formData.confirmPassword
                  ? "border-red-300 focus-visible:ring-red-500"
                  : "focus-visible:ring-orange-500"
              }
            />
          </div>

          {/* Mensagem de Erro */}
          {error && (
            <div className="flex items-center gap-2 text-sm text-red-600 bg-red-50 p-3 rounded-md border border-red-100">
              <AlertCircle size={16} />
              <span>{error}</span>
            </div>
          )}

          <DialogFooter className="pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isLoading}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={isLoading}
              className="bg-gray-900 hover:bg-gray-800 text-white"
            >
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isLoading ? "Atualizando..." : "Atualizar Senha"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
