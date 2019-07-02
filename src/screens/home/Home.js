import React, { Component } from 'react';
import { connect } from 'react-redux';
import { AppView, AppText, AppList, AppSpinner } from '../../common';
import SplashScreen from 'react-native-splash-screen';
import { ProvidersCell, AppHeader } from '../../components';
import axios from 'axios';
import { API_ENDPOINT_TAWSELA } from '../../utils/Config';
import { Navigation } from 'react-native-navigation';
import { bindActionCreators } from 'redux';
import { refreshList } from '../../actions/list';
import I18n from 'react-native-i18n';
import { CustomBottomTabs } from '../../components';
import { Platform } from 'react-native';

const BAR_HEIGHT_ANDROID = 56;
const BAR_HEIGHT_IOS = 49;
const barHeight = Platform.OS === 'ios' ? BAR_HEIGHT_IOS : BAR_HEIGHT_ANDROID;

class Home extends Component {
  constructor(props) {
    super(props);
    SplashScreen.hide();
    Navigation.events().bindComponent(this);
  }

  state = {
    data: [],
    isVisible: true,
  };

  componentDidAppear = () => {
    this.props.refreshList('providersList');
  };
  
  render() {
    console.log('State', this.state.data);
    const { currentUser } = this.props;

    return (
      <AppView flex stretch>
        <AppHeader hideBack title={I18n.t('home')} />
        <AppView flex stretch style={{ marginBottom: barHeight }}>
          <AppList
            idPathInData="user._id"
            refreshControl={this.props.providersList}
            apiRequest={{
              url: `${API_ENDPOINT_TAWSELA}providers`,

              responseResolver: response => {
                this.setState({
                  data: response.data.data,
                });
                return {
                  data: response.data.data,
                };
              },
              onError: error => {
                console.log('error', error);
              },
            }}
            rowRenderer={data => (
              <ProvidersCell
                onChangeFavourite={this.onChangeFavourite}
                userId={currentUser.user._id}
                data={data}
              />
            )}
            rowHeight={61.5}
          />
        </AppView>
        <CustomBottomTabs componentId={this.props.componentId} />
      </AppView>
    );
  }
}
const mapStateToProps = state => ({
  currentUser: state.auth.currentUser,
  providersList: state.list.providersList,
});

const mapDispatchToProps = dispatch => ({
  refreshList: bindActionCreators(refreshList, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home);
