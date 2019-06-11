import {SELECTED_TAB}  from '../actions/type';

const initialState = {
  currentIndex:0
};

const SelectedTab = (state = initialState, action) => {
  switch (action.type) {
    case SELECTED_TAB:

      return { 
        ...state,
        currentIndex:action.payload };

    default:
      return state;
  }
};

export default SelectedTab;
