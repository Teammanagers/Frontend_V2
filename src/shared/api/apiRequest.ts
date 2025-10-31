import axios from 'axios';
import { axiosInstance } from './axiosInstance';
import { IAPIRequestConfig } from '../types/api.types';

/**
 * API 호출 시 사용하는 공용 유틸 함수
 *
 * @param {string} url - 요청할 엔드 포인트 예: '/api/v2/todo/{todoId}'
 * @param {'GET' | 'POST' | 'PATCH' | 'DELETE'} [method='GET'] - HTTP 요청 메서드 (기본 값은 GET)
 * @param {unknown} [data] - 요청에 포함할 데이터
 * @param {Record<string, string>} [headers={}] - //'Content-Type', 'multipart/form-data' 등 헤더 설정
 *
 * @returns {Promise<AxiosResponse>} - Axios 응답 객체
 */

const apiRequest = async ({
  url,
  method = 'GET',
  data,
  params,
  headers = {},
}: IAPIRequestConfig) => {
  try {
    const response = await axiosInstance({
      url,
      method,
      data,
      params,
      headers,
    });

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      // 에러 코드에 따른 처리
    }
    throw error;
  }
};

export default apiRequest;
