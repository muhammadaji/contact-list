import React, {Component} from 'react';
import {ActivityIndicator,AsyncStorage,StatusBar,View} from 'react-native';

export default class AuthLoadingScreen extends Component {
  constructor(props){
    super(props);
    this._bootstrapAsync();
  }

  _bootstrapAsync = async () => {
    const userToken = await AsyncStorage.getItem('userToken');
    this.props.navigation.navigate(userToken ? 'App' : 'Auth');
  };


  render(){
    return(
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <ActivityIndicator color='blue'/>
      </View>
    )
  }
}
