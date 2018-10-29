import React from 'react';
import {createMaterialTopTabNavigator} from 'react-navigation';
import ContactList from './contacts/ContactList';
import GroupList from './groups/GroupList'

export default createMaterialTopTabNavigator({
  Contact:{
    screen: ContactList,
    navigationOptions: {
      title: 'Contact List'
    }
  },
  Group: {
    screen: GroupList,
    navigationOptions:{
      title: 'Group List'
    }
  }
},{
  tabBarOptions: {
    indicatorStyle: {
      backgroundColor: 'white'
    },
      style: {
      backgroundColor: '#2089dc',
      elevation: 0
    },
  }
})
