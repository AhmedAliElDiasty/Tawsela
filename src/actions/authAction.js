import { LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT } from './types';
import {
  API_ENDPOINT_GATEWAY,
  API_ENDPOINT_TAWSELA,
} from '../utils/Config';
import { initDeepStream } from './DeepStream';
import axios from 'axios'
import { showError } from '../common/utils/localNotifications';
import { AppNavigation } from '../common';
import {AsyncStorage} from 'react-native'


export const setCurrentUser = data => async (dispatch, getState) => {
    dispatch({
      type: LOGIN_SUCCESS,
      payload: data,
    });
  };
  
  export const resetLoginError = () => async (dispatch, getState) => {
    dispatch({
      type: LOGIN_RESET_ERROR,
    });
  };
  export const signIn = (values, setSubmitting) => async (dispatch, getState) => {
    try {
      const response = await axios.post(`${API_ENDPOINT_GATEWAY}user/login`, {
        email: values.email,
        password: values.password,
      });
        // console.log('response',response);
              
        AsyncStorage.setItem('@CurrentUser', JSON.stringify(response.data));

      dispatch({ type: LOGIN_SUCCESS, payload: response.data });
  
      AppNavigation.setStackRoot({
        name: 'home',
        passProps: {
          userData: response.data,
        },
      });

    } catch (error) {        
      setSubmitting(false);
      if (error[0].response && error[0].response.status === 401) {
        dispatch({ type: LOGIN_FAIL, payload: I18n.t('invalid-user') });
        // showError(I18n.t('invalid-user'));
      } else {
        dispatch({ type: LOGIN_FAIL, payload: error[1].message });
        // showError(error[1].message);
      }
    }
  };

  
  export function signUp(values, setSubmitting) {
    return async (dispatch, getState) => {
      const data = new FormData();
  
      data.append('nameAr', values.nameAr);
      data.append('nameEn', values.nameEn);
      data.append('email', values.email);
      data.append('password', values.password);
      if (values.profileImg) {
        data.append('profileImage', {
          uri: values.profileImg,
          type: 'image/*',
          name: 'profile-image',
        });
      }
  
      try {
          console.log("Data========>>>>",data);
          
        const response = await axios.post(
          `${API_ENDPOINT_GATEWAY}user`,
          data,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          },
        );
        console.log("Response",response.data);
        AsyncStorage.setItem('@CurrentUser', JSON.stringify(response.data));

        setSubmitting(false);
        
  
        dispatch({ type: LOGIN_SUCCESS, payload: response.data });
  
        AppNavigation.setStackRoot({
            name: 'completeData',
            passProps: {
              userData: response.data,
            },
          });

      } catch (error) {
          console.log('error',error);
          
        // showError(error[1].message);
        setSubmitting(false);
      }
    };
}

export const autoLogin = () => async (dispatch, getState) => {
    let userData = '';
    try {
      userData = await AsyncStorage.getItem('@CurrentUser');
    } catch (error) {
      console.log('AsyncStorage#getItem error: ', error.message);
    }
  
    if (userData) {
      userData = JSON.parse(userData);
  
      console.log('auto login');
      console.log(userData);
  
      initDeepStream(userData.accessToken, 'PROVIDER', userData.id);
      dispatch({
        type: LOGIN_SUCCESS,
        payload: userData,
      });
  
    //   if (userData.accepted) {
    //     return { exist: true, accepted: true };
    //   }
    //   const accepted = await internalAcceptanceCheck(userData);
      dispatch({
        type: LOGIN_SUCCESS,
        payload: {
          ...userData,
        //   accepted,
        },
      });
      AsyncStorage.setItem(
        '@CurrentUser',
        JSON.stringify({
          ...userData,
        //   accepted,
        }),
      );
      return { exist: true };
    }
    return { exist: false };
  };



  export function completeData(values, setSubmitting) {
    return async (dispatch, getState) => {
      const data = new FormData();
  
      data.append('location', values.location);
      if (values.image) {
        data.append('image', {
          uri: values.image,
          type: 'image/*',
          name: 'my-image',
        });
      }
  
      try {
          console.log("Data========>>>>",data);
          
        const response = await axios.post(
          `${API_ENDPOINT_GATEWAY}clients`,
          data,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          },
        );
        console.log("Response",response.data);
        // AsyncStorage.setItem('@CurrentUser', JSON.stringify(response.data));

        setSubmitting(false);
        
  
        // dispatch({ type: LOGIN_SUCCESS, payload: response.data });
  
        AppNavigation.setStackRoot({
            name: 'home',
            passProps: {
              userData: response.data,
            },
          });

      } catch (error) {
          console.log('error',error);
          
        // showError(error[1].message);
        setSubmitting(false);
      }
    };
}
  
//   export const logout = () => async (dispatch, getState) => {
//     const userId = store.getState().auth.currentUser.user.id;
//     getClient()
//       .record.getRecord(`fsa-dsProviders/${userId}`)
//       .unsubscribe();
  
//     setTimeout(() => {
//       getClient()
//         .record.getRecord(`fsa-dsProviders/${userId}`)
//         .discard();
//     }, 200);
  
//     await AsyncStorage.setItem('@CurrentUser', '');
//     AppNavigation.setStackRoot({
//       name: 'signIn',
//     });
//     setTimeout(() => dispatch({ type: LOGOUT }), 1500);
//   };
  

  