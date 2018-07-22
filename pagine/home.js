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
import { Platform, NativeModules } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'


const { StatusBarManager } = NativeModules;
const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBarManager.HEIGHT;



 
export class Home extends React.Component {
  static navigationOptions= {
    header: null,
  }

  constructor(props) {
    super(props);

    this.state = {
        loading: true,
        testo:'',
        search: false,
        ris:[],
        scrollY: new Animated.Value(0),
        fadeAnim: new Animated.Value(0),
        likeAnimated: new Animated.Value(0),
    };

    this.onSearchHandle = this.onSearchHandle.bind(this);
    this.submitEdit=this.submitEdit.bind(this);
    this.liked=this.liked.bind(this);
    this.notLike=this.notLike.bind(this);
    this.onPressLike=this.onPressLike.bind(this);
}

componentDidMount(){
  this.myComponent.measure( (fx, fy, width, height, px, py) => {
    console.log('Component width is: ' + width)
    console.log('Component height is: ' + height)
    console.log('X offset to frame: ' + fx)
    console.log('Y offset to frame: ' + fy)
    console.log('X offset to page: ' + px)
    console.log('Y offset to page: ' + py)
}) 

  this.props.fetchPosts();
  this.props.fetchLikes();
  this.setState({ 
    loading: false,
  });
}

async componentWillMount(){
  await Font.loadAsync({
    'pacifico': require('../assets/fonts/Pacifico.ttf'),
  });
}



onSearchHandle(e){
    const risultati = this.props.posts.reduce(function(accumulatore, valoreCorrente){
      if (valoreCorrente.procedimento.search(new RegExp(e, "i")) > -1) {
         accumulatore.push(valoreCorrente);
         ;
      }
      return accumulatore
    },[]);
  
  Animated.timing(
      
      this.state.fadeAnim, 
      {
        toValue: 1,
        duration: 500, 
      }
  ).start();
  
  this.setState({
    testo:e,
    ris:risultati
  })

}

submitEdit(){
  const dati = this.state.ris
  this.props.navigation.navigate('Risultato', {dati:dati})
  this.setState({
    testo:''
  })

}

_onBlur(){
  Animated.timing(
      
    this.state.fadeAnim, 
    {
      toValue: 0,
      duration: 500, 
    }
  ).start();

  this.setState({
    testo:''
  })
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


  render() {

    const categorie = [
      {
        id: 1,
        categoria: 'Primi Piatti',
        img: require('../assets/img/piattiUnici.png'),
        ricette:[11,10,12,14,15]
     },
     {
      id: 2,
      categoria: 'Secondi e Contorni',
      img: require('../assets/img/carne.png'),
      ricette:[6,7,8,9,13]
    },
    {
      id: 3,
      categoria: 'Torte e Dessert',
      img: require('../assets/img/dolci.png'),
      ricette:[1,2,3,4,5]
    },
      
     ]




    const barOpacity = this.state.scrollY.interpolate({
      inputRange: [0, ((Dimensions.get('window').height/5)*3)-5, ((Dimensions.get('window').height/5)*3)],
      outputRange: [0, 0, 1],
      extrapolate: 'clamp',
    });
    const imageOpacity = this.state.scrollY.interpolate({
      inputRange: [0,  HEADER_SCROLL_DISTANCE],
      outputRange: [1,  0],
      extrapolate: 'clamp',
    });
    const imageTranslate = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE],
      outputRange: [0, 120],
      extrapolate: 'clamp',
    });
    const headerHeight = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE],
      outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
      extrapolate: 'clamp',
    });


    
 

    if (this.state.loading) {
      return(<View></View>);
    }

    return (

        
<View style={{flex:1}}>
      <View style={{backgroundColor: '#e43636', height:STATUSBAR_HEIGHT,}}/>
      <ScrollView   
            overScrollMode='always'
            ref='_scrollView'
            keyboardShouldPersistTaps='handled'
            bounces={false}
            style={{flex:1, flexDirection:'column'}} 
            stickyHeaderIndices={[1,2]}
            scrollEventThrottle={16}
            onScroll={Animated.event(
              [{nativeEvent: {contentOffset: {y: this.state.scrollY}}}]
            )}
          
      >


          <View style={styles.headerImg}>
            <Animated.Image
              style={[
                styles.backgroundImage,
                {opacity: 1, transform: [{translateY: imageTranslate}]},
              ]}
              source={require('../assets/img/header.png')}
            />
          </View>

          <Animated.View ref={view => { this.myComponent = view; }} style={[styles.searchBarBG, {  backgroundColor:'#e43636', opacity: barOpacity }]}/>
          <View style={styles.searchBar}>
            <View 
              style={styles.searchBarCont}
            >
           
            
                <TextInput
                      underlineColorAndroid='transparent'
                      onChangeText={(testo)=> this.onSearchHandle(testo)}    onBlur={()=>this._onBlur()}
                      value={this.state.testo}
                      onFocus={()=>{ this.refs._scrollView.scrollTo({y: 120, animated: true}); }}
                      onSubmitEditing={()=>this.submitEdit()}
                      placeholder='Cerca una ricetta' 
                      style={{ width:'70%', paddingLeft:30, fontSize: 20, fontFamily: 'sans-serif-light'}}
            />
                { this.state.testo===""? <View/> :     
                <Animated.View style={{
                    opacity: this.state.fadeAnim,
                    width:'29%',
                    margin:2,
                    elevation:1,
                    
                    }}
                >
                  <TouchableOpacity  onPress={()=>this.submitEdit()} style={styles.searchButton}>
                  
                  <Ionicons
                    name={'md-search'}
                    size={30}
                    style={{ 
                      color: 'rgba(255,255,255,.6)', 
                    }}
                  />
                  </TouchableOpacity>
                </Animated.View>
                }
                
            </View>
            </View>



            <View style={styles.page}>           
            
            <View style={styles.subTitleBg}>
              <Text style={styles.subTitle}>Scegli una categoria</Text>
            </View>

            
            <Carousel 
            swipeThreshold={0.2} 
            sneak={20} 
            pageWidth={Dimensions.get('window').width-30}
            style={styles.carousel1} >
              {categorie.map( p =>
              <View
              key={p.id}
              style={styles.containerCard2}
              >

              
              <TouchableOpacity 
                onPress={() =>
                  this.props.navigation.navigate('Categoria',{         
                    ricette: p.ricette,
                    categoria: p.categoria
                })}
               style={styles.containerCardCat}  >
                  <ImageBackground
                      style={styles.imgBg}
                      resizeMode="cover"
                      source={p.img}
                  >
                  </ImageBackground>
                <View style={styles.catTitle}>
                  <Text style={{color: '#e43636',fontWeight:'200', fontSize:25, }}>{p.categoria}</Text>
                </View>
              </TouchableOpacity>
              </View>
              )}
            </Carousel>
            



            <View style={styles.subTitleBg}>
                      <Text style={styles.subTitle}>Ricette della settimana</Text>
            </View>





            <CarouselAlt
            swipeThreshold={0.2} 
            sneak={20} 
            pageWidth={Dimensions.get('window').width-40}
            style={styles.carousel2}

            >
              {this.props.posts.map( item =>
              
              <View
              key={item.id} 
              style={styles.containerCard2}>
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
                      style={{ color: '#fff', paddingRight:5,}}
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
              </View>
              )}
          </CarouselAlt>

      </View>
          
    </ScrollView  >
    </View>          
    
      );
    }
}

