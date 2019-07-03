import React, { Component } from 'react';
import { Navigation } from 'react-native-navigation';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';

import { Provider } from 'react-redux';
import store from '../store';

import Login from './login/Login'
import Signup from './signup/Signup'
import PhotoSelection from './photoSelection/PhotoSelection';
import Home from './home/Home'
import CompleteData from './completeData/CompleteData'
import Favourite from './favourite/Favourite';
import More from './more/More'
import ProviderDetails from './providerDetails/ProviderDetails'
import AppPickerModal from './appPickerModal/AppPickerModal';
import UpdatePortfolio from './updatePortfolio/UpdatePortfolio'



export default function () {
    const createScene = InternalComponent => () =>
        gestureHandlerRootHOC(
            class SceneWrapper extends Component {
                render() {
                    return (
                        <Provider store={store}>
                            <InternalComponent {...this.props} />
                        </Provider>
                    );
                }
            },
        );
    Navigation.registerComponent('login', createScene(Login));
    Navigation.registerComponent('signup', createScene(Signup));
    Navigation.registerComponent('photoSelection', createScene(PhotoSelection));
    Navigation.registerComponent('home',createScene(Home));
    Navigation.registerComponent('completeData',createScene(CompleteData));
    Navigation.registerComponent('favourite',createScene(Favourite));
    Navigation.registerComponent('more',createScene(More));
    Navigation.registerComponent('providerDetails',createScene(ProviderDetails));
    Navigation.registerComponent('appPickerModal',createScene(AppPickerModal));
    Navigation.registerComponent('updatePortfolio',createScene(UpdatePortfolio));
    


}