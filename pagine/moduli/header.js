import React from 'react';
import { Text, View, Image, StyleSheet, Dimensions, ImageBackground } from 'react-native';
import Carousel from "react-native-carousel-control";
import { Header } from 'react-native-elements';
import { Font } from 'expo';


export default class HeaderMod extends React.Component{
  constructor(props) {
    super(props);

    this.state = {
        data:[],
        loading: true,
    };

}
  async componentWillMount(){
    await Font.loadAsync({
      'pacifico': require('../../assets/fonts/Pacifico.ttf'),
    });
    this.setState({ loading: false });
  }
  
  
  render(){
        return(
          
            <Header
            backgroundColor='#e43636'
            outerContainerStyles={
              style= {
                borderBottomWidth: 0,
                shadowColor: '#000000',
                shadowOffset: {
                  width: 5,
                  height: 3
                },
                shadowRadius: 5,
                shadowOpacity: 1.0
              }}
            centerComponent={{ text: 'Cibum', style: { color: '#fff', fontFamily:'pacifico', fontSize:22, marginBottom:-8 } }}

          >

            </Header>
           
        )
    }
}