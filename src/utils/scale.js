import { WINDOW_HEIGHT, WINDOW_WIDTH } from '../constants/device';

// Guideline sizes are based on standard iPhone X screen mobile device.
// TODO: Android
const guidelineBaseWidth = 390;
const guidelineBaseHeight = 844;

// Horizontal scale based on screen dimensions + base dimensions.
export const scale = size => {
  const isLandscape = WINDOW_WIDTH > WINDOW_HEIGHT;

  return (
    (WINDOW_WIDTH / (isLandscape ? guidelineBaseHeight : guidelineBaseWidth)) *
    size
  );
};

// Vertical scale based on screen dimensions + base dimensions.
export const verticalScale = size => {
  const isLandscape = WINDOW_WIDTH > WINDOW_HEIGHT;

  return (
    (WINDOW_HEIGHT / (isLandscape ? guidelineBaseWidth : guidelineBaseHeight)) *
    size
  );
};

// Horizontal scale with custom settable factor.
export const moderateScale = (size, factor = 0.5) => {
  return size + (scale(size) - size) * factor;
};
