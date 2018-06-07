import React from 'react';
import { Text, View, Image, StyleSheet, Dimensions, ImageBackground } from 'react-native';
import Carousel from "react-native-carousel-control";
import { Card, ListItem, Button, Icon, SearchBar, Header } from 'react-native-elements';
import { MapView } from 'expo';

export default class App extends React.Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
              <Header
          
          centerComponent={          <Image
          resizeMode='contain'
            source={require('../assets/img/cibumLogo.png')}
            />}
          backgroundColor='#e43636'
          outerContainerStyles={style= {borderBottomWidth: 0,}}
        >

        </Header>
        <MapView
          style={{ flex: 2 }}
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