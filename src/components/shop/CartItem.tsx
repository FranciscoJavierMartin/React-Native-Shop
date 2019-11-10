import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Platform
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface ICartItemProps {
  onRemove: () => void;
  title: string;
  quantity: number;
  amount: number;
}

const CartItem = (props: ICartItemProps) => {
  return (
    <View style={styles.cartItem}>
      <Text style={styles.itemData}>
        <Text style={styles.quantity}>{props.quantity}</Text> 
        <Text style={styles.title}>{props.title}</Text>
      </Text>
      <View style={styles.itemData}>
        <Text style={styles.amount}>${props.amount.toFixed(2)}</Text>
        <TouchableOpacity onPress={props.onRemove} style={styles.deleteButton}>
          <Ionicons
            name={Platform.OS === 'android' ? 'md-trash' : 'ios-trash'}
            size={23}
            color='red'
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cartItem: {
    padding: 10,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20
  },
  itemData: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 15,
  },
  quantity: {
    fontFamily: 'open-sans',
    color: '#888',
    fontSize: 16
  },
  amount: {
    fontFamily: 'open-sans-bold',
    fontSize: 16
  },
  title: {
    fontFamily: 'open-sans-bold',
    fontSize: 16
  },
  deleteButton: {
    marginLeft: 20
  }
});

export default CartItem;
