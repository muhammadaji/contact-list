import {combineReducers} from 'redux';

import contacts from './contacts';
import groups from './groups';

const appReducer = combineReducers({
  contacts: contacts,
  groups: groups
})

export default appReducer;
