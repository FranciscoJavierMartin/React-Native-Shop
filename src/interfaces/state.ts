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

export interface IGlobalState {
  products: IProductsState;
  cart: ICartState;
  orders: IOrdersState;
}