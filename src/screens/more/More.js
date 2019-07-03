import React, { Component } from 'react';
import I18n from 'react-native-i18n';
import { connect } from 'react-redux';
import { AppView, AppText, AppSwitch, AppNavigation } from '../../common';
import { AppHeader, CustomBottomTabs } from '../../components';
import { bindActionCreators } from 'redux';
import { setLang } from '../../actions/lang';

class More extends Component {
  setLang = () => {
    this.props.rtl
      ? this.props.setLang('en', false)
      : this.props.setLang('ar', true);
  };
  render() {
    return (
      <AppView flex stretch>
        <AppHeader title={I18n.t('more-title')} hideBack />
        <AppView
          stretch
          height={10}
          row
          spaceBetween
          marginHorizontal={5}
          borderBottomWidth={0.5}
          borderBottomColor="grey"
        >
          <AppText size={8}>{I18n.t('language')}</AppText>
          <AppSwitch switchValue={!this.props.rtl} onChange={()=>this.setLang()} />
        </AppView>
        <AppView
          stretch
          height={10}
          marginHorizontal={5}
          borderBottomWidth={0.5}
          borderBottomColor="grey"
          onPress = {()=>{
            AppNavigation.push('updatePortfolio')
          }}
        >
          <AppText size={8}>{I18n.t('update-portfolio')}</AppText>
        </AppView>
        <CustomBottomTabs componentId={this.props.componentId} />
      </AppView>
    );
  }
}
const mapStateToProps = state => ({
  rtl: state.lang.rtl,
});

const mapDispatchToProps = dispatch => ({
  setLang: bindActionCreators(setLang, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(More);
