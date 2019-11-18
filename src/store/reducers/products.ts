import PRODUCTS from '../../data/dummy-data';
import { IAction } from '../../interfaces/actions';
import { IProductsState } from '../../interfaces/state';
import Product from '../../models/product';
import {
  DELETE_PRODUCT,
  CREATE_PRODUCT,
  UPDATE_PRODUCT,
  SET_PRODUCTS
} from '../actions/products';

const initialState: IProductsState = {
  availableProducts: PRODUCTS,
  userProducts: PRODUCTS.filter((product: Product) => product.ownerId === 'u1')
};

export default (
  state: IProductsState = initialState,
  action: IAction
): IProductsState => {
  let newState: IProductsState;

  switch (action.type) {
    case SET_PRODUCTS:
      newState = {
        availableProducts: action.payload.products,
        userProducts: action.payload.userProducts
      };
      break;
    case CREATE_PRODUCT:
      const newProduct = new Product(
        action.payload.id,
        'u1',
        action.payload.title,
        action.payload.imageUrl,
        action.payload.description,
        action.payload.price
      );
      newState = {
        ...state,
        availableProducts: state.availableProducts.concat(newProduct),
        userProducts: state.availableProducts.concat(newProduct)
      };
      break;
    case UPDATE_PRODUCT:
      const productIndex = state.userProducts.findIndex(
        (product: Product) => product.id === action.payload.productId
      );
      const updatedProduct = new Product(
        action.payload.productId,
        state.userProducts[productIndex].ownerId,
        state.userProducts[productIndex].title,
        state.userProducts[productIndex].imageUrl,
        state.userProducts[productIndex].description,
        state.userProducts[productIndex].price
      );
      const updatedUserProducts = [...state.userProducts];
      updatedUserProducts[productIndex] = updatedProduct;
      const availableProductsIndex = state.availableProducts.findIndex(
        (product: Product) => product.id === action.payload.productId
      );

      const updatedAvailableProducts = [...state.userProducts];
      updatedAvailableProducts[productIndex] = updatedProduct;
      newState = {
        ...state,
        availableProducts: updatedAvailableProducts,
        userProducts: updatedUserProducts
      };
      break;
    case DELETE_PRODUCT:
      newState = {
        ...state,
        userProducts: state.userProducts.filter(
          (product: Product) => product.id !== action.payload
        ),
        availableProducts: state.userProducts.filter(
          (product: Product) => product.id !== action.payload
        )
      };
      break;
    default:
      newState = { ...state };
  }
  return newState;
};
