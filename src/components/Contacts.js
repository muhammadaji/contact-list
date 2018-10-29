import React, {Component} from 'react';
import {View, Text, TouchableOpacity, Alert, Image, ScrollView} from 'react-native';
import {Container, Header, Icon, Left, Body, Right, List, ListItem, Button, Content, Spinner, Card, CardItem} from 'native-base';

<Container>
  <Content style={{padding: 10}}>
    <Card borderRadius={20}>
      <CardItem style={{alignItems: 'center'}}>
        <Image
          resizeMode = 'stretch'
          blurRadius = {1}
          style={{top: 0, bottom: 0, left: 0, right: 0, position: 'absolute'}}
          source={{uri: 'https://www.virginexperiencedays.co.uk/content/img/product/large/the-view-from-the-12102928.jpg'}}
        />
        <Body>
          <Image
            style={{width: 150, height: 150, alignSelf: 'center'}}
            source={{uri: 'https://image.flaticon.com/icons/png/512/147/147142.png'}}
          />
        </Body>
      </CardItem>
    <CardItem style={{alignSelf: 'center', flexDirection: 'column'}} >
      <Text style={{color: 'black', fontSize: 22, fontWeight: '400'}}>{this.state.item.name}</Text>
      <Text style={{fontSize: 18}}>{this.state.item.address}</Text>
    </CardItem >
    <CardItem >
        <Icon name='md-phone-portrait' style={{color: 'grey'}}/>
        <View style={{flexDirection: 'column'}}>
          <Text>Mobile</Text>
          <Text style={{color: 'black'}}>{this.state.item.number}</Text>
        </View>
    </CardItem>
    <CardItem >
        <Icon name='ios-mail' style={{color: 'grey'}}/>
        <View style={{flexDirection: 'column'}}>
          <Text>Email</Text>
          <Text style={{color: 'black'}}>{this.state.item.email}</Text>
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
      <TouchableOpacity style={{marginLeft: 40,marginRight: 20}}>
        <Icon style={{color: '#2089dc', marginLeft: 7}} name='md-videocam'/>
        <Text>Create</Text>
      </TouchableOpacity>
    </CardItem>
  </Card>
  <Button block danger
    style={{marginTop: 20,marginLeft: 50, marginRight: 50}}
    onPress={()=>this.deleteConfirm(this.state.item._id)}>
    <Text style={{color: 'white', fontSize: 16}}>Delete</Text>
  </Button>
  <Button block primary
    style={{marginTop: 20,marginLeft: 50, marginRight: 50}}
    onPress={() => this.handleEdit(this.state.item)}>
    <Text style={{color: 'white', fontSize: 16}}>Edit</Text>
  </Button>
</Content>
</Container>
