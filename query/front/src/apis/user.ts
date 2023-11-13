import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3065';
axios.defaults.withCredentials = true;

// 회원가입
export function signUpAPI(data: { email: string; password: string; nickname: string }) {
  return axios.post('/user', data).then((response) => response.data);
}

// 내 정보 불러오기
export function loadMyInfoAPI() {
  return axios.get('/user').then((response) => response.data);
}

// 로그인
export function loginAPI(data: { email: string; password: string }) {
  return axios.post('/user/login', data).then((response) => response.data);
}

// 로그아웃
export function logoutAPI() {
  return axios.post('/user/logout').then((response) => response.data);
}

// 팔로우
export function followAPI(data: number) {
  return axios.patch(`/user/${data}/follow`).then((response) => response.data);
}

// 언팔로우
export function unfollowAPI(data: number) {
  return axios.delete(`/user/${data}/follow`).then((response) => response.data);
}

// 닉네임 변경
export function changeNicknameAPI(data: string) {
  return axios.patch('/user/nickname', { nickname: data }).then((response) => response.data);
}

// 특정 유저 로드
export function loadUserAPI(data: number) {
  return axios.get(`/user/${data}`).then((response) => response.data);
}

// 유저 게시글 로드
export function loadUserPostsAPI(data: number, lastId?: number) {
  return axios.get(`/user/${data}/posts?lastId=${lastId || 0}`).then((response) => response.data);
}
