import React from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';

import { COLORS, SIZES } from '../../../constants/theme';

/**
 * Regular button component
 */
const Button = ({
  label,
  onPress,
  style,
  secondary = false,
  disabled,
  loading,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={[styles.button(secondary), disabled && styles.disabled, style]}
      onPress={onPress}
      disabled={disabled || loading}>
      {loading ? (
        <ActivityIndicator color={secondary ? COLORS.ORANGE : COLORS.WHITE} />
      ) : (
        <Text style={styles.label(secondary)}>{label}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: secondary => ({
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: secondary ? COLORS.ORANGE_LIGHT : COLORS.ORANGE,
    paddingVertical: SIZES.BUTTON.PADDING.VERTICAL,
    paddingHorizontal: SIZES.BUTTON.PADDING.HORIZONTAL,
    marginBottom: SIZES.BUTTON.MARGIN,
    borderRadius: SIZES.BORDER_RADIUS.BR14,
  }),
  label: secondary => ({
    color: secondary ? COLORS.ORANGE : '#fff',
    fontSize: SIZES.TEXT.REGULAR,
    fontWeight: '500',
  }),
  disabled: {
    opacity: 0.4,
  },
});

export default Button;
