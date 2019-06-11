import { combineReducers } from 'redux';


import LangReducer from './langReducer';
import SelectedTab from './currentSelectedTab'


export default combineReducers({
  lang: LangReducer,
  selTab : SelectedTab
});