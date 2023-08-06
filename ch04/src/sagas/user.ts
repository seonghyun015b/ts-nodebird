import { all, fork, put, delay, takeEvery } from 'redux-saga/effects';
import { LoginAction } from '../reducers/type';

interface LogInAction {
  type: 'LOG_IN_REQUEST';
  data: any; // 추후 변경
}

interface LogOutAction {
  type: 'LOG_OUT_REQUEST';
}

function* logIn(action: LoginAction) {
  try {
    yield delay(1000);
    yield put({
      type: 'LOG_IN_SUCCESS',
      data: action.data,
    });
  } catch (err) {
    yield put({
      type: 'LOG_IN_FAILURE',
      data: err.response.data,
    });
  }
}

function* logOut(action: LogOutAction) {
  try {
    yield delay(1000);
    yield put({
      type: 'LOG_OUT_SUCCESS',
    });
  } catch (err) {
    yield put({
      type: 'LOG_OUT_FAILURE',
      data: err.response.data,
    });
  }
}

function* watchLogIn() {
  yield takeEvery('LOG_IN_REQUEST', logIn);
}

function* watchLogOut() {
  yield takeEvery('LOG_OUT_REQUEST', logOut);
}

export default function* userSaga() {
  yield all([fork(watchLogIn), fork(watchLogOut)]);
}
