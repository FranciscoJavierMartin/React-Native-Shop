import React from 'react';
import { FlatList, Platform, Button } from 'react-native';
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
import Colors from '../../constants/Colors';

interface IProductsOverviewScreenProps extends NavigationStackScreenProps {}

const ProductsOverviewScreen: NavigationStackScreenComponent<
  any,
  IProductsOverviewScreenProps
> = (props: IProductsOverviewScreenProps) => {
  const products = useSelector(
    (state: IGlobalState) => state.products.availableProducts
  );
  const dispatch = useDispatch();
  const selectItemHandler = (id: string, title: string) => {
    props.navigation.navigate('ProductDetail', {
      productId: id,
      productTitle: title
    });
  };

  return (
    <FlatList
      keyExtractor={(item: Product) => item.id}
      data={products}
      renderItem={({ item }) => (
        <ProductItem
          image={item.imageUrl}
          title={item.title}
          price={item.price}
          onSelect={() => {
            selectItemHandler(item.id, item.title);
          }}>
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

export default ProductsOverviewScreen;
