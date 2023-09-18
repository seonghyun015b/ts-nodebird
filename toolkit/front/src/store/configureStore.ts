import { configureStore } from '@reduxjs/toolkit';
import { createWrapper, MakeStore } from 'next-redux-wrapper';

import rootReducer from '../toolkit';

export const store = configureStore({
  reducer: rootReducer,
});

const createStore = () => store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

const wrapper = createWrapper(createStore);
export default wrapper;
