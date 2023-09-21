import { Context, createWrapper } from 'next-redux-wrapper';
import { AnyAction, applyMiddleware, createStore, Store } from 'redux';

import createSagaMiddleware, { Task } from 'redux-saga';

import reducer, { State } from '../reducers';
import rootSaga from '../sagas';

export interface SagaStore extends Store {
  sagaTask?: Task;
}

export const makeStore = (context: Context) => {
  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(reducer, applyMiddleware(sagaMiddleware));

  (store as SagaStore).sagaTask = sagaMiddleware.run(rootSaga);

  return store;
};

export const wrapper = createWrapper<Store<State, AnyAction>>(makeStore, {
  debug: process.env.NODE_ENV === 'development',
});
