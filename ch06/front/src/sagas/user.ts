import axios, { AxiosResponse } from 'axios';
import { all, call, fork, put, takeLatest } from 'redux-saga/effects';
import {
  // 유저 정보 불러오기
  LOAD_MY_INFO_REQUEST,
  LOAD_MY_INFO_SUCCESS,
  LOAD_MY_INFO_FAILURE,
  // 로그인
  LOG_IN_FAILURE,
  LOG_IN_SUCCESS,
  LOG_IN_REQUEST,
  // 로그아웃
  LOG_OUT_FAILURE,
  LOG_OUT_REQUEST,
  LOG_OUT_SUCCESS,
  // 회원가입
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAILURE,
  // 팔로우
  FOLLOW_REQUEST,
  FOLLOW_FAILURE,
  FOLLOW_SUCCESS,
  // 언팔로우
  UNFOLLOW_SUCCESS,
  UNFOLLOW_FAILURE,
  UNFOLLOW_REQUEST,
  LoginRequestAction,
  UserData,
  LoginData,
  FollowRequestAction,
  SignupRequestAction,
  UnfollowRequestAction,
  LOAD_FOLLOWERS_REQUEST,
  LOAD_FOLLOWERS_SUCCESS,
  LOAD_FOLLOWERS_FAILURE,
  LOAD_FOLLOWINGS_REQUEST,
  LOAD_FOLLOWINGS_SUCCESS,
  LOAD_FOLLOWINGS_FAILURE,
  REMOVE_FOLLOWER_REQUEST,
  REMOVE_FOLLOWER_SUCCESS,
  RemoveFollowerRequestAction,
  REMOVE_FOLLOWER_FAILURE,
  CHANGE_NICKNAME_REQUEST,
  CHANGE_NICKNAME_SUCCESS,
  CHANGE_NICKNAME_FAILURE,
  ChangeNickNameRequestAction,
  LoadFollowersSuccessAction,
  LoadFollowingsSuccessAction,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAILURE,
  LOAD_USER_REQUEST,
  LoadUserInfoSuccessAction,
  LoadUserInfoRequestAction,
  FollowType,
} from '../reducers/user';

// 유저 정보 불러오기

function loadMyInfoAPI() {
  return axios.get('/user');
}

function* loadMyInfo() {
  try {
    const result: AxiosResponse = yield call(loadMyInfoAPI);
    yield put({
      type: LOAD_MY_INFO_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: LOAD_MY_INFO_FAILURE,
      error: err,
    });
  }
}

function* watchloadMyInfo() {
  yield takeLatest(LOAD_MY_INFO_REQUEST, loadMyInfo);
}

// 다른사람 정보 불러오기

function loadUserAPI(data: number) {
  return axios.get(`/user/${data}`);
}

function* loadUser(action: LoadUserInfoRequestAction) {
  try {
    const result: AxiosResponse = yield call(loadUserAPI, action.data);
    yield put({
      type: LOAD_USER_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: LOAD_USER_FAILURE,
      error: err,
    });
  }
}

function* watchLoadUser() {
  yield takeLatest(LOAD_USER_REQUEST, loadUser);
}

// 로그인

function logInAPI(data: LoginData) {
  return axios.post<{ data: LoginRequestAction }>('/user/login', data);
}

function* logIn(action: LoginRequestAction) {
  try {
    const result: AxiosResponse = yield call(logInAPI, action.data);
    yield put({
      type: LOG_IN_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: LOG_IN_FAILURE,
      error: err,
    });
  }
}

function* watchLogIn() {
  yield takeLatest(LOG_IN_REQUEST, logIn);
}

// 로그아웃

function* logOutAPI() {
  return axios.post('/user/logout');
}

function* logOut() {
  try {
    yield call(logOutAPI);
    yield put({
      type: LOG_OUT_SUCCESS,
    });
  } catch (err) {
    yield put({
      type: LOG_OUT_FAILURE,
      error: err,
    });
  }
}

function* watchLogOut() {
  yield takeLatest(LOG_OUT_REQUEST, logOut);
}

// 회원가입

function signUpAPI(data: {
  email: string;
  password: string;
  nickname: string;
}) {
  return axios.post('/user', data);
}

