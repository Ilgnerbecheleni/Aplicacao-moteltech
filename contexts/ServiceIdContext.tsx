'use client'

// context/ServiceIdContext.tsx
import { createContext, useContext, useRef } from "react";
import { generateRandomId } from "@/utils/randomId";

interface ServiceIdContextType {
  ids: {
    recepcao: string;
    lavanderia: string;
    restaurante: string;
  };
}

const ServiceIdContext = createContext<ServiceIdContextType | undefined>(undefined);

export function ServiceIdProvider({ children }: { children: React.ReactNode }) {
  // Use useRef para garantir que o valor é fixo enquanto o Provider existir
  const idsRef = useRef({
    recepcao: generateRandomId("recepcao"),
    lavanderia: generateRandomId("lavanderia"),
    restaurante: generateRandomId("restaurante"),
  });

  return (
    <ServiceIdContext.Provider value={{ ids: idsRef.current }}>
      {children}
    </ServiceIdContext.Provider>
  );
}

export function useServiceIds() {
  const ctx = useContext(ServiceIdContext);
  if (!ctx) throw new Error("useServiceIds deve ser usado dentro de ServiceIdProvider");
  return ctx;
}
