import { IProductState } from './state';
import Product from "../models/product";

export interface IProductState {
  availableProducts: Product[];
  userProducts: Product[];
}

export interface IGlobalState {
  products: IProductState;
}