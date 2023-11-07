import React from 'react';
import { Text, StyleSheet, View } from 'react-native';

import useLanguageStyles from '../../../hooks/useLanguageStyles';
import { COLORS, SIZES } from '../../../constants/theme';

const ErrorText = ({ style, error }) => {
  const { languageStyles } = useLanguageStyles();

  return (
    <View style={styles.errorContainer}>
      {error && (
        <Text style={[styles.text, languageStyles.text, style]}>{error}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  errorContainer: {
    height: SIZES.INPUT.MARGIN,
    justifyContent: 'center',
  },
  text: {
    color: COLORS.ORANGE,
    fontSize: SIZES.TEXT.SMALL,
    fontWeight: '400',
    width: '100%',
    paddingHorizontal: SIZES.INPUT.PADDING.HORIZONTAL,
  },
});

export default ErrorText;
