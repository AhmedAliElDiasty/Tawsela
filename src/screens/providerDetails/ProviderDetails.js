import React, { Component } from 'react';
import I18n from 'react-native-i18n';
import { connect } from 'react-redux';
import {
  AppView,
  AppImage,
  AppText,
  AppStarRating,
  AppIcon,
  showSuccess,
  showError,
} from '../../common';
import { BlurView } from '@react-native-community/blur';
import { findNodeHandle, Dimensions, Image } from 'react-native';
import styles from './styles';
import img from '../../assets/images/img.jpg';
import { AppHeader } from '../../components';
import axios from 'axios'
import { API_ENDPOINT_TAWSELA } from '../../utils/Config';

class ProviderDetails extends Component {
  constructor(props) {
    super(props);
    this.state = { viewRef: null ,inFavourites:false};
  }

  state = {
    loading: false,
  };
  componentDidMount(){
    console.log('InFavourites:',this.props.data.inFavourites);
    
    this.setState({
      inFavourites:this.props.data.inFavourites
    })
  }
  favouriteToggle(id) {
    if (!this.state.inFavourites) {
      this.onAddToFavorite(id);
    } else {
      this.props.favorite ? this.onDelete(id) : this.onDeleteFavourite(id);
    }
  }

  onAddToFavorite = async id => {
    const clientId = this.props.id;
    try {
      this.setState({ loading: true });
      const response = await axios.post(
        `${API_ENDPOINT_TAWSELA}clients/${clientId}/addTofavorite`,
        {
          provider: id,
        },
      );
      this.setState({ loading: false , inFavourites:true });
      showSuccess(I18n.t('favourite-add'));
    } catch (error) {
      showError(error.message);
      this.setState({ loading: false });
      console.log('Error-----', error);

      console.log('errorOnAddFavourite', `${API_ENDPOINT_TAWSELA}clients/${clientId}/addTofavorite  ${id}`);
    }
  };
  onDeleteFavourite = async id => {
    const clientId = this.props.id;
    try {
      this.setState({ loading: true });
      const response = await axios.delete(
        `${API_ENDPOINT_TAWSELA}clients/${clientId}/providers/${id}/removefavorite`,
      );
      this.setState({ loading: false ,inFavourites:false});
      showSuccess(I18n.t('favourite-remove'));
    } catch (error) {
      this.setState({ loading: false });
      // showError(String(error[3]));
      console.log('error', error);

      console.log('ErrorOnDeleteFavourite', JSON.parse(JSON.stringify(error)));
    }
  };
  onDelete = async id => {
    const clientId = this.props.id;
    const { data } = this.props;
    try {
      this.setState({ loading: true });
      const response = await axios.delete(
        `${API_ENDPOINT_TAWSELA}clients/${clientId}/providers/${id}/removefavorite`,
      );
      showSuccess(I18n.t('favourite-remove'));
      this.setState({ loading: false,inFavourites:false });
    } catch (error) {
      // showError(String(error[3]));
      console.log('error', error);
      this.setState({ loading: false });
      console.log('ErrorOnDelete', JSON.parse(JSON.stringify(error)));
    }
  };

  async imageLoaded() {
    await this.setState({ viewRef: findNodeHandle(this.backgroundImage) });
    console.log('ImgRef', this.state.viewRef);
  }
  renderCell = (title, value) => {
    return (
      <AppView
        stretch
        height={7}
        row
        spaceBetween
        marginHorizontal={5}
        borderBottomWidth={0.5}
        borderBottomColor="grey"
      >
        <AppText size={8}>{title} </AppText>
        <AppText size={6}>{value}</AppText>
      </AppView>
    );
  };
  render() {
    const { data, rtl } = this.props;
    const { user } = this.props.data;
    const gender = rtl
      ? data.gender === 'MALE'
        ? 'ذكر'
        : 'أنثى'
      : data.gender === 'MALE'
      ? 'Male'
      : 'Female';
    const name = rtl ? user.name.ar : user.name.en;
    const busy = rtl
      ? data.busy === 'true'
        ? 'نعم'
        : 'لا'
      : data.gender === 'true'
      ? 'Yes'
      : 'No';

    return (
      <AppView flex stretch>
        <AppHeader title={I18n.t('providerDetailsTitle')} />
        <AppView stretch height={35}>
          <Image
            source={{uri:data.identityCard}}
            style={[styles.absolute]}
            ref={img => {
              this.backgroundImage = img;
            }}
            onLoadEnd={this.imageLoaded.bind(this)}
          />
          <BlurView
            blurType="light"
            blurAmount={5}
            viewRef={this.state.viewRef}
            style={styles.absolute}
          />
          <AppView stretch flex center>
            <AppImage source={{uri:data.identityCard}}  circleRadius={30}/>
          </AppView>
        </AppView>
        {this.renderCell(`${I18n.t('name')}:`, name)}
        {this.renderCell(`${I18n.t('gender')}:`, gender)}
        {this.renderCell(`${I18n.t('email')}:`, user.email)}
        {this.renderCell(`${I18n.t('busy?')}`, busy)}
        {this.renderCell(`${I18n.t('transferFees')}:`, data.transferFees)}
        <AppView
          stretch
          height={7}
          row
          spaceBetween
          marginHorizontal={5}
          borderBottomWidth={0.5}
          borderBottomColor="grey"
        >
          <AppText size={8}>{`${I18n.t('rating')}:`}</AppText>
          <AppStarRating rate={data.rating} />
        </AppView>
        <AppView
         center stretch
        >
          <AppIcon
          name="heart"
          type="oct"
          size={25}
          color={this.state.inFavourites ? 'primary' : '#777'}
          onPress={() => {
            this.favouriteToggle(data.user._id);
          }}
        />
        </AppView>
        
      </AppView>
    );
  }
}
const mapStateToProps = state => ({
  rtl: state.lang.rtl,
});
const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProviderDetails);
