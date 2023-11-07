import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { COLORS } from '../../constants/theme';

const LoadingSpinner = ({ style, color = COLORS.ORANGE, size }) => (
  <View style={[styles.loadingContainer, style]}>
    <ActivityIndicator color={color} size={size} />
  </View>
);

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default LoadingSpinner;
