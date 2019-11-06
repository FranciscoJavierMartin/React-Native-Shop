import { IAction } from './../../interfaces/actions';
import { IProductState } from "../../interfaces/state";
import PRODUCTS from '../../data/dummy-data';
import Product from '../../models/product';

const initialState: IProductState = {
  availableProducts: PRODUCTS,
  userProducts: PRODUCTS.filter((product: Product) => product.ownerId === 'u1'),
};

export default (state = initialState, action: IAction): IProductState => {
  let newState: IProductState;

  switch(action.type){

    default:
      newState = {...state};
  }
  return newState;
};