import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { MainPost } from './post';

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

export interface UserData {
  id: number;
  email: string;
  nickname: string;
  password: string;
  Posts: MainPost[];
  Followings: { id: number; nickname?: string; Follow?: FollowType[] }[];
  Followers: { id: number; nickname?: string; Follow?: FollowType[] }[];
  createdAt: string;
  updatedAt: string;
}

export interface LoadMyInfoData {
  email: string;
  id: number;
  nickname: string;
  Posts: number;
  Followings: number;
  Followers: number;
  createdAt: string;
  updatedAt: string;
}

export interface UserInitialState {
  // 로그인
  logInLoading: boolean;
  logInDone: boolean;
  logInError: string | undefined | null;
  // 로그아웃
  logOutLoading: boolean;
  logOutDone: boolean;
  logOutError: string | undefined | null;
  // 내 정보 불러오기
  loadMyInfoLoading: boolean;
  loadMyInfoDone: boolean;
  loadMyInfoError: null | string | undefined;
  // 유저정보 불러오기
  loadUserLoading: boolean;
  loadUserDone: boolean;
  loadUserError: string | undefined | null;
  // 회원가입
  signUpLoading: boolean;
  signUpDone: boolean;
  signUpError: string | undefined | null;
  // 팔로우
  followLoading: boolean;
  followDone: boolean;
  followError: string | undefined | null;
  // 언팔로우
  unfollowLoading: boolean;
  unfollowDone: boolean;
  unfollowError: string | undefined | null;
  // 닉네임 변경
  changeNicknameLoading: boolean;
  changeNicknameDone: boolean;
  changeNicknameError: string | undefined | null;

  // 유저 상태
  me: null | UserData;
  // 유저 정보 불러오기
  userInfo: null | LoadMyInfoData;
}

export const initialState: UserInitialState = {
  // 유저 상태
  me: null,
  // 유저 정보 불러오기
  userInfo: null,
  // 로그인
  logInLoading: false,
  logInDone: false,
  logInError: null,
  // 로그아웃
  logOutLoading: false,
  logOutDone: false,
  logOutError: null,
  // 내 정보 불러오기
  loadMyInfoLoading: false,
  loadMyInfoDone: false,
  loadMyInfoError: null,
  // 유저정보 불러오기
  loadUserLoading: false,
  loadUserDone: false,
  loadUserError: null,
  // 회원가입
  signUpLoading: false,
  signUpDone: false,
  signUpError: null,
  // 팔로우
  followLoading: false,
  followDone: false,
  followError: null,
  // 언팔로우
  unfollowLoading: false,
  unfollowDone: false,
  unfollowError: null,
  // 닉네임 변경
  changeNicknameLoading: false,
  changeNicknameDone: false,
  changeNicknameError: null,
};

// 로그인
export const loginAction = createAsyncThunk(
  '/user/login',
  async (data: LoginData) => {
    const response = await axios.post('user/login', data);
    return response.data;
  }
);

// 로그아웃
export const logoutAction = createAsyncThunk('user/logout', async () => {
  const response = await axios.post('/user/logout');
  return response;
});

// 내 정보 불러오기

export const loadMyInfoAction = createAsyncThunk(
  'user/loadMyInfo',
  async () => {
    const response = await axios.get('/user');
    return response.data;
  }
);

// 유저정보 불러오기
export const loadUserAction = createAsyncThunk(
  'user/loadUser',
  async (data) => {
    const response = await axios.get(`/user/${data}`);
    return response.data;
  }
);

// 팔로우
export const followAction = createAsyncThunk(
  '/follow',
  async (data: number) => {
    const response = await axios.patch(`/user/${data}/follow`);
    return response.data;
  }
);

// 언팔로우
export const unfollowAction = createAsyncThunk(
  '/unfollow',
  async (data: number) => {
    const response = await axios.delete(`/user/${data}/follow`);
    return response.data;
  }
);

// 회원가입
export const signupAction = createAsyncThunk(
  '/user',
  async (data: { email: string; password: string; nickname: string }) => {
    const response = await axios.post('/user', data);
    return response.data;
  }
);

