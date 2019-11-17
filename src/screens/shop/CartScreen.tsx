import React, { useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  Button,
  ActivityIndicator
} from 'react-native';
import {
  NavigationStackScreenProps,
  NavigationStackScreenComponent
} from 'react-navigation-stack';
import { useSelector, useDispatch } from 'react-redux';
import { ICartScreenParams } from '../../interfaces/params';
import { IGlobalState } from '../../interfaces/state';
import Colors from '../../constants/Colors';
import CartItemComponent from '../../components/shop/CartItem';
import Card from '../../components/ui/Card';
import cartActions from '../../store/actions/cart';
import orderActions from '../../store/actions/orders';
import CartItem from '../../models/cart-item';

interface ICartScreenProps
  extends NavigationStackScreenProps<ICartScreenParams> {}

const CartScreen: NavigationStackScreenComponent<
  ICartScreenParams,
  ICartScreenProps
> = (props: ICartScreenProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const cartTotalAmount = useSelector<IGlobalState, number>(
    (state: IGlobalState) => state.cart.totalAmount
  );

  const cartItems = useSelector<IGlobalState, CartItem[]>(
    (state: IGlobalState) =>
      Object.keys(state.cart.items)
        .map(
          (key: string) =>
            new CartItem(
              key,
              state.cart.items[key].quantity,
              state.cart.items[key].productPrice,
              state.cart.items[key].productTitle,
              state.cart.items[key].sum
            )
        )
        .sort((a, b) => (a.productId > b.productId ? 1 : -1))
  );

  const dispatch = useDispatch();

  const sendOrderHandler = async () => {
    setIsLoading(true);
    dispatch(orderActions.addOrder(cartItems, cartTotalAmount));
    setIsLoading(false);
  };

  return (
    <View style={styles.screen}>
      <Card style={styles.summary}>
        <Text style={styles.summaryText}>
          Total:{' '}
          <Text style={styles.amount}>
            ${(Math.round(cartTotalAmount * 100) / 100).toFixed(2)}
          </Text>
        </Text>
        {isLoading ? (
          <ActivityIndicator size='small' color={Colors.primary} />
        ) : (
          <Button
            title='Order now'
            onPress={sendOrderHandler}
            disabled={cartItems.length === 0}
          />
        )}
      </Card>
      <FlatList
        data={cartItems}
        keyExtractor={(item: CartItem) => item.productId}
        renderItem={({ item }) => (
          <CartItemComponent
            deletable
            quantity={item.quantity}
            title={item.productTitle}
            amount={item.sum}
            onRemove={() => dispatch(cartActions.removeToCart(item.productId))}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    margin: 20
  },
  summary: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    padding: 10
  },
  summaryText: {
    fontFamily: 'open-sans-bold',
    fontSize: 18
  },
  amount: {
    color: Colors.accent
  }
});

export default CartScreen;
