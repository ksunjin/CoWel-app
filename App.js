import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import MainScreen from './Components/MainScreen';
import LoadingScreen from './Components/LoadingScreen';
import WelfareScreen from './Components/WelfareScreen';
import LoginScreen from './Components/LoginScreen';
import PersonalSearchTab from './Components/AppTabNavigator/PersonalSearchTab';
import MyPageTab from './Components/AppTabNavigator/MyPageTab';

import Ionicons from 'react-native-vector-icons/Ionicons';
import Login from './Components/LoginScreen';

const MainStack = createStackNavigator({
  MainScreen
},
  {
    defaultNavigationOptions: ({ navigation }) => ({
      title: 'Main'
    }),
  }
);

const SearchStack = createStackNavigator({
  PersonalSearchTab
},
  {
    defaultNavigationOptions: ({ navigation }) => ({
      title: 'PersonalSearch'
    }),
  }
);

const MyPageStack = createStackNavigator({
  MyPageTab
},
  {
    defaultNavigationOptions: ({ navigation }) => ({
      title: 'MyPage'
    }),
  }
);

const WelfareStack = createStackNavigator({
  WelfareScreen
},
  {
    defaultNavigationOptions: ({ navigation }) => ({
      title: 'Welfare'
    }),
  }
);

const BottomTab = createBottomTabNavigator({
  Main: MainStack,
  Welfare: WelfareStack,
  PersonalSearch: SearchStack,
  MyPage: MyPageStack,

}, {
  defaultNavigationOptions: ({ navigation }) => ({
    tabBarIcon: ({ focused, tintColor }) => {
      const { routeName } = navigation.state;
      let IconComponent = Ionicons;
      let iconName;
      if (routeName === 'Main') {
        iconName = focused ? 'md-home' : 'md-home';
      }
      else if (routeName === 'Welfare') {
        iconName = focused ? 'md-heart' : 'md-heart';
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

const AppStack = createStackNavigator({
  LoadingScreen: LoadingScreen,
  'Login': LoginScreen,
  BottomTab: {
    screen: BottomTab,
    navigationOptions: ({ navigation }) => ({
      header: null,
    }),
  },
}
);

export default createAppContainer(AppStack);
/*

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
},
  {
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

export default class App extends Component {
  render() {
    return <Root><AppContainer /></Root>
  }
}
*/