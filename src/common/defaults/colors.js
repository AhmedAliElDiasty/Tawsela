import { Platform } from 'react-native';

export default {
  statusBar: Platform.Version < 23 ? '#e2412b' : '#fff',
  foreground: '#484848',
  // primary: '#F56363',
  primary: '#DF8432',
  secondary: '#429B27',
  thirdly: '#ee4037',
  primaryLight: '#00397A',
  safe: '#007F41',
  warning: '#FFC107',
  error: '#D0021B',
  danger: '#C62828',
  disabled: '#d1d5d8',
  grey: '#ACB5BB',
  darkgrey: '#858F96',
  inputBorderColor: '#858F96',
  inputBorderWidth: 0.5,
  star: '#FFC850',
};
