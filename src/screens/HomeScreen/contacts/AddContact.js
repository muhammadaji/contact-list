import React, {Component} from 'react';
import {View,Text,TouchableOpacity, Image, ActivityIndicator} from 'react-native';
import {Container, Form, Label, Item, Input, Icon, Button,Header,Left,Body,Right} from 'native-base';
import axios from 'axios';
import {connect} from 'react-redux';

import {fetchContacts, createContact} from '../../../actions/contacts';

class AddContact extends Component{

  static navigationOptions = ({navigation})=>({
    header: null
  })

  constructor(){
    super();
    this.state = {
      name: '',
      number: '',
      email: '',
      address: '',
      isValid: true,
    }
  }

  handleDone(){
    const data = {
      name: this.state.name,
      number: this.state.number,
      email: this.state.email,
      address: this.state.address
    }
      if (data.name != '' && data.phone != '') {
        this.props.dispatch(createContact(data))
        .then(res => {
          this.props.navigation.goBack()
        })
        .catch(err => {
          alert('error')
        })
      }else{
        this.setState({isValid: false})
        this.props.navigation.popToTop()
      }
    }

  render(){

    return(
    <Container>
      <Header style={{backgroundColor: '#2089dc'}}>
        <Left>
          <TouchableOpacity
            onPress={ () => {
              this.props.navigation.goBack()
              this.props.dispatch(fetchContacts())
            }}>
            <Icon  name='md-close' style={{marginLeft: 20,marginTop: 3,fontSize: 26,color: 'white'}}/>
          </TouchableOpacity>
        </Left>
        <Body>
          <Text style={{fontSize: 16,color: 'white'}}>Create Contact</Text>
        </Body>
      </Header>
      <View style={{marginBottom: 12}}>
        <View style={{position: 'absolute'}}>
          <Image
            resizeMode = 'cover'
            blurRadius = {1}
            style={{width: 400, height: 180, flexDirection: 'column'}}
            source={{uri: 'http://www.city-data.com/forum/attachments/city-vs-city/139596d1416187703-best-sunset-city-chicago-skyline-3-.jpg'}} />
        </View>
        <View style={{alignItems: 'center'}}>
          <Image
            style={{width: 150, height: 150, marginTop: 15}}
            source={{uri: 'https://image.flaticon.com/icons/png/512/147/147142.png'}}
          />
        </View>
      </View>
      <Form>
        <Item>
          <Icon  name='md-person' />
          <Input placeholder= "Name" onChangeText={(text)=>this.setState({name: text})}/>
        </Item>
        <Item>
          <Icon  name='md-phone-portrait' />
          <Input placeholder= "Phone Number" maxLength={13}  keyboardType='numeric' onChangeText={(text)=>this.setState({number: text})}/>
        </Item>
        <Item>
          <Icon  name='md-mail' />
          <Input placeholder= "Email" onChangeText={(text)=>this.setState({email: text})}/>
        </Item>
        <Item>
          <Icon  name='md-home' />
          <Input placeholder= "Address" onChangeText={(text)=>this.setState({address: text})}/>
        </Item>
      </Form>
      <Button block primary
        onPress={()=>this.handleDone()} style={{marginTop: 10, marginLeft: 50, marginRight: 50}}
        >
        {
          this.props.contacts.fetching ? <ActivityIndicator color="#ffffff" /> :
          <Text style={{color: 'white'}} >Save</Text>
        }
      </Button>
    </Container>
    )
  }
}

const mapStateToProps = (state)=>{
  return{
    contacts: state.contacts,
  }
}
export default connect(mapStateToProps)(AddContact);
