import React, {Component} from 'react';
import {View, Text, TouchableOpacity, Alert, Image, ScrollView, FlatList} from 'react-native';
import {Container, Header, Icon, Left, Body, Right, List, ListItem, Button, Content, Spinner, Card, CardItem, Thumbnail} from 'native-base';
import ActionButton from 'react-native-action-button';
import axios from 'axios';
import {connect} from 'react-redux';
import {fetchGroups, getGroup, deleteGroup} from '../../../actions/groups';

class ViewGroup extends Component{
  static navigationOptions = ({navigation})=>({
    headerLeft: <TouchableOpacity
                  onPress={ () => {
                    navigation.goBack()
                  }} >
                  <Icon  name='md-close' style={{marginLeft: 20,marginTop: 3,fontSize: 26,color: 'white'}}/>
                </TouchableOpacity>,
    headerTitle: <Text style={{fontSize: 16,color: 'white'}}>View Group</Text>,
    headerStyle: {
      backgroundColor: '#2089dc'
    }
  })

  constructor(props){
    super(props);
      this.state = {
        item: this.props.navigation.getParam('item','_id', 'name')
      }
  }

  componentDidMount(){
    this.props.dispatch(getGroup(this.state.item._id))
  }

  handleDelete(id){
    this.props.dispatch(deleteGroup(id))
    this.props.navigation.goBack()
  }

  _keyExtractor = (item, index) => item._id;

  deleteConfirm = (id) => {
    Alert.alert(
      'Confirmation',
      'Are you sure want delete this group ?',
      [
        {text: 'No', onPress:() => console.log('Canceled'), style: 'cancel'},
        {text: 'Yes', onPress: () => this.handleDelete(id)}
      ]
    )
  }

  handleEdit(item){
    this.props.navigation.navigate('EditGroup',{item});
  }

  render(){

    if(this.props.groups.fetching){
      return(
        <Container style={{flex: 1,justifyContent: 'center', alignItems: 'center'}}>
          <Spinner color='blue' />
        </Container>
      )
    }

    const data = this.props.groups.data;

    return(
      <ScrollView vertical = {true} showsVerticalScrollIndicator = {false}>
        <Content style={{padding: 10}}>
          <Card borderRadius={4}>
            <CardItem style={{alignItems: 'center', flexDirection: 'column'}}>
              <Image
                resizeMode = 'stretch'
                blurRadius = {1}
                style={{top: 0, bottom: 0, left: 0, right: 0, position: 'absolute'}}
                source={{uri: 'https://cdn.pixabay.com/photo/2017/03/14/21/40/winter-sunset-2144492_960_720.jpg'}}
              />
              <Body>
                <Image
                  style={{width: 150, height: 150, alignSelf: 'center'}}
                  source={{uri: 'https://mbtskoudsalg.com/images/group-icon-png-8.png'}}
                />
              <View style={{flexDirection: 'row'}}>
                <Left>
                  <Text style={{color: 'white', fontSize: 22, fontWeight: '400',}}>{data.name}</Text>
                </Left>
                <TouchableOpacity onPress={() => this.handleEdit(data)}>
                  <Icon style={{color: 'white', alignSelf: 'flex-end'}} name='md-create' />
                </TouchableOpacity>
              </View>
              </Body>
            </CardItem>
            <CardItem>
              <Left>
                <Text style={{color: 'black', fontSize: 16}}>Members</Text>
              </Left>
              <Right>
                <TouchableOpacity
                  onPress = {() => this.props.navigation.navigate('AddMember',{data})}>
                  <Icon style={{color: '#2089dc',fontSize: 20}} name = 'md-person-add'/>
                </TouchableOpacity>
              </Right>
            </CardItem>
            <FlatList
              data = {data.contacts}
              keyExtractor = {this._keyExtractor}
              extraData = {this.state}
              renderItem =
              {({item}) => (
                <TouchableOpacity
                  onPress = {() => this.props.navigation.navigate('ViewContact', {item})}>
                  <CardItem style={{alignItems: 'flex-start'}}>
                    <View style={{marginRight: 10}}>
                      <Thumbnail small source={{uri: 'https://image.flaticon.com/icons/png/512/147/147142.png'}} />
                    </View>
                    <View>
                      <Text style={{color: 'black'}}>{item.name}</Text>
                      <Text>{item.number}</Text>
                    </View>
                  </CardItem>
                </TouchableOpacity>
              )}
            />
           </Card>
        <Button block danger
          style={{marginTop: 10,marginLeft: 50, marginRight: 50}}
          onPress={()=>this.deleteConfirm(this.state.item._id)}>
          <Text style={{color: 'white', fontSize: 16}}>Delete</Text>
        </Button>
      </Content>
    </ScrollView>
    )
  }
}
const mapStateToProps = (state) => {
  return{
    groups: state.groups
  }
}
export default connect(mapStateToProps)(ViewGroup);
