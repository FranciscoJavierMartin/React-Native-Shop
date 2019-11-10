import { ICartState } from '../../interfaces/state';
import { IAction } from '../../interfaces/actions';
import CartItem from '../../models/cart-item';
import { ADD_TO_CART, REMOVE_FROM_CART } from '../actions/cart';
import Product from '../../models/product';
import { ADD_ORDER } from '../actions/orders';

const initialState: ICartState = {
  items: {},
  totalAmount: 0
};

export default (
  state: ICartState = initialState,
  action: IAction
): ICartState => {
  let newState: ICartState;

  switch (action.type) {
    case ADD_TO_CART:
      const addedProduct: Product = action.payload;
      const productPrice = addedProduct.price;
      const productTitle = addedProduct.title;
      let updatedOrNewCartItem: CartItem;

      if (state.items[addedProduct.id]) {
        updatedOrNewCartItem = new CartItem(
          addedProduct.id,
          state.items[addedProduct.id].quantity + 1,
          productPrice,
          productTitle,
          state.items[addedProduct.id].sum + productPrice
        );
      } else {
        updatedOrNewCartItem = new CartItem(
          addedProduct.id,
          1,
          productPrice,
          productTitle,
          productPrice
        );
      }

      newState = {
        ...state,
        items: { ...state.items, [addedProduct.id]: updatedOrNewCartItem },
        totalAmount: state.totalAmount + productPrice
      };

      break;
    case REMOVE_FROM_CART:
      const selectedCartItem: CartItem = state.items[action.payload];
      const currentQty = selectedCartItem.quantity;
      let updatedCartItems: any;

      if (currentQty > 1) {
        const updatedCartItem = new CartItem(
          selectedCartItem.productId,
          selectedCartItem.quantity - 1,
          selectedCartItem.productPrice,
          selectedCartItem.productTitle,
          selectedCartItem.sum - selectedCartItem.productPrice
        );
        updatedCartItems = {
          ...state.items,
          [action.payload]: updatedCartItem
        };
      } else {
        updatedCartItems = { ...state.items };
        delete updatedCartItems[action.payload];
      }

      newState = {
        ...state,
        items: updatedCartItems,
        totalAmount: state.totalAmount - selectedCartItem.productPrice
      };
      break;
      case ADD_ORDER:
        newState = initialState;
        break;
    default:
      newState = state;
  }

  return newState;
};
