import axios from 'axios';

export function fetchGroups(){
  return{
    type: 'FETCH_GROUPS',
    payload: axios({
      method: 'get',
      url: 'http://192.168.0.18:5000/api/groups/'
    })
  }
}

export function getGroup(id){
  return{
    type: 'GET_GROUP',
    payload: axios({
      method: 'get',
      url: `http://192.168.0.18:5000/api/groups/${id}`
    })
  }
}

export function createGroup(value){
  return{
    type: 'CREATE_GROUP',
    payload: axios({
      method: 'post',
      url: 'http://192.168.0.18:5000/api/groups/',
      data: value
    })
  }
}

export function deleteGroup(id){
  return{
    type: 'DELETE_GROUP',
    payload: axios({
      method: 'delete',
      url: `http://192.168.0.18:5000/api/groups/${id}`
    })
  }
}

export function updateGroup(id, value){
  return{
    type: 'UPDATE_GROUP',
    payload: axios({
      method: 'put',
      url: `http://192.168.0.18:5000/api/groups/${id}`,
      data: value
    })
  }
}
