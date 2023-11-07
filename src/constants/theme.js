import { SCREEN_HEIGHT, SCREEN_WIDTH } from './device';
import { StyleSheet } from 'react-native';

/**
 * Main theme colors
 */
export const COLORS = {
  WHITE: '#fff',
  BLACK: '#000',
  ORANGE: '#F84E27',
  ORANGE_LIGHT: '#FFF2EE',
  BLUE: '#3859CF',
  DARK_BLUE: '#2B3364',
  BLUE_LIGHT: '#E6EBFF',
  GRAY: '#EEEEEE',
  GRAY_LIGHT: '#F5F5F5',
  GRAY_DARK: '#6C6C80',
  APP_BACKGROUND: '#f2f2f2',
};

/**
 * Main theme sizing variables
 */
export const SIZES = {
  TEXT: {
    SMALL: SCREEN_WIDTH * 0.03,
    MEDIUM: SCREEN_WIDTH * 0.0358,
    LARGE: SCREEN_WIDTH * 0.051,
  },
  PADDING: {
    P10: SCREEN_WIDTH * 0.026,
    P12: SCREEN_WIDTH * 0.03,
    P14: SCREEN_WIDTH * 0.035,
    P20: SCREEN_WIDTH * 0.05128,
    P24: SCREEN_WIDTH * 0.06153,
  },
  MARGIN: {
    M8: SCREEN_WIDTH * 0.015,
    M10: SCREEN_WIDTH * 0.02564,
    M15: SCREEN_WIDTH * 0.03846,
    M24: SCREEN_WIDTH * 0.06153,
  },
};

export const FONTS = {
  REGULAR: 'SFPRODISPLAY-REGULAR',
  MEDIUM: 'SFPRODISPLAY-MEDIUM',
  SEMIBOLD: 'SFPRODISPLAY-SEMIBOLD',
  SEMIBOLDITALIC: 'SFPRODISPLAY-SEMIBOLDITALIC',
};

export const THEME = {
  COLORS,
  SIZES,
  FONTS,
};

export const STYLES = StyleSheet.create({
  shadow: {
    shadowColor: COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 6,
    zIndex: 3,
  },
});
