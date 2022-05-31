import axios from 'axios';
import { setAlert } from './alert';
import {
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  AUTH_ERROR,
  USER_LOADED,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT,
} from './types';

import setAuthToken from '../utils/setAuthToken';

export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  try {
    const res = await axios.get('/auth');
    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (error) {
    const err = error.response.data.errors;
    if (err) {
      err.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

export const register =
  ({ name, email, password }) =>
  async (dispatch) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const body = JSON.stringify({ name, email, password });

    try {
      const res = await axios.post('/auth/register', body, config);
      dispatch(setAlert('Successfully registered', 'success'));
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      });
      dispatch(loadUser());
    } catch (error) {
      const err = error.response.data.errors;
      if (err) {
        err.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
      }
      dispatch({
        type: REGISTER_FAIL,
      });
    }
  };

export const login = (email, password) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const body = JSON.stringify({ email, password });

  try {
    const res = await axios.post('/auth/login', body, config);
    dispatch(setAlert('Successfully logged in', 'success'));
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });
    dispatch(loadUser());
  } catch (error) {
    const err = error.response.data.errors;
    if (err) {
      err.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: LOGIN_FAIL,
    });
  }
};

export const logout = () => (dispatch) => {
  dispatch(setAlert('Successfully logged out', 'success'));
  dispatch({ type: LOGOUT });
};
