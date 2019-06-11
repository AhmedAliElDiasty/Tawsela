import { SET_LANG } from '../actions/type';

const initialState = {
  lang: 'ar',
  rtl: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LANG:
      return { ...state, lang: action.lang, rtl: action.rtl };
    default:
      return state;
  }
};

export default reducer;
