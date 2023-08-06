import {
  InitialState,
  UserData,
  LoginAction,
  LogoutAction,
  Action,
} from './type.d';

const initialState: InitialState = {
  isLoggedIn: false,
  me: null,
  signUpData: {},
  loginData: {},
};

export const loginAction = (data: UserData): LoginAction => {
  return {
    type: 'LOG_IN',
    data,
  };
};

export const logoutAction = (): LogoutAction => {
  return {
    type: 'LOG_OUT',
  };
};

const reducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case 'LOG_IN':
      return {
        ...state,
        isLoggedIn: true,
        me: { id: action.data.id, password: action.data.password },
      };
    case 'LOG_OUT':
      return {
        ...state,
        isLoggedIn: false,
        me: null,
      };
    default:
      return state;
  }
};

export default reducer;
