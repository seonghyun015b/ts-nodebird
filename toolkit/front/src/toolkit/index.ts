import { combineReducers } from 'redux';
import axios from 'axios';

import userSlice from './user';
import postSlice from './post';
import { store } from '../store/configureStore';

axios.defaults.baseURL = 'http://localhost:3065';
axios.defaults.withCredentials = true;

const rootReducer = combineReducers({
  user: userSlice.reducer,
  post: postSlice.reducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default rootReducer;
