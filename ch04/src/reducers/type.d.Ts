// user 타입

export interface UserData {
  email: string | number;
  password: string;
  id?: number;
  nickname?: string;
  Posts?: string[];
  Followings?: string[];
  Followers?: string[];
}

export interface InitialState {
  logInLoading: boolean; // 로그인 시도중
  logInDone: boolean;
  logInError: boolean;
  logOutLoading: boolean; // 로그아웃 시도중
  logOutDone: boolean;
  logOutError: boolean;
  signUpLoading: boolean; // 회원가입 시도중
  signUpDone: boolean;
  signUpError: boolean;
  me: UserData | null;
  signUpData: {};
  loginData: {};
}

export interface LoginAction {
  type: 'LOG_IN_REQUEST' | 'LOG_IN_SUCCESS' | 'LOG_IN_FAILURE';
  data: UserData;
}

export interface LogoutAction {
  type: 'LOG_OUT_REQUEST' | 'LOG_OUT_SUCCESS' | 'LOG_OUT_FAILURE';
}

export interface SignUpAction {
  type: 'SIGN_UP_REQUEST' | 'SIGN_UP_SUCCESS' | 'SIGN_UP_FAILURE';
}

export type Action = LoginAction | LogoutAction | SignUpAction;

// post 타입

export interface Posts {
  id: number;
  User: { id: number; nickname: string };
  content: string;
  Images: { src: string }[];
  Comments: { User: { nickname: string }; content: string }[];
}

export interface PostInitialState {
  mainPosts: Posts[];
  imagePaths: [];
  addPostLoading: boolean;
  addPostDone: boolean;
  addPostError: boolean;

  addCommentLoading: boolean;
  addCommentDone: boolean;
  addCommentError: boolean;
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
    logInLoading: boolean; // 로그인 시도중
    logInDone: boolean;
    logInError: boolean;
    logOutLoading: boolean; // 로그아웃 시도중
    logOutDone: boolean;
    logOutError: boolean;
    signUpLoading: boolean; // 회원가입 시도중
    signUpDone: boolean;
    signUpError: boolean;
    me: UserData | null;
    signUpData: {};
    loginData: {};
  };
  post: PostInitialState;
}
