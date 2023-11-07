import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { WebView as WebViewBase } from 'react-native-webview';

import { COLORS, FONTS, SIZES } from '../../constants/theme';
import { moderateScale } from '../../utils/scale';

const WebView = ({ uri }) => {
  return (
    <View style={styles.container}>
      <WebViewBase
        nestedScrollEnabled
        startInLoadingState={true}
        renderLoading={() => (
          <View style={styles.loadingContainer}>
            <ActivityIndicator color={COLORS.ORANGE} />
          </View>
        )}
        renderError={errorName => (
          <Text style={styles.infoText}>{errorName}</Text>
        )}
        source={{ uri }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    position: 'absolute',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
  infoText: {
    textAlign: 'center',
    font: FONTS.SEMIBOLD,
    fontSize: SIZES.TEXT.BOLD,
    color: COLORS.TEXT.BLACK,
    fontWeight: '600',
    paddingBottom: moderateScale(35),
  },
});

export default WebView;
