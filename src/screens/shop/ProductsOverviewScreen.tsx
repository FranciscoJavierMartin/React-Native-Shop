import React, { useState, useEffect, useCallback } from 'react';
import {
  FlatList,
  Platform,
  Button,
  ActivityIndicator,
  View,
  StyleSheet,
  Text
} from 'react-native';
import {
  NavigationStackScreenComponent,
  NavigationStackScreenProps
} from 'react-navigation-stack';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import ProductItem from '../../components/shop/ProductItem';
import HeaderButton from '../../components/ui/HeaderButton';
import { IGlobalState } from '../../interfaces/state';
import Product from '../../models/product';
import cartActions from '../../store/actions/cart';
import productsActions from '../../store/actions/products';
import Colors from '../../constants/Colors';

interface IProductsOverviewScreenProps extends NavigationStackScreenProps {}

const ProductsOverviewScreen: NavigationStackScreenComponent<
  any,
  IProductsOverviewScreenProps
> = (props: IProductsOverviewScreenProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [error, setError] = useState<any>();
  const products = useSelector(
    (state: IGlobalState) => state.products.availableProducts
  );
  const dispatch = useDispatch();

  const loadProducts = useCallback(async () => {
    setError(null);
    setIsRefreshing(true);
    try {
      await dispatch({ type: productsActions.fetchProducts() });
    } catch (error) {
      setError(error.message);
    }
    setIsRefreshing(false);
  }, [dispatch, setIsLoading, setError]);

  useEffect(() => {
    setIsLoading(true);
    loadProducts().finally(() => setIsLoading(false));
  }, [dispatch]);

  useEffect(() => {
    const willFocusSub = props.navigation.addListener('willFocus', loadProducts);
    return() => {
      willFocusSub.remove();
    }
  }, [loadProducts]);

  const selectItemHandler = (id: string, title: string) => {
    props.navigation.navigate('ProductDetail', {
      productId: id,
      productTitle: title
    });
  };

  let content;

  if (error) {
    content = (
      <View style={styles.centered}>
        <Text>An error occurred</Text>
        <Button
          title='Try again'
          onPress={loadProducts}
          color={Colors.primary}
        />
      </View>
    );
  } else if (isLoading) {
    content = (
      <View style={styles.centered}>
        <ActivityIndicator size='large' color={Colors.primary} />
      </View>
    );
  } else if (!isLoading && products.length === 0) {
    content = (
      <View style={styles.centered}>
        <Text>No products found. Maybe start adding some!</Text>
      </View>
    );
  } else {
    content = (
      <FlatList
        onRefresh={loadProducts}
        refreshing={isRefreshing}
        keyExtractor={(item: Product) => item.id}
        data={products}
        renderItem={({ item }) => (
          <ProductItem
            image={item.imageUrl}
            title={item.title}
            price={item.price}
            onSelect={() => {
              selectItemHandler(item.id, item.title);
            }}
          >
            <Button
              color={Colors.primary}
              title='View details'
              onPress={() => {
                selectItemHandler(item.id, item.title);
              }}
            />
            <Button
              color={Colors.primary}
              title='To cart'
              onPress={() => {
                dispatch(cartActions.addToCart(item));
              }}
            />
          </ProductItem>
        )}
      />
    );
  }

  return content;
};

ProductsOverviewScreen.navigationOptions = (
  navigationData: NavigationStackScreenProps<any, IProductsOverviewScreenProps>
) => {
  return {
    headerTitle: 'All products',
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
    ),
    headerRight: (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title='Cart'
          iconName={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
          onPress={() => {
            navigationData.navigation.navigate('Cart');
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
    alignItems: 'center'
  }
});

export default ProductsOverviewScreen;
