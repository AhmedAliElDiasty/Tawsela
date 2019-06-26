import React, { Component } from 'react'
import {connect} from 'react-redux'
import { AppText } from '../../common';

class ProvidersCell extends Component{
  render(){
    return(
      <AppView>
        <AppText>Cell</AppText>
      </AppView>
    )
  }
}
export default connect()(ProvidersCell)