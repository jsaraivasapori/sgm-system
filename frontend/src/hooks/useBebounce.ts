import { useState, useEffect } from "react";

// Delay padrão de 500ms (meio segundo)
export function useDebounce<T>(value: T, delay: number = 500): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // Cria um timer para atualizar o valor
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Limpa o timer se o usuário digitar novamente antes do tempo acabar
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}
