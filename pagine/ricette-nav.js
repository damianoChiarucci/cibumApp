import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {  createStackNavigator, NavigationActions } from 'react-navigation';
import Ricette from './ricette';
import DettaglioRicetta from './dettaglio-ricetta';
import Home from './home';




const RootStack = createStackNavigator(
    {
      DettaglioRicetta: { screen: DettaglioRicetta},
      Ricette: { screen: Ricette},
    },
    {
      initialRouteName: 'Ricette',
    },
    {
        headerMode: 'none',
        navigationOptions: {
          headerVisible: true,
        }
    }
  );

  RootStack.navigationOptions = ({ navigation }) => {
    let tabBarVisible = true;
    if (navigation.state.index > 0) {
      tabBarVisible = false;
    }
  
    return {
      tabBarVisible,
    };
  }
  
  export default RootStack;
