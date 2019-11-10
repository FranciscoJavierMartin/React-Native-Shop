import React from 'react';
import { Text, View, StyleSheet, FlatList, Button } from 'react-native';
import {
  NavigationStackScreenProps,
  NavigationStackScreenComponent
} from 'react-navigation-stack';
import { useSelector, useDispatch } from 'react-redux';
import { ICartScreenParams } from '../../interfaces/params';
import { IGlobalState } from '../../interfaces/state';
import Colors from '../../constants/Colors';
import CartItem from '../../models/cart-item';
import CartItemComponent from '../../components/shop/CartItem';
import cartActions from '../../store/actions/cart';

interface ICartScreenProps
  extends NavigationStackScreenProps<ICartScreenParams> {}

const CartScreen: NavigationStackScreenComponent<
  ICartScreenParams,
  ICartScreenProps
> = (props: ICartScreenProps) => {
  const cartTotalAmount = useSelector<IGlobalState, number>(
    (state: IGlobalState) => state.cart.totalAmount
  );
  const cartItems = useSelector<IGlobalState, any>((state: IGlobalState) =>
    Object.keys(state.cart.items).map(
      (key: string) =>
       ({
          productId: key,
          quantity: state.cart.items[key].quantity,
          productPrice: state.cart.items[key].productPrice,
          productTitle: state.cart.items[key].productTitle,
          sum: state.cart.items[key].sum
        })
    ).sort((a, b) => a.productId > b.productId ? 1 : -1)
  );

  const dispatch = useDispatch();

  return (
    <View style={styles.screen}>
      <View style={styles.summary}>
        <Text style={styles.summaryText}>
          Total:{' '}
          <Text style={styles.amount}>${cartTotalAmount.toFixed(2)}</Text>
        </Text>
        <Button
          title='Order now'
          onPress={() => {}}
          disabled={cartItems.length === 0}
        />
      </View>
      <FlatList
        data={cartItems}
        keyExtractor={(item: any) => item.productId}
        renderItem={({ item }) => (
          <CartItemComponent
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
    padding: 10,
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: 'white'
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
