import React, {Component} from 'react'
import {connect} from 'react-redux'
import { AppView, AppText } from '../../common';
import SplashScreen from 'react-native-splash-screen'
class Home extends Component{
    componentDidMount(){
        SplashScreen.hide();
    }
    render(){
        return(
            <AppView>
                <AppText>
                    Home Screen
                </AppText>
            </AppView>
        )
    }
}
const mapStateToProps = state =>({

})

const mapDispatchToProps = props =>({

})

export default connect(mapStateToProps,mapDispatchToProps)(Home)