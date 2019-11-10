import Product from '../models/product';

export interface IProductsState {
  availableProducts: Product[];
  userProducts: Product[];
}

export interface ICartState {
  items: any;
  totalAmount: number;
}

export interface IGlobalState {
  products: IProductsState;
  cart: ICartState;
}