import React from 'react';
import { FlatList, Platform } from 'react-native';
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

interface IProductsOverviewScreenProps extends NavigationStackScreenProps {}

const ProductsOverviewScreen: NavigationStackScreenComponent<any, IProductsOverviewScreenProps> = (
  props: IProductsOverviewScreenProps
) => {
  const products = useSelector(
    (state: IGlobalState) => state.products.availableProducts
  );
  const dispatch = useDispatch();
  return (
    <FlatList
      keyExtractor={(item: Product) => item.id}
      data={products}
      renderItem={({ item }) => (
        <ProductItem
          image={item.imageUrl}
          title={item.title}
          price={item.price}
          onAddToCart={() => {
            dispatch(cartActions.addToCart(item));
          }}
          onViewDetail={() => {
            props.navigation.navigate('ProductDetail', {
              productId: item.id,
              productTitle: item.title
            });
          }}
        />
      )}
    />
  );
};

ProductsOverviewScreen.navigationOptions =(
  navigationData: NavigationStackScreenProps<
    any,
    IProductsOverviewScreenProps
  >
) => { return {
  headerTitle: 'All products',
  headerRight: (
    <HeaderButtons HeaderButtonComponent={HeaderButton}>
      <Item
        title='Cart'
        iconName={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
        onPress={() => { navigationData.navigation.navigate('Cart')}}
      />
    </HeaderButtons>
  )
};}

export default ProductsOverviewScreen;
