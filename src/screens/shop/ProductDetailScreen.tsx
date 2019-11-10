import React from 'react';
import {
  Text,
  Image,
  Button,
  StyleSheet,
  ScrollView
} from 'react-native';
import {
  NavigationStackScreenComponent,
  NavigationStackScreenProps
} from 'react-navigation-stack';
import { useSelector, useDispatch } from 'react-redux';
import { IGlobalState } from '../../interfaces/state';
import Product from '../../models/product';
import Colors from '../../constants/Colors';
import cartActions from '../../store/actions/cart';
import { IProductDetailScreenParams } from '../../interfaces/params';

interface IProductDetailScreenProps
  extends NavigationStackScreenProps<IProductDetailScreenParams> {}

const ProductDetailScreen: NavigationStackScreenComponent<
  IProductDetailScreenParams,
  IProductDetailScreenProps
> = (props: IProductDetailScreenProps) => {
  const dispatch = useDispatch();
  const productId = props.navigation.getParam('productId');
  const selectedProduct = useSelector<IGlobalState, Product>(
    (state: IGlobalState) =>
      state.products.availableProducts.find(
        (prod: Product) => prod.id === productId
      )
  );
  return (
    <ScrollView>
      <Image style={styles.image} source={{ uri: selectedProduct.imageUrl }} />
      <Button
        color={Colors.primary}
        title='Add to cart'
        onPress={() => {
          dispatch(cartActions.addToCart(selectedProduct));
        }}
      />
      <Text style={styles.price}>${selectedProduct.price.toFixed(2)}</Text>
      <Text style={styles.description}>{selectedProduct.description}</Text>
    </ScrollView>
  );
};

ProductDetailScreen.navigationOptions = (
  navigationData: NavigationStackScreenProps<
    IProductDetailScreenParams,
    IProductDetailScreenProps
  >
) => {
  return {
    headerTitle: navigationData.navigation.getParam('productTitle')
  };
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 300
  },
  actions: {
    marginVertical: 10,
    alignItems: 'center'
  },
  price: {
    fontSize: 20,
    color: '#888',
    textAlign: 'center',
    marginVertical: 20,
    fontFamily: 'open-sans-bold'
  },
  description: {
    fontSize: 14,
    textAlign: 'center',
    marginHorizontal: 20,
    fontFamily: 'open-sans'
  }
});

export default ProductDetailScreen;
