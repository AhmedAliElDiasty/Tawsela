import { combineReducers } from 'redux';


import lang from './lang';
import SelectedTab from './currentSelectedTab'
import network from './network';
import auth from './auth'
import list from './list'


export default combineReducers({
  lang: lang,
  selTab : SelectedTab,
  network,
  auth,
  list
});