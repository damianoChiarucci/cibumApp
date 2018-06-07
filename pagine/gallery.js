
import React, {Component} from 'react';
import {
    Text,
    View,
    Image,
    TouchableOpacity,
    ScrollView,
    StyleSheet,
    Dimensions,
} from 'react-native';
import { List, ListItem, Header, Button } from "react-native-elements";
import Modal from 'react-native-modalbox';

const {width} = Dimensions.get('window');



const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#000',
    },

    footerText: {
        fontSize: 16,
        color: '#FFF',
        textAlign: 'center',
    },
    modal: {
      justifyContent: 'center',
      alignItems: 'center'
    },
  
    modal1: {
      height: 230,
      backgroundColor: "#FFF"
    },
});

export default class GalleryPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data:[],
            fotoCorrente:'',
            isImageViewVisible: false,
            imageIndex: 0,
            isOpen: false,
      isDisabled: false,
      swipeToClose: true,
      sliderValue: 0.4,

        };

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

    mostraFoto(data){
      this.setState({
        fotoCorrente: data.foto
      });
      this.refs.modal1.open()
    }
    

    render() {


        return (
            <View style={styles.container}>
                    <Header
          
          centerComponent={<Text>Cibum</Text>}
          backgroundColor='#e43636'
          outerContainerStyles={style= {borderBottomWidth: 0}}
        />
                <ScrollView>
                    {this.state.data.map((item, index) => (
                        <TouchableOpacity
                            key={index}
                            onPress={()=>this.mostraFoto(item) }
                        >
                            <Image
                                style={{width, height: 200}}
                                source={{ uri: `https://damianochiarucci.altervista.org/images/${item.foto}` }}
                                resizeMode="cover"
                            />
                        </TouchableOpacity>
                    ))}
                </ScrollView>
                <Modal
                backdropOpacity= {0.9}
          style={[styles.modal, styles.modal1]}
          ref={"modal1"}
          swipeToClose={this.state.swipeToClose}>
            <Text style={styles.text}>{this.state.fotoCorrente}</Text>
            <Image 
            style={{width, height: 400}}
            source={{ uri: `https://damianochiarucci.altervista.org/images/${this.state.fotoCorrente}` }}
            resizeMode="cover"/>
        </Modal>
            </View>

        );
    }
}