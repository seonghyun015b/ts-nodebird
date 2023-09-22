import { all, call, fork, put, takeLatest } from 'redux-saga/effects';
import {
  ADD_POST_REQUEST,
  ADD_POST_SUCCESS,
  ADD_POST_FAILURE,
  LOAD_POSTS_REQUEST,
  LOAD_POSTS_SUCCESS,
  LOAD_POSTS_FAILURE,
  REMOVE_POST_REQUEST,
  REMOVE_POST_SUCCESS,
  REMOVE_POST_FAILURE,
  ADD_COMMENT_REQUEST,
  ADD_COMMENT_SUCCESS,
  ADD_COMMENT_FAILURE,
  LIKE_POST_FAILURE,
  LIKE_POST_REQUEST,
  LIKE_POST_SUCCESS,
  UNLIKE_POST_REQUEST,
  UNLIKE_POST_FAILURE,
  UNLIKE_POST_SUCCESS,
  LikePostRequestAction,
  LoadPostsRequestAction,
  UnLikePostRequestAction,
  AddCommentRequestAction,
  AddPostRequestAction,
  UPLOAD_IMAGES_REQUEST,
  UPLOAD_IMAGES_SUCCESS,
  UPLOAD_IMAGES_FAILURE,
  RemovePostRequestAction,
  REMOVE_COMMENT_REQUEST,
  REMOVE_COMMENT_FAILURE,
  REMOVE_COMMENT_SUCCESS,
  RemoveCommentRequestAction,
  RETWEET_REQUEST,
  RETWEET_FAILURE,
  RETWEET_SUCCESS,
  RetweetRequestAction,
  UploadImagesRequestAction,
  LOAD_POST_FAILURE,
  LOAD_POST_SUCCESS,
  LOAD_POST_REQUEST,
  LoadPostRequestAction,
  LOAD_USER_POSTS_FAILURE,
  LOAD_USER_POSTS_SUCCESS,
  LOAD_USER_POSTS_REQUEST,
  LoadUserPostRequestAction,
  LoadHashtagRequestAction,
  LOAD_HASHTAG_POSTS_REQUEST,
  LOAD_HASHTAG_POSTS_SUCCESS,
  LOAD_HASHTAG_POSTS_FAILURE,
} from '../reducers/post';

import { ADD_POST_TO_ME, REMOVE_POST_OF_ME } from '../reducers/user';
import axios, { AxiosResponse } from 'axios';

// 게시글 로드

function loadPostsAPI(lastId: number | undefined) {
  return axios.get(`/posts?lastId=${lastId || 0}`);
}

function* loadPosts(action: LoadPostsRequestAction) {
  try {
    const result: AxiosResponse = yield call(loadPostsAPI, action.data);

    yield put({
      type: LOAD_POSTS_SUCCESS,
      data: result.data,
    });
  } catch (err: any) {
    yield put({
      type: LOAD_POSTS_FAILURE,
      data: err.response.data,
    });
  }
}

function* watchLoadPosts() {
  yield takeLatest(LOAD_POSTS_REQUEST, loadPosts);
}

// 특정 유저 게시글 로드

function loadUserPostAPI(data: number, lastId: number | undefined) {
  return axios.get(`/user/${data}/posts?lastId=${lastId || 0}`);
}

function* loadUserPost(action: LoadUserPostRequestAction) {
  try {
    const result: AxiosResponse = yield call(
      loadUserPostAPI,
      action.data,
      action.lastId
    );
    yield put({
      type: LOAD_USER_POSTS_SUCCESS,
      data: result.data,
    });
  } catch (err: any) {
    yield put({
      type: LOAD_USER_POSTS_FAILURE,
      error: err.response.data,
    });
  }
}

function* watchLoadUserPost() {
  yield takeLatest(LOAD_USER_POSTS_REQUEST, loadUserPost);
}

// 게시글 하나 로드

function loadPostAPI(data: number) {
  return axios.get(`/post/${data}`);
}

function* loadPost(action: LoadPostRequestAction) {
  try {
    const result: AxiosResponse = yield call(loadPostAPI, action.data);

    yield put({
      type: LOAD_POST_SUCCESS,
      data: result.data,
    });
  } catch (err: any) {
    yield put({
      type: LOAD_POST_FAILURE,
      data: err.response.data,
    });
  }
}

function* watchLoadPost() {
  yield takeLatest(LOAD_POST_REQUEST, loadPost);
}

// 해시태그 로드

// 게시글 하나 로드

function loadHashtagAPI(data: number, lastId: number | undefined) {
  return axios.get(
    `/hashtag/${encodeURIComponent(data)}?lastId=${lastId || 0}`
  );
}

function* loadHashtag(action: LoadHashtagRequestAction) {
  try {
    const result: AxiosResponse = yield call(
      loadHashtagAPI,
      action.data,
      action.lastId
    );

    yield put({
      type: LOAD_HASHTAG_POSTS_SUCCESS,
      data: result.data,
    });
  } catch (err: any) {
    yield put({
      type: LOAD_HASHTAG_POSTS_FAILURE,
      data: err.response.data,
    });
  }
}

function* watchLoadHashtag() {
  yield takeLatest(LOAD_HASHTAG_POSTS_REQUEST, loadHashtag);
}

// 게시글 추가

function addPostAPI(data: FormData) {
  return axios.post('/post', data);
}

