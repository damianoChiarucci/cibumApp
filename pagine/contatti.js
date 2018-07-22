import React from 'react';
import { Text, View, Image, StyleSheet, Dimensions, ImageBackground,  Platform, NativeModules, ScrollView, TouchableOpacity, Linking } from 'react-native';
import Carousel from "react-native-carousel-control";
import { Card, ListItem, Button, Icon, SearchBar, SocialIcon} from 'react-native-elements';
import { MapView } from 'expo';
const { StatusBarManager } = NativeModules;

const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBarManager.HEIGHT;
const HEADER_HEIGHT = STATUSBAR_HEIGHT+(Dimensions.get('window').width/6); 

export default class App extends React.Component {

  render() {
    return (
      <View style={{ flex: 1,}}>
        <View style={{backgroundColor: '#e43636', height:HEADER_HEIGHT, paddingTop:STATUSBAR_HEIGHT, justifyContent:'center', alignItems:'center'}}>
          <Text style={{fontSize:25, color:'#fff'}}>I Nostri Contatti</Text>
        </View>

        <ScrollView  
            bounces={false}
            style={{flex:1, flexDirection:'column'}} 
            scrollEventThrottle={16}

          
      >

        <View style={{ flex: 5, marginVertical:30}}>

          <TouchableOpacity
          style={{backgroundColor:'#e43636', width:Dimensions.get('window').width-14, alignSelf:'center', borderRadius: 30,         
          shadowColor: 'rgba(0,0,0, .4)',
          shadowOffset: { height: 1, width: 1 },
          shadowOpacity: 1,
          shadowRadius: 1,
          elevation:2,  
          justifyContent:'center'
          }}
          
          onPress={ ()=>{ Linking.openURL('https://damianochiarucci.altervista.org/')}}
          >
            <Image
            style={{height: 52, width: 80, alignSelf:'center'}}
            source={require( '../assets/img/cibumLogo.png' )}
            />
          </TouchableOpacity>

          <TouchableOpacity>
          <SocialIcon
            title='Sign In With Facebook'
            button
            type='facebook'
          />
          </TouchableOpacity>

          <TouchableOpacity>
          <SocialIcon
            title='Some Twitter Message'
            button
            type='twitter'
          />
          </TouchableOpacity>



          <TouchableOpacity>
          <SocialIcon
            button
            light
            type='instagram'
          />
          </TouchableOpacity>

        </View>
        <View style={{padding:20, marginTop:10,marginBottom:5,}}>
          <Text style={{fontSize:22, fontWeight:'200', color:'#e43636', marginBottom:5}}>Vieni a Trovarci nella Nostra Nuova Sede!</Text>
          <Text style={{fontSize:18, fontWeight:'bold', color:'#555'}}>Via dei Giubbonari, 14 </Text>
          <Text style={{fontSize:18, fontWeight:'bold', color:'#555'}}>00186 Roma (RM)</Text>
        </View>
        <View style={{height:(Dimensions.get('window').height/2), justifyContent:'center'}}>
        <MapView
        showsUserLocation={true}
				showsMyLocationButton={true}
            style={{ flex: 1, width:Dimensions.get('window').width,}}
            initialRegion={{
              latitude: 41.894490,
              longitude: 12.474213,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          >
            <MapView.Marker
            coordinate={{latitude: 41.894490,longitude: 12.474213}}
            />
          </MapView>
        </View>

        </ScrollView>

      </View>
    );
  }
}