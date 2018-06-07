import React from 'react';
import { Text, View, Image, StyleSheet, Dimensions, ImageBackground, TouchableOpacity } from 'react-native';
import Carousel from "react-native-carousel-control";
import { Card, ListItem, Button, Icon, SearchBar } from 'react-native-elements';
import { Font } from 'expo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Header from './moduli/header';


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
  static navigationOptions= {
    header: null,
  }

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
        <Header/>
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

            
            <View style={{flexDirection: 'row', justifyContent:'center'}}>
              {categorie.map( p =>
              <TouchableOpacity 
              key={p.id} style={styles.containerCardCat} >
                
                  <ImageBackground
                      style={styles.imgBg}
                      resizeMode="cover"
                      source={p.img}
                  >
                  
                  
                  </ImageBackground>
                
              </TouchableOpacity>
              )}
            </View>

            <View style={styles.subTitleBg}>
                      <Text style={styles.subTitle}>Ricette della settimana</Text>
            </View>

            <Carousel sneak={40} style={styles.carousel2} >
              {this.state.data.map( item =>
              
              <TouchableOpacity 
              key={item.id} 
              style={styles.containerCard}
              onPress={() =>
                this.props.navigation.navigate('DettaglioRicetta',{         
                  nome: item.nome,
                  ingredienti: item.ingredienti,
                  procedimento: item.procedimento,
                  cottura: item.cottura,
                  dosi: item.dosi,
                  costo: item.costo,
                  difficolta: item.difficolta,
                  foto: item.foto,
                  tempoPreparazione: item.tempoPreparazione
              })
              }
              >
                
                  <ImageBackground
                      style={styles.imgBg}
                      resizeMode="cover"
                      source={{ uri: `https://damianochiarucci.altervista.org/images/${item.foto}` }}
                  >
                  <View
                      style={styles.badge}
                      >
                        <Ionicons
                          name={'md-alarm'}
                          size={15}
                          style={{ color: '#fff', paddingRight:5}}
                        />
                        <Text style={styles.badgeText}>{item.cottura} min</Text>
                      </View>
                    <View style={styles.titleBg}>
                      <Text style={styles.title}>{item.nome}</Text>
                      
                    </View>
                </ImageBackground>
              </TouchableOpacity>
              )}
            </Carousel>


    </View>
      );
    }
}

const styles = StyleSheet.create({


page: {
    flex: 1,
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
  fontSize: 18,
  fontWeight: '100',
  color: '#e43636',
  textAlign: 'left',
},
titleBg: {
  backgroundColor:'rgba(255,255,255,0.9)', //'rgba(228, 54, 54, 0.9)',
  padding: 5,
  flexDirection: 'row',
  //justifyContent: 'space-between'
},

containerCard: {
  borderWidth: 1,
  borderRadius: 5,
  borderColor: '#fff',
  shadowColor: '#ddd',
  shadowOffset: { width: 2, height: 2 },
  shadowOpacity: 0.2,
  shadowRadius: 1,
  elevation: 3,
  marginLeft: 5,
  marginRight: 5,
  marginTop: 10,
  overflow: 'hidden',

},

containerCardCat: {
  flex: 1,
  borderWidth: 1,
  borderRadius: 5,
  borderColor: '#fff',
  shadowColor: '#ddd',
  shadowOffset: { width: 2, height: 2 },
  shadowOpacity: 0.2,
  shadowRadius: 1,
  elevation: 3,
  marginLeft: 5,
  marginRight: 5,
  marginTop: 10,
  overflow: 'hidden',

},
imgBg: {
  justifyContent:'space-between',

  height: (Dimensions.get('window').height)/(5),
},
badge:{
  borderRadius: 20,
  backgroundColor: '#e43636',
  alignItems:'baseline',
  justifyContent:'space-around',
  flexDirection: 'row',
  paddingHorizontal: 5,
  paddingVertical: 3,
  margin: 5,
  alignSelf: 'flex-end',
 },
 badgeText:{
  color: '#fff',
  fontSize: 10

 },
});
