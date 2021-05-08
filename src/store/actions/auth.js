import * as actionTypes from './actionTypes';
import axios from 'axios';
import * as keys from '../../keys';

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  };
};

export const authSuccess = (token, userId) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    token: token,
    userId: userId
  };
};

export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error
  };
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('expirationDate');
  localStorage.removeItem('userId');
  return {
    type: actionTypes.AUTH_LOGOUT
  };
};

export const checkAuthTimeout = (expirationTime) => {
  return dispatch => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationTime * 1000);
  };
};

export const setAuthRedirectPath = (path) => {
  return {
    type: actionTypes.SET_AUTH_REDIRECT_PATH,
    path: path
  };
};

export const auth = (email, password, method) => {
  return dispath => {
    dispath(authStart());
    let url;
    let googleApiKey = keys.GOOGLE_API_KEY;
    const authData = {
      email: email,
      password: password,
      returnSecureToken: true
    };

    switch (method) {
      case 'signUp':
        url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${googleApiKey}`;
        break;
      case 'signIn':
        url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${googleApiKey}`;
        break;
      default:
        return;
    }

    axios.post(url, authData)
      .then(response => {
        const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
        localStorage.setItem('token', response.data.idToken);
        localStorage.setItem('expirationDate', expirationDate);
        localStorage.setItem('userId', response.data.localId);
        dispath(authSuccess(response.data.idToken, response.data.localId));
        dispath(checkAuthTimeout(response.data.expiresIn));
      })
      .catch(error => {
        dispath(authFail(error.response.data.error));
      })
  };
};

export const checkAuthState = () => {
  return dispatch => {
    const token = localStorage.getItem('token');
    if (!token) {
      dispatch(logout());
    } else {
      const expirationDate = new Date(localStorage.getItem('expirationDate'));
      if (expirationDate > new Date()) {
        const userId = localStorage.getItem('userId');
        const expirationTime = (expirationDate.getTime() - new Date().getTime()) / 1000;
        dispatch(authSuccess(token, userId));
        dispatch(checkAuthTimeout(expirationTime));
      } else {
        dispatch(logout());
      }
    }
  };
};
