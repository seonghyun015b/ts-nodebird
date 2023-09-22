import { produce } from 'immer';

// 게시글 로드
export const LOAD_POSTS_REQUEST = 'LOAD_POSTS_REQUEST';
export const LOAD_POSTS_SUCCESS = 'LOAD_POSTS_SUCCESS';
export const LOAD_POSTS_FAILURE = 'LOAD_POSTS_FAILURE';

// 특정 유저 게시글 로드

export const LOAD_USER_POSTS_REQUEST = 'LOAD_USER_POSTS_REQUEST';
export const LOAD_USER_POSTS_SUCCESS = 'LOAD_USER_POSTS_SUCCESS';
export const LOAD_USER_POSTS_FAILURE = 'LOAD_USER_POSTS_FAILURE';

// 특정 게시글 로드
export const LOAD_POST_REQUEST = 'LOAD_POST_REQUEST';
export const LOAD_POST_SUCCESS = 'LOAD_POST_SUCCESS';
export const LOAD_POST_FAILURE = 'LOAD_POST_FAILURE';

// 게시글 추가
export const ADD_POST_REQUEST = 'ADD_POST_REQUEST';
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS';
export const ADD_POST_FAILURE = 'ADD_POST_FAILURE';

// 게시글 삭제
export const REMOVE_POST_REQUEST = 'REMOVE_POST_REQUEST';
export const REMOVE_POST_SUCCESS = 'REMOVE_POST_SUCCESS';
export const REMOVE_POST_FAILURE = 'REMOVE_POST_FAILURE';

// 댓글 추가
export const ADD_COMMENT_REQUEST = 'ADD_COMMENT_REQUEST';
export const ADD_COMMENT_SUCCESS = 'ADD_COMMENT_SUCCESS';
export const ADD_COMMENT_FAILURE = 'ADD_COMMENT_FAILURE';

// 댓글 삭제
export const REMOVE_COMMENT_REQUEST = 'REMOVE_COMMENT_REQUEST';
export const REMOVE_COMMENT_SUCCESS = 'REMOVE_COMMENT_SUCCESS';
export const REMOVE_COMMENT_FAILURE = 'REMOVE_COMMENT_FAILURE';

// 좋아요
export const LIKE_POST_REQUEST = 'LIKE_POST_REQUEST';
export const LIKE_POST_SUCCESS = 'LIKE_POST_SUCCESS';
export const LIKE_POST_FAILURE = 'LIKE_POST_FAILURE';

// 싫어요

export const UNLIKE_POST_REQUEST = 'UNLIKE_POST_REQUEST';
export const UNLIKE_POST_SUCCESS = 'UNLIKE_POST_SUCCESS';
export const UNLIKE_POST_FAILURE = 'UNLIKE_POST_FAILURE';

// 이미지 업로드

export const UPLOAD_IMAGES_REQUEST = 'UPLOAD_IMAGES_REQUEST';
export const UPLOAD_IMAGES_SUCCESS = 'UPLOAD_IMAGES_SUCCESS';
export const UPLOAD_IMAGES_FAILURE = 'UPLOAD_IMAGES_FAILURE';

// 리트윗
export const RETWEET_REQUEST = 'RETWEET_REQUEST';
export const RETWEET_SUCCESS = 'RETWEET_SUCCESS';
export const RETWEET_FAILURE = 'RETWEET_FAILURE';

// 이미지 삭제

export const REMOVE_IMAGE = 'REMOVE_IMAGE';

// 게시글 로드 action type

export interface LoadPostsRequestAction {
  type: typeof LOAD_POSTS_REQUEST;
  data: number;
}

export interface LoadPostsSuccessAction {
  type: typeof LOAD_POSTS_SUCCESS;
  data: IMainPost;
}

export interface LoadPostsFailureAction {
  type: typeof LOAD_POSTS_FAILURE;
  error: string;
}

// 특정 유저 게시글 로드

export interface LoadUserPostRequestAction {
  type: typeof LOAD_USER_POSTS_REQUEST;
  data: number;
  lastId: number | undefined;
}

export interface LoadUserPostSuccessAction {
  type: typeof LOAD_USER_POSTS_SUCCESS;
  data: IMainPost[];
}

