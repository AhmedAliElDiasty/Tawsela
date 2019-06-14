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


export const startApp =() => {
    Navigation.events().registerAppLaunchedListener(async () => {
        let once = false;

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
        registerScreens();
        nv.init('MAIN_STACK', {
            name: 'Login',
        });
    });
    


};
