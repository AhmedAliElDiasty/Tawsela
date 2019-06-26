import { Navigation } from 'react-native-navigation';
import { AsyncStorage, Platform, Text } from 'react-native';
import axios from 'axios';
import I18n from 'react-native-i18n';
import store from './store';
import registerScreens from './screens';
import {
    getColors,
    AppNavigation as nv,
    registerCustomIconType,
} from './common';
import { initLang, setLang } from './actions/lang';
import colors from './common/defaults/colors';
import { autoLogin } from './actions/authAction';



export const startApp = () => {
    Navigation.events().registerAppLaunchedListener(async () => {
        let once = false;

        axios.interceptors.request.use(
            config => {
              const { currentUser } = store.getState().auth;
              const { lang } = store.getState().lang;
        
              const Authorization =
                config.headers.Authorization === 'none'
                  ? {}
                  : {
                      Authorization: currentUser
                        ? `Bearer ${currentUser.token}`
                        : config.headers.Authorization,
                    };
              const { Authorization: auth, ...headers } = config.headers;
              return {
                ...config,
                headers: {
                  ...headers,
                  ...Authorization,
                },
              };              
            },
            error => {
              Promise.reject("============================+++++++++++",error);
            },
          );

        Navigation.setDefaultOptions({
            statusBar: {
                visible: true,
                style: Platform.Version < 23 ? 'light' : 'dark',
                backgroundColor: colors.statusBar,
            },
            topBar: {
                drawBehind: true,
                visible: false,
                animate: false,
            },
            layout: {
                backgroundColor: 'white',
                orientation: ['portrait'],
            },
            animations: {
                push: {
                    waitForRender: true,
                },
                showModal: {
                    waitForRender: false,
                },
            },
            bottomTabs: {
                visible: false,
                animate: false,
            },
        });
        await initLang('ar', true)(store.dispatch);
        const { exist } = await autoLogin()(
            store.dispatch,
            store.getState,
            
        );
        console.log('exist',exist);
        
        if (exist) {
                nv.init('MAIN_STACK', {
                    name: 'home',
                });
        } else {
            nv.init('MAIN_STACK', {
                name: 'login',
            });
        }
        registerScreens();
        
    });



};
