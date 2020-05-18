import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import MainScreen from './Components/MainScreen';
import LoadingScreen from './Components/LoadingScreen';
import SignUpScreen from './Components/SignUpScreen';
import LoginScreen from './Components/LoginScreen';
import PersonalSearchTab from './Components/AppTabNavigator/PersonalSearchTab';
import MyPageTab from './Components/AppTabNavigator/MyPageTab';

import Ionicons from 'react-native-vector-icons/Ionicons';



const AppStackNavigator = createStackNavigator({
  Loading: {
    screen: LoadingScreen
  },
  SignUp: {
    screen: SignUpScreen
  },
  Login: {
    screen: LoginScreen
  },
  Main: {
    screen: MainScreen
  },
},
  {
    initialRouteName: 'Loading'
  }
);

const App = createBottomTabNavigator({
  Main: { screen: MainScreen },
  PersonalSearch: { screen: PersonalSearchTab },
  MyPage: { screen: MyPageTab }
}, {
  defaultNavigationOptions: ({ navigation }) => ({
    tabBarIcon: ({ focused, tintColor }) => {
      const { routeName } = navigation.state;
      let IconComponent = Ionicons;
      let iconName;
      if (routeName === 'Main') {
        iconName = focused ? 'md-home' : 'md-home';
      }
      else if (routeName === 'PersonalSearch') {
        iconName = focused ? 'md-search' : 'md-search';
      }
      else if (routeName === 'MyPage') {
        iconName = focused ? 'md-person' : 'md-person';
      } return <IconComponent name={iconName} size={25} color={tintColor} />;
    },
  }),
  tabBarOptions: {
    activeTintColor: 'tomato',
    inactiveTintColor: 'gray',
  },
});

const AppContainer = createAppContainer(AppStackNavigator);

export default createAppContainer(AppContainer);