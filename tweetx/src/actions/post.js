import axios from 'axios';
import { setAlert } from './alert';
import {
  GET_POSTS,
  POST_ERROR,
  ADD_POST_ERROR,
  ADD_POST_SUCCESS,
} from './types';

export const getPosts = () => async (dispatch) => {
  try {
    const response = await axios.get('/feed');
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

export const write = (content) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const body = JSON.stringify({ content });

  try {
    const res = await axios.post('/feed', body, config);
    dispatch(setAlert('Successfully posted', 'success'));
    dispatch({
      type: ADD_POST_SUCCESS,
      payload: res.data,
    });
    dispatch(getPosts());
  } catch (err) {
    dispatch({
      type: ADD_POST_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};
