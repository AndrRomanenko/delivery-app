import React from 'react';
import { Text, StyleSheet } from 'react-native';

import useLanguageStyles from '../../../hooks/useLanguageStyles';
import { COLORS, FONTS, SIZES } from '../../../constants/theme';

/**
 * Label for all general imputs
 */
const InputLabel = ({ label, isRequired = false, style }) => {
  const { languageStyles } = useLanguageStyles();
  return (
    <Text style={[styles.root, languageStyles.text, style]}>
      {label}
      {isRequired && <Text style={styles.required}>*</Text>}
    </Text>
  );
};

const styles = StyleSheet.create({
  root: {
    width: '100%',
    color: THEME.COLORS.BLACK,
    fontSize: THEME.SIZES.TEXT.SMALL,
    marginBottom: THEME.SIZES.MARGIN.M10,
    fontFamily: THEME.FONTS.SEMIBOLD,
  },
  required: {
    color: COLORS.RED,
    fontSize: SIZES.TEXT.SMALL,
    fontWeight: '600',
    fontFamily: FONTS.SEMIBOLD,
  },
});

export default InputLabel;
