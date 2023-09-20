import { produce } from 'immer';
import { IMainPost } from './post';

//내 정보 불러오기
export const LOAD_MY_INFO_REQUEST = 'LOAD_MY_INFO_REQUEST';
export const LOAD_MY_INFO_SUCCESS = 'LOAD_MY_INFO_SUCCESS';
export const LOAD_MY_INFO_FAILURE = 'LOAD_MY_INFO_FAILURE';
//유저 정보 불러오기
export const LOAD_USER_REQUEST = 'LOAD_USER_REQUEST';
export const LOAD_USER_SUCCESS = 'LOAD_USER_SUCCESS';
export const LOAD_USER_FAILURE = 'LOAD_USER_FAILURE';
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
// 팔로우 삭제
export const REMOVE_FOLLOWER_REQUEST = 'REMOVE_FOLLOWER_REQUEST';
export const REMOVE_FOLLOWER_SUCCESS = 'REMOVE_FOLLOWER_SUCCESS';
export const REMOVE_FOLLOWER_FAILURE = 'REMOVE_FOLLOWER_FAILURE';
// 팔로워 목록 로딩
export const LOAD_FOLLOWERS_REQUEST = 'LOAD_FOLLOWERS_REQUEST';
export const LOAD_FOLLOWERS_SUCCESS = 'LOAD_FOLLOWERS_SUCCESS';
export const LOAD_FOLLOWERS_FAILURE = 'LOAD_FOLLOWERS_FAILURE';
// 팔로잉 목록 로딩
export const LOAD_FOLLOWINGS_REQUEST = 'LOAD_FOLLOWINGS_REQUEST';
export const LOAD_FOLLOWINGS_SUCCESS = 'LOAD_FOLLOWINGS_SUCCESS';
export const LOAD_FOLLOWINGS_FAILURE = 'LOAD_FOLLOWINGS_FAILURE';
// 게시글 추가,삭제
export const ADD_POST_TO_ME = 'ADD_POST_TO_ME';
export const REMOVE_POST_OF_ME = 'REMOVE_POST_OF_ME';

