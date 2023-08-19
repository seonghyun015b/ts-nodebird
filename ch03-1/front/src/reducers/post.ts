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
  mainPosts: [
    {
      id: 1,
      User: {
        id: 1,
        nickname: '제로초',
      },
      content: '첫 번째 게시글 #해시태그 #익스프레스',
      Images: [
        {
          src: 'https://upload.wikimedia.org/wikipedia/commons/6/65/Baby.tux-800x800.png',
        },
        {
          src: 'https://cdnb.artstation.com/p/assets/images/images/002/023/575/large/okan-bulbul-penguin-new04.jpg?1456141918',
        },
        {
          src: 'https://images.rawpixel.com/image_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTA0L2pvYjY4Ni0yODUteC5qcGc.jpg?s=-wP7u0WhXmFn8GbzreOWR2zdM7O7EP79uN6zvW1vavI',
        },
      ],
      Comments: [
        {
          User: {
            nickname: 'nero',
          },
          content: '우와 개정판이 나왔군요~',
        },
        {
          User: {
            nickname: 'hero',
          },
          content: '얼른 사고싶어요~',
        },
      ],
    },
  ],
  imagePaths: [],
  postAdded: false,
};

const dummyPost: DummyData = {
  id: 2,
  content: '더미데이터입니다.',
  User: {
    id: 1,
    nickname: '제로초',
  },
  Images: [],
  Comments: [],
};

const ADD_POST = 'ADD_POST';

export const addPost = {
  type: ADD_POST,
};

const reducer = (state = initialState, action: PostType) => {
  switch (action.type) {
    case ADD_POST:
      return {
        ...state,
        mainPosts: [dummyPost, ...state.mainPosts],
        postAdded: true,
      };
    default:
      return state;
  }
};

export default reducer;
