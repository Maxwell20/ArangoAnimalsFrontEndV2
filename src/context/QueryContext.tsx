import React, { createContext, useContext, ReactNode, useState, useEffect } from "react";
import { makeInitialQuery as makeInitial, makeFullQuery, makeQueryProps, makeQueryByKey } from "../hooks/useQuery";

// Define QueryFunctions interface
interface QueryFunctions {
  performQueryByKey: (key: string, includeEdges: boolean) =>  Promise<void>; // Added includeEdges parameter
  performInitialQuery: (_pageNum: number) => Promise<void>;
  performFullQuery: (_pageNum: number) => Promise<void>; // Corrected parameter list
  updateQueryParameters: (newParams: makeQueryProps) => void;
}

type QueryData = {
  queryData: any[] | null | undefined;
  setQueryData: React.Dispatch<React.SetStateAction<any[] | null | undefined>> ;
  initialRender: number | undefined;
  setInitialRender: React.Dispatch<React.SetStateAction<number>>;
  dataForQuery: makeQueryProps;
  setDataForQuery: React.Dispatch<React.SetStateAction<makeQueryProps>>;
  queryParameters: makeQueryProps | undefined;
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

const defaultQueryProps: makeQueryProps = {
  collections: "", // Default values for the properties you need
  pageSize: 12,
  pageNumber: 1,
};

export function QueryProvider({ children }: QueryProviderProps) {
  const [queryData, setQueryData] = useState<any[] | null>();
  const [initialRender, setInitialRender] = useState<number>(0);
  const [dataForQuery, setDataForQuery] = useState<makeQueryProps>(defaultQueryProps);
  const [queryParameters, setQueryParameters] = useState<makeQueryProps>(defaultQueryProps);

  const performQueryByKey = async (key: string, includeEdges: boolean) => {
    const data = await makeQueryByKey({key, includeEdges}); // Corrected function call
    setQueryData(data);
  };

  const performInitialQuery = async (_pageNum: number) => {
    const test = dataForQuery;
    const data = await makeInitial(_pageNum);
    await setQueryData(data);
  };

  const performFullQuery = async (_pageNum: number) => {
    try {
      dataForQuery.pageNumber = _pageNum;
      const data = await makeFullQuery(dataForQuery);
      await setQueryData(data);
      console.log(queryData)
    } catch (error) {
      console.error("Error performing full query:", error);
    }
  };

  const updateQueryParameters = (newParams: makeQueryProps) => {
    setQueryParameters((prevParams) => ({ ...prevParams, ...newParams }));
  };

  const queryFunctions: QueryFunctions = {
    performQueryByKey,
    performInitialQuery,
    performFullQuery, 
    updateQueryParameters,
  };

  const contextFunctions: QueryFunctions = {
    ...queryFunctions
  };

  const contextValue: QueryContextType = {
    queryData,
    setQueryData,
    initialRender,
    setInitialRender,
    dataForQuery,
    setDataForQuery,
    queryParameters,
    ...contextFunctions,
  };

  return <QueryContext.Provider value={contextValue}>{children}</QueryContext.Provider>;
}