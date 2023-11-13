import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3065';
axios.defaults.withCredentials = true;

// 게시글 로드
export function loadPostsAPI(lastId?: number) {
  return axios.get(`/posts?lastId=${lastId || 0}`).then((response) => response.data);
}

// 게시글 추가
export function addPostAPI(data: FormData) {
  return axios.post('/post', data).then((response) => response.data);
}

// 게시글 삭제
export function removePostAPI(postId: number) {
  return axios.delete(`/post/${postId}`).then((response) => response.data);
}

// 댓글 추가
export function addCommentAPI(data: { postId: number; content: string; userId: number }) {
  return axios.post(`/post/${data.postId}/comment`, data).then((response) => response.data);
}

// 댓글 삭제
export function removeCommentAPI(data: number) {
  return axios.delete(`post/${data}/comment`).then((response) => response.data);
}

// 좋아요
export function likePostAPI(data: number) {
  return axios.patch(`/post/${data}/like`).then((response) => response.data);
}

// 싫어요
export function unlikePostAPI(data: number) {
  return axios.delete(`/post/${data}/like`).then((response) => response.data);
}

// 리트윗
export function retweetAPI(data: number) {
  return axios.post(`/post/${data}/retweet`).then((response) => response.data);
}

// 특정 게시글 하나 로드
export function loadPostAPI(data: number) {
  return axios.get(`/post/${data}`).then((response) => response.data);
}

// 이미지 업로드
export function uploadImagesAPI(data: FormData) {
  return axios.post('/post/images', data).then((response) => response.data);
}
