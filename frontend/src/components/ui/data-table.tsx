import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Loader2, SearchX, ChevronLeft, ChevronRight } from "lucide-react";
import type { ReactNode } from "react";

/**
 * Definição da estrutura de uma coluna da tabela.
 * @template T O tipo do dado que será exibido (ex: User, Donation).
 */
export interface ColumnDef<T> {
  /** O título que aparecerá no cabeçalho da coluna. */
  header: string;
  /** * A chave da propriedade do objeto para exibir (ex: "name" ou "email").
   * Use null se a coluna for puramente visual (ex: Ações).
   */
  accessorKey?: keyof T;
  /** * Função opcional para renderização customizada.
   * Útil para exibir Avatars, Badges, Botões ou formatar datas.
   */
  cell?: (item: T) => ReactNode;
  /** Classes CSS adicionais para a célula (ex: "hidden md:table-cell" para responsividade). */
  className?: string;
}

interface DataTableProps<T> {
  /** Array de dados a serem exibidos. */
  data: T[];
  /** Configuração das colunas (títulos e renderizadores). */
  columns: ColumnDef<T>[];
  /** Se true, exibe um spinner de carregamento no lugar dos dados. */
  isLoading?: boolean;

  // --- Paginação ---
  /** O número da página atual (começando de 1). */
  pageIndex: number;
  /** O número total de páginas disponíveis no backend. */
  pageCount: number;
  /** Função chamada quando o usuário clica em "Próximo" ou "Anterior". */
  onPageChange: (page: number) => void;
}

/**
 * Componente modular de Tabela de Dados.
 * * Responsabilidades:
 * 1. Renderizar a estrutura HTML da tabela.
 * 2. Gerenciar estados visuais de "Carregando" e "Vazio".
 * 3. Renderizar os controles de paginação.
 * * Este componente é "burro": ele não busca dados nem filtra, apenas exibe o que recebe.
 */
export function DataTable<T extends { id: string | number }>({
  data,
  columns,
  isLoading,
  pageIndex,
  pageCount,
  onPageChange,
}: DataTableProps<T>) {
  // 1. Loading State
  if (isLoading) {
    return (
      <div className="flex h-48 w-full items-center justify-center border rounded-md bg-white">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  // 2. Empty State
  if (!data || data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 border rounded-md bg-white space-y-3">
        <div className="p-3 bg-gray-100 rounded-full">
          <SearchX className="h-8 w-8 text-gray-400" />
        </div>
        <p className="text-lg font-medium text-gray-900">
          Nenhum registro encontrado
        </p>
        <p className="text-sm text-gray-500">
          Tente ajustar seus filtros de busca.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="rounded-md border bg-white overflow-hidden">
        <Table>
          <TableHeader className="bg-gray-50">
            <TableRow>
              {columns.map((col, index) => (
                <TableHead key={index} className={col.className}>
                  {col.header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((row) => (
              <TableRow
                key={row.id}
                className="hover:bg-blue-50/50 transition-colors border-b border-gray-100"
              >
                {columns.map((col, index) => (
                  <TableCell key={index} className={col.className}>
                    {col.cell
                      ? col.cell(row)
                      : col.accessorKey
                      ? (row[col.accessorKey] as ReactNode)
                      : null}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Paginação */}
      <div className="flex items-center justify-between px-2">
        <div className="text-sm text-gray-500">
          Página {pageIndex} de {pageCount}
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onPageChange(pageIndex - 1)}
            disabled={pageIndex <= 1}
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Anterior
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onPageChange(pageIndex + 1)}
            disabled={pageIndex >= pageCount}
          >
            Próximo
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      </div>
    </div>
  );
}
