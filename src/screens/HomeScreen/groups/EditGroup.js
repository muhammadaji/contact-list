import React, {Component} from 'react';
import {TouchableOpacity, FlatList, Image, View} from 'react-native';
import {Container, Header, Left, Right, Body, Content, Text, Icon, Form, Item, Label, Input} from 'native-base';
import {connect} from 'react-redux';
import axios from 'axios';

import {fetchGroups, getGroup, updateGroup} from '../../../actions/groups';

class EditGroup extends Component{
  static navigationOptions = ({navigation}) => ({
    headerLeft: <TouchableOpacity onPress={()=>navigation.goBack()} >
                  <Icon  name='md-close' style={{marginLeft: 20,marginTop: 3,fontSize: 26,color: 'white'}}/>
                </TouchableOpacity>,
    headerTitle:<Text style={{fontSize: 16,color: 'white'}}>Edit Group</Text>,
    headerRight: navigation.state.params.headerRight,
    headerStyle:{
      backgroundColor: '#2089dc'
    }
  })

  constructor(props){
    super(props);
      this.state = {
        item: this.props.navigation.getParam('item', 'name', '_id', 'contacts')
      }
      this.state = {
        name: this.state.item.name,
        id: this.state.item._id,
      }
  }

  handleEdit(id){
    const value = {
      name: this.state.name,
    }
    this.props.dispatch(updateGroup(id, value))
    .then((result)=>{
      this.props.navigation.goBack();
    });
  }

  componentDidMount(){
    this.props.navigation.setParams({
      headerRight: <TouchableOpacity onPress={()=>this.handleEdit(this.state.id)} style={{marginRight: 20}} >
                    <Text style={{fontSize: 16, color: 'white'}}>SAVE</Text>
                  </TouchableOpacity>
    })
  }

  render(){
    return(
      <Container>
        <Content>
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
            <Item stackedLabel>
              <Label>Name :</Label>
              <Input editable={true} value={this.state.name} onChangeText={(text)=>this.setState({name: text})}/>
            </Item>
          </Form>
        </Content>
      </Container>
    )
  }
}

const mapStateToProps= (state) => {
  return{
    groups : state.groups
  }
}

export default connect(mapStateToProps)(EditGroup)
