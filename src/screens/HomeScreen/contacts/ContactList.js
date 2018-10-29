import React, {Component} from 'react';
import {View, Text, ScrollView, TouchableOpacity, FlatList, ActivityIndicator, AsyncStorage} from 'react-native';
import {Button,Container, Content, List, ListItem, Header, Left, Body, Right, Spinner, Thumbnail, Item, Input} from 'native-base';
import {SearchBar} from 'react-native-elements';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';
import {connect} from 'react-redux';

import{fetchContacts, fetchGroups, getContact} from '../../../actions/contacts';
import contacts from '../../../reducers/index';

class ContactList extends Component {

  constructor(props){
    super(props);

  }

  componentDidMount(){
    this.props.dispatch(fetchContacts())
    AsyncStorage.getItem('userToken');
  }

  _logout = async () => {
    await AsyncStorage.removeItem('userToken', (err, result) => {
      alert('You has been log out')
    })
    this.props.navigation.navigate('AuthLoading')
  }

  _keyExtractor = (item, index) => item._id;

  render() {
    if(this.props.contacts.fetching){
      return (
        <Container style={{flex: 1,justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator color='#209fd5' />
        </Container>
      )
    }

    return (
        <Container style={{flex: 1}}>
          <SearchBar
            lightTheme
            placeholder='Search by Group Name...' />
          {
            (this.props.contacts.contacts.length > 0) ?
            <List>
              <FlatList
                data = {this.props.contacts.contacts}
                renderItem =
                  {({item}) => (
                      <ListItem avatar
                      onPress={() => this.props.navigation.navigate('ViewContact',{item})}
                      style={{flexDirection: 'row'}} >
                        <Left>
                          <Thumbnail style={{width: 50, height: 50}}
                            source={{ uri: 'https://image.flaticon.com/icons/png/512/147/147142.png' }}
                          />
                        </Left>
                        <Body>
                          <Text style={{color: 'black'}}>{item.name}</Text>
                          <Text note>{item.number}</Text>
                        </Body>
                        <Right/>
                      </ListItem>
                )}
                keyExtractor = {this._keyExtractor}
              />
          </List> :
          <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Icon name= 'md-contact' style={{fontSize: 60}}/>
            <Text style={{fontSize: 30}}>No Contacts</Text>
          </View>
          }
          <ActionButton
            buttonColor="#209fd5"
            onPress={() => this.props.navigation.navigate('AddContact')}
          />
          <ActionButton
            buttonColor="#ff1919"
            position = 'left'
            renderIcon={active => <Icon style={{color: 'white', fontSize: 20}} name='md-log-out'/>}
            onPress={() => this._logout()}
          />
        </Container>
    );
  }
}
const mapStateToProps = (state) => {
  return{
    contacts: state.contacts
  }
}
export default connect(mapStateToProps)(ContactList);
