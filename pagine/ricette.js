import React from 'react';
import { FlatList, ActivityIndicator, Text, View, Image, TouchableOpacity,} from 'react-native';
import { List, ListItem, Header } from "react-native-elements";
import {  createStackNavigator,} from 'react-navigation';
import DettaglioRicetta from './dettaglio-ricetta';

export default class Ricette extends React.Component {

  static navigationOptions= {
    header: null,
  }

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

      <List>
      
      <FlatList
        data={this.state.data}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity >
          <ListItem
            onPress={() =>
              this.props.navigation.navigate('DettaglioRicetta',{         nome: item.nome,
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
            roundAvatar
            chevron
            bottomDivider
            badge={{ value: `${item.tempoPreparazione} min`, textStyle: { color: '#333' }, containerStyle: { marginTop: 0, backgroundColor: 'transparent' } }}
            title={item.nome}
            subtitle={item.costo}
            avatar={{ uri: `https://damianochiarucci.altervista.org/images/${item.foto}` }}
          />
          </TouchableOpacity>
        )}
      />
      
    </List>
    </View>
    );
  }
}

