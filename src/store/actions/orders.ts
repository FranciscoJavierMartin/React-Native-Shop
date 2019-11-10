import CartItem from "../../models/cart-item";
import { IAction } from "../../interfaces/actions";

export const ADD_ORDER = 'ADD_ORDER';

export const addOrder = (cartItems: any[], totalAmount: number): IAction => {
  return {
    type: ADD_ORDER,
    payload: {
      items: cartItems,
      amount: totalAmount
    }
  }
}

export default({
  addOrder
})