import React, { useEffect } from 'react';
import {
  View,
  ActivityIndicator,
  StyleSheet,
  AsyncStorage
} from 'react-native';
import {
  NavigationStackScreenProps,
  NavigationStackScreenComponent
} from 'react-navigation-stack';
import AuthActions from '../store/actions/auth';
import Colors from '../constants/Colors';
import { USER_DATA } from '../store/actions/auth';
import { useDispatch } from 'react-redux';

interface IStartupScreenProps
  extends NavigationStackScreenProps<any, IStartupScreenProps> {}

const StartupScreen: NavigationStackScreenComponent<
  any,
  IStartupScreenProps
> = (props: IStartupScreenProps) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const tryLogin = async () => {
      const userData = await AsyncStorage.getItem(USER_DATA);
      if (!userData) {
        props.navigation.navigate('Auth');
      } else {
        const transformedData = JSON.parse(userData);
        const { token, userId } = transformedData;
        const expirationDate = new Date(transformedData.expirationDate);

        if (expirationDate <= new Date() || !token || !userId) {
          props.navigation.navigate('Auth');
        } else {
          const expirationTime =
            expirationDate.getTime() - new Date().getTime();
          props.navigation.navigate('Shop');
          dispatch(AuthActions.authenticate(userId, token, expirationTime));
        }
      }
    };

    tryLogin();
  }, [dispatch]);

  return (
    <View style={styles.screen}>
      <ActivityIndicator size='large' color={Colors.primary} />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default StartupScreen;
