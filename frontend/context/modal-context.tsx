"use client";

import { Price } from "@/types/api";
import {
  createContext,
  ReactNode,
  useContext,
  useState,
  Dispatch,
  SetStateAction,
} from "react";
interface Props extends Price {
  isSubscription: boolean;
}

interface ModalContextType {
  modalOpen: Props | null;
  setModalOpen: Dispatch<SetStateAction<Props | null>>;
}

const ModalContext = createContext<ModalContextType>({
  modalOpen: null,
  setModalOpen: () => {},
});

export const useModalContext = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModalContext must be used within a ModalProvider");
  }
  return context;
};

interface ModalProviderProps {
  children: ReactNode;
}

export default function ModalProvider({ children }: ModalProviderProps) {
  const [modalOpen, setModalOpen] = useState<Props | null>(null);

  return (
    <ModalContext.Provider value={{ modalOpen, setModalOpen }}>
      {children}
    </ModalContext.Provider>
  );
}
