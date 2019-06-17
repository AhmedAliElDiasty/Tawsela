import createDeepstream from 'deepstream.io-client-js';

import { DEEPSTREAM_ENDPOINT } from '../utils/Config';

const options = {
  maxReconnectInterval: 1000,
  reconnectIntervalIncrement: 200,
  // maxReconnectAttempts: Infinity,
  heartbeatInterval: 60000,
  // reconnectIntervalIncrement: 1000,
  maxReconnectAttempts: Infinity,
  // heartbeatInterval: 6000,
};

let client = null;

export const initDeepStream = (accessToken, type, userId) => {
  if (client) {
    closeDeepStream();
  }

  client = createDeepstream(DEEPSTREAM_ENDPOINT, options);

  client.on('connectionStateChanged', connection => {
    console.log(`Connection State Changed: ${connection}`);
  });

  // client.on('error', err => {
  //   console.log(`Deapstream error: ${err}`);
  // });

  client.on('error', (error, event, topic) => console.log(error, event, topic));

  if (accessToken) {
    authLogin(accessToken, type, userId);
  } else {
    anonLogin();
  }
};

export const closeDeepStream = userId => {
  if (userId) {
    closeUnseenNotificationCount(userId);
    closeUnseenMessagesCount(userId);
  }
  client.close();
  client = null;
};

export const getClient = () => client;

anonLogin = () => {
  client.login();
};

authLogin = (accessToken, type, userId) => {
  client.login(
    {
      id: userId,
      accessToken,
      loginAs: type,
    },
    (success, data) => {
      if (success) {
        initUnseenMessagesCount(userId);
        initUnseenNotificationCount(userId);
      } else {
        console.log('error');
      }
    },
  );
};
