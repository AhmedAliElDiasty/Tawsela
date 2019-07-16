import React, { Component } from 'react';
import { connect } from 'react-redux';
import I18n from 'react-native-i18n';
import { AppView, AppIcon, AppInput, AppButton, AppForm } from '../../common';
import { bindActionCreators } from 'redux';
import { updatePortfolio } from '../../actions/authAction';
import AvatarPicker from '../../components/avatarPicker/AvatarPicker';
import { validationSchema } from './validation'

class UpdatePortfolio extends Component {
  componentDidMount() {
    console.log('CurrentUser', this.props.currentUser);
  }

  onSubmit = async (values, { setSubmitting }) => {
    this.props.updatePortfolio(values, setSubmitting);
  };

  renderForm = ({
    injectFormProps,
    isSubmitting,
    handleSubmit,
    setFieldValue,
  }) => (
    <AppView marginTop={5} stretch marginHorizontal={15}>
      <AppInput
        placeholder={I18n.t('nameAr')}
        ref={this.nameArRef}
        nextInput={this.nameEnRef}
        size={7}
        center
        {...injectFormProps('nameAr')}
        rightItems={<AppIcon name="user" type="entypo" />}
      />
      <AppInput
        placeholder={I18n.t('nameEn')}
        center
        {...injectFormProps('nameEn')}
        ref={this.nameEnRef}
        nextInput={this.emailRef}
        size={7}
        rightItems={<AppIcon name="user" type="entypo" />}
      />
      <AppInput
        placeholder={I18n.t('email')}
        email
        {...injectFormProps('email')}
        ref={this.emailRef}
        nextInput={this.passwordRef}
        size={7}
        center
        rightItems={<AppIcon name="email" type="zocial" />}
      />
      <AppInput
        ref={this.passwordRef}
        placeholder={I18n.t('password')}
        center
        secure
        {...injectFormProps('password')}
        size={7}
        rightItems={<AppIcon name="key" type="oct" />}
      />
      <AppView stretch center>
        <AvatarPicker
          initialUriValue={this.props.currentUser.profileImage}
          onChange={uri => {
            setFieldValue('profileImage', uri);
          }}
        />
      </AppView>

      <AppButton
        marginVertical={10}
        marginHorizontal={30}
        borderRadius={30}
        stretch
        title={I18n.t('update-portfile')}
        onPress={handleSubmit}
        processing={isSubmitting}
      />
    </AppView>
  );
  render() {
    const { currentUser } = this.props;    
    return (
      <AppView flex stretch center>
        <AppForm
          schema={{
            nameAr: currentUser.user.name.ar,
            nameEn: currentUser.user.name.en,
            email: currentUser.user.email,
            password: '',
          }}
          validationSchema={validationSchema}
          render={this.renderForm}
          onSubmit={this.onSubmit}
        />
      </AppView>
    );
  }
}
const mapStateToProps = state => ({
  currentUser: state.auth.currentUser,
});
const mapDispatchToProps = dispatch => ({
  updatePortfolio: bindActionCreators(updatePortfolio, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UpdatePortfolio);
