import firebase from 'react-native-firebase';
import { AsyncStorage } from 'react-native';
import axios from 'axios';
import I18n from 'react-native-i18n';
import { API_ENDPOINT_TAWSELA } from './Config';

import { showError } from '../common/utils/localNotifications';

export default class PushNotificationService {
  initSubscribtion = async () => {
    try {
      const isSubscribed = await AsyncStorage.getItem('@fcmToken');
      console.log('STORAGE DATA', isSubscribed);
      if (isSubscribed !== null) {
        console.log('subscribed');
      } else {
        console.log('notSubscribed');
        this.subscribe();
      }
    } catch (error) {
      console.log('ERROR INIT SUBSCRIPE', error);
    }
  };

  updateSubscribtion = async newToken => {
    try {
      const oldToken = await AsyncStorage.getItem('@fcmToken');
      const response = await axios.post(
        `${API_ENDPOINT_TAWSELA}providers/push-update`,
        {
          oldToken,
          newToken,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      console.log('UPDATE SUBSCRIBE SUCCESS', response);
      await AsyncStorage.setItem('@fcmToken', newToken);
    } catch (error) {
      console.log(error, 'SUBSCRIBE ERROR');
      showError(error[1].message);
    }
  };

  subscribe = async () => {
    try {
      const fcmToken = await firebase.messaging().getToken();
      console.log('TOKEN----------');
      console.log(fcmToken);

      const response = await axios.post(
        `${API_ENDPOINT_TAWSELA}providers/push-subscribe`,
        {
          token: fcmToken,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      console.log('SUBSCRIBE SUCCESS', response);
      await AsyncStorage.setItem('@fcmToken', fcmToken);
    } catch (error) {
      console.log('SUBSCRIBE ERROR', JSON.parse(JSON.stringify(error)));
      // showError(error[1].message);
    }
  };

  unSubscribe = async () => {
    try {
      const deviceToken = await AsyncStorage.getItem('@fcmToken');
      const response = await axios.post(
        `${API_ENDPOINT_TAWSELA}providers/push-unsubscribe`,
        {
          token: deviceToken,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      console.log('UNSUBSCRIBED SUCCESSFULLY', response);
      await AsyncStorage.setItem('@fcmToken', '');
    } catch (error) {
      console.log(JSON.stringify(error), error, 'UNSUBSCRIBE ERROR');
      showError(error[2].token || error[1].message);
    }
  };
}
