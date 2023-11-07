import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS, SIZES } from '../../../constants/theme';

const InfoText = ({ children, onPress, style }) => {
  const renderText = () => {
    return (
      <Text style={[styles.text, onPress && styles.link, style]}>
        {children}
      </Text>
    );
  };

  return onPress ? (
    <TouchableOpacity onPress={onPress}>{renderText()}</TouchableOpacity>
  ) : (
    renderText()
  );
};

const styles = StyleSheet.create({
  text: {
    color: COLORS.GRAY_DARK,
    fontSize: SIZES.TEXT.SMALL,
    fontWeight: '400',
    marginBottom: SIZES.TEXT.MARGIN.SMALL,
  },
  link: {
    color: COLORS.BLUE,
    fontWeight: '600',
  },
});

export default InfoText;
