import React from 'react';
import { FlatList, Platform, Button, Alert, View, Text } from 'react-native';
import {
  NavigationStackScreenComponent,
  NavigationStackScreenProps
} from 'react-navigation-stack';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector, useDispatch } from 'react-redux';
import { IGlobalState } from '../../interfaces/state';
import Product from '../../models/product';
import ProductItem from '../../components/shop/ProductItem';
import HeaderButton from '../../components/ui/HeaderButton';
import Colors from '../../constants/Colors';
import productsActions from '../../store/actions/products';

interface IUserProductsScreenProps extends NavigationStackScreenProps {}

const UserProductsScreen: NavigationStackScreenComponent<
  any,
  IUserProductsScreenProps
> = (props: IUserProductsScreenProps) => {
  const userProducts = useSelector<IGlobalState, Product[]>(
    (state: IGlobalState) => state.products.userProducts
  );
  const dispatch = useDispatch();

  // FIXME: When add a new item and go to edit, the screen showed is Add instead of Edit
  const editProductHandler = (id: string) => {
    props.navigation.navigate('EditProducts', {
      productId: id
    });
  };

  const deleteHandler = (id: string) => {
    Alert.alert('Are you sure?', 'Do you really want to delete this item?', [
      { text: 'No', style: 'default' },
      {
        text: 'Yes',
        style: 'destructive',
        onPress: () => {
          dispatch(productsActions.deleteProduct(id));
        }
      }
    ]);
  };

  return userProducts.length === 0 ? (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>No products found</Text>
    </View>
  ) : (
    <FlatList
      data={userProducts}
      keyExtractor={(product: Product) => product.id}
      renderItem={({ item }) => (
        <ProductItem
          image={item.imageUrl}
          title={item.title}
          price={item.price}
          onSelect={() => {
            editProductHandler(item.id);
          }}
        >
          <Button
            title='Edit'
            onPress={() => {
              editProductHandler(item.id);
            }}
          />
          <Button
            color={Colors.primary}
            title='Delete'
            onPress={() => deleteHandler(item.id)}
          />
        </ProductItem>
      )}
    />
  );
};

UserProductsScreen.navigationOptions = (
  navigationData: NavigationStackScreenProps<any, IUserProductsScreenProps>
) => {
  return {
    headerTitle: 'Your products',
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
          title='Menu'
          iconName={Platform.OS === 'android' ? 'md-create' : 'ios-create'}
          onPress={() => {
            navigationData.navigation.navigate('EditProducts');
          }}
        />
      </HeaderButtons>
    )
  };
};

export default UserProductsScreen;
