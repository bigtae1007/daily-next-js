import axios, { AxiosInstance, AxiosError, InternalAxiosRequestConfig } from "axios";

// 1. API 인스턴스 생성
export const API: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL, // 환경 변수 사용 권장
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// 2. 요청 인터셉터 (Request Interceptor)
API.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // 예: 로컬 스토리지에서 토큰을 가져와 헤더에 삽입
    const token = localStorage.getItem("accessToken");
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  },
);

// 3. 응답 인터셉터 (Response Interceptor)
API.interceptors.response.use(
  (response) => {
    // 서버 응답 데이터만 바로 반환하도록 설정 가능
    return response;
  },
  async (error: AxiosError) => {
    if (error.response) {
      const { status } = error.response;

      // 예: 401 에러 시 토큰 갱신 로직 또는 로그아웃 처리
      if (status === 401) {
        console.error("인증이 만료되었습니다. 다시 로그인해주세요.");
        // window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  },
);
