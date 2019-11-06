import { IAction } from './../../interfaces/actions';
import IState from "../../interfaces/state";
import PRODUCTS from '../../data/dummy-data';
import Product from '../../models/product';

const initialState: IState = {
  availableProducts: PRODUCTS,
  userProducts: PRODUCTS.filter((product: Product) => product.ownerId === 'u1'),
};

export default (state = initialState, action: IAction): IState => {
  let newState: IState;

  switch(action.type){

    default:
      newState = {...state};
  }
  return newState;
};