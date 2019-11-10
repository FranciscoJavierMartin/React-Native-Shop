import CartItem from "./cart-item";

class Order{
  constructor(
    public id: string,
    public items: CartItem[],
    public totalAmount: number,
    public date: Date
  ){}
}

export default Order;