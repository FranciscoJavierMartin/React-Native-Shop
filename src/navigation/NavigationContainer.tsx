import React, { useEffect, useRef } from 'react';
import { NavigationActions } from 'react-navigation';
import { useSelector } from 'react-redux';
import ShopNavigator from './ShopNavigator';
import { IGlobalState } from '../interfaces/state';

const NavigationContainer = (props: any) => {
  const navRef = useRef();
  const isAuth = useSelector<IGlobalState, boolean>(
    (state: IGlobalState) => !!state.auth.token
  );

  useEffect(() => {
    if (!isAuth) {
      navRef.current.dispatch(
        NavigationActions.navigate({
          routeName: 'Auth'
        })
      );
    }
  }, [isAuth]);

  return <ShopNavigator ref={navRef} />;
};

export default NavigationContainer;
