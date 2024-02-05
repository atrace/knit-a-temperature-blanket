import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import axios from "axios";

type PageableResponse = {
  total: number;
  offset: number;
  limit: number;
  results: unknown[];
};

interface ISomeApiClient {
  get<T>(url: string): Promise<AxiosResponse<T>>;
  getWithPagination<T extends PageableResponse>(
    url: string,
    pageSize: number,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<Omit<T, "offset">>>;
}

export class SomeApiClient implements ISomeApiClient {
  baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  instance: AxiosInstance | null = null;

  get http(): AxiosInstance {
    return this.instance != null ? this.instance : this.initHttp(this.baseUrl);
  }

  initHttp(baseUrl: string) {
    const http = axios.create({
      baseURL: baseUrl,
      withCredentials: true,
      timeout: "20000",
    });

    http.interceptors.request.use((request) => {
      return request;
    });

    http.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        return Promise.reject(error);
      },
    );

    this.instance = http;
    return http;
  }

  async get<T>(url: string): Promise<AxiosResponse<T>> {
    return await this.http.get<T>(url);
  }

  async getWithPagination<T extends PageableResponse>(
    url: string,
    pageSize = 100,
  ): Promise<AxiosResponse<Omit<T, "offset">>> {
    let response;
    let receivedItems: T["results"] = [];
    const defaultMaxPages = 100;
    let maxPages: number;
    if (process.env.MAX_PAGES_FROM_THIS_API) {
      maxPages =
        parseInt(process.env.MAX_PAGES_FROM_THIS_API) || defaultMaxPages;
    } else {
      maxPages = defaultMaxPages;
    }

    do {
      const newUrl = url.match(/\?/)
        ? `${url}&limit=${pageSize}&offset=${receivedItems.length}`
        : `${url}?limit=${pageSize}&offset=${receivedItems.length}`;

      response = await this.http.get<T>(newUrl);

      if (response.status !== 200) {
        return response;
      }

      if (response.data.total / pageSize > maxPages) {
        throw Error(`Too many pages to paginate: ${response.data.total}`);
      }

      if (response.data.results) {
        receivedItems = receivedItems.concat(response.data.results);
      }
    } while (response.data.total > receivedItems.length);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { offset, ...responseDataWithoutOffset } = response.data;

    return {
      ...response,
      data: { ...responseDataWithoutOffset, results: receivedItems },
    };
  }
}
