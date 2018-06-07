
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { FlatList, ActivityIndicator, Text, View, ImageBackground, TouchableOpacity, ScrollView, Dimensions, StyleSheet} from 'react-native';
import { List, ListItem, Header, Button } from "react-native-elements";




export default class DettaglioRicetta extends React.Component {


  
    static navigationOptions= {
        header: null,
      }



  render(){
    let back = <Ionicons

                        name='ios-undo'
                        size={25}
                        color='white'

                onPress={() =>
                    this.props.navigation.navigate('Ricette')}
                />;

    let titolo = <Text
                style={{color:'white', fontSize:20}}
                >{this.props.navigation.getParam('nome')}</Text>;
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
      size={20}
      style={{ color: '#fff', paddingHorizontal:5}}
    />
      )
    }


    return(
    <View>
        <Header
          leftComponent={back}
          centerComponent={titolo}
          backgroundColor='#e43636'
          outerContainerStyles={style= {borderBottomWidth: 0}}
        />
      <ScrollView>
        <ImageBackground
            style={{width:Dimensions.get('window').width, height: ((Dimensions.get('window').width/4)*3), justifyContent:'center', alignItems:'flex-end', padding: 5, flexDirection:'row'}}
            source={{ uri: `https://damianochiarucci.altervista.org/images/${foto}` }}
           resizeMode="cover"
        >
          <View
          style={styles.badge}
          >
            <Ionicons
              name={'md-alarm'}
              size={20}
              style={{ color: '#fff', paddingRight:5}}
            />
            <Text style={styles.badgeText}>{this.props.navigation.getParam('cottura')} min</Text>
          </View>

          <View
          style={styles.badge}
          >
          {costo}
          </View>
          
        </ImageBackground>
      <Text>{ingredienti}</Text>
      <Text>{procedimento}</Text>
      </ScrollView>

    </View>

    );
  }
}



const styles = StyleSheet.create({
 badge:{
  borderRadius: 20,
  backgroundColor: '#e43636',
  alignItems:'baseline',
  justifyContent:'space-around',
  flexDirection: 'row',
  paddingHorizontal: 8,
  paddingVertical: 5,
  marginHorizontal: 3,

 },
 badgeText:{
  color: '#fff',

 },
});