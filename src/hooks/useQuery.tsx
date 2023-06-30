import { FastAPIClient } from "../client";

type makeQueryProps = {
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

export function makeInitialQuery() {
  const fetchData = async () => {
    try {
      //const client = new FastAPIClient("https://10.0.0.6");
      const client = new FastAPIClient("https://192.168.91.175");
      //const names = await client.getColectionNameData();
      //const collectionNames = names[0].join(",");
      const response = await client.getDocumentsPaged(
        "sightings",
        7,
        1,
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
        true,
        "edge-sightings",
        null,
        null
      )
      const dataItems = response;   
      return dataItems
    } catch (error) {
      console.error("Error fetching initial documents:", error);
      return JSON.parse(JSON.stringify(badData));
    }
  };
  return fetchData();
}

export function makeFullQuery({
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
  const fetchData = async () => {
    try {
      //const client = new FastAPIClient("https://10.0.0.6");
      const client = new FastAPIClient("https://192.168.91.175");
      const response = await client.getDocumentsPaged(
        collections,
        10,
        1,
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
        edgeCollection,
        null,
        null
      );
      const dataItems = await response;
      console.log(collections)
      return dataItems;
    } catch (error) {
      console.error("Error fetching paged documents:", error);
      return JSON.parse(JSON.stringify(badData));
    }
  };
  return fetchData();  
}

export function makeQueryByKey({
    key,
    includeEdges
  }: makeQueryByKeyProps) {
    const fetchData = async () => {
      try {
        const client = new FastAPIClient("https://10.0.0.6");
        const response = await client.getDocumentByKey(
          key,
          includeEdges
        );
        const dataItems = await response;
        console.log(dataItems)
        return dataItems;
      } catch (error) {
        console.error("Error fetching paged documents:", error);
        return JSON.parse(JSON.stringify(badData));
      }
    };
    return fetchData();  
  }
