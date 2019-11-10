class CartItem {
  constructor(
    public productId: string,
    public quantity: number,
    public productPrice: number,
    public productTitle: string,
    public sum: number
  ){}
}

export default CartItem;