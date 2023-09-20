import { configureStore } from '@reduxjs/toolkit';
import { createWrapper, MakeStore } from 'next-redux-wrapper';

import rootReducer from '../toolkit';

export const store = configureStore({
  reducer: rootReducer,
});

const createStore = () => store;

const wrapper = createWrapper(createStore);
export default wrapper;
