import React from 'react';
import { FlatList, StyleSheet} from 'react-native';
import {
  NavigationStackScreenProps,
  NavigationStackScreenComponent
} from 'react-navigation-stack';
import { useSelector } from 'react-redux';
import { IGlobalState } from '../../interfaces/state';
import Order from '../../models/order';

interface IOrdersScreenProps extends NavigationStackScreenProps{}

const OrdersScreen : NavigationStackScreenComponent<any, IOrdersScreenProps> = (props:IOrdersScreenProps) => {
  const orders = useSelector<IGlobalState, Order[]>((state: IGlobalState) => state.orders.orders);

  return <FlatList/>
};

const styles = StyleSheet.create({

});

export default OrdersScreen;