function* addPost(action: AddPostRequestAction) {
  try {
    const result: AxiosResponse = yield call(addPostAPI, action.data);
    yield put({
      type: ADD_POST_SUCCESS,
      data: result.data,
    });
    yield put({
      type: ADD_POST_TO_ME,
      data: result.data.id,
    });
  } catch (err: any) {
    yield put({
      type: ADD_POST_FAILURE,
      data: err.response.data,
    });
  }
}

function* watchAddPost() {
  yield takeLatest(ADD_POST_REQUEST, addPost);
}

// 게시글 삭제

function removePostAPI(data: number) {
  return axios.delete(`/post/${data}`);
}

function* removePost(action: RemovePostRequestAction) {
  try {
    const result: AxiosResponse = yield call(removePostAPI, action.data);
    yield put({
      type: REMOVE_POST_SUCCESS,
      data: result.data,
    });
    yield put({
      type: REMOVE_POST_OF_ME,
      data: result.data,
    });
  } catch (err: any) {
    yield put({
      type: REMOVE_POST_FAILURE,
      data: err.response.data,
    });
  }
}

function* watchRemovePost() {
  yield takeLatest(REMOVE_POST_REQUEST, removePost);
}

// 댓글 추가

function addCommentAPI(data: {
  content: string;
  postId: number;
  userId: number;
}) {
  return axios.post(`/post/${data.postId}/comment`, data);
}

function* addComment(action: AddCommentRequestAction) {
  try {
    const result: AxiosResponse = yield call(addCommentAPI, action.data);
    yield put({
      type: ADD_COMMENT_SUCCESS,
      data: result.data,
    });
  } catch (err: any) {
    yield put({
      type: ADD_COMMENT_FAILURE,
      data: err.response.data,
    });
  }
}

function* watchCommentPost() {
  yield takeLatest(ADD_COMMENT_REQUEST, addComment);
}

// 댓글삭제

function removeCommentAPI(data: { commentId: number }) {
  return axios.delete(`/post/${data.commentId}/comment`);
}

function* removeComment(action: RemoveCommentRequestAction) {
  try {
    const result: AxiosResponse = yield call(removeCommentAPI, action.data);

    yield put({
      type: REMOVE_COMMENT_SUCCESS,
      data: result.data,
    });
  } catch (err: any) {
    yield put({
      type: REMOVE_COMMENT_FAILURE,
      data: err.response.data,
    });
  }
}

function* watchRemoveComment() {
  yield takeLatest(REMOVE_COMMENT_REQUEST, removeComment);
}

// 좋아요

function likePostAPI(data: number) {
  return axios.patch(`/post/${data}/like`);
}

function* likePost(action: LikePostRequestAction) {
  try {
    const result: AxiosResponse = yield call(likePostAPI, action.data);
    yield put({
      type: LIKE_POST_SUCCESS,
      data: result.data,
    });
  } catch (err: any) {
    yield put({
      type: LIKE_POST_FAILURE,
      error: err.response.data,
    });
  }
}

function* watchLikePost() {
  yield takeLatest(LIKE_POST_REQUEST, likePost);
}

// 싫어요

function unlikePostAPI(data: number) {
  return axios.delete(`/post/${data}/like`);
}

function* unlikePost(action: UnLikePostRequestAction) {
  try {
    const result: AxiosResponse = yield call(unlikePostAPI, action.data);
    yield put({
      type: UNLIKE_POST_SUCCESS,
      data: result.data,
    });
  } catch (err: any) {
    yield put({
      type: UNLIKE_POST_FAILURE,
      error: err.response.data,
    });
  }
}

function* watchUnLikePost() {
  yield takeLatest(UNLIKE_POST_REQUEST, unlikePost);
}

// 이미지 업로드

function uploadImageAPI(data: FormData) {
  return axios.post('/post/images', data);
}

function* uploadImage(action: UploadImagesRequestAction) {
  try {
    const result: AxiosResponse = yield call(uploadImageAPI, action.data);
    yield put({
      type: UPLOAD_IMAGES_SUCCESS,
      data: result.data,
    });
  } catch (err: any) {
    yield put({
      type: UPLOAD_IMAGES_FAILURE,
      error: err.response.data,
    });
  }
}

function* watchUploadImages() {
  yield takeLatest(UPLOAD_IMAGES_REQUEST, uploadImage);
}

// 리트윗

function retweetAPI(data: number) {
  return axios.post(`/post/${data}/retweet`);
}

function* retweet(action: RetweetRequestAction) {
  try {
    const result: AxiosResponse = yield call(retweetAPI, action.data);
    yield put({
      type: RETWEET_SUCCESS,
      data: result.data,
    });
  } catch (err: any) {
    yield put({
      type: RETWEET_FAILURE,
      error: err.response.data,
    });
  }
}

function* watchRetweet() {
  yield takeLatest(RETWEET_REQUEST, retweet);
}

export default function* postSaga() {
  yield all([
    fork(watchAddPost),
    fork(watchRemovePost),
    fork(watchCommentPost),
    fork(watchRemoveComment),
    fork(watchLoadPosts),
    fork(watchLoadPost),
    fork(watchLikePost),
    fork(watchUnLikePost),
    fork(watchUploadImages),
    fork(watchRetweet),
    fork(watchLoadUserPost),
    fork(watchLoadHashtag),
  ]);
}
