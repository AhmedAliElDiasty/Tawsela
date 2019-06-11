import React,{Component} from 'react'
import {Text} from 'react-native'
import Fonts from '../../utils/Fonts'

export default class MediumText extends Component{
    render(){
        return(
            <Text style = {[{fontSize:15 ,fontFamily:Fonts.cocon },this.props.style]}>{this.props.value}</Text>
        )
    }
}