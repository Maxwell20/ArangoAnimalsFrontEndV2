import { createContext, useState, ReactNode, useContext } from "react";
import { QueryMenu } from "../components/QueryMenu";

type NavProviderProps = {
    children: ReactNode;
  };

type NavContext = {
  openQuery: () => void;
  closeQuery: () => void;
};

export const NavContext = createContext({} as NavContext);

export function useQuery() {
    return useContext(NavContext);
  }

export function NavProvider({children}: NavProviderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const openQuery = () => setIsOpen(true);
  const closeQuery = () => setIsOpen(false);

  return (
    <NavContext.Provider
      value={{
        openQuery,
        closeQuery
      }}
    >
      {children}
      <QueryMenu isOpen={isOpen} />
    </NavContext.Provider>
  );
}
