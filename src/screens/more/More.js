import React, { Component } from 'react';
import I18n from 'react-native-i18n';
import {connect} from 'react-redux'
import { AppView, AppText } from '../../common';
import { AppHeader, CustomBottomTabs } from '../../components';

class More extends Component{
  render(){
    return(
      <AppView>
        <AppHeader title={I18n.t('more-title')} hideBack/>
        <AppText>More</AppText>
        <CustomBottomTabs componentId={this.props.componentId} />
      </AppView>
    )
  }
}
const mapStateToProps = state =>({});

const mapDispatchToProps = dispatch =>({});

export default connect(mapStateToProps,mapDispatchToProps)(More);