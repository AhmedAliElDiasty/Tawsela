import { combineReducers } from 'redux';


import lang from './lang';
import SelectedTab from './currentSelectedTab'


export default combineReducers({
  lang: lang,
  selTab : SelectedTab
});