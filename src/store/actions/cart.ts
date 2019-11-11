import Product from "../../models/product";
import { IAction } from "../../interfaces/actions";

export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';

const addToCart = (product: Product): IAction => {
  return {
    type: ADD_TO_CART,
    payload: product,
  }
}

const removeToCart = (productId: string): IAction => {
  return {
    type: REMOVE_FROM_CART,
    payload: productId,
  }
}

export default ({
  addToCart,
  removeToCart,
});