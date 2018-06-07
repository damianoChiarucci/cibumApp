import React from 'react';
import { Text, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { createBottomTabNavigator } from 'react-navigation';
import Home from './pagine/home';
import Contatti from './pagine/contatti';
import Ricette from './pagine/ricette-nav';
import ChiSiamo from './pagine/chi-siamo';
import Gallery from './pagine/gallery';


const Nav = createBottomTabNavigator({
    Home : Home,
    ChiSiamo: ChiSiamo,
    Gallery: Gallery,
    Ricette: Ricette,
    Contatti: Contatti,
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === 'ChiSiamo') {
          iconName = `face`;
        } else if (routeName === 'Contatti') {
          iconName = `contacts`;
        } else if (routeName === 'Gallery') {
          iconName = `photo-library`;
        } else if (routeName === 'Ricette') {
          iconName = `local-dining`;
        }
        // You can return any component that you like here! We usually use an
        // icon component from react-native-vector-icons
        return <Icon name={iconName} size={25} color={tintColor} />;
      },
    }),

    tabBarOptions: {
      activeTintColor: '#e43636',
      inactiveTintColor: 'gray',
    },
  }
);

const StacksInTabs = createBottomTabNavigator(
  {
    Home: {
      screen: Home,
      path: '/',
      navigationOptions: {
        tabBarLabel: 'Home',
        tabBarIcon: ({ tintColor, focused }) => (
          <Ionicons
            name={focused ? 'ios-home' : 'ios-home-outline'}
            size={26}
            style={{ color: tintColor }}
          />
        ),
      },
    },
    Ricette: {
      screen: Ricette,
      path: '/settings',
      navigationOptions: {
        tabBarLabel: 'Settings',
        tabBarIcon: ({ tintColor, focused }) => (
          <Ionicons
            name={focused ? 'ios-settings' : 'ios-settings-outline'}
            size={26}
            style={{ color: tintColor }}
          />
        ),
      },
    },
  },
  {
    tabBarOptions: {
      showLabel: false,
    },
  }
);


export default StacksInTabs;