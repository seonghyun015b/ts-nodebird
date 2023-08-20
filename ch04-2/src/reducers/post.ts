import shortId from 'shortid';
import { produce } from 'immer';
import faker from '@faker-js/faker';
faker.seed(123);

export interface MainPost {
  id: number;
  User: { id: number; nickname: string };
  content: string;
  Images: { src: string }[];
  Comments: { User: { nickname: string }; content: string }[];
}

export interface PostState {
  mainPosts: MainPost[];
  imagePaths: string[];
  postAdded: boolean;

  addPostLoading: boolean;
  addPostDone: boolean;
  addPostError: boolean | null;

  loadPostsLoading: boolean;
  loadPostsDone: boolean;
  loadPostsError: boolean | null;

  removePostLoading: boolean;
  removePostDone: boolean;
  removePostError: boolean | null;

  addCommentLoading: boolean;
  addCommentDone: boolean;
  addCommentError: boolean | null;

  hasMorePosts: boolean;
}

interface DummyData {
  id: number;
  content: string;
  User: { id: number; nickname: string };
  Images: string[];
  Comments: string[];
}

interface AddPostAction {
  type: 'ADD_POST';
}

type PostType = AddPostAction;

export const initialState: PostState = {
  mainPosts: [],
  imagePaths: [],
  postAdded: false,

  // 게시글 추가
  addPostLoading: false,
  addPostDone: false,
  addPostError: false,

  // 게시글 로딩
  loadPostsLoading: false,
  loadPostsDone: false,
  loadPostsError: null,

  // 게시글 삭제
  removePostLoading: false,
  removePostDone: false,
  removePostError: false,

  // 댓글 로딩
  addCommentLoading: false,
  addCommentDone: false,
  addCommentError: false,

  // 게시글 추가로딩
  hasMorePosts: true,
};

export const generateDummyPost = (number: number) =>
  Array(number)
    .fill()
    .map(() => ({
      id: shortId.generate(),
      User: {
        id: shortId.generate(),
        nickname: faker.name.findName(),
      },
      content: faker.lorem.paragraph(),
      Images: [
        {
          src: faker.image.image(),
        },
      ],
      Comments: [
        {
          User: {
            id: shortId.generate(),
            nickname: faker.name.findName(),
          },
          content: faker.lorem.sentence(),
        },
      ],
    }));

const dummyPost = (data) => ({
  id: shortId.generate(),
  content: data.content,
  User: {
    id: 1,
    nickname: '제로초',
  },
  Images: [],
  Comments: [],
});

const dummyComment = (data) => ({
  id: shortId.generate(),
  content: data,
  User: {
    id: 1,
    nickname: '제로초',
  },
});

// 게시글 로드
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

export const addPost = (data) => ({
  type: ADD_POST_REQUEST,
  data,
});

export const addComment = (data) => ({
  type: ADD_COMMENT_REQUEST,
  data,
});

const reducer = (state = initialState, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      // 게시글 로드
      case LOAD_POST_REQUEST:
        draft.loadPostsLoading = true;
        draft.loadPostsDone = false;
        draft.loadPostsError = null;
        break;
      case LOAD_POST_SUCCESS:
        draft.loadPostsLoading = false;
        draft.loadPostsDone = true;
        draft.mainPosts = action.data.concat(draft.mainPosts);
        draft.hasMorePosts = draft.mainPosts.length < 50;
        break;
      case LOAD_POST_FAILURE:
        draft.loadPostsLoading = false;
        draft.loadPostsError = action.error;
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
        draft.mainPosts.unshift(dummyPost(action.data), ...state.mainPosts);
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
        draft.mainPosts = draft.mainPosts.filter((v) => v.id !== action.data);
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
        const post = draft.mainPosts.find((v) => v.id === action.data.postId);
        if (post) {
          post.Comments.unshift(dummyComment(action.data.content));
        }
        draft.addCommentLoading = false;
        draft.addCommentDone = true;
        break;
      }
      case ADD_COMMENT_FAILURE:
        draft.addCommentLoading = false;
        draft.addCommentError = action.error;
        break;

      default:
        break;
    }
  });
};

export default reducer;
