import React, {Component} from 'react';
import {View, Text, CheckBox} from 'react-native';
import {ListItem, Left, Right, Body, Thumbnail} from 'native-base'

this.state ={
  check: false
}

checkBox= () => {
  this.setState({
    check: !this.state.check
  })
}
export default Contacts = (contacts) => (
  <ListItem avatar
    onPress={() => this.handleAdd(item._id)}
    style={{flexDirection: 'row'}} >
    <Left>
      <Thumbnail style={{width: 50, height: 50}}
        source={{ uri: 'https://image.flaticon.com/icons/png/512/147/147142.png' }}
      />
    </Left>
    <Body>
      <Text style={{color: 'black'}}>{contacts.name}</Text>
      <Text note>{contacts.number}</Text>
    </Body>
    <Left>
      <CheckBox value={this.state.check} onChange={() => this.checkBox()}/>
    </Left>
  </ListItem>
)
