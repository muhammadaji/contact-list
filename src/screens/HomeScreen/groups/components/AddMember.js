import React, {Component} from 'react';
import {View, Text, ScrollView, TouchableOpacity, FlatList, ActivityIndicator, ListView} from 'react-native';
import CheckBox from 'react-native-checkbox';
import {Button,Container, Content, List, ListItem, Header, Left, Body, Right, Spinner, Thumbnail, Item, Input, } from 'native-base';
import {SearchBar} from 'react-native-elements';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';
import {connect} from 'react-redux';
import axios from 'axios';

import {fetchContacts} from '../../../../actions/contacts';
import {getGroup, updateGroup} from '../../../../actions/groups';
import contacts from '../../../../reducers/index';

class AddMember extends Component {
  static navigationOptions = ({navigation}) => ({
    headerLeft: <TouchableOpacity
                  onPress={ () => {
                  navigation.goBack()
                  }} >
                  <Icon  name='md-close' style={{marginLeft: 20,marginTop: 3,fontSize: 26,color: 'white'}}/>
                </TouchableOpacity>,
    headerTitle: <Text style={{fontSize: 16,color: 'white'}}>Add Member</Text>,
    headerRight: navigation.state.params.headerRight,
    headerStyle: {
      backgroundColor: '#2089dc'
    }
  })

  constructor(props){
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      data: this.props.navigation.getParam('data','_id', 'contacts'),
      check: false,
    }
    this.state = {
      dataSource: ds.cloneWithRows(this.props.contacts.contacts),
      id: this.state.data._id,
      arrayHolder: []
    }
  }

  checkBox(id, index){
    let data = this.state.arrayHolder
    this.setState({
      check: !index,
    })
    if (index) {
      data.push(id)
    }else{
      data.splice(data.indexOf(id),1)
    }
    this.setState({arrayHolder: data, check: index})
  }

  componentDidMount(){
    this.props.dispatch(fetchContacts())
    this.props.dispatch(getGroup(this.state.id))
    this.props.navigation.setParams({
      headerRight: <TouchableOpacity onPress ={() => this.handleAdd()}>
                      <Text style={{color: 'white',fontSize: 18,marginRight: 15}} >SAVE</Text>
                   </TouchableOpacity>
    })
  }

  _keyExtractor = (item, index) => item._id;

  handleAdd(){
    const value = {contacts: this.state.arrayHolder}
    this.props.dispatch(updateGroup(this.state.id, value))
    .then(success => {
      this.props.navigation.goBack()
    })
  }

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
            placeholder='Search by Name...' />
          {
            (this.props.contacts.contacts.length > 0) ?
            <List>
              <ListView
                dataSource = {this.state.dataSource}
                renderRow =
                  {(item) =>
                      <ListItem avatar
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
                        <Left style={{marginRight: 10, marginTop: 6}}>
                          <CheckBox label ='' checked={this.state.check} onChange={(index) => this.checkBox(item._id, index)}/>
                        </Left>
                      </ListItem>

                }
              />
          </List> :
          <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Icon name= 'md-contact' style={{fontSize: 60}}/>
            <Text style={{fontSize: 30}}>No Contacts</Text>
          </View>
          }
        </Container>
    );
  }
}
const mapStateToProps = (state) => {
  return{
    contacts: state.contacts,
    groups: state.groups
  }
}
export default connect(mapStateToProps)(AddMember);
