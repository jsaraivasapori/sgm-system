import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  Loader2,
  User as UserIcon,
  Shield,
  Save,
  CheckCircle2,
} from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// Imports atualizados
import { updateUser } from "@/services/User/userService";
import { updateUserSchema, type UpdateUserForm, type User } from "../schemas";

interface EditUserDialogProps {
  user: User; // Recebe o usuário atual para preencher o form
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function EditUserDialog({
  user,
  open,
  onOpenChange,
}: EditUserDialogProps) {
  const queryClient = useQueryClient();

  const form = useForm<UpdateUserForm>({
    resolver: zodResolver(updateUserSchema),
    defaultValues: {
      name: user.name,
      role: user.role,
    },
  });

  // Efeito vital: Atualiza o formulário se o usuário selecionado mudar
  useEffect(() => {
    if (open) {
      form.reset({
        name: user.name,
        role: user.role,
      });
    }
  }, [user, open, form]);

  const mutation = useMutation({
    mutationFn: (data: UpdateUserForm) => updateUser(user.id, data),
    onSuccess: () => {
      toast.success("Usuário atualizado!", {
        icon: <CheckCircle2 className="h-5 w-5 text-green-600" />,
      });
      queryClient.invalidateQueries({ queryKey: ["users"] });
      onOpenChange(false);
    },
    onError: () => {
      toast.error("Erro ao atualizar usuário.");
    },
  });

  const onSubmit = (data: UpdateUserForm) => {
    mutation.mutate(data);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-125 p-0 overflow-hidden border-0 shadow-xl">
        {/* Cabeçalho Azul (Padrão Visual) */}
        <div className="bg-blue-600 p-6 text-white">
          <DialogHeader className="text-white">
            <DialogTitle className="text-2xl flex items-center gap-2">
              <UserIcon className="h-6 w-6 text-blue-200" />
              Editar Usuário
            </DialogTitle>
            <DialogDescription className="text-blue-100">
              Altere as informações cadastrais de {user.name}.
            </DialogDescription>
          </DialogHeader>
        </div>

        <div className="p-6 pt-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              {/* Campo Nome */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700 font-semibold">
                      Nome Completo
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <UserIcon className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                        <Input
                          placeholder="Nome do usuário"
                          className="pl-9 bg-gray-50 border-gray-200 focus:bg-white transition-all"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Campo Role */}
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700 font-semibold">
                      Nível de Acesso
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="bg-gray-50 border-gray-200 focus:bg-white">
                          <div className="flex items-center gap-2">
                            <Shield className="h-4 w-4 text-gray-500" />
                            <SelectValue placeholder="Selecione um cargo" />
                          </div>
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="USER">
                          <div className="flex items-center gap-2">
                            <span className="h-2 w-2 rounded-full bg-emerald-500" />
                            <span>Usuário (Padrão)</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="SUPERVISOR">
                          <div className="flex items-center gap-2">
                            <span className="h-2 w-2 rounded-full bg-blue-500" />
                            <span>Supervisor</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="ADMIN">
                          <div className="flex items-center gap-2">
                            <span className="h-2 w-2 rounded-full bg-purple-500" />
                            <span className="font-semibold text-purple-900">
                              Administrador
                            </span>
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <DialogFooter className="pt-4 gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => onOpenChange(false)}
                  className="border-gray-300 text-gray-700 hover:bg-gray-50"
                >
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  disabled={mutation.isPending}
                  className="bg-blue-600 hover:bg-blue-700 text-white shadow-md w-full md:w-auto"
                >
                  {mutation.isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Salvando...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Salvar Alterações
                    </>
                  )}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
