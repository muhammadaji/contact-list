import React, {Component} from 'react';
import {View, Text, ScrollView, TouchableOpacity, FlatList, ActivityIndicator} from 'react-native';
import {Button,Container, Content, List, ListItem, Header, Left, Body, Right, Spinner, Thumbnail, Item, Input} from 'native-base';
import {SearchBar} from 'react-native-elements';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';
import {connect} from 'react-redux';

import{fetchGroups} from '../../../actions/groups';
import groups from '../../../reducers/index';

class GroupList extends Component{

  componentDidMount(){
    this.props.dispatch(fetchGroups());
  }

  _keyExtractor = (item, index) => item._id;

  render(){

    if (this.props.groups.fetching) {
      return (
        <Container style={{flex: 1,justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator color='#209fd5' />
        </Container>
      )
    }

    return(
      <Container>
        <SearchBar
          lightTheme
          placeholder='Search by Group Name...' />
        {
          (this.props.groups.groups.length > 0) ?
          <List>
            <FlatList
              data = {this.props.groups.groups}
              keyExtractor = {this._keyExtractor}
              renderItem =
              {({item}) => (
                  <ListItem avatar
                    onPress = {() => this.props.navigation.navigate('ViewGroup', {item})}>
                    <Left>
                      <Thumbnail style={{width: 50, height: 50}}
                        source={{ uri: 'https://mbtskoudsalg.com/images/group-icon-png-8.png' }}
                      />
                    </Left>
                    <Body>
                      <Text style={{fontSize: 18, color: 'black'}}>{item.name}</Text>
                    </Body>
                    <Right/>
                  </ListItem>
              )}
            />
          </List> :
          <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Icon name= 'md-contacts' style={{fontSize: 60}}/>
            <Text style={{fontSize: 30}}>No Groups</Text>
          </View>
        }
        <ActionButton
          buttonColor="#209fd5"
          onPress={() => this.props.navigation.navigate('AddGroup')}
        />
      </Container>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    groups: state.groups
  }
}

export default connect(mapStateToProps)(GroupList)