export interface LoadUserPostFailureAction {
  type: typeof LOAD_USER_POSTS_FAILURE;
  error: string;
}

// 특정 게시글 불러오기기

export interface LoadPostRequestAction {
  type: typeof LOAD_POST_REQUEST;
  data: number;
}

export interface LoadPostSuccessAction {
  type: typeof LOAD_POST_SUCCESS;
  data: IMainPost;
}

export interface LoadPostFailureAction {
  type: typeof LOAD_POST_FAILURE;
  error: string;
}

// 게시글 추가 action type

export interface AddPostRequestAction {
  type: typeof ADD_POST_REQUEST;
  data: FormData;
}

export interface AddPostSuccessAction {
  type: typeof ADD_POST_SUCCESS;
  data: IMainPost;
}

export interface AddPostFailureAction {
  type: typeof ADD_POST_FAILURE;
  error: string;
}

// 게시글 삭제 action type

export interface RemovePostRequestAction {
  type: typeof REMOVE_POST_REQUEST;
  data: number;
}

export interface RemovePostSuccessAction {
  type: typeof REMOVE_POST_SUCCESS;
  data: { PostId: number };
}

export interface RemovePostFailureAction {
  type: typeof REMOVE_POST_FAILURE;
  error: string;
}

// 댓글 추가 action type

export interface AddCommentRequestAction {
  type: typeof ADD_COMMENT_REQUEST;
  data: { content: string; postId: number; userId: number };
}

export interface AddCommentSuccessAction {
  type: typeof ADD_COMMENT_SUCCESS;
  data: AddCommentSuccessData;
}

export interface AddCommentFailureAction {
  type: typeof ADD_COMMENT_FAILURE;
  error: string;
}

// 댓글 삭제 action type

export interface RemoveCommentRequestAction {
  type: typeof REMOVE_COMMENT_REQUEST;
  data: { commentId: number };
}

export interface RemoveCommentSuccessAction {
  type: typeof REMOVE_COMMENT_SUCCESS;
  data: { commentId: number };
}

export interface RemoveCommentFailureAction {
  type: typeof REMOVE_COMMENT_FAILURE;
  error: string;
}

// 좋아요

export interface LikePostRequestAction {
  type: typeof LIKE_POST_REQUEST;
  data: number;
}

export interface LikePostSuccessAction {
  type: typeof LIKE_POST_SUCCESS;
  data: { PostId: number; UserId: number };
}

export interface LikePostFailureAction {
  type: typeof LIKE_POST_FAILURE;
  error: string;
}

// 싫어요

export interface UnLikePostRequestAction {
  type: typeof UNLIKE_POST_REQUEST;
  data: number;
}

export interface UnLikePostSuccessAction {
  type: typeof UNLIKE_POST_SUCCESS;
  data: { PostId: number; UserId: number };
}

export interface UnLikePostFailureAction {
  type: typeof UNLIKE_POST_FAILURE;
  error: string;
}

// 이미지 업로드

export interface UploadImagesRequestAction {
  type: typeof UPLOAD_IMAGES_REQUEST;
  data: FormData;
}

export interface UploadImagesSuccessAction {
  type: typeof UPLOAD_IMAGES_SUCCESS;
  data: string[];
}

export interface UploadImagesFailureAction {
  type: typeof UPLOAD_IMAGES_FAILURE;
  error: string;
}

// 리트윗

export interface RetweetRequestAction {
  type: typeof RETWEET_REQUEST;
  data: number;
}

export interface RetweetSuccessAction {
  type: typeof RETWEET_SUCCESS;
  data: IMainPost;
}

export interface RetweetFailureAction {
  type: typeof RETWEET_FAILURE;
  error: string;
}

// 이미지 삭제

export interface RemoveImageAction {
  type: typeof REMOVE_IMAGE;
  data: number;
}

