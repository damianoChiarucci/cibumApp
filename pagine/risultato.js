import React from 'react';
import { FlatList, ActivityIndicator, Text, View, Image, TouchableOpacity, Platform, ScrollView, StyleSheet, Dimensions, ImageBackground, Animated, Easing, NativeModules} from 'react-native';
import { List, ListItem, Header } from "react-native-elements";
import {  createStackNavigator,} from 'react-navigation';
import DettaglioRicetta from './dettaglio-ricetta';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';
import { fetchPosts, fetchLikes, updateLikes, removeLikes, removeLike } from './redux/actions/postActions';


const { StatusBarManager } = NativeModules;

const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBarManager.HEIGHT;
const HEADER_HEIGHT = STATUSBAR_HEIGHT+(Dimensions.get('window').width/6); 
class Risultato extends React.Component {

  static navigationOptions =

  ({ navigation }) => {
    return {
      
  headerleft: 'Indietro',

    headerTintColor:'#fff',
    headerStyle:{backgroundColor:'#e43636'},
      title: 'Risultati:',
    };
  };

  constructor(props){
    super(props);
    this.state ={ 
      likeAnimated: new Animated.Value(0),
    }

    this.liked=this.liked.bind(this);
    this.notLike=this.notLike.bind(this);
    this.onPressLike=this.onPressLike.bind(this);
  }
componentDidMount(){

}

onPressLike(id){

  this.props.likes.indexOf(id)>=0 ? this.notLike(id):this.liked(id);

}

async liked(idNew){
  const likeAnimValue = this.state.likeAnimated;
  const propsRec = this.props;
  this.props.updateLikes(idNew, this.props.likes);

  likeAnimValue.setValue(0)
  Animated.timing(this.state.likeAnimated, {
      toValue: 1,
      duration: 500,
      easing: Easing.bounce
  }).start(()=>onEndAnim());
    
  function onEndAnim (){
    likeAnimValue.setValue(0);
    propsRec.removeLike();
  }
}

async notLike(idRemove){

  this.props.removeLikes(idRemove, this.props.likes);

  this.state.likeAnimated.setValue(0)
  Animated.timing(this.state.likeAnimated, {
      toValue: 1,
      duration: 1000,
      easing: Easing.elastic
  }).start()
}

  render(){




    return(
      <View style={[StyleSheet.absoluteFill,{backgroundColor:'#f5f5f5'}]}>
      

              <ScrollView>
      {this.props.navigation.getParam('dati').map( item =>
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
                  <Text style={{color: '#e43636', paddingRight:5,  fontSize:20, flex:5}}>{item.nome}</Text>
                  <TouchableOpacity
                  style={{flex:1, alignSelf:'center', padding:5}}
                  onPress={()=> this.onPressLike(item.id)}
                >
                <Animated.View style={this.props.like==item.id?{
                    alignItems:'center',
                    transform: [
                      {scale: this.state.likeAnimated.interpolate({
                        inputRange:[0,.5,1],
                        outputRange:[1,1.3, 1]
                      })}
                      ]
                  }:{alignItems:'center',}}>
                <Ionicons
                    name={this.props.likes.indexOf(item.id)>=0 ?'md-heart':'md-heart-outline'}
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



export default connect(mapStateToProps, {fetchPosts, fetchLikes, updateLikes, removeLikes, removeLike})(Risultato);

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

  },
  
  containerCardCat: {
    flex:1,
    borderRadius: 10,
    overflow: 'hidden',

  },
  containerCard2: {
    borderWidth:2,
    borderColor:'#fff',
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
    paddingVertical: 15,
    padding:10,
    justifyContent: 'space-between',
    flexDirection: 'row',
    flex:1,
    alignItems:'center',
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