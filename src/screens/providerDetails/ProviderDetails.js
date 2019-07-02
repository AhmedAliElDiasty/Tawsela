import React, { Component } from 'react';
import I18n from 'react-native-i18n';
import { connect } from 'react-redux';
import { AppView, AppImage, AppText } from '../../common';
import { BlurView } from "@react-native-community/blur";
import { findNodeHandle , Dimensions , Image} from 'react-native'
import styles from './styles'
import img from '../../assets/images/img.jpg'
import { AppHeader } from '../../components';


class ProviderDetails extends Component{
  constructor(props) {
    super(props);
    this.state = { viewRef: null };
  }

  async imageLoaded() {
    await this.setState({ viewRef: findNodeHandle(this.backgroundImage) });
    console.log('ImgRef',this.state.viewRef);
    
  }
  render(){
    return(
      <AppView flex stretch>
        <AppHeader title={I18n.t('providerDetailsTitle')}/>
        <AppView stretch flex>
        <Image
          ref={img => {
            this.backgroundImage = img;
          }}
          source={ img }
          style={{width:30,height:30}}
          onLoadEnd={this.imageLoaded.bind(this)}
        />
        <BlurView
          viewRef={this.state.viewRef}
          blurType="light"
          blurAmount={10}
          height={10}
          width={Dimensions.get('window')}
        />
       
        </AppView>
        
      </AppView>
    )
  }
}
const mapStateToProps = state => ({});
const mapDispatchToProps = dispatch =>({});

export default connect(mapStateToProps,mapDispatchToProps)(ProviderDetails);