import { produce } from 'immer';

// 로그인
export const LOG_IN_REQUEST = 'LOG_IN_REQUEST';
export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS';
export const LOG_IN_FAILURE = 'LOG_IN_FAILURE';
// 로그아웃
export const LOG_OUT_REQUEST = 'LOG_OUT_REQUEST';
export const LOG_OUT_SUCCESS = 'LOG_OUT_SUCCESS';
export const LOG_OUT_FAILURE = 'LOG_OUT_FAILURE';
// 회원가입
export const SIGN_UP_REQUEST = 'SIGN_UP_REQUEST';
export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS';
export const SIGN_UP_FAILURE = 'SIGN_UP_FAILURE';
// 닉네임 변경
export const CHANGE_NICKNAME_REQUEST = 'CHANGE_NICKNAME_REQUEST';
export const CHANGE_NICKNAME_SUCCESS = 'CHANGE_NICKNAME_SUCCESS';
export const CHANGE_NICKNAME_FAILURE = 'CHANGE_NICKNAME_FAILURE';
// 팔로우
export const FOLLOW_REQUEST = 'FOLLOW_REQUEST';
export const FOLLOW_SUCCESS = 'FOLLOW_SUCCESS';
export const FOLLOW_FAILURE = 'FOLLOW_FAILURE';
// 언팔로우
export const UNFOLLOW_REQUEST = 'UNFOLLOW_REQUEST';
export const UNFOLLOW_SUCCESS = 'UNFOLLOW_SUCCESS';
export const UNFOLLOW_FAILURE = 'UNFOLLOW_FAILURE';

// 게시글 추가,삭제
export const ADD_POST_TO_ME = 'ADD_POST_TO_ME';
export const REMOVE_POST_OF_ME = 'REMOVE_POST_OF_ME';

export interface UserState {
  logInLoading: boolean; // 로그인 시도
  logInDone: boolean | null;
  logInError: boolean | string;
  logOutLoading: boolean; // 로그아웃 시도
  logOutDone: boolean | null;
  logOutError: boolean | string;
  signUpLoading: boolean; // 회원가입 시도중
  signUpDone: boolean;
  signUpError: boolean | null | string;
  changeNicknameLoading: boolean; // 닉네임 변경 시도중
  changeNicknameDone: boolean;
  changeNicknameError: boolean | null | string;
  followLoading: boolean; // 팔로우 시도중
  followDone: boolean;
  followError: boolean | null | string;
  unfollowLoading: boolean; // 언팔로우 시도중
  unfollowDone: boolean;
  unfollowError: boolean | null | string;
  me: null | DummyData;
  signUpData: {};
  loginData: {};
}

export interface LoginData {
  email: string;
  password: string;
}

// 로그인

export interface LoginRequestAction {
  type: typeof LOG_IN_REQUEST;
  data: { email: string; password: string };
}

export interface LoginSuccessAction {
  type: typeof LOG_IN_SUCCESS;
  data: LoginData;
}

export interface LoginFailureAction {
  type: typeof LOG_IN_FAILURE;
  error: string;
}

// 로그아웃

export interface LogoutRequestAction {
  type: typeof LOG_OUT_REQUEST;
}

export interface LogoutSuccessAction {
  type: typeof LOG_OUT_SUCCESS;
}

export interface LogoutFailureAction {
  type: typeof LOG_OUT_FAILURE;
  error: string;
}

// 팔로우

export interface followRequestAction {
  type: typeof FOLLOW_REQUEST;
}

export interface followSuccessAction {
  type: typeof FOLLOW_SUCCESS;
  data: number;
}

export interface followFailureAction {
  type: typeof FOLLOW_FAILURE;
  error: string;
}

// 언팔로우

export interface unfollowRequestAction {
  type: typeof UNFOLLOW_REQUEST;
}

export interface unfollowSuccessAction {
  type: typeof UNFOLLOW_SUCCESS;
  data: number;
}

export interface unfollowFailureAction {
  type: typeof UNFOLLOW_FAILURE;
  error: string;
}

// 회원가입

export interface signupRequestAction {
  type: typeof SIGN_UP_REQUEST;
}

export interface signupSuccessAction {
  type: typeof SIGN_UP_SUCCESS;
}

export interface signupFailureAction {
  type: typeof SIGN_UP_FAILURE;
  error: string;
}

// 닉네임 변경

export interface changeNickNameRequestAction {
  type: typeof CHANGE_NICKNAME_REQUEST;
}

export interface changeNickNameSuccessAction {
  type: typeof CHANGE_NICKNAME_SUCCESS;
}

export interface changeNickNameFailureAction {
  type: typeof CHANGE_NICKNAME_FAILURE;
  error: string;
}

// 게시글 추가, 삭제

export interface addPostAction {
  type: typeof ADD_POST_TO_ME;
  data: number;
}

export interface removePostAction {
  type: typeof REMOVE_POST_OF_ME;
  data: number;
}

export type UserAction =
  | LoginRequestAction
  | LoginSuccessAction
  | LoginFailureAction
  | LogoutRequestAction
  | LogoutSuccessAction
  | LogoutFailureAction
  | followRequestAction
  | followSuccessAction
  | followFailureAction
  | unfollowRequestAction
  | unfollowSuccessAction
  | unfollowFailureAction
  | signupRequestAction
  | signupSuccessAction
  | signupFailureAction
  | changeNickNameRequestAction
  | changeNickNameSuccessAction
  | changeNickNameFailureAction
  | addPostAction
  | removePostAction;

