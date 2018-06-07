import React from 'react';
import { Text, View, Image, StyleSheet, Dimensions, ImageBackground } from 'react-native';
import Carousel from "react-native-carousel-control";
import { Card, ListItem, Button, Icon, SearchBar } from 'react-native-elements';
import { Font } from 'expo';


const categorie = [
  {
    id: 1,
    name: 'PRIMI',
    img: require('../assets/img/piattiUnici.png')
 },
 {
  id: 2,
  name: 'SECONDI',
  img: require('../assets/img/carne.png')
},
{
  id: 3,
  name: 'DOLCI',
  img: require('../assets/img/dolci.png')
},
  
 ]

 
export default class Home extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
        data:[],
        loading: true,
    };

}

componentDidMount(){
  this.getData();

}

async componentWillMount(){
  await Font.loadAsync({
    'pacifico': require('../assets/fonts/Pacifico.ttf'),
  });
  this.setState({ loading: false });
}

getData(){
  fetch('https://damianochiarucci.altervista.org/api/myfile.json')
    .then((res) => res.json())
    .then((res) => {
      this.setState({
        data: res
      });
    
})
}
    render() {
      if (this.state.loading) {
        return(<View></View>);
      }

      return (

        <View style={styles.page}>
            <View style={styles.header}>
              <ImageBackground
                style={styles.headerImg}
                resizeMode="cover"
                source={require('../assets/img/header.png')}
              >
                <SearchBar
                containerStyle={styles.searchBarCont}
                inputContainerStyle={styles.searchBar}
                inputStyle={styles.searchBar}
                lightTheme
                
                //onChangeText={}
                //onClear={}
                placeholder='Type Here...' />
              </ImageBackground>
            </View> 

            <View style={styles.subTitleBg}>
                      <Text style={styles.subTitle}>Scegli una categoria</Text>
            </View>

            
            <Carousel sneak={40}  style={styles.carousel1}>
              {categorie.map( p =>
              <View key={p.id} style={styles.containerCard} >
                
                  <ImageBackground
                      style={styles.imgBg}
                      resizeMode="cover"
                      source={p.img}
                  >
                  <View style={styles.titleBg}>
                    <Text style={styles.title}>{p.name}</Text>
                  </View>
                  
                  </ImageBackground>
                
              </View>
              )}
            </Carousel>

            <View style={styles.subTitleBg}>
                      <Text style={styles.subTitle}>Ricette della settimana</Text>
            </View>

            <Carousel sneak={40} style={styles.carousel2} >
              {this.state.data.map( p =>
              <View key={p.id} style={styles.containerCard} >
                
                  <ImageBackground
                      style={styles.imgBg}
                      resizeMode="cover"
                      source={{ uri: `https://damianochiarucci.altervista.org/images/${p.foto}` }}
                  >
                    <View style={styles.titleBg}>
                      <Text style={styles.title}>{p.nome}</Text>
                    </View>
                </ImageBackground>
              </View>
              )}
            </Carousel>


    </View>
      );
    }
}

const styles = StyleSheet.create({


page: {
    flex: 1,
    borderRadius: 5,

    justifyContent: 'space-between',
},
header: {
  flex: 1,

},

headerImg: {
  flex: 1,
 justifyContent: 'flex-end',
 alignItems: 'center',
 paddingBottom: 20,

  width: Dimensions.get('window').width,
},
searchBarCont: {
  justifyContent: 'center',

  width: '80%',
  height: 20,
  backgroundColor: 'white', 
  borderRadius: 15
},
searchBar: {
 backgroundColor: 'transparent',
  width: '80%',
  height: 15,
  fontSize: 10,
  fontWeight: '200',

},
subTitle: {
  fontSize: 12,
  fontWeight: '100',
  color: '#e43636',
  textAlign: 'left',

},
subTitleBg: {
  borderBottomWidth: 1,
  borderColor: '#e43636',
  paddingLeft: 10,
  marginTop: 20,
},
carousel1: {
  flex: 1,
  borderRadius: 5,
  flexDirection: 'row', 
  justifyContent: 'space-between',
},
carousel2: {
  flex: 1,
  borderRadius: 5,
  flexDirection: 'row', 
  justifyContent: 'space-between',
},
title: {
  fontSize: 19,
  fontWeight: '100',
  color: '#fff',
  textAlign: 'center',
  fontFamily: 'pacifico'
},
titleBg: {
  backgroundColor: 'rgba(228, 54, 54, 0.9)',
  padding: 5,
},

containerCard: {
  borderWidth: 0,
  borderRadius: 5,
  borderColor: '#fff',
  borderBottomWidth: 0,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.5,
  shadowRadius: 2,
  elevation: -5,
  marginLeft: 5,
  marginRight: 5,
  marginTop: 10,
  overflow: 'hidden',

},
imgBg: {
  justifyContent:'flex-end',
  height: (Dimensions.get('window').height)/(5),
},
});
