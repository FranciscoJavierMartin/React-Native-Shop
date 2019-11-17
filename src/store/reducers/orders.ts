import { IOrdersState } from '../../interfaces/state';
import { IAction } from '../../interfaces/actions';
import { ADD_ORDER, SET_ORDERS } from '../actions/orders';
import Order from '../../models/order';

const initialState: IOrdersState = {
  orders: []
};

export default (state: IOrdersState = initialState, action: IAction) => {
  let newState: IOrdersState;

  switch (action.type) {
    case ADD_ORDER:
      const newOrder = new Order(
        action.payload.id,
        action.payload.items,
        action.payload.amount,
        action.payload.date
      );
      newState = {
        ...state,
        orders: state.orders.concat(newOrder)
      };
      break;
    case SET_ORDERS:
      newState = {
        ...state,
        orders: action.payload
      };
      break;
    default:
      newState = state;
  }

  return newState;
};
