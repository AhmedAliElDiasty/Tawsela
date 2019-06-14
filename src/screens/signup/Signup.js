import React , {Component} from 'react'
import {connect} from 'react-redux'
import { AppView, AppText } from '../../common';

class Signup extends Component{
    render(){
        return(
            <AppView>
                <AppText>Signup page</AppText>
            </AppView>
        );
    }
}

export default connect()(Signup);