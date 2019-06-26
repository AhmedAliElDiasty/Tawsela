import React, { Component } from 'react'
import { connect } from 'react-redux'
import { AppView, AppText, AppImage, AppInput, AppIcon, AppButton, AppNavigation, AppForm } from '../../common';
import Car from '../../assets/images/car.png'
import I18n from 'react-native-i18n'
import {validationSchema} from './Validation'
import { signIn } from '../../actions/authAction';
import {bindActionCreators} from 'redux'
import SplashScreen from 'react-native-splash-screen'

class Login extends Component {
    componentDidMount(){
        SplashScreen.hide();
    }

    renderForm = ({
        injectFormProps,
        isSubmitting,
        handleSubmit,
    }) => (
            <AppView marginTop={5} stretch marginHorizontal={15}>
                <AppInput 
                    {...injectFormProps('email')}
                    placeholder={I18n.t("email")}
                    size={7}
                    center
                    rightItems={
                        <AppIcon
                            name="email" type="zocial"
                        />
                    }
                />
                <AppInput 
                    {...injectFormProps('password')}
                    placeholder={I18n.t("password")}
                    center
                    secure
                    // showSecureEye
                    size={7}
                    rightItems={
                        <AppIcon
                            name="key" type="oct"
                        />
                    }
                />
                <AppText marginTop={-5} color="primary">{I18n.t("forgetPassword")}</AppText>
                <AppButton
                    marginVertical={20}
                    marginHorizontal={30}
                    borderRadius={30}
                    stretch
                    title={I18n.t("signIn")}
                    linear
                    onPress={handleSubmit}
                    processing={isSubmitting} />
                <AppView stretch center marginTop={20}>
                    <AppText>{I18n.t("don'tHaveAccount")}<AppText color='primary' onPress={() => AppNavigation.setStackRoot('signup')}>{I18n.t("signUp")}</AppText></AppText>
                </AppView>
            </AppView>
        );

    onSubmit = async (values, { setSubmitting }) => {
        this.props.signIn(values, setSubmitting);
    };

    render() {
        return (
            <AppView flex stretch>
                <AppView height={30} stretch marginTop={10} centerX >
                    <AppImage
                        source={Car}
                        width={20}
                        height={15}
                    />
                    <AppText center bold color='secondary' size={10}>
                        Tawsela
                </AppText>
                </AppView>

                <AppForm
                    schema={{
                        email: '',
                        password: '',
                    }}
                    validationSchema={
                        validationSchema
                    }
                    render={this.renderForm}
                    onSubmit={this.onSubmit}
                />
            </AppView>
        );
    }
}
const mapStateToProps = state => ({
    connected: state.network.isConnected,
  });
  
  const mapDispatchToProps = dispatch => ({
    signIn: bindActionCreators(signIn, dispatch),
  });
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps,
  )(Login);