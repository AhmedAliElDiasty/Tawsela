import React, { Component } from 'react';
import I18n from 'react-native-i18n';
import {connect} from 'react-redux'
import { AppView, AppText, AppList } from '../../common';
import { AppHeader, ProvidersCell, CustomBottomTabs } from '../../components';
import { API_ENDPOINT_TAWSELA } from '../../utils/Config';
import { refreshList } from '../../actions/list';
import { bindActionCreators } from 'redux';

class Favourite extends Component{

  state = {
    data: [],
    isVisible: true,
  };

  componentDidAppear = () => {
    this.setState({
      isVisible: !this.state.isVisible,
    });
  };
  onChangeFavourite = () => {
    this.props.refreshList('providersList');
  };

  render(){
    const {currentUser} = this.props
    return(
      <AppView flex stretch>
        <AppHeader title={I18n.t('favourite-title')} hideBack/>
        <AppList
          idPathInData="id"
          refreshControl={this.props.favouriteList}
          apiRequest={{
            url: `${API_ENDPOINT_TAWSELA}clients/${currentUser._id}/get-all-favorites`,

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
              userId={currentUser._id}
              data={data}
            />
          )}
          rowHeight={61.5}
        />
        <CustomBottomTabs componentId={this.props.componentId} />
      </AppView>
    )
  }
}
const mapStateToProps = state =>({
  currentUser:state.auth.currentUser,
  favouriteList: state.list.favouriteList,
});

const mapDispatchToProps = dispatch =>({
  refreshList: bindActionCreators(refreshList, dispatch),
});

export default connect(mapStateToProps,mapDispatchToProps)(Favourite);