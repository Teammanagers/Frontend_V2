type APIMethodType = 'GET' | 'POST' | 'PATCH' | 'DELETE';

interface APIResponse<T> {
  isSuccess: boolean; // 성공 여부
  code: string; // 상태 코드
  message: string; // 응답 메시지
  result: T; // 데이터 내용
}

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

export type { IAPIRequestConfig, APIResponse, QueryResponse };
