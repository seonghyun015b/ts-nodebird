import { HYDRATE } from 'next-redux-wrapper';
import { combineReducers } from 'redux';

import user from './user';
import post from './post';

import { RootState } from './type';

export type ReducerType = { type: typeof HYDRATE; payload: RootState };

const rootReducer = combineReducers({
  index: (state = {}, action) => {
    switch (action.type) {
      case HYDRATE:
        console.log('HYDRATE', action);
        return {
          ...state,
          ...action.payload,
        };
      default:
        return state;
    }
  },
  user,
  post,
});

export default rootReducer;
