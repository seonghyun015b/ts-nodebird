import { api } from './axios';

// 팔로우
export function followAPI(data: number) {
  return api.patch(`/user/${data}/follow`).then((response) => response.data);
}

// 언팔로우

export function unfollowAPI(data: number) {
  return api.delete(`/user/${data}/follow`).then((response) => response.data);
}

// 팔로잉 목록 로딩
export function loadFollowingsAPI(page: number) {
  return api.get(`/user/followings?limit=${page}`).then((response) => response.data);
}

// 팔로워 목록 로딩
export function loadFollowersAPI(page: number) {
  return api.get(`/user/followers?limit=${page}`).then((response) => response.data);
}

// 닉네임 변경
export function changeNicknameAPI(data: string) {
  return api.patch('/user/nickname', { nickname: data }).then((response) => response.data);
}

// 팔로워 차단
export function removeFollowerAPI(data: number) {
  return api.delete(`/user/follower/${data}`).then((response) => response.data);
}

// 사용자 정보 로드
export function loadUserAPI(data: number) {
  return api.get(`/user/${data}`).then((response) => response.data);
}

// 사용자 게시글 로드
export function loadUserPostsAPI(data: number, lastId?: number) {
  return api.get(`/user/${data}/posts?lastId=${lastId || 0}`).then((response) => response.data);
}
