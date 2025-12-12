import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Loader2, Mail } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { changeEmailSchema, type ChangeEmailForm, type User } from "../schemas";
import { changeUserEmail } from "@/services/User/userService";

interface Props {
  user: User;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ChangeEmailDialog({ user, open, onOpenChange }: Props) {
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ChangeEmailForm>({
    resolver: zodResolver(changeEmailSchema),
    defaultValues: {
      newEmail: "", // Começa vazio para forçar o usuário a digitar o novo
    },
  });

  // Reseta o formulário sempre que o modal fecha ou o usuário muda
  useEffect(() => {
    if (!open) {
      reset();
    }
  }, [open, reset]);

  const mutation = useMutation({
    mutationFn: (data: ChangeEmailForm) => changeUserEmail(user.id, data),
    onSuccess: () => {
      toast.success("E-mail atualizado com sucesso!");
      // Importante: Invalidar a query 'users' para que a tabela atualize o e-mail novo
      queryClient.invalidateQueries({ queryKey: ["users"] });
      onOpenChange(false);
    },
    onError: (error: any) => {
      const msg = error.response?.data?.message || "Erro ao atualizar e-mail.";
      toast.error(Array.isArray(msg) ? msg[0] : msg);
    },
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-106.25">
        <DialogHeader>
          <DialogTitle>Alterar E-mail</DialogTitle>
          <DialogDescription>
            Atual e-mail:{" "}
            <span className="font-medium text-foreground">{user.email}</span>
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={handleSubmit((data) => mutation.mutate(data))}
          className="space-y-4"
        >
          <div className="space-y-2">
            <Label htmlFor="newEmail">Novo E-mail</Label>
            <div className="relative">
              <Input
                id="newEmail"
                {...register("newEmail")}
                placeholder="novo.email@exemplo.com"
                type="email"
                className="pl-9" // Espaço para o ícone
              />
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            </div>
            {errors.newEmail && (
              <span className="text-sm text-red-500">
                {errors.newEmail.message}
              </span>
            )}
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={mutation.isPending}
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={mutation.isPending}>
              {mutation.isPending && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              Salvar E-mail
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
