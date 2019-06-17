import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  AppView,
  AppIcon,
  AppImage,
  AppNavigation,
  responsiveFontSize,
} from '../../common';

const placholder = require('../../assets/images/user.png');

class Avatar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imgUri: this.props.initialUriValue || null,
    };
  }

  selectProfileImg = uri => {
    this.setState({
      imgUri: uri,
    });
    this.props.onChange(uri);
  };

  renderPlusIcon = () => (
    <AppView
      center
      equalSize={4}
      borderRadius={5}
      backgroundColor="#5BBB86"
      style={{
        position: 'absolute',
        bottom: 0,
        right: this.props.rtl ? 0 : undefined,
        left: this.props.rtl ? undefined : 0,
      }}
    >
      <AppIcon
        type="font-awesome5"
        name="user-tie"
        size={4}
        color="white"
        style={{
          lineHeight: responsiveFontSize(4),
        }}
        marginLeft={-1}
      />
    </AppView>
  );

  render() {
    return (
      <AppView marginBottom={10} marginTop={5}>
        {this.state.imgUri ? (
          <AppView
            borderWidth={1}
            borderColor="grey"
            circleRadius={15}
            touchableOpacity
            onPress={() =>
              AppNavigation.push({
                name: 'photoSelection',
                passProps: {
                  action: this.selectProfileImg,
                },
              })
            }
          >
            <AppImage
              source={{ uri: this.state.imgUri }}
              resizeMode="cover"
              flex
              stretch
              circleRadius={15}
            />
          </AppView>
        ) : (
          <React.Fragment>
            <AppView
              borderWidth={1}
              borderColor="grey"
              circleRadius={15}
              center
              onPress={() =>
                AppNavigation.push({
                  name: 'photoSelection',
                  passProps: {
                    action: this.selectProfileImg,
                  },
                })
              }
              style={{
                overflow: 'visible',
              }}
            >
              <AppImage
                source={placholder}
                circleRadius={15}
                resizeMode="contain"
              />
              {this.renderPlusIcon()}
            </AppView>
          </React.Fragment>
        )}
      </AppView>
    );
  }
}

const mapStateToProps = state => ({
  rtl: state.lang.rtl,
});

export default connect(mapStateToProps)(Avatar);
