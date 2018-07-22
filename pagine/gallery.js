import React from 'react';
import { FlatList, ActivityIndicator, Text, View, Image, TouchableOpacity, Platform, ScrollView, StyleSheet, Dimensions, ImageBackground, Animated, AsyncStorage, Easing, NativeModules} from 'react-native';
import { List, ListItem, Header } from "react-native-elements";
import {  createStackNavigator,} from 'react-navigation';
import DettaglioRicetta from './dettaglio-ricetta';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';
import { fetchPosts, fetchLikes, removeLikes, } from './redux/actions/postActions';


const { StatusBarManager } = NativeModules;
const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBarManager.HEIGHT;
const HEADER_HEIGHT = STATUSBAR_HEIGHT+(Dimensions.get('window').width/6); 
class Ricette extends React.Component {

  static navigationOptions= {
    header: null,

  }

  constructor(props){
    super(props);
    this.state ={ 
      likeAnimated: new Animated.Value(0),
    }

    this.notLike=this.notLike.bind(this);
  }



componentDidMount(){


}

async notLike(idRemove){

  this.props.removeLikes(idRemove, this.props.likes);


}


  
  

  render(){
    let abc=this.props.likes;
    let postsLiked = this.props.posts.map(function(e, ind){
      if (abc.indexOf(e.id)>=0){
        return e
      }
    })
    let newArrFilter= postsLiked.filter(Boolean);

    let titolo = <Text style={{color:'white', fontSize:25, marginTop:15}}>
                  Ricette
                  </Text>;

    return(
      <View style={{ flex: 1,}}>
        <View style={{backgroundColor: '#e43636', height:HEADER_HEIGHT, paddingTop:STATUSBAR_HEIGHT, justifyContent:'center', alignItems:'center'}}>
          <Text style={{fontSize:25, color:'#fff'}}>I Tuoi Preferiti</Text>
      </View>

      <ScrollView style={{backgroundColor: '#f5f5f5',}}>
      {newArrFilter.map( item =>
              <View
              key={item.id} 
              style={styles.containerCard2}
              >

              
              <TouchableOpacity 
                
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
                          name={'md-contacts'}
                          size={20}
                          style={{ color: '#fff', paddingRight:5}}
                        />
                        <Text style={styles.badgeText}>{item.dosi}</Text>
                    </View>
                  <View
                      style={styles.badge}
                      >
                        <Ionicons
                          name={'md-alarm'}
                          size={20}
                          style={{ color: '#fff', paddingRight:5}}
                        />
                        <Text style={styles.badgeText}>{item.cottura} min</Text>
                      </View>
                </ImageBackground>
                <View style={styles.catTitle}>
                <Text style={{color: '#e43636',paddingRight:5,  fontSize:20, flex:5}}>{item.nome}</Text>

                <TouchableOpacity
                  style={{flex:1, alignSelf:'center', padding:5}}
                  onPress={()=>this.notLike(item.id)}
                >
                <Animated.View style={{alignItems:'center' }}>
                <Ionicons
                    name={'md-remove-circle'}
                    size={30}
                    style={{ color: '#e43636'}}
                />
                </Animated.View>

                </TouchableOpacity>
                </View>
              </TouchableOpacity>
              </View>
              )}

            </ScrollView>
      
    
    </View>
    );
  }
}

const mapStateToProps = state => ({
  posts: state.posts.items,
  likes: state.posts.likes,
  like: state.posts.like
});



export default connect(mapStateToProps, {fetchPosts, fetchLikes, removeLikes})(Ricette);


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
    borderRadius: 10,
    overflow: 'hidden',
    borderWidth:2,
    borderColor:'#fff',
  },
  containerCard2: {
    borderRadius: 10,
    elevation: 2,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 15,
    marginBottom:20,
    shadowColor: 'rgba(0,0,0, .2)',
    shadowOffset: { height: 2, width: 2 },
    shadowOpacity: 1,
    shadowRadius: 1,
  },

  catTitle:{
    borderBottomLeftRadius:10,
    backgroundColor:'#fff',
    borderLeftWidth: 4,
    borderColor: '#e43636',
    alignItems:'center',
    paddingVertical: 15,
    padding:10,
    justifyContent: 'space-between',
    flexDirection: 'row',
    flex:1,
    
  },
  imgBg: {
    flexDirection:'row',
    justifyContent:'flex-end',
    alignItems:'flex-start',
    height: (Dimensions.get('window').height)/(4),
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

   },
   badgeText:{
    color: '#fff',
    fontSize: 15,
    fontWeight:'bold'
  
   },
  });