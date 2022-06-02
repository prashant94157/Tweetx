import axios from 'axios';
import { setAlert } from './alert';
import { getCurrentProfile } from './profile';
import { getUsers } from './users';

export const follow = (id) => async (dispatch) => {
  try {
    console.log(id);
    await axios.put(`/profile/follower/add/${id}`);
    dispatch(setAlert('Successfully Followed!!', 'success'));
  } catch (error) {
    const err = error.response.data.errors;
    if (err) {
      err.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch(setAlert('Follow not possible!!', 'danger'));
  }
};
