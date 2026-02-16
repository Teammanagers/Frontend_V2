import axios, { InternalAxiosRequestConfig } from 'axios';

interface CustomInternalAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

// 지금 refresh 중인지 여부를 나타내는 flag => refresh 중복 요청 방지 위해 사용
let refreshPromise: Promise<string> | null = null;

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 6000,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('accessToken');

    if (accessToken) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  (response) => response,

  async (error) => {
    if (!error.config) return Promise.reject(error);

    // 처음 서버에 보냈던 실패 요청 객체 정보를 가져와서 재시도하기 위해 에러 객체 꺼내옴
    // 토큰 갱신 후 여기에 새로운 accessToken을 덧붙여 다시 보내는 것!
    const originalRequest: CustomInternalAxiosRequestConfig = error.config;

    // 401 에러이면서, 아직 재시도 하지 않은 요청일 때  => 아직 refresh를 시도하지 않은 경우
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      // 직전에 보낸 refresh api 호출에서 401 에러 발생하여 refresh 실패 (refreshToken도 만료되었거나 문제가 생긴 것)
      // => refresh 중복 재시도 방지를 위해 로그아웃 처리
      if (originalRequest.url === '/api/v2/auth/reissue') {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        window.location.href = '/login';

        return Promise.reject(error);
      }

      // 일반적인 401에러이면 -> 중복 refresh 방지를 위한 재시도 플래그 설정 (refresh 흐름으로 진입)
      originalRequest._retry = true;

      // 아직 진행중인 refresh가 없을 때
      if (!refreshPromise) {
        refreshPromise = (async () => {
          const refreshToken = localStorage.getItem('refreshToken');

          if (!refreshToken) {
            throw new Error('사용 가능한 refreshToken이 없습니다.');
          }

          const { data } = await axios.post(
            `${import.meta.env.VITE_BASE_URL}/api/v2/auth/reissue`,
            {
              refreshToken,
            },
          );

          localStorage.setItem('accessToken', data.accessToken);
          localStorage.setItem('refreshToken', data.refreshToken);

          return data.accessToken;
        })()
          .catch((err) => {
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            window.location.href = '/login';
            throw err;
          })
          .finally(() => {
            // refreshPromise 초기화하여 새롭게 refresh 요청 가능하도록 설정
            refreshPromise = null;
          });
      }

      // 이미 refresh 요청이 진행중이면 (401에러 발생 요청이 여러 개일 때)
      // 새로 refresh 요청을 보내지 않고, 기존 refreshPomise가 resolve될 때까지 대기
      // 모든 요청이 하나의 Promise를 공유하여 refresh 중복 제어
      return refreshPromise.then(() => {
        return axiosInstance(originalRequest); // 재갱신된 토큰으로 원본 요청 재시도
      });
    }

    return Promise.reject(error);
  },
);

export { axiosInstance };