export type PostAcionTypes =
  // 게시글 로드
  | LoadPostsRequestAction
  | LoadPostsSuccessAction
  | LoadPostsFailureAction
  // 게시글 한개 로드
  | LoadPostRequestAction
  | LoadPostSuccessAction
  | LoadPostFailureAction
  // 특정 유저 게시글 로드
  | LoadUserPostRequestAction
  | LoadUserPostSuccessAction
  | LoadUserPostFailureAction
  // 게시글 추가
  | AddPostRequestAction
  | AddPostSuccessAction
  | AddPostFailureAction
  // 게시글 삭제
  | RemovePostRequestAction
  | RemovePostSuccessAction
  | RemovePostFailureAction
  // 댓글 추가
  | AddCommentRequestAction
  | AddCommentSuccessAction
  | AddCommentFailureAction
  // 댓글 삭제
  | RemoveCommentRequestAction
  | RemoveCommentSuccessAction
  | RemoveCommentFailureAction
  // 좋아요
  | LikePostRequestAction
  | LikePostSuccessAction
  | LikePostFailureAction
  // 싫어요
  | UnLikePostRequestAction
  | UnLikePostSuccessAction
  | UnLikePostFailureAction
  // 이미지 업로드
  | UploadImagesRequestAction
  | UploadImagesSuccessAction
  | UploadImagesFailureAction
  // 리트윗
  | RetweetRequestAction
  | RetweetSuccessAction
  | RetweetFailureAction
  // 이미지 삭제
  | RemoveImageAction;

export interface Comment {
  id: number;
  content: string;
  UserId: number;
  PostId: number;
  createdAt: string;
  updatedAt: string;
  User: { id: number; nickname: string };
}

export interface IMainPost {
  id: number;
  UserId: number;
  User: { id: number; nickname: string };
  content: string;
  Images: { id: string; src: string }[];
  Likers: {
    id: number;
    Like?: {
      UserId: number;
      PostId: number;
      createdAt: string;
      updatedAt: string;
    };
  }[];
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
  RetweetId: number | null;
  Comments: Comment[];
  createdAt: string;
  updatedAt: string;
}

export interface PostState {
  mainPosts: IMainPost[];
  imagePaths: string[];
  // 게시글 추가
  addPostLoading: boolean;
  addPostDone: boolean;
  addPostError: string | null;
  // 특정 유저 게시글 로드
  loadUserPostLoading: boolean;
  loadUserPostDone: boolean;
  loadUserPostError: string | null;
  // 게시글 불러오기
  loadPostsLoading: boolean;
  loadPostsDone: boolean;
  loadPostsError: string | null;
  // 게시글 하나 불러오기
  loadPostLoading: boolean;
  loadPostDone: boolean;
  loadPostError: string | null;
  // 게시글 제거
  removePostLoading: boolean;
  removePostDone: boolean;
  removePostError: string | null;
  // 댓글 추가
  addCommentLoading: boolean;
  addCommentDone: boolean;
  addCommentError: string | null;
  // 댓글 삭제
  removeCommentLoading: boolean;
  removeCommentDone: boolean;
  removeCommentError: string | null;
  //좋아요
  likePostLoading: boolean;
  likePostDone: boolean;
  likePostError: string | null;
  // 싫어요
  unlikePostLoading: boolean;
  unlikePostDone: boolean;
  unlikePostError: string | null;
  // 이미지 업로드
  uploadImagesLoading: boolean;
  uploadImagesDone: boolean;
  uploadImagesError: string | null;
  // 리트윗
  retweetLoading: boolean;
  retweetDone: boolean;
  retweetError: string | null;

  // 글 추가 로딩
  hasMorePosts: boolean;

  // 글 한개 로드
  singlePost: null | IMainPost;
}

export const initialState: PostState = {
  mainPosts: [],
  imagePaths: [],

  // 게시글 추가
  addPostLoading: false,
  addPostDone: false,
  addPostError: null,

  // 특정 유저 게시글 로드
  loadUserPostLoading: false,
  loadUserPostDone: false,
  loadUserPostError: null,

  // 게시글 불러오기
  loadPostsLoading: false,
  loadPostsDone: false,
  loadPostsError: null,

  // 게시글 하나 불러오기
  loadPostLoading: false,
  loadPostDone: false,
  loadPostError: null,

  // 게시글 삭제
  removePostLoading: false,
  removePostDone: false,
  removePostError: null,

  // 댓글 삭제
  removeCommentLoading: false,
  removeCommentDone: false,
  removeCommentError: null,

  // 댓글 로딩
  addCommentLoading: false,
  addCommentDone: false,
  addCommentError: null,

  // 좋아요
  likePostLoading: false,
  likePostDone: false,
  likePostError: null,

  // 싫어요
  unlikePostLoading: false,
  unlikePostDone: false,
  unlikePostError: null,

  // 이미지 업로드
  uploadImagesLoading: false,
  uploadImagesDone: false,
  uploadImagesError: null,

  // 리트윗
  retweetLoading: false,
  retweetDone: false,
  retweetError: null,

  // 게시글 추가로딩
  hasMorePosts: true,

  // 글 한개 로드
  singlePost: null,
};

