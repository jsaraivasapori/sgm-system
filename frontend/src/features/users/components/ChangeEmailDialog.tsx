import { useEffect, useState } from "react";
import { Mail, Loader2 } from "lucide-react"; // Adicionei ícones para UI melhor
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

interface ChangeEmailDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user: User;
}

export function ChangeEmailDialog({
  open,
  onOpenChange,
  user,
}: ChangeEmailDialogProps) {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Reseta o estado quando o modal abre ou o usuário muda
  useEffect(() => {
    if (user) {
      setEmail(user.email);
    }
  }, [user, open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // TODO: Conecte sua API aqui
      console.log("Salvando novo email:", email);

      // await updateUserEmail(user.id, email);

      onOpenChange(false);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            {/* Ícone estilizado (Tema Azul para Email) */}
            <div className="p-2 bg-blue-100 text-blue-600 rounded-lg w-fit">
              <Mail size={20} />
            </div>
            <div className="space-y-1">
              <DialogTitle>Alterar E-mail</DialogTitle>
              <DialogDescription>
                Atualize o endereço de contato para{" "}
                <strong>{user?.name}</strong>.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 py-2">
          {/* Input com layout vertical limpo */}
          <div className="space-y-2">
            <Label htmlFor="email" className="text-gray-700 font-medium">
              Novo E-mail
            </Label>
            <div className="relative">
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="focus-visible:ring-blue-500 pl-3"
                placeholder="exemplo@dominio.com"
                required
              />
            </div>
          </div>

          <DialogFooter className="pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isLoading}
              className="hover:bg-gray-50"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={isLoading}
              className="bg-gray-900 hover:bg-gray-800 text-white transition-colors"
            >
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isLoading ? "Salvando..." : "Salvar Alterações"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
