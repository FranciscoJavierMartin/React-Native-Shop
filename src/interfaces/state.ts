import Product from '../models/product';
import Order from '../models/order';
import CartItem from '../models/cart-item';

export interface IProductsState {
  availableProducts: Product[];
  userProducts: Product[];
}

export interface ICartState {
  items: any;
  totalAmount: number;
}

export interface IOrdersState {
  orders: Order[],
}

export interface IAuthState {
  token: string;
  userId: string;
}

export interface IGlobalState {
  products: IProductsState;
  cart: ICartState;
  orders: IOrdersState;
  auth: IAuthState;
}

interface IInputValues {
  title: string;
  imageUrl: string;
  description: string;
  price: string;
}

interface IInputValidities {
  title: boolean;
  imageUrl: boolean;
  description: boolean;
  price: boolean;
}

export interface IInputState {
  inputValues: any;
  inputValidities: any;
  formIsValid: boolean;
}