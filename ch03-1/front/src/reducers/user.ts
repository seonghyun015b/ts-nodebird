export interface UserState {
  isLoggedIn: boolean;
  me: null | LoginData;
  signUpData: {};
  loginData: {};
}

interface LoginData {
  id: string;
  password: string;
}

interface LoginAction {
  type: 'LOG_IN';
  data: LoginData;
}

interface LogoutAction {
  type: 'LOG_OUT';
}

export type UserAction = LoginAction | LogoutAction;

export const initialState: UserState = {
  isLoggedIn: false,
  me: null,
  signUpData: {},
  loginData: {},
};

export const loginAction = (data: LoginData): LoginAction => {
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

const reducer = (state = initialState, action: UserAction) => {
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
