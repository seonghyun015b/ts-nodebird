import axios from 'axios';
import userSlice, { UserInitialState } from './user';
import postSlice, { PostState } from './post';
import { AnyAction, CombinedState } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { HYDRATE } from 'next-redux-wrapper';

axios.defaults.baseURL = 'http://localhost:3065';
axios.defaults.withCredentials = true;

export interface IState {
  user: UserInitialState;
  post: PostState;
}

const rootReducer = (
  state: IState,
  action: AnyAction
): CombinedState<IState> => {
  switch (action.type) {
    case HYDRATE:
      return action.payload;
    default: {
      const combinedReducer = combineReducers({
        user: userSlice.reducer,
        post: postSlice.reducer,
      });
      return combinedReducer(state, action);
    }
  }
};

export default rootReducer;
