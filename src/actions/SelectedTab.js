import * as types from './types';

export const onSelectedTab = (index) => async (dispatch, store) => {
  console.log("index" , index);
  
  dispatch({ type: types.SELECTED_TAB ,payload:index });
};