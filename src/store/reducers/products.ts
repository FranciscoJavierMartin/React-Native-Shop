import PRODUCTS from '../../data/dummy-data';
import { IAction } from '../../interfaces/actions';
import { IProductsState } from '../../interfaces/state';
import Product from '../../models/product';

const initialState: IProductsState = {
  availableProducts: PRODUCTS,
  userProducts: PRODUCTS.filter((product: Product) => product.ownerId === 'u1'),
};

export default (state: IProductsState = initialState, action: IAction): IProductsState => {
  let newState: IProductsState;

  switch(action.type){
    
    default:
      newState = {...state};
  }
  return newState;
};