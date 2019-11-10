import { IOrdersState } from "../../interfaces/state";
import { IAction } from "../../interfaces/actions";
import { ADD_ORDER } from "../actions/orders";
import Order from "../../models/order";

const initialState: IOrdersState = {
  orders: [],
};

export default(state: IOrdersState = initialState, action: IAction) => {
  let newState: IOrdersState;

  switch(action.type){
    case ADD_ORDER:
      const newOrder = new Order(new Date().toString(), action.payload.items, action.payload.amount, new Date());
      newState = {
        ...state,
        orders: state.orders.concat(newOrder),
      }
    break;
    default:
      newState = state;
  }

  return newState;
};