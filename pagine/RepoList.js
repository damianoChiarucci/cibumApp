import React from 'react';
import { Text, View, Image, StyleSheet, Dimensions, ImageBackground, TouchableOpacity, TouchableHighlight,FlatList, Animated, TextInput, ScrollView, KeyboardAvoidingView, StatusBar, AsyncStorage, Easing, TouchableWithoutFeedback } from 'react-native';
import Carousel from "react-native-carousel-control";
import CarouselAlt from './moduli/carosello-noScroll';
import { Card, Button, Icon, SearchBar } from 'react-native-elements';
import { Font } from 'expo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as Animatable from 'react-native-animatable';
import { connect } from 'react-redux';
import { fetchPosts, fetchLikes, updateLikes, removeLikes, removeLike } from './redux/actions/postActions';
import { listRepos } from './redux/reducers/index';

class RepoList extends React.Component {
      
  constructor(props) {
    super(props);
      
    this.state = {
              loading: true,
              likeAnimated: new Animated.Value(0),
    };

    this.liked=this.liked.bind(this);
    this.notLike=this.notLike.bind(this);
    this.onPressLike=this.onPressLike.bind(this);
  };

  componentDidMount(){
    this.props.fetchPosts();
    this.props.fetchLikes();
    this.setState({
      loading:false
    })
  }

  onPressLike(id){
    this.props.likes.indexOf(id)>=0 ? this.notLike(id):this.liked(id);

  }

  async liked(idNew){
    
    this.props.updateLikes(idNew, this.props.likes);

    this.state.likeAnimated.setValue(0)
    Animated.timing(this.state.likeAnimated, {
        toValue: 1,
        duration: 500,
        easing: Easing.bounce
    }).start(()=>this.props.removeLike());
      
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



  render() {
    
 

    if (this.state.loading) {
      return(<View></View>);
    }

  return (
    <ScrollView  
      keyboardShouldPersistTaps='handled'
      bounces={false}
      style={{flex:1, flexDirection:'column'}} 

    
    >

    <View style={styles.page}>
      {this.props.posts.map( item =>
              
              
        <TouchableOpacity 
              key={item.id} 
              style={styles.containerCard}

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
                      size={25}
                      style={{ color: '#fff', paddingRight:5}}
                    />
                    <Text style={styles.badgeText}>{item.cottura} min</Text>
                  </View>
      
                </ImageBackground>
                <View style={styles.catTitle}>
                  <Text style={{color: '#e43636',paddingRight:5,  fontSize:20, flex:5}}>{item.nome}</Text>
      
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
              )}

        </View>
      </ScrollView>
    );
  }
}

const mapStateToProps = state => ({
  posts: state.posts.items,
  likes: state.posts.likes,
  like: state.posts.like
});



export default connect(mapStateToProps, {fetchPosts, fetchLikes, updateLikes, removeLikes, removeLike})(RepoList);

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  item: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc'
  },
  
page: {
  flexDirection: 'column',
  backgroundColor: '#eee',
  justifyContent: 'flex-end',
  alignItems:'stretch',
  flexWrap: 'nowrap',
  paddingBottom: 20

},
headerImg: {
  width: Dimensions.get('window').width,
  height: (Dimensions.get('window').height)/1.5,
  justifyContent: 'flex-end',
  alignItems: 'center',
  paddingVertical: 20,

},
searchBar: {
  width: '70%',
  height: 50,
  flexDirection:'row',
  justifyContent: 'flex-start',
  backgroundColor: 'white', 
  borderRadius: 5,
  elevation:3
},
searchButton: {
  borderRadius:5,
  backgroundColor: '#e43636',
  alignItems:'center',
  justifyContent: 'center',
  width:'100%',
  padding:2,
  height:46
  },

subTitle: {
  fontSize: 25,
  fontWeight: '200',
  color: '#e43636',
  textAlign: 'left',
  paddingBottom:5,
  fontFamily: 'sans-serif-light'
},
subTitleBg: {
  borderBottomWidth: 1,
  borderColor: '#e43636',
  paddingLeft: 45,
  marginTop: 30,
},
carousel1: {

  borderRadius: 5,
  flexDirection: 'row', 
  justifyContent: 'space-between',
},
carousel2: {
  alignItems: 'flex-start',
  borderRadius: 5,
  flexDirection: 'row', 
  justifyContent: 'flex-start',
  marginBottom: 20
},
title: {
  fontSize: 18,
  fontWeight: '100',
  color: '#e43636',
  textAlign: 'left',
},
titleBg: {
  backgroundColor:'rgba(255,255,255,0.9)', 
  padding: 5,
  flexDirection: 'row',
},

containerCard: {

  borderWidth: 0,
  borderRadius: 0,
  borderColor: '#fff',
  elevation: 2,
  marginLeft: 5,
  marginRight: 5,
  marginTop: 15,
  overflow: 'hidden',
  marginBottom:20,
},

containerCardCat: {
  flex:1,
  borderRadius: 0,
  elevation: 2,
  marginLeft: 5,
  marginRight: 5,
  marginTop: 15,
  overflow: 'hidden',
  marginBottom:20
},
catTitle:{
  backgroundColor:'#fff',
  borderLeftWidth: 3,
  borderColor: '#e43636',
  paddingVertical: 25,
  padding:10,
  justifyContent: 'space-between',
  flexDirection: 'row',
  flex:1,
  
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
  fontSize: 15,
  fontWeight:'bold'

 },
});

