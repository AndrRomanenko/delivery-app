import { Platform } from 'react-native';
import DeviceInfo from 'react-native-device-info';

export const SPECIFIC_ORIENTATIONS = {
  LANDSCAPE: 'LANDSCAPE',
  LANDSCAPE_LEFT: 'LANDSCAPE-LEFT',
  LANDSCAPE_RIGHT: 'LANDSCAPE-RIGHT',
  PORTRAIT: 'PORTRAIT',
  PORTRAIT_UPSIDE_DOWN: 'PORTRAITUPSIDEDOWN',
  UNKNOWN: 'UNKNOWN',
};

export const model = DeviceInfo.getModel();

export const isAndroid = () => Platform.OS === 'android';
export const isIOS = () => Platform.OS === 'ios';

export const isTablet = () => false;
