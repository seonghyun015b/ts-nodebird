import { HYDRATE } from 'next-redux-wrapper';

interface UserData {
  id: string;
  password: string;
}

export interface RootState {
  user: {
    isLoggedIn: boolean;
    user: UserData | null;
    signUpData: {};
    loginData: {};
  };
  post: { mainPosts: [] };
}

const initialState: RootState = {
  user: {
    isLoggedIn: false,
    user: null,
    signUpData: {},
    loginData: {},
  },
  post: {
    mainPosts: [],
  },
};

export interface LoginAction {
  type: 'LOG_IN';
  data: UserData;
}

export const loginAction = (data: UserData): LoginAction => {
  return {
    type: 'LOG_IN',
    data,
  };
};

export interface LogoutAction {
  type: 'LOG_OUT';
}

export const logoutAction = (): LogoutAction => {
  return {
    type: 'LOG_OUT',
  };
};

export type ReducerType =
  | LoginAction
  | LogoutAction
  | { type: typeof HYDRATE; payload: RootState };

const rootReducer = (state = initialState, action: ReducerType) => {
  switch (action.type) {
    case HYDRATE:
      console.log('HYDRATE', action);
      return {
        ...state,
        ...action.payload,
      };
    case 'LOG_IN':
      return {
        ...state,
        user: {
          ...state.user,
          isLoggedIn: true,
          user: { id: action.data.id, password: action.data.password },
        },
      };
    case 'LOG_OUT':
      return {
        ...state,
        user: {
          ...state.user,
          isLoggedIn: false,
          user: null,
        },
      };

    default:
      return state;
  }
};

export default rootReducer;
