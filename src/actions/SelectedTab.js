import * as types from './type';

export const onSelectedTab = (index) => async (dispatch, store) => {
  console.log("index" , index);
  
  dispatch({ type: types.SELECTED_TAB ,payload:index });
};