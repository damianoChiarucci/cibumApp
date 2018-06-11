import React from 'react';
import { Text, View, Image, StyleSheet, Dimensions, ImageBackground, TouchableOpacity, TouchableHighlight,FlatList, Animated, TextInput } from 'react-native';
import Carousel from "react-native-carousel-control";
import { Card, Button, Icon, SearchBar } from 'react-native-elements';
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
        testo:'',
        search: false,
        ris:[],
        searchFocus:false,
    };

    this.onSearchHandle = this.onSearchHandle.bind(this);
    this.renderRes= this.renderRes.bind(this);
    this._onBlur=this._onBlur.bind(this);
    this._onFocus=this._onFocus.bind(this);
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

onSearchHandle(e){
  
  const campo = this.state.data.map((item, key) =>
    item.nome);
    
  
  const risultati = campo.reduce(function(accumulatore, valoreCorrente){
    if (valoreCorrente.search(new RegExp(e, "i")) > -1) {
       accumulatore.push(valoreCorrente);
       ;
    }
    return accumulatore
  },[]);
  
  this.setState({
    testo:e,
    search: true,
    ris:risultati
  })



  
}

renderRes(){
  if(this.state.testo==""){
    return
  }else{
    if(this.state.search){
      return <FlatList
      keyExtractor={item => item}
      data={this.state.ris.slice(0,3)}
      renderItem={({item}) => 
        <TouchableOpacity
        //onPress={() => this._onPress(item)}

        >
        <View style={{ borderBottomColor:'rgba(228,54,54,.9)',  marginVertical:4, borderRadius:20, backgroundColor:'#fff',}}>
          <Text style={{color: 'rgb(228,54,54)', textAlign:'center', paddingVertical:2, fontSize:13}}>{item}</Text>
        </View>
      </TouchableOpacity>
    }
      />
      }
  }
}
_onBlur(){
  this.setState({searchFocus:false})
}
_onFocus(){
  this.setState({searchFocus:true});
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
                style={this.state.searchFocus ? styles.headerImg : styles.headerImgInactive  }
                resizeMode="cover"
                source={require('../assets/img/header.png')}
              >
              <View style={styles.searchBarCont}>
                <TextInput
                  
                  style={styles.searchBar}
                  
                  
                  onFocus={()=>this._onFocus()}
                  onBlur={()=>this._onBlur()}
                  onChangeText={(testo)=> this.onSearchHandle(testo)}          
                  //value={this.state.testo}      
                  value={this.state.testo}
                  placeholder='Cerca una ricetta' />
              </View>
                
              <View style={{width:'85%',}}>{this.renderRes()}</View>
              </ImageBackground>
              
            </View> 
            
            <View style={styles.subTitleBg}>
                      <Text style={styles.subTitle}>Scegli una categoria</Text>
                      
                      
            </View>

            
            <View style={{flexDirection: 'row', justifyContent:'center'}}>
              {categorie.map( p =>
              <TouchableOpacity 
              key={p.id} style={styles.containerCardCat}  >
                
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
 justifyContent: 'flex-start',
 alignItems: 'center',
 paddingVertical: 20,

  width: Dimensions.get('window').width,
},
headerImgInactive: {
  flex: 1,
 justifyContent: 'flex-end',
 alignItems: 'center',
 paddingVertical: 20,

  width: Dimensions.get('window').width,
},
searchBarCont: {
  justifyContent: 'center',
  width: '90%',
  height: 20,
  backgroundColor: 'white', 
  borderRadius: 15,
  borderWidth:0
},
searchBar: {
 backgroundColor: 'transparent',
  width: '100%',
  height: 15,
  fontSize: 10,
  fontWeight: '200',
  borderWidth: 0,
  textAlign:'center'

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
