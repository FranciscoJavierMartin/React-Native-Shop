export interface IProductDetailScreenParams {
  productId: string;
  productTitle: string;
}

export interface ICartScreenParams {

}

export interface IEditProductsScreenParams {
  productId: string;
  submit: () => void;
}