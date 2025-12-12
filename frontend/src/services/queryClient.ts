import { QueryClient } from "@tanstack/react-query";

/**
 * Instância global do `QueryClient` configurada para gerenciamento de estado do servidor.
 *
 * Esta instância centraliza as configurações de cache e refetching da aplicação,
 * estabelecendo padrões que priorizam a redução de requisições excessivas.
 *
 * @remarks
 * **Configurações Padrão (`defaultOptions`):**
 *
 * - `staleTime`: **60000ms (1 minuto)**.
 * Define o tempo que o dado é considerado "fresco". Durante este período, o React Query
 * servirá o dado do cache sem fazer novas requisições à API.
 *
 * - `refetchOnWindowFocus`: **false**.
 * Impede que a aplicação dispare novas requisições automaticamente sempre que a janela
 * ou aba do navegador ganhar foco novamente (evento `visibilitychange`).
 *
 * - `retry`: **1**.
 * Número de tentativas de reconexão automática em caso de falha na requisição
 * antes de disparar um erro para o componente.
 *
 * @example
 * // Como utilizar no componente raiz da aplicação (App.tsx):
 * import { QueryClientProvider } from "@tanstack/react-query";
 * import { queryClient } from "./lib/react-query";
 *
 * export function App() {
 * return (
 * <QueryClientProvider client={queryClient}>
 * <ComponentesDaApp />
 * </QueryClientProvider>
 * );
 * }
 *
 * @Veja {@link https://tanstack.com/query/latest/docs/react/reference/QueryClient|Documentação Oficial do QueryClient}
 */
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * import.meta.env.VITE_STALE_TIME,

      refetchOnWindowFocus: false,

      retry: 1,
    },
  },
});
