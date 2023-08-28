import {
  AddCommentRequestAction,
  AddPostRequestAction,
  IMainPost,
  LoadPostRequestAction,
} from './../reducers/post';

import { all, call, delay, fork, put, takeLatest } from 'redux-saga/effects';
import {
  ADD_POST_REQUEST,
  ADD_POST_SUCCESS,
  ADD_POST_FAILURE,
  LOAD_POST_REQUEST,
  LOAD_POST_SUCCESS,
  LOAD_POST_FAILURE,
  REMOVE_POST_REQUEST,
  REMOVE_POST_SUCCESS,
  REMOVE_POST_FAILURE,
  ADD_COMMENT_REQUEST,
  ADD_COMMENT_SUCCESS,
  ADD_COMMENT_FAILURE,
} from '../reducers/post';

import { ADD_POST_TO_ME, REMOVE_POST_OF_ME } from '../reducers/user';
import axios, { AxiosResponse } from 'axios';

// 게시글 로드

function loadPostAPI(data: number) {
  return axios.get('/posts', data);
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

// 게시글 추가

function addPostAPI(data: string) {
  return axios.post('/post', { content: data });
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

function* removePost(action) {
  try {
    yield delay(1000);
    yield put({
      type: REMOVE_POST_SUCCESS,
      data: action.data,
    });
    yield put({
      type: REMOVE_POST_OF_ME,
      data: action.data,
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

export default function* postSaga() {
  yield all([
    fork(watchAddPost),
    fork(watchRemovePost),
    fork(watchCommentPost),
    fork(watchLoadPost),
  ]);
}
