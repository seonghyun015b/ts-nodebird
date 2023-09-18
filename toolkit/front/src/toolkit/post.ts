import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import { HYDERATE } from 'next-redux-wrapper';

import axios from 'axios';

export interface Comment {
  id: number;
  content: string;
  UserId: number;
  PostId: number;
  createdAt: string;
  updatedAt: string;
  User: { id: number; nickname: string };
}

export interface MainPost {
  id: number;
  UserId: number;
  User: { id: number; nickname: string };
  content: string;
  Images: { src: string }[] | [];
  Likers: {
    id: number;
    Like?: {
      UserId: number;
      PostId: number;
      createdAt: string;
      updatedAt: string;
    };
  }[];
  Comments: Comment[];
  createdAt: string;
  updatedAt: string;
  RetweetId: number | null;
  Retweet: {
    id: number;
    UserId: number;
    content: string;
    RetweetId: number | null;
    User: { id: number; nickname: string };
    Images: { id: number; src: string }[];
    createdAt: string;
    updatedAt: string;
  } | null;
}

export interface PostState {
  // 기본값
  mainPosts: MainPost[];
  imagePaths: string[];
  postAdded: boolean;

  // 게시글 로딩
  loadPostLoading: boolean;
  loadPostDone: boolean;
  loadPostError: string | null | undefined;

  // 추가 로딩
  hasMorePosts: boolean;

  // 게시글 작성
  addPostLoading: boolean;
  addPostDone: boolean;
  addPostError: string | null | undefined;
  // 게시글 삭제
  removePostLoading: boolean;
  removePostDone: boolean;
  removePostError: string | null | undefined;
  // 댓글 추가
  addCommentLoading: boolean;
  addCommentDone: boolean;
  addCommentError: string | null | undefined;
  // 댓글 삭제
  removeCommentLoading: boolean;
  removeCommentDone: boolean;
  removeCommentError: string | null | undefined;
  // 리트윗
  retweetLoading: boolean;
  retweetDone: boolean;
  retweetError: string | null | undefined;
  //이미지 업로드
  uploadImageLoading: boolean;
  uploadImageDone: boolean;
  uploadImageError: string | null | undefined;
  // 좋아요
  likePostLoading: boolean;
  likePostDone: boolean;
  likePostError: string | null | undefined;
  // 싫어요
  unlikePostLoading: boolean;
  unlikePostDone: boolean;
  unlikePostError: string | null | undefined;
}

export const initialState: PostState = {
  // 기본값
  mainPosts: [],
  imagePaths: [],
  postAdded: false,

  // 게시글 로딩
  loadPostLoading: false,
  loadPostDone: false,
  loadPostError: null,

  // 추가 로딩
  hasMorePosts: false,

  // 게시글 작성
  addPostLoading: false,
  addPostDone: false,
  addPostError: null,
  // 게시글 삭제
  removePostLoading: false,
  removePostDone: false,
  removePostError: null,
  // 댓글 추가
  addCommentLoading: false,
  addCommentDone: false,
  addCommentError: null,
  // 댓글 삭제
  removeCommentLoading: false,
  removeCommentDone: false,
  removeCommentError: null,
  // 리트윗
  retweetLoading: false,
  retweetDone: false,
  retweetError: null,
  //이미지 업로드
  uploadImageLoading: false,
  uploadImageDone: false,
  uploadImageError: null,
  // 좋아요
  likePostLoading: false,
  likePostDone: false,
  likePostError: null,
  // 싫어요
  unlikePostLoading: false,
  unlikePostDone: false,
  unlikePostError: null,
};

// 게시글 불러오기

export const loadPostAction = createAsyncThunk('/load/loadPost', async () => {
  const response = await axios.get('/posts');
  return response.data;
});

// 게시글 작성

export const addPostAction = createAsyncThunk(
  'post/addPost',
  async (data: FormData) => {
    const response = await axios.post('/post', data);
    return response.data;
  }
);

// 게시글 삭제

export const removePostAction = createAsyncThunk(
  '/post/delete',
  async (data: number) => {
    const response = await axios.delete(`/post/${data}`);
    return response.data;
  }
);

// 댓글 작성

export const addCommentAction = createAsyncThunk(
  '/post/comment',
  async (data: {
    PostId: number;
    content: string;
    UserId: number | undefined;
  }) => {
    const response = await axios.post(`/post/${data.PostId}/comment`, data);
    return response.data;
  }
);

// 댓글삭제

export const removeCommentAction = createAsyncThunk(
  '/comment/delete',
  async (data: number) => {
    const response = await axios.delete(`post/${data}/comment`);
    return response.data;
  }
);

// 리트윗

export const retweetAction = createAsyncThunk(
  '/post/retweet',
  async (data: number) => {
    const response = await axios.post(`/post/${data}/retweet`, data);
    return response.data;
  }
);

// 이미지 업로드
export const upLoadImageAction = createAsyncThunk(
  'upload/images',
  async (data: FormData) => {
    const response = await axios.post('/post/images', data);
    console.log(typeof data, data);
    return response.data;
  }
);

// 좋아요

export const likePostAction = createAsyncThunk(
  '/post/like',
  async (data: number) => {
    const response = await axios.patch(`/post/${data}/like`);
    return response.data;
  }
);

// 싫어요

export const unlikePostAction = createAsyncThunk(
  '/post/unlike',
  async (data: number) => {
    const response = await axios.delete(`/post/${data}/like`);
    return response.data;
  }
);

