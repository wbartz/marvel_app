import { combineReducers } from 'redux'

import heroReducer from './Hero'

export default combineReducers({
  hero: heroReducer
});