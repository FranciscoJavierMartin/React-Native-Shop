import { IAction } from '../../interfaces/actions';
import { IAuthState } from '../../interfaces/state';
import { AUTHENTICATE, LOGOUT } from '../actions/auth';

const initialState: IAuthState = {
  token: null,
  userId: null
};

export default (
  state: IAuthState = initialState,
  action: IAction
): IAuthState => {
  let newState: IAuthState;

  switch (action.type) {
    case AUTHENTICATE:
      newState = {
        ...state,
        token: action.payload.token,
        userId: action.payload.userId
      };
      break;
    case LOGOUT:
      newState = initialState;
      break;
    default:
      newState = state;
  }
  return newState;
};
