type APIMethodType = 'GET' | 'POST' | 'PATCH' | 'DELETE';

interface IAPIRequestConfig {
  url: string;
  method?: APIMethodType;
  data?: unknown;
  headers?: Record<string, string>;
}

type QueryResponse = {
  isPending?: boolean;
  isSuccess?: boolean;
  isError?: boolean;
};

export type { IAPIRequestConfig, QueryResponse };
