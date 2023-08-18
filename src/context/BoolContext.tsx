// BoolContext.tsx
import React, { createContext, useContext, useState, ReactNode } from "react";

interface BoolContextType {
  booleanValue: boolean;
  setBooleanValue: React.Dispatch<React.SetStateAction<boolean>>;
}

const BoolContext = createContext<BoolContextType | undefined>(undefined);

export function BoolProvider({ children }: { children: ReactNode }) {
  const [booleanValue, setBooleanValue] = useState<boolean>(false);

  return (
    <BoolContext.Provider value={{ booleanValue, setBooleanValue }}>
      {children}
    </BoolContext.Provider>
  );
}

export function useBoolContext() {
  const context = useContext(BoolContext);
  if (!context) {
    throw new Error("useBoolContext must be used within a BoolProvider");
  }
  return context;
}
