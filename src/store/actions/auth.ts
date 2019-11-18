import { AsyncStorage } from 'react-native';

/*export const SIGNUP = 'SIGNUP';
export const LOGIN = 'LOGIN';*/
export const USER_DATA = 'userData';
export const AUTHENTICATE = 'AUTHENTICATE';
export const LOGOUT = 'LOGOUT';

let timer;

const authenticate = (
  userId: string,
  token: string,
  expirationTime: number
) => {
  return (dispatch: any) => {
    dispatch(setLogoutTimer(expirationTime));
    dispatch({
      type: AUTHENTICATE,
      payload: {
        userId: userId,
        token: token
      }
    });
  };
};

const signup = (email: string, password: string) => {
  return async (dispatch: any) => {
    const response = await fetch('', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email,
        password: password,
        returnSecureToken: true
      })
    });

    if (!response.ok) {
      const errorResData = await response.json();
      const errorId = errorResData.error.message;
      let message: string;

      switch (errorId) {
        case 'EMAIL_EXISTS':
          message = 'This email is used';
          break;
        default:
          message = 'Something went wrong';
      }

      throw new Error(message);
    }

    const resData = await response.json();

    dispatch(
      authenticate(
        resData.localId,
        resData.idToken,
        parseInt(resData.expiresIn) * 1000
      )
    );
  };
};

const login = (email: string, password: string) => {
  return async (dispatch: any) => {
    const response = await fetch('', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email,
        password: password,
        returnSecureToken: true
      })
    });

    if (!response.ok) {
      const errorResData = await response.json();
      const errorId = errorResData.error.message;
      let message: string;

      switch (errorId) {
        case 'EMAIL_NOT_FOUND':
          message = 'This email could not be found';
          break;
        case 'INVALID_PASSWORD':
          message = 'Invalid password';
          break;
        case 'USER_DISABLED':
          message = '';
          break;
        default:
          message = 'Something went wrong';
      }

      throw new Error(message);
    }
    const resData = await response.json();

    dispatch(
      authenticate(
        resData.localId,
        resData.idToken,
        parseInt(resData.expiresIn) * 1000
      )
    );

    const expirationDate = new Date(
      new Date().getTime() + parseInt(resData.expiresIn) * 1000
    ).toISOString();
    saveDataToStorage(resData.idToken, resData.localId, expirationDate);
  };
};

export const logout = () => {
  clearLogoutTimer();
  AsyncStorage.removeItem(USER_DATA);

  return {
    type: LOGOUT
  };
};

const clearLogoutTimer = () => {
  if (timer) {
    clearTimeout(timer);
  }
};

const setLogoutTimer = (expirationTime: number) => {
  return (dispatch: any) => {
    timer = setTimeout(() => {
      dispatch(logout());
    }, expirationTime);
  };
};

const saveDataToStorage = (
  token: string,
  userId: string,
  expirationDate: string
) => {
  AsyncStorage.setItem(
    USER_DATA,
    JSON.stringify({
      token: token,
      userId: userId,
      expirationDate: expirationDate
    })
  );
};

export default {
  signup,
  login,
  authenticate,
  logout
};
