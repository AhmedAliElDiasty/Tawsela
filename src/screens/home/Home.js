import React, { Component } from 'react';
import { connect } from 'react-redux';
import { AppView, AppText, AppList, AppSpinner } from '../../common';
import SplashScreen from 'react-native-splash-screen';
import { ProvidersCell } from '../../components';
import axios from 'axios';
import { API_ENDPOINT_TAWSELA } from '../../utils/Config';
import { Navigation } from 'react-native-navigation';
import { bindActionCreators } from 'redux';
import {refreshList} from '../../actions/list'
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
    this.setState({
      isVisible: !this.state.isVisible,
    });
  };


  async componentDidMount() {
    try {
      const response = await axios.get(`${API_ENDPOINT_TAWSELA}providers`);
      if (response) {
        await this.setState({
          data: response.data.data,
        });
      }
    } catch (error) {
      console.log('====================================');
      console.log('Error', error);
      console.log('====================================');
    }
  }

  onChangeFavourite = () => {
    this.props.refreshList('providersList');
  };

  render() {
    console.log('State', this.state.data);
    const { currentUser } = this.props;

    return (
      <AppView flex stretch>
        <AppList
          idPathInData="id"
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
            <ProvidersCell onChangeFavourite={this.onChangeFavourite} userId={currentUser._id} data={data} />
          )}
          rowHeight={61.5}
        />
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