export interface AddCommentSuccessData {
  PostId: number;
  User: { id: number; nickname: string };
  UserId: number;
  content: string;
  createdAt: string;
  id: number;
  updatedAt: string;
}

// 게시글 작성
export const addPostRequestAction = (data: FormData) => ({
  type: ADD_POST_REQUEST,
  data,
});

// 게시글 삭제

export const removePostRequestAction = (data: number) => ({
  type: REMOVE_POST_REQUEST,
  data,
});

// 댓글 작성
export const addCommentRequestAction = (data: {
  content: string;
  postId: number;
  userId: number;
}): PostAcionTypes => ({
  type: ADD_COMMENT_REQUEST,
  data,
});

// 댓글 삭제

export const removeCommentAction = (data: { commentId: number }) => ({
  type: REMOVE_COMMENT_REQUEST,
  data,
});

// 이미지 삭제

export const removeImageAction = (data: number) => ({
  type: REMOVE_IMAGE,
  data,
});

// 게시글 불러오기
export const loadPostRequestAction = (data: number) => ({
  type: LOAD_POSTS_REQUEST,
  data,
});

// 좋아요
export const likePostRequestAction = (data: number) => ({
  type: LIKE_POST_REQUEST,
  data,
});

// 싫어요
export const unlikePostRequestAction = (data: number) => ({
  type: UNLIKE_POST_REQUEST,
  data,
});

// 리트윗

export const retweetRequestAction = (data: number) => ({
  type: RETWEET_REQUEST,
  data,
});

// 이미지 업로드

export const uploadImagesRequestAction = (data: FormData) => ({
  type: UPLOAD_IMAGES_REQUEST,
  data,
});

