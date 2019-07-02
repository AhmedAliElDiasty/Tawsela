import React, { Component } from 'react';
import I18n from 'react-native-i18n';
import {connect} from 'react-redux'
import { AppView, AppList } from '../../common';
import { AppHeader, CustomBottomTabs, FavouriteCell } from '../../components';
import { API_ENDPOINT_TAWSELA } from '../../utils/Config';
import { refreshList } from '../../actions/list';
import { bindActionCreators } from 'redux';
import {Navigation} from 'react-native-navigation';

class Favourite extends Component{

  constructor(props) {
    super(props);
    Navigation.events().bindComponent(this);
  }

  state = {
    data: [],
    isVisible: true,
  };
  

  componentDidAppear = () => {
    this.props.refreshList('favouriteList');
  };
  onChangeFavourite = () => {
    this.props.refreshList('favouriteList');
  };

  render(){
    const {currentUser} = this.props
    return(
      <AppView flex stretch>
        <AppHeader title={I18n.t('favourite-title')} hideBack/>
        <AppList
          idPathInData="provider.user._id"
          refreshControl={this.props.favouriteList}
          apiRequest={{
            url: `${API_ENDPOINT_TAWSELA}clients/${currentUser.user._id}/get-all-favorites`,

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
              console.log(`${API_ENDPOINT_TAWSELA}clients/${currentUser._id}/get-all-favorites`);
              
            },
          }}
          rowRenderer={data => (
            <FavouriteCell
              onChangeFavourite={this.onChangeFavourite}
              userId={currentUser.user._id}
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