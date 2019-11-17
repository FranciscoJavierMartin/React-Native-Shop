import { IAction } from '../../interfaces/actions';
import { ThunkDispatch, ThunkAction } from 'redux-thunk';
import { BASE_URL } from '../../constants/network';
import Product from '../../models/product';

export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const CREATE_PRODUCT = 'CREATE_PRODUCT';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
export const SET_PRODUCTS = 'SET_PRODUCTS';

const fetchProducts = () => {
  return async (dispatch: any) => {
    try {
      const response = await fetch(BASE_URL);
      const resData = await response.json();

      if (!response.ok) {
        throw new Error('Something went wrong!');
      }

      const loadedProducts = [];

      for (const key in resData) {
        loadedProducts.push(
          new Product(
            key,
            'u1',
            resData[key].title,
            resData[key].imageUrl,
            resData[key].description,
            resData[key].price
          )
        );
      }

      dispatch({
        type: SET_PRODUCTS,
        payload: loadedProducts
      });
    } catch (error) {
      throw error;
    }
  };
};
const deleteProduct = (productId: string): any => {
  return async (dispatch: any) => {

    const response = await fetch(BASE_URL, {
      method: 'DELETE',
    });

    if(!response.ok){
      throw new Error('Something went wrong');
    }

    dispatch({
      type: DELETE_PRODUCT,
      payload: productId
    });
  };
};

const createProduct = (
  title: string,
  description: string,
  imageUrl: string,
  price: number
) => {
  return async (dispatch: any) => {
    const response = await fetch(BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title,
        description,
        imageUrl,
        price
      })
    });
    const resData = await response.json();

    dispatch({
      type: CREATE_PRODUCT,
      payload: {
        id: resData.name,
        title,
        description,
        imageUrl,
        price
      }
    });
  };
};

const updateProduct = (
  id: string,
  title: string,
  description: string,
  imageUrl: string,
  price: number
): any => {
  return async (dispatch: any) => {
    const response = await fetch(BASE_URL, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title,
        description,
        imageUrl
      })
    });

    if(!response.ok){
      throw new Error('Something went wrong');
    }

    dispatch({
      type: CREATE_PRODUCT,
      payload: {
        productId: id,
        productData: {
          title,
          description,
          imageUrl,
          price
        }
      }
    });
  };
};

export default {
  deleteProduct,
  createProduct,
  updateProduct,
  fetchProducts
};
