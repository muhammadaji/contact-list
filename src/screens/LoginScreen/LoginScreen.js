import React, {Component} from 'react';
import {View, Image, AsyncStorage, ImageBackground, TouchableNativeFeedback} from 'react-native';
import {Container, Content, Card, CardItem, Form, Item, Input, Label, Button, Text, Icon} from 'native-base';
import axios from 'axios';

export default class LoginScreen extends Component {
  constructor(){
    super();
      this.state = {
        username: '',
        password: '',
        IsLogged: false,
      }
  }

  componentDidMount(){

  }

  handleLogin(){
    value = {
      username: this.state.username,
      password: this.state.password
    }
    axios.put('http://192.168.0.18:5000/api/users/', value)
    .then(result =>{
      if (result.data.logged == true) {
        AsyncStorage.setItem('userToken', result.data.token)
        this.props.navigation.navigate('App')
      }else{
        alert(JSON.stringify(result.data.message))
      }
    })
  }
  render(){
    return(
      <ImageBackground 
      source={{uri: 'http://www.city-data.com/forum/attachments/city-vs-city/139596d1416187703-best-sunset-city-chicago-skyline-3-.jpg'}} 
      style={{flex: 1}}>
        <Content contentContainerStyle={{flex:1,justifyContent: 'center', alignItems: 'center'}}>
            <View>
                <Image 
                style={{width: 150, height: 150, position: 'relative', marginTop: 0}}
                source={{uri: 'https://image.flaticon.com/icons/png/512/147/147142.png'}} />
            </View>
            <Form style={{justifyContent: 'center', alignItems: 'center'}} >
                <Item regular 
                style={{width: 330, height: 45,marginTop: 20, backgroundColor: 'white', borderColor: '#2089dc', borderRadius: 2}}>
                    <Input style={{textAlign: 'center'}} placeholder='Username' 
                    onChangeText = {(text) => this.setState({username: text})} />
                </Item>
                <Item  regular 
                style={{width: 330, height: 45, backgroundColor: 'white', borderColor: '#2089dc', borderRadius: 2}}>
                    <Input style={{textAlign: 'center'}} placeholder="Password" secureTextEntry={true}
                    onChangeText = {(text) => this.setState({password: text})}/>
                </Item>
                <Button block  
                onPress={() => this.handleLogin()}
                style={{width: 330, marginTop: 10, backgroundColor: '#09c856'}} >
                    <Text style={{color: 'white', fontSize: 16, fontWeight: '900'}}>Login</Text>
                </Button>
            </Form>
        </Content>                            
            <View style={{flexDirection: 'row', alignSelf: 'center', marginBottom: 20}}>
                <Text style={{color: 'white', }}>Don't have an account ? </Text>
                <TouchableNativeFeedback>
                    <Text style={{color: '#2089dc',}}>Sign Up</Text>
                </TouchableNativeFeedback>
            </View>
      </ImageBackground>
    )
  }
}