export interface UserState {
  // 내 정보 불러오는중
  loadMyInfoLoading: boolean;
  loadMyInfoDone: boolean;
  loadMyInfoFailure: boolean | string | null;
  // 유저 정보 불러오는중
  loadUserLoading: boolean;
  loadUserDone: boolean;
  loadUserFailure: boolean | string | null;
  // 로그인 시도
  logInLoading: boolean;
  logInDone: boolean | null;
  logInError: boolean | string;
  // 로그아웃 시도
  logOutLoading: boolean;
  logOutDone: boolean | null;
  logOutError: boolean | string;
  // 회원가입 시도중
  signUpLoading: boolean;
  signUpDone: boolean;
  signUpError: boolean | null | string;
  // 닉네임 변경 시도중
  changeNicknameLoading: boolean;
  changeNicknameDone: boolean;
  changeNicknameError: boolean | null | string;
  // 팔로우 시도중
  followLoading: boolean;
  followDone: boolean;
  followError: boolean | null | string;
  // 언팔로우 시도중
  unfollowLoading: boolean;
  unfollowDone: boolean;
  unfollowError: boolean | null | string;
  // 팔로워 삭제
  removeFollowerLoading: boolean;
  removeFollowerDone: boolean;
  removeFollowerError: string | null;
  // 팔로워 목록 로딩
  loadFollowersLoading: boolean;
  loadFollowersDone: boolean;
  loadFollowersError: string | null;
  // 팔로잉 목록 로딩
  loadFollowingsLoading: boolean;
  loadFollowingsDone: boolean;
  loadFollowingsError: string | null;
  me: null | UserData | LoadMyInfoSuccessData;
  // 유저 정보
  userInfo: null | UserData;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface FollowType {
  createdAt: string;
  updatedAt: string;
  FollowingId: string;
  FollowerId: string;
}

export interface LoadMyInfoSuccessData {
  email: string;
  id: number;
  nickname: string;
  Posts: { id: number }[];
  Followings: { id: number }[];
  Followers: { id: number }[];
  createdAt: string;
  updatedAt: string;
}

export interface UserData {
  id: number;
  email: string;
  nickname: string;
  Posts: IMainPost[];
  Followings: { id: number; nickname?: string; Follow?: FollowType[] }[];
  Followers: { id: number; nickname?: string; Follow?: FollowType[] }[];
  createdAt: string;
  updatedAt: string;
}

// 내 정보 불러오기

export interface LoadMyInfoRequestAction {
  type: typeof LOAD_MY_INFO_REQUEST;
}

export interface LoadMyInfoSuccessAction {
  type: typeof LOAD_MY_INFO_SUCCESS;
  data: LoadMyInfoSuccessData | null;
}

export interface LoadMyInfoFailureAction {
  type: typeof LOAD_MY_INFO_FAILURE;
  error: string;
}

// 유저정보 불러오기

export interface LoadUserInfoRequestAction {
  type: typeof LOAD_USER_REQUEST;
}

export interface LoadUserInfoSuccessAction {
  type: typeof LOAD_USER_SUCCESS;
  data: UserData;
}

export interface LoadUserInfoFailureAction {
  type: typeof LOAD_USER_FAILURE;
  error: string;
}

// 로그인

export interface LoginRequestAction {
  type: typeof LOG_IN_REQUEST;
  data: LoginData;
}

export interface LoginSuccessAction {
  type: typeof LOG_IN_SUCCESS;
  data: UserData;
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

export interface FollowRequestAction {
  type: typeof FOLLOW_REQUEST;
  data: number;
}

export interface FollowSuccessAction {
  type: typeof FOLLOW_SUCCESS;
  data: { UserId: number };
}

export interface FollowFailureAction {
  type: typeof FOLLOW_FAILURE;
  error: string;
}

// 언팔로우

export interface UnfollowRequestAction {
  type: typeof UNFOLLOW_REQUEST;
  data: number;
}

export interface UnfollowSuccessAction {
  type: typeof UNFOLLOW_SUCCESS;
  data: { UserId: number };
}

export interface UnfollowFailureAction {
  type: typeof UNFOLLOW_FAILURE;
  error: string;
}

// 팔로워 삭제

export interface RemoveFollowerRequestAction {
  type: typeof REMOVE_FOLLOWER_REQUEST;
  data: number;
}

export interface RemoveFollowerSuccessAction {
  type: typeof REMOVE_FOLLOWER_SUCCESS;
  data: { UserId: number };
}

export interface RemoveFollowerFailureAction {
  type: typeof REMOVE_FOLLOWER_FAILURE;
  error: string;
}

// 팔로워 목록 로딩

export interface LoadFollowersRequestAction {
  type: typeof LOAD_FOLLOWERS_REQUEST;
}

export interface LoadFollowersSuccessAction {
  type: typeof LOAD_FOLLOWERS_SUCCESS;
  data: { id: number; nickname?: string; Follow?: FollowType[] }[];
}

export interface LoadFollowersFailureAction {
  type: typeof LOAD_FOLLOWERS_FAILURE;
  error: string;
}

// 팔로잉 목록 로딩

export interface LoadFollowingsRequestAction {
  type: typeof LOAD_FOLLOWINGS_REQUEST;
}

export interface LoadFollowingsSuccessAction {
  type: typeof LOAD_FOLLOWINGS_SUCCESS;
  data: { id: number; nickname?: string; Follow?: FollowType[] }[];
}

export interface LoadFollowingsFailureAction {
  type: typeof LOAD_FOLLOWINGS_FAILURE;
  error: string;
}

// 회원가입

export interface SignupRequestAction {
  type: typeof SIGN_UP_REQUEST;
  data: { email: string; password: string; nickname: string };
}

export interface SignupSuccessAction {
  type: typeof SIGN_UP_SUCCESS;
}

export interface SignupFailureAction {
  type: typeof SIGN_UP_FAILURE;
  error: string;
}

// 닉네임 변경

export interface ChangeNickNameRequestAction {
  type: typeof CHANGE_NICKNAME_REQUEST;
  data: string;
}

export interface ChangeNickNameSuccessAction {
  type: typeof CHANGE_NICKNAME_SUCCESS;
  data: { nickname: string };
}

export interface ChangeNickNameFailureAction {
  type: typeof CHANGE_NICKNAME_FAILURE;
  error: string;
}

// 게시글 추가, 삭제

export interface AddPostToMeAction {
  type: typeof ADD_POST_TO_ME;
  data: IMainPost;
}

export interface RemovePostOfMeAction {
  type: typeof REMOVE_POST_OF_ME;
  data: number;
}

export type UserAction =
  // 내 정보 불러오기
  | LoadMyInfoRequestAction
  | LoadMyInfoSuccessAction
  | LoadMyInfoFailureAction
  // 유저 정보 불러오기
  | LoadUserInfoRequestAction
  | LoadUserInfoSuccessAction
  | LoadUserInfoFailureAction
  // 로그인
  | LoginRequestAction
  | LoginSuccessAction
  | LoginFailureAction
  // 로그아웃
  | LogoutRequestAction
  | LogoutSuccessAction
  | LogoutFailureAction
  // 팔로우
  | FollowRequestAction
  | FollowSuccessAction
  | FollowFailureAction
  // 언팔로우
  | UnfollowRequestAction
  | UnfollowSuccessAction
  | UnfollowFailureAction
  // 회원가입
  | SignupRequestAction
  | SignupSuccessAction
  | SignupFailureAction
  // 닉네임 변경
  | ChangeNickNameRequestAction
  | ChangeNickNameSuccessAction
  | ChangeNickNameFailureAction
  // 팔로워 삭제
  | RemoveFollowerRequestAction
  | RemoveFollowerSuccessAction
  | RemoveFollowerFailureAction
  // 팔로워 목록 로딩
  | LoadFollowersRequestAction
  | LoadFollowersSuccessAction
  | LoadFollowersFailureAction
  // 팔로잉 목록 로딩
  | LoadFollowingsRequestAction
  | LoadFollowingsSuccessAction
  | LoadFollowingsFailureAction
  // 추가, 삭제
  | AddPostToMeAction
  | RemovePostOfMeAction;

export interface DummyData {
  nickname: string;
  id: number;
  email: string;
  password: string;
  Posts: { id: number }[];
  Followings: { id: number; nickname: string }[];
  Followers: { nickname: string }[];
}

// 초기값

export const initialState: UserState = {
  // 내 정보 불러오는중
  loadMyInfoLoading: false,
  loadMyInfoDone: false,
  loadMyInfoFailure: false,
  // 유저 정보 불러오는중
  loadUserLoading: false,
  loadUserDone: false,
  loadUserFailure: false,
  // 로그인 시도
  logInLoading: false,
  logInDone: false,
  logInError: false,
  // 로그아웃 시도
  logOutLoading: false,
  logOutDone: false,
  logOutError: false,
  // 회원가입 시도중
  signUpLoading: false,
  signUpDone: false,
  signUpError: false,
  // 닉네임 변경 시도중
  changeNicknameLoading: false,
  changeNicknameDone: false,
  changeNicknameError: false,
  // 팔로우 시도중
  followLoading: false,
  followDone: false,
  followError: false,
  // 언팔로우 시도중
  unfollowLoading: false,
  unfollowDone: false,
  unfollowError: false,
  // 팔로워 삭제
  removeFollowerLoading: false,
  removeFollowerDone: false,
  removeFollowerError: null,
  // 팔로워 목록 로딩
  loadFollowersLoading: false,
  loadFollowersDone: false,
  loadFollowersError: null,
  // 팔로잉 목록 로딩
  loadFollowingsLoading: false,
  loadFollowingsDone: false,
  loadFollowingsError: null,
  me: null,
  // 유저 정보
  userInfo: null,
};

// 로그인

export const loginRequestAction = (data: {
  email: string;
  password: string;
}) => ({
  type: LOG_IN_REQUEST,
  data,
});

// 로그아웃

export const logoutRequestAction = () => ({
  type: LOG_OUT_REQUEST,
});

// 팔로우

export const followRequestAction = (data: number) => ({
  type: FOLLOW_REQUEST,
  data,
});

// 언팔로우

export const unfollowRequesAction = (data: number) => ({
  type: UNFOLLOW_REQUEST,
  data,
});

// 팔로워 차단

export const removeFollowerRequestAction = (data: number) => ({
  type: REMOVE_FOLLOWER_REQUEST,
  data,
});

// 팔로워 목록 로딩

export const loadFollowersRequestAction = (data: number) => ({
  type: LOAD_FOLLOWERS_REQUEST,
  data,
});

// 팔로잉 목록 로딩

export const loadFollowingsRequestAction = () => ({
  type: LOAD_FOLLOWINGS_REQUEST,
});

// 닉네임 변경

export const changeNicknameRequestAction = (data: string) => ({
  type: CHANGE_NICKNAME_REQUEST,
  data,
});

const reducer = (state = initialState, action: UserAction) => {
  return produce(state, (draft) => {
    switch (action.type) {
      // 내 정보 불러오기
      case LOAD_MY_INFO_REQUEST:
        draft.loadMyInfoLoading = true;
        draft.loadMyInfoFailure = false;
        draft.loadMyInfoDone = false;
        break;
      case LOAD_MY_INFO_SUCCESS:
        draft.loadMyInfoLoading = false;
        draft.loadMyInfoDone = true;
        draft.me = action.data;
        break;
      case LOAD_MY_INFO_FAILURE:
        draft.loadMyInfoLoading = false;
        draft.loadMyInfoFailure = action.error;
        break;

      // 유저 정보 불러오기
      case LOAD_USER_REQUEST:
        draft.loadUserLoading = true;
        draft.loadUserFailure = false;
        draft.loadUserDone = false;
        break;
      case LOAD_USER_SUCCESS:
        draft.loadUserLoading = false;
        draft.loadUserDone = true;
        draft.userInfo = action.data;
        break;
      case LOAD_USER_FAILURE:
        draft.loadUserLoading = false;
        draft.loadUserFailure = action.error;
        break;

      // 로그인
      case LOG_IN_REQUEST:
        draft.logInLoading = true;
        draft.logInError = false;
        draft.logInDone = false;
        break;
      case LOG_IN_SUCCESS:
        draft.logInLoading = false;
        draft.logInDone = true;
        draft.me = action.data;
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
        draft.me?.Followings.push({ id: action.data.UserId });
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
            (v) => v.id !== action.data.UserId
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
        if (draft.me) {
          draft.me.nickname = action.data.nickname;
        }
        draft.changeNicknameLoading = false;
        draft.changeNicknameDone = true;
        break;
      case CHANGE_NICKNAME_FAILURE:
        draft.changeNicknameLoading = false;
        draft.changeNicknameError = action.error;
        break;

      // 팔로워 차단

      case REMOVE_FOLLOWER_REQUEST:
        draft.removeFollowerLoading = true;
        draft.removeFollowerError = null;
        draft.removeFollowerDone = false;
        break;
      case REMOVE_FOLLOWER_SUCCESS:
        if (draft.me) {
          draft.me.Followers = draft.me.Followers.filter(
            (v) => v.id !== action.data.UserId
          );
        }
        draft.removeFollowerLoading = false;
        draft.removeFollowerDone = true;
        break;
      case REMOVE_FOLLOWER_FAILURE:
        draft.removeFollowerLoading = false;
        draft.removeFollowerError = action.error;
        break;

      // 팔로워 목록 로딩

      case LOAD_FOLLOWERS_REQUEST:
        draft.loadFollowersLoading = true;
        draft.loadFollowersError = null;
        draft.loadFollowersDone = false;
        break;
      case LOAD_FOLLOWERS_SUCCESS:
        draft.loadFollowersLoading = false;
        draft.loadFollowersDone = true;
        if (draft.me) {
          draft.me.Followers = action.data;
        }
        break;
      case LOAD_FOLLOWERS_FAILURE:
        draft.loadFollowersLoading = false;
        draft.loadFollowersError = action.error;
        break;

      // 팔로잉 목록 로딩

      case LOAD_FOLLOWINGS_REQUEST:
        draft.loadFollowingsLoading = true;
        draft.loadFollowingsError = null;
        draft.loadFollowingsDone = false;
        break;
      case LOAD_FOLLOWINGS_SUCCESS:
        draft.loadFollowingsLoading = false;
        draft.loadFollowingsDone = true;
        if (draft.me) {
          draft.me.Followings = action.data;
        }
        break;
      case LOAD_FOLLOWINGS_FAILURE:
        draft.loadFollowingsLoading = false;
        draft.loadFollowingsError = action.error;
        break;

      // 게시글 추가
      case ADD_POST_TO_ME:
        if (draft.me) {
          draft.me.Posts.unshift(action.data);
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
