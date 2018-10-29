import React, {Component} from 'react';
import {View, Text, TouchableOpacity, Alert, Image, ScrollView, FlatList, ActivityIndicator} from 'react-native';
import {Container, Header, Icon, Left, Body, Right, List, ListItem, Button, Content, Spinner, Card, CardItem} from 'native-base';
import ActionButton from 'react-native-action-button';
import axios from 'axios';
import {connect} from 'react-redux';
import {getContact, deleteContact} from '../../../actions/contacts';

class ViewContact extends Component{
  static navigationOptions = ({navigation, state, props})=>({
    headerLeft: navigation.state.params.headerLeft,
    headerTitle: <Text style={{fontSize: 16,color: 'white'}}>View Contact</Text>,
    headerStyle: {
      backgroundColor: '#2089dc'
    }
  })

  constructor(props){
    super(props);
      this.state = {
        item: this.props.navigation.getParam('item','name', 'number', '_id', 'email', 'address')
      }
  }

  componentDidMount(){
    this.props.dispatch(getContact(this.state.item._id))
    this.props.navigation.setParams({
      headerLeft: <TouchableOpacity
        onPress={ () => {
          this.props.navigation.goBack()
        }} >
        <Icon  name='md-close' style={{marginLeft: 20,marginTop: 3,fontSize: 26,color: 'white'}}/>
      </TouchableOpacity>
    })
  }

  handleDelete(id){
    this.props.dispatch(deleteContact(id))
    this.props.navigation.goBack()
  }

  _keyExtractor = (item, index) => item._id;

  deleteConfirm = (id) => {
    Alert.alert(
      'Confirmation',
      'Are you sure want delete this contact ?',
      [
        {text: 'No', onPress:() => console.log('Canceled'), style: 'cancel'},
        {text: 'Yes', onPress: () => this.handleDelete(id)}
      ]
    )
  }

  handleEdit(data){
    this.props.navigation.navigate('EditContact',{data});
  }
  render(){

    if(this.props.contacts.fetching){
      return(
        <Container style={{flex: 1,justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator color='blue' />
        </Container>
      )
    }

    const data = this.props.contacts.data;
    return(
      <ScrollView>
        <Container>
          <Content style={{padding: 10}}>
                <Card>
                  <CardItem style={{alignItems: 'center'}}>
                    <Image
                      resizeMode = 'stretch'
                      blurRadius = {1}
                      style={{top: 0, bottom: 0, left: 0, right: 0, position: 'absolute'}}
                      source={{uri: 'http://www.city-data.com/forum/attachments/city-vs-city/139596d1416187703-best-sunset-city-chicago-skyline-3-.jpg'}}
                    />
                  <Body style={{elevation: 2, alignItems:'center' }}>
                      <Image
                        style={{width: 150, height: 150, alignSelf: 'center'}}
                        source={{uri: 'https://image.flaticon.com/icons/png/512/147/147142.png'}}
                      />
                      <View style={{flexDirection: 'row'}}>
                        <Left>
                          <Text style={{color: 'white', fontSize: 22, fontWeight: '400',}}>{data.name}</Text>
                          <Text style={{color: 'white'}}>{data.address}</Text>
                        </Left>
                        <TouchableOpacity onPress={() => this.handleEdit(data)}>
                          <Icon style={{color: 'white', alignSelf: 'flex-end', marginTop: 14}} name='md-create' />
                        </TouchableOpacity>
                      </View>
                    </Body>
                </CardItem>
                <CardItem >
                    <Icon name='md-phone-portrait' style={{color: 'grey'}}/>
                    <View style={{flexDirection: 'column'}}>
                      <Text>Mobile</Text>
                      <Text style={{color: 'black'}}>{data.number}</Text>
                    </View>
                </CardItem>
                <CardItem >
                    <Icon name='ios-mail' style={{color: 'grey'}}/>
                    <View style={{flexDirection: 'column'}}>
                      <Text>Email</Text>
                      <Text style={{color: 'black'}}>{data.email}</Text>
                    </View>
                </CardItem>
                <CardItem >
                  <TouchableOpacity style={{marginLeft: 30,marginRight: 30}}>
                    <Icon style={{color: '#2089dc'}} name='md-call'/>
                    <Text>Call</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={{marginLeft: 60,marginRight: 50}}>
                    <Icon style={{color: '#2089dc', marginLeft: 2}} name='md-chatboxes'/>
                    <Text>Text</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={{marginLeft: 40 }}>
                    <Icon style={{color: '#2089dc', marginLeft: 7}} name='md-videocam'/>
                    <Text>Create</Text>
                  </TouchableOpacity>
                </CardItem>
              </Card>
          <Button block danger
            style={{marginTop: 10,marginLeft: 50, marginRight: 50}}
            onPress={()=>this.deleteConfirm(this.state.item._id)}>
             <Text style={{color: 'white', fontSize: 16}}>Delete</Text>
          </Button>
        </Content>
      </Container>
    </ScrollView>
    )
  }
}

const mapStateToProps = (state) => {
  return{
    contacts: state.contacts
  }
}

export default connect(mapStateToProps)(ViewContact);
