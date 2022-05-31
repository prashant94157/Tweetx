import axios from 'axios';
import { GET_PROFILE, PROFILE_ERROR } from './types';
import { setAlert } from './alert';

export const getCurrentProfile = () => async (dispatch) => {
  try {
    const res = await axios.get('/profile');
    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
  } catch (error) {
    const err = error.response.data.errors;
    if (err) {
      err.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};
