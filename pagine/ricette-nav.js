import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {  createStackNavigator,} from 'react-navigation';
import Ricette from './ricette';
import DettaglioRicetta from './dettaglio-ricetta';

const RootStack = createStackNavigator(
    {
      Ricette: Ricette,
      DettaglioRicetta: DettaglioRicetta,
    },
    {
      initialRouteName: 'Ricette',
    },
    {
        headerMode: 'none',
        navigationOptions: {
          headerVisible: false,
        }
    }
  );


  
  export default class RicetteNav extends React.Component {

    render() {
      return <RootStack />;
    }
  }