export interface DummyData {
  nickname: string;
  id: number;
  email: string;
  password: string;
  Posts: { id: number }[];
  Followings: { id: number; nickname: string }[];
  Followers: { nickname: string }[];
}

// 더미유저

const dummyUser = (data: LoginData) => ({
  ...data,
  nickname: '제로초',
  id: 1,
  Posts: [{ id: 1 }],
  Followings: [
    { id: 2, nickname: '김' },
    { id: 3, nickname: '이' },
    { id: 4, nickname: '박' },
  ],
  Followers: [{ nickname: '김' }, { nickname: '박' }, { nickname: '이' }],
});

// 초기값

export const initialState: UserState = {
  logInLoading: false, // 로그인 시도
  logInDone: false,
  logInError: false,
  logOutLoading: false, // 로그아웃 시도
  logOutDone: false,
  logOutError: false,
  signUpLoading: false, // 회원가입 시도중
  signUpDone: false,
  signUpError: false,
  changeNicknameLoading: false, // 닉네임 변경 시도중
  changeNicknameDone: false,
  changeNicknameError: false,
  followLoading: false, // 팔로우 시도중
  followDone: false,
  followError: false,
  unfollowLoading: false, // 언팔로우 시도중
  unfollowDone: false,
  unfollowError: false,
  me: null,
  signUpData: {},
  loginData: {},
};

export const loginRequestAction = (data: LoginData): UserAction => {
  return {
    type: LOG_IN_REQUEST,
    data,
  };
};

export const logoutRequestAction = (): UserAction => {
  return {
    type: LOG_OUT_REQUEST,
  };
};

const reducer = (state = initialState, action: UserAction) => {
  return produce(state, (draft) => {
    switch (action.type) {
      // 로그인
      case LOG_IN_REQUEST:
        draft.logInLoading = true;
        draft.logInError = false;
        draft.logInDone = false;
        break;
      case LOG_IN_SUCCESS:
        draft.logInLoading = false;
        draft.logInDone = true;
        draft.me = dummyUser(action.data);
        break;
      case LOG_IN_FAILURE:
        draft.logInLoading = false;
        draft.logInError = action.error;
        break;
      // 로그아웃
      case LOG_OUT_REQUEST:
        draft.logOutLoading = true;
        draft.logOutDone = false;
        draft.logOutError = false;
        break;
      case LOG_OUT_SUCCESS:
        draft.logInDone = false;
        draft.logOutLoading = false;
        draft.logOutDone = true;
        draft.me = null;
        break;
      case LOG_OUT_FAILURE:
        draft.logOutLoading = false;
        draft.logOutError = action.error;
        break;
      // 팔로우
      case FOLLOW_REQUEST:
        draft.followLoading = true;
        draft.followError = null;
        draft.followDone = false;
        break;
      case FOLLOW_SUCCESS:
        draft.followLoading = false;
        if (draft.me) {
          draft.me.Followings.push({ id: action.data, nickname: 'dummy' });
        }
        draft.followDone = true;
        break;
      case FOLLOW_FAILURE:
        draft.followLoading = false;
        draft.followError = action.error;
        break;
      // 언팔로우
      case UNFOLLOW_REQUEST:
        draft.unfollowLoading = true;
        draft.unfollowError = null;
        draft.unfollowDone = false;
        break;
      case UNFOLLOW_SUCCESS:
        draft.unfollowLoading = false;
        if (draft.me) {
          draft.me.Followings = draft.me.Followings.filter(
            (v) => v.id !== action.data
          );
        }
        draft.unfollowDone = true;
        break;
      case UNFOLLOW_FAILURE:
        draft.unfollowLoading = false;
        draft.unfollowError = action.error;
        break;
      // 회원가입
      case SIGN_UP_REQUEST:
        draft.signUpLoading = true;
        draft.signUpError = null;
        draft.signUpDone = false;
        break;
      case SIGN_UP_SUCCESS:
        draft.signUpLoading = false;
        draft.signUpDone = true;
        break;
      case SIGN_UP_FAILURE:
        draft.signUpLoading = false;
        draft.signUpError = action.error;
        break;
      // 닉네임 변경
      case CHANGE_NICKNAME_REQUEST:
        draft.changeNicknameLoading = true;
        draft.changeNicknameError = null;
        draft.changeNicknameDone = false;
        break;
      case CHANGE_NICKNAME_SUCCESS:
        draft.changeNicknameLoading = false;
        draft.changeNicknameDone = true;
        break;
      case CHANGE_NICKNAME_FAILURE:
        draft.changeNicknameLoading = false;
        draft.changeNicknameError = action.error;
        break;
      // 게시글 추가
      case ADD_POST_TO_ME:
        if (draft.me) {
          draft.me.Posts.unshift({ id: action.data });
        }
        break;
      // 게시글 삭제
      case REMOVE_POST_OF_ME:
        if (draft.me) {
          draft.me.Posts = draft.me.Posts.filter((v) => v.id !== action.data);
        }
        break;
      default:
        draft;
        break;
    }
  });
};

export default reducer;
