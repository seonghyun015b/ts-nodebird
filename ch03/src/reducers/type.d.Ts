export interface UserData {
  id: string;
  password: string;
}

export interface InitialState {
  isLoggedIn: boolean;
  user: UserData | null;
  signUpData: {};
  loginData: {};
}

export interface LoginAction {
  type: 'LOG_IN';
  data: UserData;
}

export interface LogoutAction {
  type: 'LOG_OUT';
}

export type Action = LoginAction | LogoutAction;

export interface RootState {
  user: {
    isLoggedIn: boolean;
    user: UserData | null;
    signUpData: {};
    loginData: {};
  };
  post: { mainPosts: [] };
}