const HEADER_MAX_HEIGHT = (Dimensions.get('window').height/3)*2;
const HEADER_MIN_HEIGHT = 60;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

const mapStateToProps = state => ({
  posts: state.posts.items,
  likes: state.posts.likes,
  like: state.posts.like
});



export default connect(mapStateToProps, {fetchPosts, fetchLikes, updateLikes, removeLikes, removeLike})(Home);




const styles = StyleSheet.create({


page: {
  flexDirection: 'column',
  backgroundColor: '#f5f5f5',
  justifyContent: 'flex-end',
  alignItems:'stretch',
  flexWrap: 'nowrap',
  paddingBottom: 20

},
backgroundImage: {
  position: 'absolute',
  top:  0,
  left: 0,
  right: 0,
  width: Dimensions.get('window').width,
  height: (Dimensions.get('window').height/3)*2,
  resizeMode: 'cover',
},

headerImg: {
  width: Dimensions.get('window').width,
  height: (Dimensions.get('window').height/3)*2,
  //justifyContent: 'flex-end',
  //alignItems: 'center',
  //paddingVertical: 20,

},
searchBar: {
  width: (Dimensions.get('window').width/10)*9,
  height: 60,
  alignSelf: 'center',
  position: 'absolute', 
  top: (Dimensions.get('window').height/5)*3,
  paddingTop:10,
},
searchBarCont: {
  backgroundColor: '#fff',
  width: (Dimensions.get('window').width/10)*9,
  height: 40,
  flexDirection:'row',
  justifyContent: 'flex-start',
  borderRadius: 10,
  elevation:2,
  alignSelf: 'center',
  position: 'relative', 
  shadowColor: 'rgba(0,0,0, .2)',
  shadowOffset: { height: 2, width: 2 },
  shadowOpacity: 1,
  shadowRadius: 1,


},
searchBarBG:{
  width:'100%', 
  height: 70, 
  position: 'absolute', 
  top: (Dimensions.get('window').height/5)*3
},
searchButton: {
  borderRadius:10,
  backgroundColor: '#e43636',
  alignItems:'center',
  justifyContent: 'center',
  width:'100%',
  padding:2,
  height:36
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
  paddingLeft: 25,
  marginTop: 50,
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
  borderRadius: 10,
  overflow: 'hidden',

},

containerCardCat: {
  flex:1,
  borderRadius: 10,
  overflow: 'hidden',
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
  borderWidth:2,
  borderColor:'#fff',
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
  alignItems:'center',
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
