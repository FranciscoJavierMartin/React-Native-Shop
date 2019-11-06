import Product from "../models/product";

export default interface IState {
  availableProducts: Product[],
  userProducts: Product[],
}