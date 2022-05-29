import axios from 'axios';
import { GET_POSTS, POST_ERROR } from './types';

export const getPosts = () => async (dispatch) => {
  try {
    const response = await axios.get('/profile/post');
    dispatch({ type: GET_POSTS, payload: response.data });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};
