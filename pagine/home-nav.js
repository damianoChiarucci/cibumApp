import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {  createStackNavigator,} from 'react-navigation';
import Ricette from './ricette';
import DettaglioRicetta from './dettaglio-ricetta';
import Home from './home';

const RootStack = createStackNavigator(
    {
        Home: Home,
        DettaglioRicetta: DettaglioRicetta,
        Ricette: Ricette,

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


  
  export default class HomeNav extends React.Component {

    render() {
      return <RootStack />;
    }
  }