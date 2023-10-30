import { FastAPIClient } from "../client";

export type makeQueryProps = {
  collections: string;
  pageSize: number;
  pageNumber: number;
  startTime?: string;
  endTime?: string;
  longStart?: number;
  longEnd?: number;
  latStart?: number;
  latEnd?: number;
  country?: string;
  type?: string;
  attribute1Start?: number;
  attribute1End?: number;
  attribute2Start?: number;
  attribute2End?: number;
  includeEdges?: boolean;
  edgeCollection?: string;
  excludeEdges?: boolean;
  collectionFilter?: string;
};

type makeQueryByKeyProps = {
    key: string;
    includeEdges: boolean
}

export var badData = [
  {
    doc: {
      _key: "null",
      _id: "null",
      _rev: "null",
      country: "null",
      longitude: 0,
      true_sighting_id: "null",
      timestamp: "badTdata",
      latitude: 0,
      species: "Bad Data",
    },
    edges: [],
    connectedDocs: [],
  },
];

export function makeInitialQuery(_pageNum: number) {
  const fetchData = async () => {
    try {
      const client = new FastAPIClient(import.meta.env.VITE_API_URL);
      const response = await client.getSearchAllDocumentsPaged(
        12,
        _pageNum,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        true
      );
      const dataItems = await response; // Parse the response JSON
      return dataItems; // Return the parsed data
    } catch (error) {
      console.error("Error fetching initial documents:", error);
      return badData; // Return the bad data
    }
  };
  return fetchData(); // Return the fetchData function
}


export async function makeFullQuery({
  collections,
  pageSize,
  pageNumber,
  startTime,
  endTime,
  longStart,
  longEnd,
  latStart,
  latEnd,
  country,
  type,
  attribute1Start,
  attribute1End,
  attribute2Start,
  attribute2End,
  includeEdges,
  edgeCollection,
  excludeEdges,
  collectionFilter,
  }: makeQueryProps) {
    try {
      const client = new FastAPIClient(import.meta.env.VITE_API_URL);
      const response = await client.getDocumentsPaged(
        collections,
        pageSize,
        pageNumber,
        startTime,
        endTime,
        longStart,
        longEnd,
        latStart,
        latEnd,
        country,
        type,
        attribute1Start,
        attribute1End,
        attribute2Start,
        attribute2End,
        includeEdges,
        edgeCollection,
        excludeEdges,
        collectionFilter
      );
      const dataItems = await response;
      return dataItems;
    } catch (error) {
      console.error("Error fetching paged documents:", error);
      throw error; // Throw the error for the component to handle
    }
  }

export async function makeQueryByKey({
    key,
    includeEdges,
  }: makeQueryByKeyProps) {
    try {
      const client = new FastAPIClient(import.meta.env.VITE_API_URL);
      const response = await client.getDocumentByKey(
        key,
        includeEdges
      );
      const dataItems = await response;
      return dataItems;
    } catch (error) {
      console.error("Error fetching documents by key:", error);
      throw error; // Throw the error for the component to handle
    }
  }

  export async function getCollectionsCount(){
    try {
      const client = new FastAPIClient(import.meta.env.VITE_API_URL);
      const response = await client.getColectionCountData() 
      return response
    } catch (error) {
      console.error("Error fetching documents count:", error);
      throw error; // Throw the error for the component to handle
    }
  }