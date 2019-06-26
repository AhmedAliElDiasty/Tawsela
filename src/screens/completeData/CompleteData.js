import React, { Component } from 'react';
import I18n from 'react-native-i18n';
import {connect} from 'react-redux';
import { AppView, AppText, AppInput, AppButton, AppForm, AppImage, AppIcon } from '../../common';
import { completeData } from '../../actions/authAction';
import { bindActionCreators } from 'redux'
import AvatarPicker from '../../components/avatarPicker/AvatarPicker';
import {validationSchema} from './validation'

class CompleteData extends Component{
  onSubmit = async (values, { setSubmitting }) => {
    this.props.completeData(values, setSubmitting);
  };

renderForm = ({
    injectFormProps,
    isSubmitting,
    handleSubmit,
    setFieldValue,
}) => (
        <AppView marginTop={5} stretch marginHorizontal={15}>
            <AppInput
                placeholder={I18n.t("location")}
                nextInput={this.nameEnRef}
                size={7}
                center
                {...injectFormProps('location')}
                rightItems={
                    <AppIcon
                        name="user" type="entypo"
                    />
                }
            />
            <AppView stretch center>
                <AvatarPicker
                    onChange={uri => {
                        setFieldValue('image', uri);
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
        </AppView>
    );
render() {
    return (
        <AppView flex stretch>
            
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

        </AppView>
    );
}
}
const mapStateToProps = state => ({
connected: state.network.isConnected,
});

const mapDispatchToProps = dispatch => ({
completeData: bindActionCreators(completeData, dispatch),
});

export default connect(
mapStateToProps,
mapDispatchToProps,
)(CompleteData);