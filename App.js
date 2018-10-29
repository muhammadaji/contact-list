import React, { Component } from 'react';
import { Provider } from 'react-redux';
import {createStackNavigator, createSwitchNavigator} from 'react-navigation';

import HomeScreen from './src/screens/HomeScreen/HomeScreen';
import EditContact from './src/screens/HomeScreen/contacts/EditContact';
import AddContact from './src/screens/HomeScreen/contacts/AddContact';
import ViewContact from './src/screens/HomeScreen/contacts/ViewContact';
import AddGroup from './src/screens/HomeScreen/groups/AddGroup';
import ViewGroup from './src/screens/HomeScreen/groups/ViewGroup';
import EditGroup from './src/screens/HomeScreen/groups/EditGroup';
import AddMember from './src/screens/HomeScreen/groups/components/AddMember';
import LoginScreen from './src/screens/LoginScreen/LoginScreen';
import AuthLoadingScreen from './src/screens/AuthScreen/AuthLoadingScreen';

import store from './src/redux/store';

const AppStack = createStackNavigator ({
  HomeStack: {
    screen: HomeScreen,
    navigationOptions: {
      title: 'Contact List',
      header: null
    }
  },
  EditContact: {
    screen: EditContact,
    navigationOptions: {
      title: 'Edit Contact'
    }
  },
  AddContact: {
    screen: AddContact,
    navigationOptions: {
      title: 'Add Contact'
    }
  },
  ViewContact: {
    screen: ViewContact,
    navigationOptions: {
      title: 'View Contact'
    }
  },
  AddGroup: {
    screen: AddGroup,
    navigationOptions: {
      title: 'Add Group'
    }
  },
  ViewGroup: {
    screen: ViewGroup,
    navigationOptions: {
      title: 'View Group'
    }
  },
  AddMember: {
    screen: AddMember,
    navigationOptions:{
      title: 'Add Member'
    }
  },
  EditGroup: {
    screen: EditGroup,
    navigationOptions: {
      title:'Edit Group'
    }
  }
})

const AuthStack = createStackNavigator({
  LoginScreen: {
    screen: LoginScreen,
    navigationOptions: {
      header: null
    }
  },
})

const Root = createSwitchNavigator({
  AuthLoading: {
    screen: AuthLoadingScreen
  },
  App: AppStack,
  Auth: AuthStack
},{
  initialRouteName: 'AuthLoading',
})

class App extends Component {
  render(){
    return(
      <Provider store={store}>
        <Root/>
      </Provider>
    )
  }
}
export default App;
