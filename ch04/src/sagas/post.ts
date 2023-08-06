import { all, fork, put, delay, takeEvery } from 'redux-saga/effects';

function* addPost(action) {
  try {
    yield delay(1000);
    yield put({
      type: 'ADD_POST_REQUEST',
    });
  } catch (err) {
    yield put({
      type: 'ADD_POST_FAILURE',
      data: err.response.data,
    });
  }
}

function* watchAddPost() {
  yield takeEvery('ADD_POST_REQUEST', addPost);
}

export default function* postSaga() {
  yield all([fork(watchAddPost)]);
}
