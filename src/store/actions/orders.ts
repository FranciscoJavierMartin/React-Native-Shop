import CartItem from '../../models/cart-item';
import { IAction } from '../../interfaces/actions';
import { BASE_URL } from '../../constants/network';
import Order from '../../models/order';

export const ADD_ORDER = 'ADD_ORDER';
export const SET_ORDERS = 'SET_ORDERS';

const addOrder = (cartItems: CartItem[], totalAmount: number): any => {
  return async (dispatch: any) => {
    const date = new Date();
    const response = await fetch(BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        cartItems,
        totalAmount,
        data: date.toISOString()
      })
    });

    if (!response.ok) {
      throw new Error('Something went wrong');
    }

    const resData = await response.json();

    dispatch({
      type: ADD_ORDER,
      payload: {
        id: resData.name,
        items: cartItems,
        amount: totalAmount,
        date: date
      }
    });
  };
};

const fetchOrders = (): any => {
  return async (dispatch: any) => {
    try {
      const response = await fetch(BASE_URL);

      if (!response.ok) {
        throw new Error('Something went wrong!');
      }

      const resData = await response.json();
      const loadedOrders = [];

      for (const key in resData) {
        loadedOrders.push(
          new Order(
            key,
            resData[key].cartItems,
            resData[key].totalAmount,
            new Date(resData[key].date)
          )
        );
      }

      dispatch({
        type: SET_ORDERS,
        payload: loadedOrders
      });
    } catch (error) {
      throw error;
    }
  };
};

export default {
  addOrder,
  fetchOrders
};
