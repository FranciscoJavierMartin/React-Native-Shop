import React, { useState } from 'react';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import productsReducer from './src/store/reducers/products';
import cartReducer from './src/store/reducers/cart';
import { IGlobalState } from './src/interfaces/state';
import ShopNavigator from './src/navigation/ShopNavigator';
import { composeWithDevTools } from 'redux-devtools-extension';

const rootReducer = combineReducers<IGlobalState>({
  products: productsReducer,
  cart: cartReducer,
});

const store = createStore(rootReducer, composeWithDevTools());

const fetchFonts = () =>
  Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
  });

export default function App() {
  const [fontLoaded, setFontLoaded] = useState<boolean>(false);
  return fontLoaded ? (
    <Provider store={store}>
      <ShopNavigator />
    </Provider>
  ) : (
    <AppLoading startAsync={fetchFonts} onFinish={() => setFontLoaded(true)} />
  );
}
