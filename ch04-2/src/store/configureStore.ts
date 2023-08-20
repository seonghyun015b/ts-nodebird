import { MakeStore, createWrapper } from 'next-redux-wrapper';
import { applyMiddleware, createStore, compose, Store, AnyAction } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware, { Task } from 'redux-saga';

import reducer, { RootState } from '../reducers';
import rootSaga from '../sagas';

const loggerMiddleware =
  ({ dispatch, getState }) =>
  (next) =>
  (action) => {
    console.log(action);
    if (typeof action === 'function') {
      return action(dispatch, getState);
    }
    return next(action);
  };

export interface SagaStore extends Store<RootState, AnyAction> {
  sagaTask?: Task;
}

const configureStore: MakeStore<Store<any, AnyAction>> = () => {
  const sagaMiddleware = createSagaMiddleware();

  const middlewares = [sagaMiddleware, loggerMiddleware];
  const enhancer =
    process.env.NODE_ENV === 'production'
      ? compose(applyMiddleware(...middlewares))
      : composeWithDevTools(applyMiddleware(...middlewares));

  const store = createStore(reducer, enhancer);
  (store as SagaStore).sagaTask = sagaMiddleware.run(rootSaga);
  return store;
};

const wrapper = createWrapper(configureStore, {
  debug: process.env.NODE_ENV === 'development',
});

export default wrapper;
