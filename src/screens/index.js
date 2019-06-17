import React, { Component } from 'react';
import { Navigation } from 'react-native-navigation';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';

import { Provider } from 'react-redux';
import store from '../store';

import Login from './login/Login'
import Signup from './signup/Signup'
import PhotoSelection from './photoSelection/PhotoSelection';
import Home from './home/Home'


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


}