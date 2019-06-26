import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  AppText,
  AppView,
  moderateScale,
  AppImage,
  AppStarRating,
  AppIcon,
  AppSpinner,
} from '../../common';
import { API_ENDPOINT_TAWSELA } from '../../utils/Config';
import axios from 'axios'

class ProvidersCell extends Component {
  componentDidMount(){
    
    
  }
  state = {
    loading: false,
  };
  favouriteToggle(id) {
    if (!this.props.data.inFavourites) {
      this.onAddToFavorite(id);
    } else {
      this.props.favorite ? this.onDelete(id) : this.onDeleteFavourite(id);
    }
  }

  onAddToFavorite = async id => {
    const clientId = this.props.userId;
    console.log(`${API_ENDPOINT_TAWSELA}clients/${clientId}/addTofavorite`);
    

    try {
      this.setState({ loading: true });
      const response = await axios.post(
        `${API_ENDPOINT_TAWSELA}clients/${clientId}/addTofavorite`,
        {
          provider: id,
        },
      );
      // this.props.updateItemInList(this.props.data.id, { inFavourites: true });
      this.setState({ loading: false });
      showSuccess(I18n.t('favourite-add'));
    } catch (error) {
      // showError(String(error[3]));
      this.setState({ loading: false });
      console.log("Error-----",error);
      
      console.log('errorOnAddFavourite', JSON.parse(JSON.stringify(error)));
    }
  };
  onDeleteFavourite = async id => {
    const clientId = this.props.userId;
    try {
      this.setState({ loading: true });
      const response = await axios.delete(
        `${API_ENDPOINT_TAWSELA}clients/${clientId}/providers/${id}/removefavorite`,
      );
      // this.props.updateItemInList(this.props.data.id, { inFavourites: false });
      this.setState({ loading: false });
      showSuccess(I18n.t('favourite-remove'));
    } catch (error) {
      this.setState({ loading: false });
      // showError(String(error[3]));
      console.log('ErrorOnDeleteFavourite', JSON.parse(JSON.stringify(error)));
    }
  };
  onDelete = async id => {
    const clientId = this.props.userId;
    const { data } = this.props;
    try {
      this.setState({ loading: true });
      const response = await axios.delete(
        `${API_ENDPOINT_TAWSELA}clients/${clientId}/providers/${id}/removefavorite`,
      );
      // this.props.updateItemInList(data.id, {}, v => ({
      //   product: { ...v.product, inFavourites: false },
      // }));
      this.props.onDelete();
      showSuccess(I18n.t('favourite-remove'));
      this.setState({ loading: false });
    } catch (error) {
      // showError(String(error[3]));
      this.setState({ loading: false });
      console.log('ErrorOnDelete', JSON.parse(JSON.stringify(error)));
    }
  };
  render() {
    const { data, rtl } = this.props;
    const image = data.user.profileImage;
    return (
      <AppView row stretch spaceBetween marginHorizontal={7} marginVertical={3}>
        <AppView row>
          <AppView centerY>
            <AppImage
              backgroundColor="pink"
              equalSize={20}
              resizeMode="contain"
              borderRadius={50}
            />
            <AppImage
              backgroundColor={data.busy ? 'grey' : '#5FDBA7'}
              equalSize={4}
              resizeMode="contain"
              borderRadius={50}
              style={{ position: 'absolute', top: 0, right: 0 }}
            />
            <AppView
              backgroundColor="white"
              borderRadius={10}
              marginTop={-5}
              marginHorizontal={2.5}
            >
              <AppStarRating size={5} rate={data.rating} />
            </AppView>
          </AppView>
          <AppView marginHorizontal={10} centerY >
            <AppText size={8}>
              {rtl ? data.user.name.ar : data.user.name.en}
            </AppText>
            <AppText color="#6a6a6a" size={5}>
              #{data.user._id}
            </AppText>
          </AppView>
        </AppView>

        <AppView centerX>
          <AppView>
            <AppText>{data.transferFees}</AppText>
          </AppView>
          <AppView
            // marginTop={20}
            borderRadius={50}
            paddingVertical={2.5}
            paddingHorizontal={4}
            backgroundColor={data.inFavourites ? 'primary' : '#EBEAEA'}
            // style={{ position: 'absolute', bottom: 7, right: 12 }}
          >
            {this.state.loading ? (
              <AppView paddingBottom={3}>
                <AppSpinner color="primary" size={8} />
              </AppView>
            ) : (
              <AppIcon
                name="heart"
                type="oct"
                size={10}
                color={data.inFavourites ? 'white' : '#777'}
                onPress={() => {
                  this.favouriteToggle(data.user._id);
                }}
              />
            )}
          </AppView>
        </AppView>
      </AppView>
    );
  }
}
const mapDispatchToProps = props => ({});
const mapStateToProps = state => ({
  rtl: state.lang.rtl,
  currentUser: state.auth.currentUser,
});
export default connect()(ProvidersCell);
