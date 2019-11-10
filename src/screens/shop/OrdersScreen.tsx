import React from 'react';
import { FlatList, StyleSheet, Text, Platform } from 'react-native';
import {
  NavigationStackScreenProps,
  NavigationStackScreenComponent
} from 'react-navigation-stack';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector } from 'react-redux';
import HeaderButton from '../../components/ui/HeaderButton';
import { IGlobalState } from '../../interfaces/state';
import Order from '../../models/order';
import OrderItem from '../../components/shop/OrderItem';

interface IOrdersScreenProps extends NavigationStackScreenProps {}

const OrdersScreen: NavigationStackScreenComponent<any, IOrdersScreenProps> = (
  props: IOrdersScreenProps
) => {
  const orders = useSelector<IGlobalState, Order[]>(
    (state: IGlobalState) => state.orders.orders
  );

  return (
    <FlatList
      data={orders}
      keyExtractor={(item: Order) => item.id}
      renderItem={({ item }) => (
        <OrderItem amount={item.totalAmount} date={item.readableDate}  items={item.items}/>
      )}
    />
  );
};

OrdersScreen.navigationOptions = (
  navigationData: NavigationStackScreenProps<any, IOrdersScreenProps>
) => {
  return {
    headerTitle: 'Your orders',
    headerLeft: (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title='Menu'
          iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
          onPress={() => {
            navigationData.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    )
  };
};

const styles = StyleSheet.create({});

export default OrdersScreen;
