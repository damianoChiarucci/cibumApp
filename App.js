import React from 'react';
import { Text, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { createBottomTabNavigator } from 'react-navigation';
import Home from './pagine/home-nav';
import Contatti from './pagine/contatti';
import Ricette from './pagine/ricette-nav';
import ChiSiamo from './pagine/chi-siamo';
import Gallery from './pagine/gallery';

const Tab = createBottomTabNavigator(
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
            style={{ color: tintColor  }}
          />
        ),
      },
    },
    Ricette: {
      screen: Ricette,
      path: 'ricette/:dettaglio',
      navigationOptions: {
        tabBarLabel: 'Ricette',
        tabBarIcon: ({ tintColor, focused }) => (
          <Ionicons
            name={focused ? 'ios-restaurant' : 'ios-restaurant-outline'}
            size={26}
            style={{ color: tintColor }}
          />
        ),
      },
    },

    Gallery: {
      screen: Gallery,
      path: '/gallery',
      navigationOptions: {
        tabBarLabel: 'Gallery',
        tabBarIcon: ({ tintColor, focused }) => (
          <Ionicons
            name={focused ? 'ios-aperture' : 'ios-aperture-outline'}
            size={26}
            style={{ color: tintColor }}
          />
        ),
      },
    },

    Contatti: {
      screen: Contatti,
      path: '/contatti',
      navigationOptions: {
        tabBarLabel: 'Contatti',
        tabBarIcon: ({ tintColor, focused }) => (
          <Ionicons
            name={focused ? 'ios-contacts' : 'ios-contacts-outline'}
            size={26}
            style={{ color: tintColor }}
          />
        ),
      },
    }
  },
  {
      tabBarOptions: {
        activeTintColor: '#e43636',
        inactiveTintColor: 'gray',
        showLabel:true,
        style: {
          //backgroundColor: 'blue',
        },
      },
   
  },



);


export default Tab;