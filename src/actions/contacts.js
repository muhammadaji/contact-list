import axios from 'axios';

export function fetchContacts() {
  return{
    type: 'FETCH_CONTACTS',
    payload: axios({
      method: 'get',
      url: 'http://192.168.0.18:5000/api/contacts/'
    })
  }
}

export function getContact(id) {
  return{
    type: 'GET_CONTACT',
    payload: axios({
      method: 'get',
      url: `http://192.168.0.18:5000/api/contacts/${id}`
    })
  }
}

export function createContact(value){
  return{
    type: 'CREATE_CONTACT',
    payload: axios({
      method: 'post',
      url: 'http://192.168.0.18:5000/api/contacts/',
      data: value
    })
  }
}

export function updateContact(value){
  return{
    type: 'UPDATE_CONTACT',
    payload: axios({
      method: 'put',
      url: `http://192.168.0.18:5000/api/contacts/${value._id}`,
      data: value
    })
  }
}

export function deleteContact(id){
  return{
    type: 'DELETE_CONTACT',
    payload: axios({
      method: 'delete',
      url: `http://192.168.0.18:5000/api/contacts/${id}`
    })
  }
}
