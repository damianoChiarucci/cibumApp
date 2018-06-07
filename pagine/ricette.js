import React from 'react';
import { FlatList, ActivityIndicator, Text, View, Image, TouchableOpacity, Platform, ScrollView, StyleSheet, Dimensions, ImageBackground} from 'react-native';
import { List, ListItem, Header } from "react-native-elements";
import {  createStackNavigator,} from 'react-navigation';
import DettaglioRicetta from './dettaglio-ricetta';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default class Ricette extends React.Component {

  static navigationOptions= {
    header: null,

  }
  static navigatorStyle = {
    // drawUnderNavBar: Platform.OS !== 'ios' 
  };

  constructor(props){
    super(props);
    this.state ={ 
      data: [],
    }
  }



  componentDidMount(){
    this.getData();
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

  render(){
    let titolo = <Text style={{color:'white', fontSize:20}}>
                  Ricette
                  </Text>;

    return(
      <View>
        <Header
          centerComponent={titolo}
          backgroundColor='#e43636'
        />

      <ScrollView>
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

            </ScrollView>
      
    
    </View>
    );
  }
}

const styles = StyleSheet.create({

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