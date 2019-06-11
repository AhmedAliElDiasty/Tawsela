import { Dimensions, PixelRatio } from 'react-native';


const { roundToNearestPixel } = PixelRatio;

const { height, width } = Dimensions.get('window');

export const aspectRatio = () => height / width;

export const responsiveWidth = w => roundToNearestPixel(width * (w / 100));

export const responsiveHeight = h => roundToNearestPixel(height * (h / 100));

export const moderateScale = (size, factor = 0.5) =>
  roundToNearestPixel(size + (responsiveWidth(size) - size) * factor);

export const responsiveFontSize = (f, factor = 0.5) =>
  roundToNearestPixel(f + (responsiveWidth(f) - f) * factor);
