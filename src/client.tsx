import axios, { AxiosResponse } from 'axios';
import { Form } from 'react-bootstrap';

export class FastAPIClient {
  private baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }


  public async getColectionNameData(): Promise<any> {
    try {
      //console.debug(`${this.baseURL}/get_collection_names`);
      const response: AxiosResponse<any> = await axios.get(`${this.baseURL}/get_collection_names`);
      return response.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  }
  public async getDocumentsPaged(
    collections: string,
    pageSize: number,
    pageNumber: number,
    startTime: string | null = "",
    endTime: string | null = "",
    longStart: any | null = null,
    longEnd: any | null = null,
    latStart: any | null = null,
    latEnd: any | null = null,
    countries: string | null = "",
    types: string | null = "",
    attribute1Start: any | null = null,
    attribute1End: any | null = null,
    attribute2Start: any | null = null,
    attribute2End: any | null = null,
    includeEdges: boolean | null = false,
    edgeCollections: string | null = "",
    excludeEdges: boolean | null = false,
    collectionFilter: string | null = ""
  ): Promise<any> {
    try {
      const response: AxiosResponse<any> = await axios.get(`${this.baseURL}/get_documents_paged`, {
        params: {
          collections,
          pageSize,
          pageNumber,
          startTime,
          endTime,
          longStart,
          longEnd,
          latStart,
          latEnd,
          countries,
          types,
          attribute1Start,
          attribute1End,
          attribute2Start,
          attribute2End,
          includeEdges,
          edgeCollections,
          excludeEdges,
          collectionFilter
        },
        headers: {
          Accept: 'application/json', // Specify JSON response
        },
      });
      console.log( await axios.get(`${this.baseURL}/get_documents_paged`, {
        params: {
          collections,
          pageSize,
          pageNumber,
          startTime,
          endTime,
          longStart,
          longEnd,
          latStart,
          latEnd,
          countries,
          types,
          attribute1Start,
          attribute1End,
          attribute2Start,
          attribute2End,
          includeEdges,
          edgeCollections,
          excludeEdges,
          collectionFilter
        },
        headers: {
          Accept: 'application/json', // Specify JSON response
        },
      }))
      return response.data;
    } catch (error) {
      console.error('Error fetching paged documents:', error);
      throw error;
    }
  }

  public async getSearchAllDocumentsPaged(
    pageSize: number,
    pageNumber: number,
    startTime: string | null = "",
    endTime: string | null = "",
    longStart: number | null = 0,
    longEnd: number | null = 0,
    latStart: number | null = 0,
    latEnd: number | null = 0,
    country: string | null = "",
    type: string | null = "",
    attribute1Start: number | null = 0,
    attribute1End: number | null = 0,
    attribute2Start: number | null = 0,
    attribute2End: number | null = 0,
    includeEdges: boolean | null = false,
  ): Promise<any> {
    try {
      const response: AxiosResponse<any> = await axios.get(`${this.baseURL}/get_search_all_paged`, {
        params: {
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
          includeEdges
        },
        headers: {
          Accept: 'application/json', // Specify JSON response
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching paged documents:', error);
      throw error;
    }
  }


  public async getDocumentByKey(
    key: string,
    includeEdges: boolean | null = true
  ): Promise<any> {
    try {
      const response: AxiosResponse<any> = await axios.get(`${this.baseURL}/get_document_by_key`, {
        params: {
          key,
          includeEdges
        },
        headers: {
          Accept: 'application/json', // Specify JSON response
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching paged documents:', error);
      throw error;
    }
  }
}



// // usage example
// const client = new FastAPIClient('https://example.com/api');
// client.getSampleData().then((data) => {
//   console.log(data);
// });