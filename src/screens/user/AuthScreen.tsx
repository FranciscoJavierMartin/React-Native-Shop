import React from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';
import {
  NavigationStackScreenComponent,
  NavigationStackScreenProps
} from 'react-navigation-stack';

interface IAuthScreenProps extends NavigationStackScreenProps{

}

const AuthScreen: NavigationStackScreenComponent<any, IAuthScreenProps> = (props:IAuthScreenProps) => {

};

const styles = StyleSheet.create({});

export default AuthScreen;