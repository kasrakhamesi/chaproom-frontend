import { getProfile } from "@/main/api";
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";

interface SidebarData {
  name: string;
  phoneNumber: string;
  avatar: string | null;
  marketingBalance: number;
  walletBalance: number;
}

const SidebarDataContext = createContext<{
  isLoading: boolean;
  isError: boolean;
  value: SidebarData | null;
  retry: () => void;
}>({
  isLoading: true,
  isError: false,
  value: null,
  retry: () => {},
});

export function SidebarDataProvider({ children }: PropsWithChildren<{}>) {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [value, setValue] = useState<SidebarData | null>(null);

  function load() {
    setIsLoading(true);
    setIsError(false);

    try {
      const userData = JSON.parse(localStorage.getItem("userData") || "");
      if (userData) {
        setValue(userData);
        setIsLoading(false);
      }
    } catch {}

    getProfile()
      .then((userData) => {
        setValue(userData);
      })
      .catch(() => {
        if (value !== null) return;

        setIsError(true);
      })
      .finally(() => setIsLoading(false));
  }

  useEffect(load, []);

  return (
    <SidebarDataContext.Provider
      value={{
        isLoading,
        isError,
        value,
        retry: load,
      }}
    >
      {children}
    </SidebarDataContext.Provider>
  );
}

export function useSidebarData() {
  return useContext(SidebarDataContext);
}
