import React, {Component} from 'react'
import {connect} from 'react-redux'
import { AppView, AppText } from '../../common';

class Home extends Component{
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