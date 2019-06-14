import React , {Component} from 'react'
import {connect} from 'react-redux'
import { AppView, AppText } from '../../common';

class Login extends Component{
    render(){
        return(
            <AppView>
                <AppText>Login page</AppText>
            </AppView>
        );
    }
}

export default connect()(Login);