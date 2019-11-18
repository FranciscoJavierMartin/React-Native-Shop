import React, { useEffect, useCallback, useReducer, useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Platform,
  KeyboardAvoidingView,
  ActivityIndicator,
  Alert
} from 'react-native';
import {
  NavigationStackScreenComponent,
  NavigationStackScreenProps
} from 'react-navigation-stack';
import { useSelector, useDispatch } from 'react-redux';
import { IEditProductsScreenParams } from '../../interfaces/params';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../../components/ui/HeaderButton';
import { IGlobalState, IInputState } from '../../interfaces/state';
import Product from '../../models/product';
import productsActions from '../../store/actions/products';
import Input from '../../components/ui/Input';
import Colors from '../../constants/Colors';
import { IInputAction } from '../../interfaces/actions';
import { formReducer, FORM_INPUT_UPDATE } from '../../utils/forms';

interface IEditProductsScreenProps
  extends NavigationStackScreenProps<
    IEditProductsScreenParams,
    IEditProductsScreenProps
  > {}

const EditProductsScreen: NavigationStackScreenComponent<
  IEditProductsScreenParams,
  IEditProductsScreenProps
> = (props: IEditProductsScreenProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState();
  const dispatch = useDispatch();
  const productId = props.navigation.getParam('productId');

  const editedProduct = useSelector<IGlobalState, Product>(
    (state: IGlobalState) =>
      state.products.userProducts.find(
        (product: Product) => (product.id = productId)
      )
  );

  const [formState, dispatchFormState] = useReducer<
    (state: IInputState, action: IInputAction) => IInputState
  >(formReducer, {
    inputValues: {
      title: editedProduct ? editedProduct.title : '',
      imageUrl: editedProduct ? editedProduct.imageUrl : '',
      description: editedProduct ? editedProduct.description : '',
      price: editedProduct ? editedProduct.price.toString() : ''
    },
    inputValidities: {
      title: editedProduct ? true : false,
      imageUrl: editedProduct ? true : false,
      description: editedProduct ? true : false,
      price: editedProduct ? true : false
    },
    formIsValid: editedProduct ? true : false
  });

  useEffect(() => {
    if (error) {
      Alert.alert('An error occurred', error, [{ text: 'Okay' }]);
    }
  }, [error]);

  const submitHandler = useCallback(async () => {
    setError(null);
    setIsLoading(true);
    if (formState.formIsValid) {
      try {
        if (editedProduct) {
          await dispatch(
            productsActions.updateProduct(
              productId,
              formState.inputValues.title,
              formState.inputValues.description,
              formState.inputValues.imageUrl,
              +formState.inputValues.price
            )
          ).then();
        } else {
          await dispatch(
            productsActions.createProduct(
              formState.inputValues.title,
              formState.inputValues.description,
              formState.inputValues.imageUrl,
              +formState.inputValues.price
            )
          );
        }

        props.navigation.goBack();
      } catch (error) {
        setError(error);
      }

      setIsLoading(false);
    }
  }, [dispatch, productId, formState]);

  useEffect(() => {
    props.navigation.setParams({ submit: submitHandler });
  }, [submitHandler]);

  const inputChangeHandler = useCallback(
    (inputIdentifier: string, inputValue: string, inputValidity: boolean): void => {
      dispatchFormState({
        type: FORM_INPUT_UPDATE,
        value: inputValue,
        isValid: inputValidity,
        input: inputIdentifier
      });
    },
    [dispatchFormState]
  );

  return isLoading ? (
    <View style={styles.centered}>
      <ActivityIndicator size='large' color={Colors.primary} />
    </View>
  ) : (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior='padding'
      keyboardVerticalOffset={100}
    >
      <ScrollView>
        <View style={styles.form}>
          <Input
            id='title'
            label='Title'
            errorText='Enter a valid title'
            onInputChange={inputChangeHandler}
            returnKeyType='next'
            initialValue={editedProduct ? editedProduct.title : ''}
            initiallyValid={!!editedProduct}
            required
          />
          <Input
            id='imageUrl'
            label='Image Url'
            errorText='Please enter a valid image url!'
            keyboardType='default'
            returnKeyType='next'
            onInputChange={inputChangeHandler}
            initialValue={editedProduct ? editedProduct.imageUrl : ''}
            initiallyValid={!!editedProduct}
            required
          />
          {editedProduct ? null : (
            <Input
              id='price'
              label='Price'
              errorText='Please enter a valid price!'
              keyboardType='decimal-pad'
              returnKeyType='next'
              onInputChange={inputChangeHandler}
              required
              min={0.1}
            />
          )}
          <Input
            id='description'
            label='Description'
            errorText='Please enter a valid description!'
            keyboardType='default'
            autoCapitalize='sentences'
            autoCorrect
            multiline
            numberOfLines={3}
            onInputChange={inputChangeHandler}
            initialValue={editedProduct ? editedProduct.description : ''}
            initiallyValid={!!editedProduct}
            required
            minLength={5}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
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
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default EditProductsScreen;
