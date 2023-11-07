import React from 'react';
import { Text, StyleSheet } from 'react-native';

import { moderateScale } from '../../../utils/scale';
import { COLORS } from '../../../constants/theme';

const PillLabel = ({ label }) => <Text style={styles.root}>{label}</Text>;

const styles = StyleSheet.create({
  root: {
    overflow: 'hidden',
    backgroundColor: COLORS.BLUE_LIGHT,
    color: COLORS.BLUE,
    paddingVertical: moderateScale(6),
    paddingHorizontal: moderateScale(18),
    borderRadius: moderateScale(14),
  },
});

export default PillLabel;
