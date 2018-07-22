import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {  createStackNavigator,} from 'react-navigation';
import Preferiti from './gallery';
import DettaglioRicetta from './dettaglio-ricetta';
import Home from './home';

const RootStack = createStackNavigator(
    {
      Preferiti: { screen: Preferiti},
      DettaglioRicetta: { screen: DettaglioRicetta},
    },
    {
      initialRouteName: 'Preferiti',
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