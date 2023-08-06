export interface UserData {
  email: string | number;
  password: string;
  id?: number;
  nickname?: string;
  Posts?: { id: number }[];
  Followings?: { nickname: string }[];
  Followers?: { nickname: string }[];
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
  changeNicknameLoading: boolean; // 닉네임 변경 시도중
  changeNicknameDone: boolean;
  changeNicknameError: boolean;
  me: UserData;
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

export type Action =
  | LoginAction
  | LogoutAction
  | SignUpAction
  | ADD_POST_TO_ME
  | REMOVE_POST_OF_ME;

// post 타입

export interface Posts {
  id: number;
  User: { id: number; nickname: string };
  content: string;
  Images: { id: string; src: string }[];
  Comments: {
    id: string;
    User: { id: string; nickname: string };
    content: string;
  }[];
}

export interface PostInitialState {
  mainPosts: Posts[];
  imagePaths: string[];
  addPostLoading: boolean;
  addPostDone: boolean;
  addPostError: boolean;

  removePostLoading: boolean;
  removePostDone: boolean;
  removePostError: boolean;

  addCommentLoading: boolean;
  addCommentDone: boolean;
  addCommentError: boolean;
}

export interface DummyPost {
  id: string;
  content: string;
  User: { id: number; nickname: string };
  Images: [];
  Comments: [];
}

export interface DummyComment {
  id: string;
  content: string;
  User: {
    id: number;
    nickname: string;
  };
}

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
