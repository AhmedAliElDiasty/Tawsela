import React, { Component } from 'react'
import { connect } from 'react-redux'
import { AppView, AppText, AppImage, AppInput, AppIcon, AppButton, AppScrollView, AppNavigation, AppForm } from '../../common';
import Car from '../../assets/images/car.png'
import AvatarPicker from '../../components/avatarPicker/AvatarPicker';
import I18n from 'react-native-i18n'
import {validationSchema} from './validation'
import {bindActionCreators} from 'redux'
import {signUp} from '../../actions/authAction'

class Signup extends Component {

    constructor(props) {
        super(props);

        this.nameArRef = React.createRef();
        this.nameEnRef = React.createRef();
        this.emailRef = React.createRef();
        this.passwordRef = React.createRef();
    }

    onSubmit = async (values, { setSubmitting }) => {
        this.props.signUp(values, setSubmitting);
      };

    renderForm = ({
        injectFormProps,
        isSubmitting,
        handleSubmit,
        setFieldValue,
    }) => (
            <AppView marginTop={5} stretch marginHorizontal={15}>
                <AppInput
                    placeholder={I18n.t("nameAr")}
                    ref={this.nameArRef}
                    nextInput={this.nameEnRef}
                    size={7}
                    center
                    {...injectFormProps('nameAr')}
                    rightItems={
                        <AppIcon
                            name="user" type="entypo"
                        />
                    }
                />
                <AppInput
                    placeholder={I18n.t("nameEn")}
                    center
                    {...injectFormProps('nameEn')}
                    ref={this.nameEnRef}
                    nextInput={this.emailRef}
                    size={7}
                    rightItems={
                        <AppIcon
                            name="user" type="entypo"
                        />
                    }
                />
                <AppInput
                    placeholder={I18n.t("email")}
                    email
                    {...injectFormProps('email')}
                    ref={this.emailRef}
                    nextInput={this.passwordRef}
                    size={7}
                    center
                    rightItems={
                        <AppIcon
                            name="email" type="zocial"
                        />
                    }
                />
                <AppInput 
                    ref={this.passwordRef}
                    placeholder={I18n.t("password")}
                    center
                    secure
                    {...injectFormProps('password')}
                    size={7}
                    rightItems={
                        <AppIcon
                            name="key" type="oct"
                        />
                    }
                /><AppView stretch center>
                    <AvatarPicker
                        onChange={uri => {
                            setFieldValue('profileImg', uri);
                        }}
                    />
                </AppView>

                <AppButton
                    marginVertical={10}
                    marginHorizontal={30}
                    borderRadius={30} 
                    stretch 
                    title={I18n.t("signUp")} 
                    onPress={handleSubmit}
                    processing={isSubmitting} />
                <AppView stretch center marginVertical={5}>
                    <AppText>{I18n.t("haveAcconut")}<AppText color='primary' onPress={() => AppNavigation.setStackRoot('login')}>{I18n.t("signIn")}</AppText></AppText>
                </AppView>
            </AppView>
        );
    render() {
        return (
            <AppScrollView flex stretch>
                <AppView height={20} stretch marginTop={5} centerX >
                    <AppImage
                        source={Car}
                        width={20}
                        height={15}
                    />
                    <AppText center bold color='secondary' size={10} marginTop={-5}>
                        Tawsela
                    </AppText>
                </AppView>
                <AppForm
                    schema={{
                        profileImg: '',
                        nameAr: '',
                        nameEn: '',
                        email: '',
                        password: '',
                    }}
                    validationSchema={
                        validationSchema
                    }
                    render={this.renderForm}
                    onSubmit={this.onSubmit}
                />

            </AppScrollView>
        );
    }
}
const mapStateToProps = state => ({
    connected: state.network.isConnected,
  });
  
  const mapDispatchToProps = dispatch => ({
    signUp: bindActionCreators(signUp, dispatch),
  });
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps,
  )(Signup);
  