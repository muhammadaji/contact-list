const initialState={
  fetching: false,
  fetched: false,
  error: null,
  groups: [],
  data: {}
}

const groups = function(state = initialState, action){
  switch (action.type) {
    case 'FETCH_GROUPS_PENDING':
      return {...state, fetching: true};
      break;
    case 'FETCH_GROUPS_FULFILLED':
      return {...state, fetching: false, fetched: true, groups: action.payload.data};
      break;
    case 'FETCH_GROUPS_REJECTED':
      return {...state, fetching: false, error: action.payload };
      break;

    case 'GET_GROUP_PENDING':
      return {...state, fetching: true};
      break;
    case 'GET_GROUP_FULFILLED':
      return {...state, fetching: false, fetched: true, data: action.payload.data};
      break;
    case 'GET_GROUP_REJECTED':
      return {...state, fetching: false, error: action.payload };
      break;

    case 'DELETE_GROUP_PENDING':
      return {...state, fetching: true};
      break;
    case 'DELETE_GROUP_FULFILLED':
      const deleted = state.groups.filter(ini => {
        return ini._id !== action.payload.data._id
      })
      return {...state, fetching: false, fetched: true, groups: deleted};
      break;
    case 'DELETE_GROUP_REJECTED':
      return {...state, fetching: false, error: action.payload };
      break;

    case 'CREATE_GROUP_PENDING':
      return {...state, fetching: true, fetched: false};
      break;
    case 'CREATE_GROUP_FULFILLED':
      return {...state, fetching: false, fetched: true, groups: [...state.groups, action.payload.data]};
      break;
    case 'CREATE_GROUP_REJECTED':
      return {...state, fetching: false, error: action.payload };
      break;

    case 'UPDATE_GROUP_PENDING':
      return {...state, fetching: true, fetched: false};
      break;
    case 'UPDATE_GROUP_FULFILLED':
      const updated = state.groups.map(update => {
        if (update._id == action.payload.data._id) {
          return action.payload.data
        }else{
          return update
        }
      })
      return {...state, fetching: false, fetched: true, groups: updated, data: action.payload.data};
      break;

    case 'UPDATE_GROUP_REJECTED':
      return{...state, fethed: false, error: true, fething: false}

    default:
     return state;
  }
}

export default groups;