function* signUp(action: SignupRequestAction) {
  try {
    const result: AxiosResponse = yield call(signUpAPI, action.data);
    yield put({
      type: SIGN_UP_SUCCESS,
    });
  } catch (err) {
    yield put({
      type: SIGN_UP_FAILURE,
      error: err,
    });
  }
}

function* watchSignUp() {
  yield takeLatest(SIGN_UP_REQUEST, signUp);
}

// 팔로우

function followAPI(data: number) {
  return axios.patch(`/user/${data}/follow`);
}

function* follow(action: FollowRequestAction) {
  try {
    const result: AxiosResponse = yield call(followAPI, action.data);
    yield put({
      type: FOLLOW_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: FOLLOW_FAILURE,
      error: err,
    });
  }
}

function* watchFollow() {
  yield takeLatest(FOLLOW_REQUEST, follow);
}

// 언팔로우

function unfollowAPI(data: number) {
  return axios.delete(`/user/${data}/follow`);
}

function* unfollow(action: UnfollowRequestAction) {
  try {
    const result: AxiosResponse = yield call(unfollowAPI, action.data);
    yield put({
      type: UNFOLLOW_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: UNFOLLOW_FAILURE,
      error: err,
    });
  }
}

function* watchUnFollow() {
  yield takeLatest(UNFOLLOW_REQUEST, unfollow);
}

// 팔로워 목록 로딩

function loadFollowersAPI(
  data: { id: number; nickname?: string; Follow?: FollowType[] }[]
) {
  return axios.get('/user/followers', { data });
}

function* loadFollowers(action: LoadFollowersSuccessAction) {
  try {
    const result: AxiosResponse = yield call(loadFollowersAPI, action.data);
    yield put({
      type: LOAD_FOLLOWERS_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: LOAD_FOLLOWERS_FAILURE,
      error: err,
    });
  }
}

function* watchLoadFollowers() {
  yield takeLatest(LOAD_FOLLOWERS_REQUEST, loadFollowers);
}

// 팔로잉 목록 로딩

function loadFollowingsAPI(
  data: { id: number; nickname?: string; Follow?: FollowType[] }[]
) {
  return axios.get('/user/followers', { data });
}

function* loadFollowings(action: LoadFollowingsSuccessAction) {
  try {
    const result: AxiosResponse = yield call(loadFollowingsAPI, action.data);
    yield put({
      type: LOAD_FOLLOWINGS_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: LOAD_FOLLOWINGS_FAILURE,
      error: err,
    });
  }
}

function* watchLoadFollowings() {
  yield takeLatest(LOAD_FOLLOWINGS_REQUEST, loadFollowings);
}

// 팔로워 차단

function removeFollowerAPI(data: number) {
  return axios.delete(`/user/follower/${data}`);
}

function* removeFollower(action: RemoveFollowerRequestAction) {
  try {
    const result: AxiosResponse = yield call(removeFollowerAPI, action.data);
    yield put({
      type: REMOVE_FOLLOWER_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: REMOVE_FOLLOWER_FAILURE,
      error: err,
    });
  }
}

function* watchRemoveFollower() {
  yield takeLatest(REMOVE_FOLLOWER_REQUEST, removeFollower);
}

// 닉네임 변경

function changeNicknameAPI(data: string) {
  return axios.patch('/user/nickname', { nickname: data });
}

function* changeNickname(action: ChangeNickNameRequestAction) {
  try {
    const result: AxiosResponse = yield call(changeNicknameAPI, action.data);
    yield put({
      type: CHANGE_NICKNAME_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: CHANGE_NICKNAME_FAILURE,
      error: err,
    });
  }
}

function* watchChangeNickname() {
  yield takeLatest(CHANGE_NICKNAME_REQUEST, changeNickname);
}

export default function* userSaga() {
  yield all([
    fork(watchloadMyInfo),
    fork(watchLoadUser),
    fork(watchLogIn),
    fork(watchLogOut),
    fork(watchSignUp),
    fork(watchFollow),
    fork(watchUnFollow),
    fork(watchLoadFollowers),
    fork(watchLoadFollowings),
    fork(watchRemoveFollower),
    fork(watchChangeNickname),
  ]);
}
