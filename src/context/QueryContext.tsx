import React, { createContext, useContext, ReactNode, useState, useEffect } from "react";
import { makeInitialQuery as makeInitial, makeFullQuery } from "../hooks/useQuery";

type QueryData = {
  queryData: any[] | undefined;
  setQueryData: React.Dispatch<React.SetStateAction<any[] | undefined>>;
  initialRender: number | undefined;
  setInitialRender: React.Dispatch<React.SetStateAction<number | undefined>>;
};

type QueryFunctions = {
  makeQueryByKey: (key: string) => void;
  makeInitialQuery: (_pageNum: number) => void;  // Include _pageNum argument
  makeFullQuery: (_pageNum: number) => void;     // Include _pageNum argument
};
type QueryContextType = QueryData & QueryFunctions;

type QueryProviderProps = {
  children: ReactNode;
};

export const QueryContext = createContext<QueryContextType | undefined>(undefined);

export function useQueryContext(): QueryContextType {
  const context = useContext(QueryContext);
  if (!context) {
    throw new Error("useQueryContext must be used within a QueryProvider");
  }
  return context;
}


export function getQueryData() {
  return useContext(QueryContext);
}

export function QueryProvider({ children }: QueryProviderProps) {
  const [queryData, setQueryData] = useState<any[] | undefined>();
  const [initialRender, setInitialRender] = useState<number | undefined>();

  const makeQueryByKey = (key: string) => {
    // Implement makeQueryByKey logic
    console.log("badbadbad")
  };

  const performInitialQuery = async (_pageNum: number) => {
    const data = await makeInitial(_pageNum);  // Pass _pageNum to makeInitial
    setQueryData(data);
  };

  const performFullQuery = async (_pageNum: number) => {
    const data = await makeFullQuery(_pageNum);  // Pass _pageNum to makeFullQuery
    setQueryData(data);
  };

  const queryFunctions: QueryFunctions = {
    makeQueryByKey,
    makeInitialQuery: performInitialQuery,
    makeFullQuery: performFullQuery,
  };

  const contextValue: QueryContextType = {
    queryData,
    setQueryData,
    initialRender,
    setInitialRender,
    ...queryFunctions,
  };

  return <QueryContext.Provider value={contextValue}>{children}</QueryContext.Provider>;
}