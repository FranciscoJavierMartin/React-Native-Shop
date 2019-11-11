import React, { useState } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import CartItemComponent from './CartItem';
import Colors from '../../constants/Colors';
import CartItem from '../../models/cart-item';
import Card from '../ui/Card';

interface IOrderItemProps {
  amount: number;
  date: string;
  items: CartItem[];
}

const OrderItem = (props: IOrderItemProps) => {
  const [showDetails, setShowDetails] = useState<boolean>(false);

  return (
    <Card style={styles.orderItem}>
      <View style={styles.summary}>
        <Text style={styles.totalAmount}>${props.amount.toFixed(2)}</Text>
        <Text style={styles.date}>{props.date}</Text>
      </View>
      <Button
        color={Colors.primary}
        title={showDetails ? 'Hode details' : 'Show details'}
        onPress={() => {
          setShowDetails((prevState: boolean) => !prevState);
        }}
      />
      {showDetails && (
        <View style={styles.detailItems}>
          {props.items.map((cartItem: CartItem) => (
            <CartItemComponent
              key={cartItem.productId}
              quantity={cartItem.quantity}
              amount={cartItem.sum}
              title={cartItem.productTitle}
            />
          ))}
        </View>
      )}
    </Card>
  );
};

const styles = StyleSheet.create({
  orderItem: {
    margin: 20,
    padding: 10,
    alignItems: 'center'
  },
  summary: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 15
  },
  totalAmount: {
    fontFamily: 'open-sans-bold',
    fontSize: 16
  },
  date: {
    fontSize: 16,
    fontFamily: 'open-sans',
    color: '#888'
  },
  detailItems: {
    width: '100%',
  },
});

export default OrderItem;
