import React, { useEffect, useState } from 'react';
import {
  FlatList,
  StyleSheet,
  Platform,
  View,
  ActivityIndicator
} from 'react-native';
import {
  NavigationStackScreenProps,
  NavigationStackScreenComponent
} from 'react-navigation-stack';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector, useDispatch } from 'react-redux';
import HeaderButton from '../../components/ui/HeaderButton';
import { IGlobalState } from '../../interfaces/state';
import Order from '../../models/order';
import OrderItem from '../../components/shop/OrderItem';
import ordersActions from '../../store/actions/orders';
import Colors from '../../constants/Colors';

interface IOrdersScreenProps extends NavigationStackScreenProps {}

const OrdersScreen: NavigationStackScreenComponent<any, IOrdersScreenProps> = (
  props: IOrdersScreenProps
) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const orders = useSelector<IGlobalState, Order[]>(
    (state: IGlobalState) => state.orders.orders
  );
  const dispatch = useDispatch();

  useEffect(() => {
    setIsLoading(true);
    dispatch(ordersActions.fetchOrders()).finally(() => {
      setIsLoading(false);
    });
  }, [dispatch]);

  return isLoading ? (
    <View style={styles.centered}>
      <ActivityIndicator size='large' color={Colors.primary} />
    </View>
  ) : (
    <FlatList
      data={orders}
      keyExtractor={(item: Order) => item.id}
      renderItem={({ item }) => (
        <OrderItem
          amount={item.totalAmount}
          date={item.readableDate}
          items={item.items}
        />
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

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default OrdersScreen;
