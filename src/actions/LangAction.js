import I18n from 'react-native-i18n';
import { AsyncStorage } from 'react-native';
import * as types from './type';


export const setLTR = () => async (dispatch, store) => {
  I18n.locale = 'en';
  AsyncStorage.setItem('@Lang', 'en');
  dispatch({ type: types.SET_LTR });
};

export const setRTL = () => async (dispatch, store) => {
  I18n.locale = 'ar';
  AsyncStorage.setItem('@Lang', 'ar');
  dispatch({ type: types.SET_RTL });
};
