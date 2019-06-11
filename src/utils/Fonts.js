import { Platform } from 'react-native';

export default {
  cocon: Platform.OS === 'ios' ? '' : 'JFFlatregular',
  coconLight: Platform.OS === 'ios' ? '' : 'JFFlatlight',
  coconBold: Platform.OS === 'ios' ? '' : 'JFFlatmedium',
};
