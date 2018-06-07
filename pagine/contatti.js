import React from 'react';
import { Text, View, Image, StyleSheet, Dimensions, ImageBackground } from 'react-native';
import Carousel from "react-native-carousel-control";
import { Card, ListItem, Button, Icon, SearchBar} from 'react-native-elements';
import { MapView } from 'expo';
import Header from './moduli/header';

export default class App extends React.Component {
  render() {
    return (
      <View style={{ flex: 1,}}>
              <Header/>
        
          <MapView
            style={{ flex: 2, width:Dimensions.get('window').width, height: ((Dimensions.get('window').width/4)*3)}}
            initialRegion={{
              latitude: 37.78825,
              longitude: -122.4324,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          >
            <MapView.Marker
            coordinate={{latitude: 37.78825,longitude: -122.4324}}
            />
          </MapView>
        

      </View>
    );
  }
}