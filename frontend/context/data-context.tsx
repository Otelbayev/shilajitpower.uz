"use client";
import { ApiData } from "@/types/api";
import {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
} from "react";
import { useTranslation } from "react-i18next";

interface DataContextType {
  data: ApiData | null;
  loading: boolean;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const useDataContext = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useDataContext must be used within a DataProvider");
  }
  return context;
};

interface DataProviderProps {
  children: ReactNode;
}

export default function DataProvider({ children }: DataProviderProps) {
  const [data, setData] = useState<ApiData | null>(null);
  const [loading, setLoading] = useState(true);

  const { i18n } = useTranslation();

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/all?lang=${i18n.language}`
        );
        const json: ApiData = await res.json();
        setData(json);
      } catch (error) {
        console.error("API dan ma&apos;lumot olishda xato:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [i18n.language]);

  return (
    <DataContext.Provider value={{ data, loading }}>
      {children}
    </DataContext.Provider>
  );
}
