
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { FlatList, ActivityIndicator, Text, View, ImageBackground, TouchableOpacity, ScrollView, Dimensions, StyleSheet, Animated,} from 'react-native';

export default class ScrollableHeader extends React.Component {
  static navigationOptions =

  ({ navigation }) => {
    return {
      
  headerleft: 'Indietro',

    headerTintColor:'#fff',
    headerStyle:{backgroundColor:'#e43636'},
      title: navigation.getParam('nome'),
    };
  };


  constructor(props) {
    super(props);
  
    this.state = {
      scrollY: new Animated.Value(0),
    };
  }



  render() {

    const imageOpacity = this.state.scrollY.interpolate({
      inputRange: [0,  HEADER_SCROLL_DISTANCE],
      outputRange: [1,  0],
      extrapolate: 'clamp',
    });
    const imageTranslate = this.state.scrollY.interpolate({
      inputRange: [0, Dimensions.get('window').width],
      outputRange: [0, 120],
      extrapolate: 'clamp',
    });
    const headerHeight = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE],
      outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
      extrapolate: 'clamp',
    });


    let ingredienti = this.props.navigation.getParam('ingredienti').replace(/<\/?[^>]+(>|$)/g, "");
    let procedimento = this.props.navigation.getParam('procedimento').replace(/<\/?[^>]+(>|$)/g, "");           


    let foto = this.props.navigation.getParam('foto'); 

    let costo = []; 

    let costoNum = this.props.navigation.getParam('costo');


      switch(costoNum){
        case 'basso':
        costoNum = 1;
        break;
        case 'medio':
        costoNum = 2;
        break;
        default:
        costoNum = 3;
    }
    
    for(i=0; i <costoNum; i++){
      costo.push(
      <Ionicons
      key={i}
      name={'md-cash'}
      size={25}
      style={{ color: '#fff', paddingHorizontal:5}}
    />
      )
    }


    return (
      <View style={styles.fill}>
        <ScrollView
          ref='_scrollView'
          stickyHeaderIndices={[1,3]}
          style={styles.fill}
          scrollEventThrottle={16}
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {y: this.state.scrollY}}}]
          )}
        >
        <Animated.View style={[styles.header, {height: (Dimensions.get('window').height/3)*2 //headerHeight
        }]}>
          <Animated.Image
          style={[
            styles.backgroundImage,
            {opacity: 1, transform: [{translateY: imageTranslate}]},
          ]}
          source={{ uri: `https://damianochiarucci.altervista.org/images/${foto}` }}
        />
                  <View style={styles.badgeCont}>

                    <View
                      style={styles.badge}
                    >
                        <Ionicons
                          name={'md-contacts'}
                          size={25}
                          style={{ color: '#fff', paddingRight:5}}
                        />
                        <Text style={styles.badgeText}>{this.props.navigation.getParam('dosi')}</Text>
                    </View>
                    <View
                      style={styles.badge}
                    >
                        <Ionicons
                          name={'md-stopwatch'}
                          size={25}
                          style={{ color: '#fff', paddingRight:5}}
                        />
                        <Text style={styles.badgeText}>{this.props.navigation.getParam('cottura')} min</Text>
                    </View>

                      <View
                      style={styles.badge}
                      >
                      {costo}
                      </View>
                    </View>
          
        </Animated.View>


        <View style={[styles.subTitleBg,{ backgroundColor: '#e43636', marginTop: (Dimensions.get('window').height/3)*2,}]}>
          <Text style={styles.subTitle}>INGREDIENTI:</Text>
        </View>
      <Text style={styles.ingredienti}>{ingredienti}</Text>

      
      <View style={[styles.subTitleBg,{ backgroundColor: '#e43636', }]}>
        <Text style={styles.subTitle}>PREPARAZIONE:</Text>
      </View>
      <Text style={styles.procedimento}>{procedimento}</Text>
        
      <TouchableOpacity
      style={{backgroundColor:'#e43636', padding:3, borderRadius:50,elevation:2, width:60,height:60,alignSelf:'flex-end', margin:20, justifyContent:'center', alignItems:'center'}}
      onPress={()=>{ this.refs._scrollView.scrollTo({y: 0, animated: true}); }}
      >
        <Ionicons
          name={'md-arrow-up'}
          size={40}
          style={{ 
            color: '#fff', 
          }}
        />
      </TouchableOpacity>
        </ScrollView>
      </View>
    );
  }
}
const HEADER_MAX_HEIGHT = (Dimensions.get('window').width/4)*3;
const HEADER_MIN_HEIGHT = 60;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT; 

const styles = StyleSheet.create({

  fill: {
    flex: 1,
    backgroundColor:'#fff'
  },
  row: {
    height: 40,
    margin: 16,
    backgroundColor: '#D3D3D3',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: '#e43636',
    overflow: 'hidden',
    justifyContent:'flex-end'
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    width: null,
    height: (Dimensions.get('window').height/3)*2,
    resizeMode: 'cover',
  },
  bar: {
    marginTop: 28,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    backgroundColor: 'transparent',
    color: 'white',
    fontSize: 18,

  },
  badgeCont:{
    flexDirection:'row',
    alignSelf:'center',
    justifyContent:'flex-end',
    alignItems: 'flex-end',
    marginBottom: 10
  },

  badge:{
    borderRadius: 20,
    backgroundColor: '#e43636',
    alignItems:'baseline',
    justifyContent:'center',
    flexDirection: 'row',
    paddingHorizontal: 8,
    paddingVertical: 5,
    marginHorizontal: 3,
  
   },
   badgeText:{
    color: '#fff',
    fontSize: 20,
    fontWeight:'bold'
  
   },
   ingredienti:{
     textAlign: 'center',
     padding: 20,
     fontSize: 20,
     lineHeight: 35,
     fontWeight: 'bold',
     color: '#e43636',
   },
   procedimento:{
    textAlign: 'left',
    padding: 20,
    fontSize: 20,
    lineHeight: 35
   },
   subTitle: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    padding:10,

  
  },
  subTitleBg: {
    marginTop: 30,

  },
});
