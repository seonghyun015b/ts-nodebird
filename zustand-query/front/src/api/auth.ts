import { AxiosRequestConfig } from 'axios';
import { api } from './axios';

// 유저 정보
export function loadMyInfoAPI(options?: AxiosRequestConfig) {
  return api.get('/user', options).then((response) => response.data);
}

// 회원가입
export function signUpAPI(data: { email: string; nickname: string; password: string }) {
  return api.post('/user', data).then((response) => response.data);
}

// 로그인
export function loginAPI(data: { email: string; password: string }) {
  return api.post('/user/login', data).then((response) => response.data);
}

// 로그아웃
export function logoutAPI() {
  return api.post('/user/logout').then((response) => response.data);
}