const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    removeImages(draft, action) {
      draft.imagePaths = draft.imagePaths.filter(
        (v, i) => i !== action.payload
      );
    },
  },
  extraReducers: (builder) => {
    builder
      //게시글 로드
      .addCase(loadPostAction.pending, (draft) => {
        draft.loadPostLoading = true;
        draft.loadPostDone = false;
        draft.loadPostError = null;
      })
      .addCase(loadPostAction.fulfilled, (draft, action) => {
        draft.loadPostLoading = false;
        draft.loadPostDone = true;
        draft.mainPosts = draft.mainPosts.concat(action.payload);
        draft.hasMorePosts = draft.mainPosts.length === 10;
      })
      .addCase(loadPostAction.rejected, (draft, action) => {
        draft.loadPostLoading = false;
        draft.loadPostError = action.error.message;
      })

      // 게시글 추가
      .addCase(addPostAction.pending, (draft) => {
        draft.addPostLoading = true;
        draft.addPostDone = false;
        draft.addPostError = null;
      })
      .addCase(addPostAction.fulfilled, (draft, action) => {
        draft.addPostLoading = false;
        draft.addPostDone = true;
        draft.mainPosts.unshift(action.payload);
      })
      .addCase(addPostAction.rejected, (draft, action) => {
        draft.addPostLoading = false;
        draft.addPostError = action.error.message;
      })

      // 게시글 삭제
      .addCase(removePostAction.pending, (draft) => {
        draft.removePostLoading = true;
        draft.removePostDone = false;
        draft.removePostError = null;
      })
      .addCase(removePostAction.fulfilled, (draft, action) => {
        draft.removePostLoading = false;
        draft.removePostDone = true;
        draft.mainPosts = draft.mainPosts.filter(
          (v) => v.id !== action.payload
        );
      })
      .addCase(removePostAction.rejected, (draft, action) => {
        draft.removePostLoading = false;
        draft.removePostError = action.error.message;
      })

      // 댓글 추가
      .addCase(addCommentAction.pending, (draft) => {
        draft.addCommentLoading = true;
        draft.addCommentDone = false;
        draft.addCommentError = null;
      })
      .addCase(addCommentAction.fulfilled, (draft, action) => {
        draft.addCommentLoading = false;
        draft.addCommentDone = true;
        const post = draft.mainPosts.find(
          (v) => v.id === action.payload.PostId
        );
        if (post) {
          post.Comments.unshift(action.payload);
        }
      })
      .addCase(addCommentAction.rejected, (draft, action) => {
        draft.addCommentLoading = false;
        draft.addCommentError = action.error.message;
      })
      // 리트윗
      .addCase(retweetAction.pending, (draft) => {
        draft.retweetLoading = true;
        draft.retweetDone = false;
        draft.retweetError = null;
      })
      .addCase(retweetAction.fulfilled, (draft, action) => {
        draft.retweetLoading = false;
        draft.retweetDone = true;
        draft.mainPosts.unshift(action.payload);
      })
      .addCase(retweetAction.rejected, (draft, action) => {
        draft.retweetLoading = false;
        draft.retweetError = action.error.message;
      })
      // 댓글 삭제
      .addCase(removeCommentAction.pending, (draft) => {
        draft.removeCommentLoading = true;
        draft.removeCommentDone = false;
        draft.removeCommentError = null;
      })
      .addCase(removeCommentAction.fulfilled, (draft, action) => {
        draft.removeCommentLoading = false;
        draft.removeCommentDone = true;
        if (draft.mainPosts) {
          draft.mainPosts = draft.mainPosts.map((post) => ({
            ...post,
            Comments: post.Comments.filter(
              (v) => v.id !== action.payload.commentId
            ),
          }));
        }
      })
      .addCase(removeCommentAction.rejected, (draft, action) => {
        draft.removeCommentLoading = false;
        draft.removeCommentError = action.error.message;
      })

      // 이미지 업로드
      .addCase(upLoadImageAction.pending, (draft) => {
        draft.uploadImageLoading = true;
        draft.uploadImageDone = false;
        draft.uploadImageError = null;
      })
      .addCase(upLoadImageAction.fulfilled, (draft, action) => {
        draft.uploadImageLoading = false;
        draft.uploadImageDone = true;
        draft.imagePaths = action.payload;
        console.log(action.payload);
      })
      .addCase(upLoadImageAction.rejected, (draft, action) => {
        draft.uploadImageLoading = false;
        draft.uploadImageError = action.error.message;
      })
      // 좋아요
      .addCase(likePostAction.pending, (draft) => {
        draft.likePostLoading = true;
        draft.likePostDone = false;
        draft.likePostError = null;
      })
      .addCase(likePostAction.fulfilled, (draft, action) => {
        draft.likePostLoading = false;
        draft.likePostDone = true;
        const post = draft.mainPosts.find(
          (v) => v.id === action.payload.PostId
        );
        post?.Likers.push({ id: action.payload.UserId });
      })
      .addCase(likePostAction.rejected, (draft, action) => {
        draft.likePostLoading = false;
        draft.likePostError = action.error.message;
      })
      // 싫어요
      .addCase(unlikePostAction.pending, (draft) => {
        draft.unlikePostLoading = true;
        draft.unlikePostDone = false;
        draft.unlikePostError = null;
      })
      .addCase(unlikePostAction.fulfilled, (draft, action) => {
        draft.unlikePostLoading = false;
        draft.unlikePostDone = true;
        const post = draft.mainPosts.find(
          (v) => v.id === action.payload.PostId
        );
        if (post) {
          post.Likers = post.Likers.filter(
            (v) => v.id !== action.payload.UserId
          );
        }
      })
      .addCase(unlikePostAction.rejected, (draft, action) => {
        draft.unlikePostLoading = false;
        draft.unlikePostError = action.error.message;
      })
      .addDefaultCase((state) => state);
  },
});

export const { removeImages } = postSlice.actions;

export default postSlice;
