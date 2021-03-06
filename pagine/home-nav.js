import React from 'react';
import { TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {  createStackNavigator,} from 'react-navigation';
import Ricette from './ricette';
import DettaglioRicetta from './dettaglio-ricetta';
import Home from './home';
import Risultato from './risultato';
import Categoria from './categoria';

const RootStack = createStackNavigator(
    {
        Home: { screen: Home,
          navigationOptions: {
            header: ()=> null
        }},
        DettaglioRicetta: { screen: DettaglioRicetta},
        Risultato : { screen: Risultato},
        Categoria:{ screen: Categoria }

    },
    {
      initialRouteName: 'Home',
    },
    {
        headerMode: 'none',
        navigationOptions: {
          headerVisible: false,
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
