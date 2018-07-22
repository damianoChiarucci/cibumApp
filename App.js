import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStore, applyMiddleware } from 'redux';
import { Provider, connect } from 'react-redux';
import reducer from './pagine/redux/reducers/index';
import RepoList from './pagine/home';
import Tab from './Tab';
import store from './pagine/redux/store';
import { Asset, AppLoading } from 'expo';



export default class App extends Component {
  state = {
    isReady: false,
  };
  render() {
    if (!this.state.isReady) {
      return (
        <AppLoading
          startAsync={this._cacheResourcesAsync}
          onFinish={() => this.setState({ isReady: true })}
          onError={console.warn}
        />
      );
    }

    return (
      <Provider store={store}>  
        <Tab/> 
      </Provider>
    );
  }

  async _cacheResourcesAsync() {
    const images = [
      require('./assets/img/CibumAppXXL.png'),
      require('./assets/img/cibumLogo.png'),
    ];

    const cacheImages = images.map((image) => {
      return Asset.fromModule(image).downloadAsync();
    });
    return Promise.all(cacheImages)

  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 50
  }
});