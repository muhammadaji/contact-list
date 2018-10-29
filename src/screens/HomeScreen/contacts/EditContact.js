import React, {Component} from 'react';
import {TouchableOpacity, FlatList, Image, View} from 'react-native';
import {Container, Header, Left, Right, Body, Content, Text, Icon, Form, Item, Label, Input} from 'native-base';
import {connect} from 'react-redux';
import axios from 'axios';

import {fetchContacts, getContact, updateContact} from '../../../actions/contacts';

class EditContact extends Component{
  static navigationOptions = ({navigation}) => ({
    header: null
  })

  constructor(props){
    super(props);
      this.state = {
        contact: this.props.navigation.getParam('data')
      }
      this.state = {
        name: this.state.contact.name,
        number: this.state.contact.number,
        id: this.state.contact._id,
        email: this.state.contact.email,
        address: this.state.contact.address,
      }
  }

  handleEdit(){
    const value = {
      _id: this.state.id,
      name: this.state.name,
      number: this.state.number,
      email: this.state.email,
      address: this.state.address,
    }
    this.props.dispatch(updateContact(value))
    this.props.navigation.goBack()
  }

  render(){
    return(
      <Container>
        <Header style={{backgroundColor: '#2089dc'}}>
          <Left>
            <TouchableOpacity onPress={()=>this.props.navigation.goBack()} >
              <Icon  name='md-close' style={{marginLeft: 20,marginTop: 3,fontSize: 26,color: 'white'}}/>
            </TouchableOpacity>
          </Left>
          <Body>
            <Text style={{fontSize: 16,color: 'white'}}>Edit Contact</Text>
          </Body>
          <Right>
            <TouchableOpacity onPress={()=>this.handleEdit()} style={{marginRight: 20}} >
              {
                this.props.contacts.pending ? <ActivityIndicator color='white' /> : <Text style={{fontSize: 16, color: 'white'}}>SAVE</Text>
              }
            </TouchableOpacity>
          </Right>
        </Header>
        <Content>
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
            <Item stackedLabel>
              <Label>Name :</Label>
              <Input editable={true} value={this.state.name} onChangeText={(text)=>this.setState({name: text})}/>
            </Item>
            <Item stackedLabel>
              <Label>Number :</Label>
              <Input editable={true} value={this.state.number} maxLength={13}  keyboardType='numeric' onChangeText={(text)=>this.setState({number: text})}/>
            </Item>
            <Item stackedLabel>
              <Label>Email :</Label>
              <Input editable={true} value={this.state.email} onChangeText={(text)=>this.setState({email: text})}/>
            </Item>
            <Item stackedLabel>
              <Label>Address :</Label>
              <Input editable={true} value={this.state.address}  onChangeText={(text)=>this.setState({address: text})}/>
            </Item>
          </Form>
        </Content>
      </Container>
    )
  }
}

const mapStateToProps= (state) => {
  return{
    contacts : state.contacts
  }
}

export default connect(mapStateToProps)(EditContact)