// 닉네임 변경
export const changeNicknameAction = createAsyncThunk(
  '/changeNickname',
  async (data: string) => {
    const response = await axios.patch('/user/nickname', { nickname: data });
    return response.data;
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (build) => {
    build
      // .addCase(HYDRATE, (state, action) => ({
      //   ...state,
      //   ...action.payload.user,
      // }))
      // 로그인
      .addCase(loginAction.pending, (draft) => {
        draft.logInLoading = true;
        draft.logInDone = false;
        draft.logInError = null;
      })
      .addCase(loginAction.fulfilled, (draft, action) => {
        draft.logInLoading = false;
        draft.logInError = null;
        draft.me = action.payload;
      })
      .addCase(loginAction.rejected, (draft, action) => {
        draft.logInLoading = false;
        draft.logInDone = false;
        draft.logInError = action.error.message;
      })
      // 로그아웃
      .addCase(logoutAction.pending, (draft) => {
        draft.logOutLoading = true;
        draft.logOutDone = false;
        draft.logOutError = null;
      })
      .addCase(logoutAction.fulfilled, (draft) => {
        draft.logOutLoading = false;
        draft.logOutDone = true;
        draft.me = null;
      })
      .addCase(logoutAction.rejected, (draft, action) => {
        draft.logOutLoading = false;
        draft.logOutError = action.error.message;
      })
      // 유저정보 불러오기
      .addCase(loadUserAction.pending, (draft) => {
        draft.loadUserLoading = true;
        draft.loadUserDone = false;
        draft.loadUserError = null;
      })
      .addCase(loadUserAction.fulfilled, (draft, action) => {
        draft.loadUserLoading = false;
        draft.loadUserDone = true;
        draft.me = action.payload || null;
      })
      .addCase(loadUserAction.rejected, (draft, action) => {
        draft.loadUserLoading = false;
        draft.loadUserError = action.error.message;
      })
      // 내 정보 불러오기
      .addCase(loadMyInfoAction.pending, (draft) => {
        draft.loadMyInfoLoading = true;
        draft.loadMyInfoDone = false;
        draft.loadMyInfoError = null;
      })
      .addCase(loadMyInfoAction.fulfilled, (draft, action) => {
        draft.loadMyInfoLoading = false;
        draft.loadMyInfoDone = true;
        draft.me = action.payload || null;
      })
      .addCase(loadMyInfoAction.rejected, (draft, action) => {
        draft.loadMyInfoLoading = false;
        draft.loadMyInfoError = action.error.message;
      })
      // 팔로우
      .addCase(followAction.pending, (draft) => {
        draft.followLoading = true;
        draft.followDone = false;
        draft.followError = null;
      })
      .addCase(followAction.fulfilled, (draft, action) => {
        draft.followLoading = false;
        draft.followDone = true;
        if (draft.me) {
          draft.me.Followings.push({ id: action.payload.UserId });
        }
        draft.followError = null;
      })
      .addCase(followAction.rejected, (draft, action) => {
        draft.followLoading = false;
        draft.followError = action.error.message;
      })
      // 언팔로우
      .addCase(unfollowAction.pending, (draft) => {
        draft.unfollowLoading = true;
        draft.unfollowDone = false;
        draft.unfollowError = null;
      })
      .addCase(unfollowAction.fulfilled, (draft, action) => {
        draft.unfollowLoading = false;
        draft.unfollowDone = true;
        if (draft.me) {
          draft.me.Followings = draft.me.Followings.filter(
            (v) => v.id !== action.payload.UserId
          );
        }
      })
      .addCase(unfollowAction.rejected, (draft, action) => {
        draft.unfollowLoading = false;
        draft.unfollowDone = true;
        draft.unfollowError = action.error.message;
      })
      // 닉네임 변경
      .addCase(changeNicknameAction.pending, (draft) => {
        draft.changeNicknameLoading = true;
        draft.changeNicknameDone = false;
        draft.changeNicknameError = null;
      })
      .addCase(changeNicknameAction.fulfilled, (draft, action) => {
        draft.changeNicknameLoading = false;
        draft.changeNicknameDone = true;
        if (draft.me?.nickname) {
          draft.me.nickname = action.payload.nickname;
        }
      })
      .addCase(changeNicknameAction.rejected, (draft, action) => {
        draft.changeNicknameLoading = false;
        draft.changeNicknameError = action.error.message;
      })
      // 회원가입
      .addCase(signupAction.pending, (draft) => {
        draft.signUpLoading = true;
        draft.signUpDone = false;
        draft.signUpError = null;
      })
      .addCase(signupAction.fulfilled, (draft, action) => {
        draft.signUpLoading = false;
        draft.signUpDone = true;
      })
      .addCase(signupAction.rejected, (draft, action) => {
        draft.signUpLoading = false;
        draft.signUpError = action.error.message;
      })
      .addDefaultCase((state) => state);
  },
});

export default userSlice;
