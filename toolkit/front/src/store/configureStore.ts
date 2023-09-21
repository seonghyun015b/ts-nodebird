import { AnyAction, Reducer, configureStore } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import rootReducer, { IState } from '../toolkit';

const makeStore = () =>
  configureStore({
    reducer: rootReducer as Reducer<IState, AnyAction>,
    devTools: true,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  });

export default createWrapper<AppStore>(makeStore, {
  debug: process.env.NODE_ENV !== 'production',
});

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = AppStore['dispatch'];
