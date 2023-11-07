import React from 'react';
import { View, StyleSheet } from 'react-native';

import { moderateScale } from '../../../utils/scale';
import { COLORS } from '../../../constants/theme';
import { SCREEN_WIDTH } from '../../../constants/device';

const Divider = ({ style, disableMargin, fullWidth }) => (
  <View
    style={[
      styles.root,
      !disableMargin && styles.margin,
      fullWidth && styles.fullWidth,
      style,
    ]}
  />
);

const styles = StyleSheet.create({
  root: {
    height: moderateScale(1),
    borderBottomWidth: moderateScale(1),
    borderBottomColor: COLORS.GRAY_LIGHT,
  },
  margin: {
    marginTop: moderateScale(12),
    marginBottom: moderateScale(14),
  },
  fullWidth: {
    width: SCREEN_WIDTH,
    // PageContainer padding compensation.
    marginHorizontal: moderateScale(-16),
  },
});

export default Divider;
