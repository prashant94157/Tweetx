import { GET_USERS, USERS_ERROR } from '../actions/types';
import axios from 'axios';
import { setAlert } from './alert';

export const getUsers = () => async (dispatch) => {
  try {
    const res = await axios.get('/profile/all');
    dispatch({
      type: GET_USERS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: USERS_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};
