import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  Platform
} from 'react-native';
import {
  NavigationStackScreenComponent,
  NavigationStackScreenProps
} from 'react-navigation-stack';
import { useSelector, useDispatch } from 'react-redux';
import { IEditProductsScreenParams } from '../../interfaces/params';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../../components/ui/HeaderButton';
import { IGlobalState } from '../../interfaces/state';
import Product from '../../models/product';
import productsActions from '../../store/actions/products';

interface IEditProductsScreenProps
  extends NavigationStackScreenProps<
    IEditProductsScreenParams,
    IEditProductsScreenProps
  > {}

const EditProductsScreen: NavigationStackScreenComponent<
  IEditProductsScreenParams,
  IEditProductsScreenProps
> = (props: IEditProductsScreenProps) => {
  const dispatch = useDispatch();
  const productId = props.navigation.getParam('productId');
  console.log({ productId });
  const editedProduct = useSelector<IGlobalState, Product>(
    (state: IGlobalState) =>
      state.products.userProducts.find(
        (product: Product) => (product.id = productId)
      )
  );
  console.log({ editedProduct });

  const [title, setTitle] = useState<string>(
    editedProduct ? editedProduct.title : ''
  );
  const [imageUrl, setImageUrl] = useState<string>(
    editedProduct ? editedProduct.imageUrl : ''
  );
  // TODO: Research if there is another way to use number instead of string
  const [price, setPrice] = useState<string>(
    editedProduct ? editedProduct.price.toString() : ''
  );
  const [description, setDescription] = useState<string>(
    editedProduct ? editedProduct.description : ''
  );

  const submitHandler = useCallback(() => {
    if (editedProduct) {
      dispatch(
        productsActions.updateProduct(
          productId,
          title,
          description,
          imageUrl,
          +price
        )
      );
    } else {
      dispatch(
        productsActions.createProduct(title, description, imageUrl, +price)
      );
    }
    props.navigation.goBack();
  }, [dispatch, productId, title, description, imageUrl, price]);

  useEffect(() => {
    props.navigation.setParams({ submit: submitHandler });
  }, [submitHandler]);

  return (
    <ScrollView>
      <View style={styles.form}>
        <View style={styles.formControl}>
          <Text style={styles.label}>Title</Text>
          <TextInput
            style={styles.input}
            value={title}
            onChangeText={(text: string) => setTitle(text)}
          />
        </View>
        <View style={styles.formControl}>
          <Text style={styles.label}>Image URL</Text>
          <TextInput
            style={styles.input}
            value={imageUrl}
            onChangeText={(text: string) => setImageUrl(text)}
          />
        </View>
        {editedProduct ? null : (
          <View style={styles.formControl}>
            <Text style={styles.label}>Price</Text>
            <TextInput
              style={styles.input}
              value={price}
              onChangeText={(text: string) => setPrice(text)}
            />
          </View>
        )}
        <View style={styles.formControl}>
          <Text style={styles.label}>Description</Text>
          <TextInput
            style={styles.input}
            value={description}
            onChangeText={(text: string) => setDescription(text)}
          />
        </View>
      </View>
    </ScrollView>
  );
};

EditProductsScreen.navigationOptions = (
  navigationData: NavigationStackScreenProps<
    IEditProductsScreenParams,
    IEditProductsScreenProps
  >
) => {
  const submitFn = navigationData.navigation.getParam('submit');
  return {
    headerTitle: navigationData.navigation.getParam('productId')
      ? 'Edit product'
      : 'Add product',
    headerRight: (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title='Save'
          iconName={
            Platform.OS === 'android' ? 'md-checkmark' : 'ios-checkmark'
          }
          onPress={submitFn}
        />
      </HeaderButtons>
    )
  };
};

const styles = StyleSheet.create({
  form: {
    margin: 20
  },
  formControl: {
    width: '100%'
  },
  label: {
    fontFamily: 'open-sans-bold',
    marginVertical: 8
  },
  input: {
    paddingHorizontal: 2,
    paddingVertical: 5,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1
  }
});

export default EditProductsScreen;
