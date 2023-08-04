// user 타입

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

// post 타입

export interface PostInitialState {
  mainPosts: {
    id: number;
    User: { id: number; nickname: string };
    content: string;
    Images: { src: string }[];
    Comments: { User: { nickname: string }; content: string }[];
  }[];
  imagePaths: [];
  postAdded: boolean;
}

export interface DummyPost {
  id: number;
  content: string;
  User: { id: number; nickname: string };
  Images: [];
  Comments: [];
}

type PostAction = {
  type: typeof ADD_POST;
};

// root 타입

export interface RootState {
  user: {
    isLoggedIn: boolean;
    user: UserData | null;
    signUpData: {};
    loginData: {};
  };
  post: PostInitialState;
}