const reducer = (state = initialState, action: PostAcionTypes) => {
  return produce(state, (draft) => {
    switch (action.type) {
      // 이미지 삭제
      case REMOVE_IMAGE:
        draft.imagePaths = draft.imagePaths.filter((v, i) => i !== action.data);
        break;

      // 이미지 업로드
      case UPLOAD_IMAGES_REQUEST:
        draft.uploadImagesLoading = true;
        draft.uploadImagesDone = false;
        draft.uploadImagesError = null;
        break;
      case UPLOAD_IMAGES_SUCCESS: {
        draft.uploadImagesLoading = false;
        draft.uploadImagesDone = true;
        draft.imagePaths = action.data;
        break;
      }
      case UPLOAD_IMAGES_FAILURE:
        draft.uploadImagesLoading = false;
        draft.uploadImagesError = action.error;
        break;

      // 게시글 로드
      case LOAD_USER_POSTS_REQUEST:
      case LOAD_POSTS_REQUEST:
        draft.loadPostsLoading = true;
        draft.loadPostsDone = false;
        draft.loadPostsError = null;
        break;

      case LOAD_USER_POSTS_SUCCESS:
      case LOAD_POSTS_SUCCESS:
        draft.loadPostsLoading = false;
        draft.loadPostsDone = true;
        draft.mainPosts = draft.mainPosts.concat(action.data);
        draft.hasMorePosts = draft.mainPosts.length === 10;
        break;

      case LOAD_USER_POSTS_FAILURE:
      case LOAD_POSTS_FAILURE:
        draft.loadPostsLoading = false;
        draft.loadPostsError = action.error;
        break;

      // 게시글 하나 로드
      case LOAD_POST_REQUEST:
        draft.loadPostLoading = true;
        draft.loadPostDone = false;
        draft.loadPostError = null;
        break;
      case LOAD_POST_SUCCESS:
        draft.loadPostLoading = false;
        draft.loadPostDone = true;
        draft.singlePost = action.data;
        break;
      case LOAD_POST_FAILURE:
        draft.loadPostLoading = false;
        draft.loadPostError = action.error;
        break;
      // 게시글 추가
      case ADD_POST_REQUEST:
        draft.addPostLoading = true;
        draft.addPostDone = false;
        draft.addPostError = null;
        break;
      case ADD_POST_SUCCESS:
        draft.addPostLoading = false;
        draft.addPostDone = true;
        draft.mainPosts.unshift(action.data);
        draft.imagePaths = [];
        break;
      case ADD_POST_FAILURE:
        draft.addPostLoading = false;
        draft.addPostError = action.error;
        break;
      // 게시글 삭제
      case REMOVE_POST_REQUEST:
        draft.removePostLoading = true;
        draft.removePostDone = false;
        draft.removePostError = null;
        break;
      case REMOVE_POST_SUCCESS:
        draft.removePostLoading = false;
        draft.removePostDone = true;
        draft.mainPosts = draft.mainPosts.filter(
          (v) => v.id !== action.data.PostId
        );
        break;
      case REMOVE_POST_FAILURE:
        draft.removePostLoading = false;
        draft.removePostError = action.error;
        break;
      // 댓글 추가
      case ADD_COMMENT_REQUEST:
        draft.addCommentLoading = true;
        draft.addCommentDone = false;
        draft.addCommentError = null;
        break;
      case ADD_COMMENT_SUCCESS: {
        const post = draft.mainPosts.find((v) => v.id === action.data.PostId);
        if (post) {
          post.Comments.unshift(action.data);
        }
        draft.addCommentLoading = false;
        draft.addCommentDone = true;
        break;
      }
      case ADD_COMMENT_FAILURE:
        draft.addCommentLoading = false;
        draft.addCommentError = action.error;
        break;

      // 댓글 삭제
      case REMOVE_COMMENT_REQUEST:
        draft.removeCommentLoading = true;
        draft.removeCommentDone = false;
        draft.removeCommentError = null;
        break;

      case REMOVE_COMMENT_SUCCESS:
        draft.removeCommentLoading = false;
        draft.removeCommentDone = true;
        if (draft.mainPosts) {
          draft.mainPosts = draft.mainPosts.map((post) => ({
            ...post,
            Comments: post.Comments.filter(
              (v) => v.id !== action.data.commentId
            ),
          }));
        }
        break;
      case REMOVE_COMMENT_FAILURE:
        draft.removeCommentLoading = false;
        draft.removeCommentError = action.error;
        break;

      // 좋아요
      case LIKE_POST_REQUEST:
        draft.likePostLoading = true;
        draft.likePostDone = false;
        draft.likePostError = null;
        break;
      case LIKE_POST_SUCCESS: {
        const post = draft.mainPosts.find((v) => v.id === action.data.PostId);
        post?.Likers.push({ id: action.data.UserId });
        draft.likePostLoading = false;
        draft.likePostDone = true;
        break;
      }
      case LIKE_POST_FAILURE:
        draft.likePostLoading = false;
        draft.likePostError = action.error;
        break;

      // 싫어요
      case UNLIKE_POST_REQUEST:
        draft.unlikePostLoading = true;
        draft.unlikePostDone = false;
        draft.unlikePostError = null;
        break;
      case UNLIKE_POST_SUCCESS: {
        const post = draft.mainPosts.find((v) => v.id === action.data.PostId);
        if (post) {
          const index = post?.Likers.findIndex(
            (v) => v.id === action.data.UserId
          );
          if (index !== -1) post?.Likers.splice(index, 1);
        }
        draft.unlikePostLoading = false;
        draft.unlikePostDone = true;
        break;
      }
      case UNLIKE_POST_FAILURE:
        draft.unlikePostLoading = false;
        draft.unlikePostError = action.error;
        break;

      // 리트윗
      case RETWEET_REQUEST:
        draft.retweetLoading = true;
        draft.retweetDone = false;
        draft.retweetError = null;
        break;
      case RETWEET_SUCCESS:
        draft.retweetLoading = false;
        draft.retweetDone = true;
        draft.mainPosts.unshift(action.data);
        break;
      case RETWEET_FAILURE:
        draft.retweetLoading = false;
        draft.retweetError = action.error;
        break;

      default:
        break;
    }
  });
};

export default reducer;
