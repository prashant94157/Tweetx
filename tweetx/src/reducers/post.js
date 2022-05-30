import {
  ADD_POST_ERROR,
  ADD_POST_SUCCESS,
  GET_POSTS,
  POST_ERROR,
} from '../actions/types';

const initialState = {
  posts: [],
  loading: true,
  error: {},
};

export default function post(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_POSTS:
    case ADD_POST_SUCCESS:
      return { ...state, posts: payload, loading: false };
    case ADD_POST_ERROR:
    case POST_ERROR:
      return { ...state, error: payload, loading: false };
    default:
      return state;
  }
}
