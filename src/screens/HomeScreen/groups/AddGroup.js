import React, {Component} from 'react';
import {View,Text,TouchableOpacity, Image} from 'react-native';
import {Container, Form, Label, Item, Input, Icon, Button,Header,Left,Body,Right} from 'native-base';
import axios from 'axios';
import {connect} from 'react-redux';

import {fetchGroups, createGroup} from '../../../actions/groups';
import groups from '../../../reducers/index';

class AddGroup extends Component{

  static navigationOptions = ({navigation})=>({
    header: null
  })

  constructor(){
    super();
    this.state = {
      name: '',
      isValid: true,
    }
  }

  handleDone(){
    const data = {
      name: this.state.name,
    }

      if (data.name != '') {
        this.props.dispatch(createGroup(data))
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
              this.props.dispatch(fetchGroups())
            }}>
            <Icon  name='md-close' style={{marginLeft: 20,marginTop: 3,fontSize: 26,color: 'white'}}/>
          </TouchableOpacity>
        </Left>
        <Body>
          <Text style={{fontSize: 16,color: 'white'}}>Create Group</Text>
        </Body>
        <Right>
          <TouchableOpacity onPress={()=>this.handleDone()} style={{marginRight: 20}} ><Text style={{fontSize: 16, color: 'white'}}>SAVE</Text></TouchableOpacity>
        </Right>
      </Header>
      <View style={{marginBottom: 12}}>
        <View style={{position: 'absolute'}}>
          <Image
            resizeMode = 'cover'
            blurRadius = {1}
            style={{width: 400, height: 180, flexDirection: 'column'}}
            source={{uri: 'https://cdn.pixabay.com/photo/2017/03/14/21/40/winter-sunset-2144492_960_720.jpg'}} />
        </View>
        <View style={{alignItems: 'center'}}>
          <Image
            style={{width: 150, height: 150, marginTop: 15}}
            source={{uri: 'https://mbtskoudsalg.com/images/group-icon-png-8.png'}}
          />
        </View>
      </View>
      <Form>
        <Item>
          <Icon  name='md-person' />
          <Input placeholder= "Name" onChangeText={(text)=>this.setState({name: text})}/>
        </Item>
      </Form>
    </Container>
    )
  }
}

const mapStateToProps = (state)=>{
  return{
    groups: state.groups,
  }
}
export default connect(mapStateToProps)(AddGroup);
