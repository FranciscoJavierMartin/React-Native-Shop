import React, { useReducer, useCallback, useState, useEffect } from 'react';
import {
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Button,
  View,
  ActivityIndicator,
  Alert
} from 'react-native';
import {
  NavigationStackScreenComponent,
  NavigationStackScreenProps
} from 'react-navigation-stack';
import { LinearGradient } from 'expo-linear-gradient';
import { useDispatch } from 'react-redux';
import Input from '../../components/ui/Input';
import Card from '../../components/ui/Card';
import Colors from '../../constants/Colors';
import authActions from '../../store/actions/auth';
import { formReducer, FORM_INPUT_UPDATE } from '../../utils/forms';
import { IInputState } from '../../interfaces/state';
import { IInputAction } from '../../interfaces/actions';

interface IAuthScreenProps
  extends NavigationStackScreenProps<any, IAuthScreenProps> {}

const AuthScreen: NavigationStackScreenComponent<any, IAuthScreenProps> = (
  props: IAuthScreenProps
) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>();
  const [isSignup, setIsSignup] = useState<boolean>(false);
  const dispatch = useDispatch();

  const [formState, dispatchFormState] = useReducer<
    (state: IInputState, action: IInputAction) => IInputState
  >(formReducer, {
    inputValues: {
      email: '',
      password: ''
    },
    inputValidities: {
      email: false,
      password: false
    },
    formIsValid: false
  });

  useEffect(() => {
    if (error) {
      Alert.alert('An error occured', error, [{ text: 'Okay' }]);
    }
  }, [error]);

  const authHandler = async () => {
    let action: any;

    if (isSignup) {
      action = authActions.signup(
        formState.inputValues.email,
        formState.inputValues.password
      );
    } else {
      action = authActions.login(
        formState.inputValues.email,
        formState.inputValues.password
      );
    }

    setError(null);
    setIsLoading(true);

    try {
      await dispatch(action);
      props.navigation.navigate('Shop');
    } catch (error) {
      setError(error);
    }

    setIsLoading(false);
  };

  const inputChangeHandler = useCallback(
    (
      inputIdentifier: string,
      inputValue: string,
      inputValidity: boolean
    ): void => {
      dispatchFormState({
        type: FORM_INPUT_UPDATE,
        value: inputValue,
        isValid: inputValidity,
        input: inputIdentifier
      });
    },
    [dispatchFormState]
  );

  return (
    <KeyboardAvoidingView
      behavior='padding'
      keyboardVerticalOffset={50}
      style={styles.screen}
    >
      <LinearGradient colors={['#ffedff', '#ffe3ff']} style={styles.gradient}>
        <Card style={styles.authContainer}>
          <ScrollView>
            <Input
              id='email'
              label='E-mail'
              keyboardType='email-address'
              required
              isEmail
              autoCapitalize='none'
              errorText='Please enter a valid email address'
              onInputChange={inputChangeHandler}
              initialValue=''
            />
            <Input
              id='password'
              label='Password'
              keyboardType='default'
              secureTextEntry
              minLength={5}
              required
              autoCapitalize='none'
              errorText='Please enter a valid password'
              onInputChange={inputChangeHandler}
              initialValue=''
            />
            <View style={styles.buttonContainer}>
              {isLoading ? (
                <ActivityIndicator size='small' color={Colors.primary} />
              ) : (
                <Button
                  title={isSignup ? 'Sign Up' : 'Login'}
                  color={Colors.primary}
                  onPress={authHandler}
                />
              )}
            </View>
            <View style={styles.buttonContainer}>
              <Button
                title={`Switch to ${isSignup ? 'Login' : 'Sign up'}`}
                color={Colors.accent}
                onPress={() => {
                  setIsSignup((prevState: boolean) => !prevState);
                }}
              />
            </View>
          </ScrollView>
        </Card>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
};

AuthScreen.navigationOptions = {
  headerTitle: 'Authenticate'
};

const styles = StyleSheet.create({
  screen: {
    flex: 1
  },
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  authContainer: {
    width: '80%',
    maxWidth: 400,
    maxHeight: 400,
    padding: 20
  },
  buttonContainer: {
    marginTop: 10
  }
});

export default AuthScreen;
