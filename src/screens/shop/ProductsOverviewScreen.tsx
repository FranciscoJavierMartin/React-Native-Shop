import React from 'react';
import { FlatList, Text } from 'react-native';
import { useSelector } from 'react-redux';
import {IGlobalState, IProductState} from '../../interfaces/state';
import Product from '../../models/product';

interface IProductsOverviewScreenProps {}
const ProductsOverviewScreen = (props: IProductsOverviewScreenProps) => {
  const products = useSelector((state:IGlobalState) => state.products.availableProducts);
  return (
    <FlatList keyExtractor={(item: Product) => item.id} data={products} renderItem={({item}) => (<Text>{item.title}</Text>)}/>
  );
}

export default ProductsOverviewScreen;