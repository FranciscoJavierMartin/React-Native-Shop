import CartItem from "./cart-item";
import moment from 'moment'

class Order{
  constructor(
    public id: string,
    public items: CartItem[],
    public totalAmount: number,
    public date: Date
  ){}

  get readableDate(): string {
    return moment(this.date).format('MMMM Do YYYY, hh:mm');
  }
}

export default Order;