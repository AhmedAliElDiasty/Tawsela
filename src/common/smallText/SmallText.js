import React,{Component} from 'react'
import {Text} from 'react-native'
import Fonts from '../../utils/Fonts'

export default class SmallText extends Component{
    render(){
        return(
            <Text style = {{fontSize:12 ,fontFamily:Fonts.cocon }}>{this.props.value}</Text>
        )
    }
}