import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query"; // Não precisa invalidar query, pois senha n aparece na lista
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  type ChangePasswordForm,
  type User,
  changePasswordSchema,
} from "../schemas";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { changeUserPassword } from "@/services/User/userService";

interface Props {
  user: User;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ChangePasswordDialog({ user, open, onOpenChange }: Props) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ChangePasswordForm>({
    resolver: zodResolver(changePasswordSchema),
  });

  const mutation = useMutation({
    mutationFn: (data: ChangePasswordForm) => changeUserPassword(user.id, data),
    onSuccess: () => {
      toast.success("Senha alterada com sucesso.");
      reset();
      onOpenChange(false);
    },
    onError: (err: any) =>
      toast.error(err.response?.data?.message || "Erro ao trocar senha."),
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Redefinir Senha</DialogTitle>
          <DialogDescription>
            Alterando senha para: {user.name}
          </DialogDescription>
        </DialogHeader>
        <form
          onSubmit={handleSubmit((data) => mutation.mutate(data))}
          className="space-y-4"
        >
          <div className="space-y-2">
            <Label>Nova Senha</Label>
            <Input {...register("newPassword")} type="password" />
            {errors.newPassword && (
              <span className="text-sm text-red-500">
                {errors.newPassword.message}
              </span>
            )}
          </div>
          <Button
            type="submit"
            className="w-full"
            variant="destructive"
            disabled={mutation.isPending}
          >
            {mutation.isPending && (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            )}
            Confirmar Nova Senha
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
