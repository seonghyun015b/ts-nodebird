import { api } from './axios';

// 게시글 로드
export function loadPostsAPI(lastId?: number) {
  return api.get(`/posts?lastId=${lastId || 0}`).then((response) => response.data);
}

// 게시글 작성
export function addPostAPI(data: FormData) {
  return api.post('/post', data).then((response) => response.data);
}

// 게시글 삭제
export function removePostAPI(data: number) {
  return api.delete(`/post/${data}`).then((response) => response.data);
}

// 리트윗
export function retweetAPI(data: number) {
  return api.post(`/post/${data}/retweet`).then((response) => response.data);
}

// 댓글 작성
export function addCommentAPI(data: { postId: number; content: string; userId: number }) {
  return api.post(`/post/${data.postId}/comment`, data).then((response) => response.data);
}

// 좋아요
export function likePostAPI(data: number) {
  return api.patch(`/post/${data}/like`).then((response) => response.data);
}

// 싫어요
export function unlikePostAPI(data: number) {
  return api.delete(`/post/${data}/like`).then((response) => response.data);
}

// 특정 게시글 로드
export function loadPostAPI(data: number) {
  return api.get(`/post/${data}`).then((response) => response.data);
}

// 이미지 업로드

export function uploadImagesAPI<T>(data: FormData) {
  return api.post<T>('/post/images', data).then((response) => response.data);
}
