import React, { createContext, useContext, ReactNode } from "react";
import { makeInitialQuery as makeInitial } from "../hooks/useQuery";
import { makeFullQuery as fullQuery } from "../hooks/useQuery";

// TODO: add type for query return
// TODO: update function calls for the query


type QueryContext = {
  queryData: any[] | undefined;
  setQueryData: React.Dispatch<React.SetStateAction<any[] | undefined>>;
  initialRender: number | undefined;
  setInitialRender: React.Dispatch<React.SetStateAction<number | undefined>>;
};

type QueryUseContext = {
  makeQueryByKey: (key: string) => void;
  makeInitialQuery: () => void
  makeFullQuery: () => void;
};

type QueryUseProviderProps = {
  children: ReactNode;
};

export const QueryContext = createContext({} as QueryContext);
export const QueryUseContext = createContext({} as QueryUseContext);

export function makeQuery() {
  return useContext(QueryUseContext);
}

export function getQueryData() {
  return useContext(QueryContext);
}

export function QueryUseProvider({ children }: QueryUseProviderProps) {
  function makeQueryByKey(key: string) {
    // make function call to makeQuery.tsx
  }
  function makeFullQuery() {
    fullQuery({ collections: "sightings", pageSize: 3, pageNumber: 1, edgeCollection: "edge-sightings" })
    // make function call to makeQuery.tsx
  }
  function makeInitialQuery() {
    makeInitial()
    // make function call to makeQuery.tsx
  }
  return (
    <QueryUseContext.Provider value={{ makeQueryByKey, makeFullQuery, makeInitialQuery }}>
      {children}
    </QueryUseContext.Provider>
  );
}