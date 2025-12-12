import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { updateNameSchema, type UpdateNameForm, type User } from "../schemas";
import { updateUserName } from "@/services/User/userService";

interface Props {
  user: User;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function EditNameDialog({ user, open, onOpenChange }: Props) {
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UpdateNameForm>({
    resolver: zodResolver(updateNameSchema),
    defaultValues: { name: user.name },
  });

  // Atualiza o form se o usuário selecionado mudar
  useEffect(() => {
    reset({ name: user.name });
  }, [user, reset]);

  const mutation = useMutation({
    mutationFn: (data: UpdateNameForm) => updateUserName(user.id, data),
    onSuccess: () => {
      toast.success("Nome atualizado!");
      queryClient.invalidateQueries({ queryKey: ["users"] });
      onOpenChange(false);
    },
    onError: () => toast.error("Falha ao atualizar nome."),
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar Usuário</DialogTitle>
        </DialogHeader>
        <form
          onSubmit={handleSubmit((data) => mutation.mutate(data))}
          className="space-y-4"
        >
          <div className="space-y-2">
            <Label>Nome Completo</Label>
            <Input {...register("name")} />
            {errors.name && (
              <span className="text-sm text-red-500">
                {errors.name.message}
              </span>
            )}
          </div>
          <Button
            type="submit"
            className="w-full"
            disabled={mutation.isPending}
          >
            {mutation.isPending && (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            )}
            Salvar Alterações
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
