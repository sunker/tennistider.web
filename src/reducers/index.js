import { combineReducers } from 'redux'
import errorReducer from './errorReducer'
import clubReducer from './clubReducer'
import authReducer from './authReducer'
import userSettingReducer from './userSettingReducer'

export default combineReducers({
  errors: errorReducer,
  auth: authReducer,
  club: clubReducer,
  settings: userSettingReducer
})
