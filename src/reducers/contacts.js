const initialState={
  fetching: false,
  fetched: false,
  error: false,
  contacts: [],
  data: {}
}

const contacts = function(state = initialState, action){
  switch (action.type) {
    case 'FETCH_CONTACTS_PENDING':
      return {...state, fetching: true};
      break;
    case 'FETCH_CONTACTS_FULFILLED':
      return {...state, fetching: false, fetched: true, contacts: action.payload.data};
      break;
    case 'FETCH_CONTACTS_REJECTED':
      return {...state, fetching: false, error: true };
      break;

    case 'GET_CONTACT_PENDING':
      return {...state, fetching: true};
      break;
    case 'GET_CONTACT_FULFILLED':
      return {...state, fetching: false, fetched: true, data: action.payload.data};
      break;
    case 'GET_CONTACT_REJECTED':
      return {...state, fetching: false, error: true };
      break;

    case 'CREATE_CONTACT_PENDING':
      return {...state, fetching: true};
      break;
    case 'CREATE_CONTACT_FULFILLED':
      return {...state, fetched: true, fetching: false, contacts: [...state.contacts,action.payload.data]};
      break;
    case 'CREATE_CONTACT_REJECTED':
      return {...state, error: true, fetching: false, fetched: false };
      break;

    case 'UPDATE_CONTACT_PENDING':
      return {...state, fetching: true, fetched: false};
      break;
    case 'UPDATE_CONTACT_FULFILLED':
      const updated = state.contacts.map(update => {
        if (update._id == action.payload.data._id) {
          return action.payload.data
        }else{
          return update
        }
      })
      return {...state, fetching: false, fetched: true, contacts: updated, data: action.payload.data};
      break;
    case 'UPDATE_CONTACT_REJECTED':
      return {...state, error: true, fething: false};
      break;

    case 'DELETE_CONTACT_PENDING':
      return {...state, fetching: true, fetched: false};
      break;
    case 'DELETE_CONTACT_FULFILLED':
      const deleted = state.contacts.filter(ini => {
        return ini._id !== action.payload.data._id
      })
      return {...state, fetching: false, fetched: true, contacts: deleted }
      break;
    case 'DELETE_CONTACT_REJECTED':
      return {...state, error: true, fetching: false,}

    default:
     return state;
  }
}

export default contacts;
