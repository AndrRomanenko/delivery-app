import { useIsFocused } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import WebView from 'react-native-webview';

import IconButton from '../../../components/IconButton';
import LoadingSpinner from '../../../components/LoadingSpinner';
import PageHeader from '../../../components/PageHeader';
import { COLORS } from '../../../constants/theme';

const PaymentFrame = ({ navigation, route }) => {
  const {
    session: { cancelUrl, sessionUrl, successUrl },
    onSuccess,
    onError,
  } = route.params;
  const isFocused = useIsFocused();

  const getSecureUrl = url => url.replace('http://', 'https://');

  const secureSuccessUrl = getSecureUrl(successUrl);
  const secureCancelUrl = getSecureUrl(cancelUrl);

  const onNavStateChange = ({ url, canGoBack }) => {
    if (!isFocused) {
      return;
    }
    if (url.includes(successUrl) || url.includes(secureSuccessUrl)) {
      navigation.goBack();
      onSuccess();
    } else if (url.includes(cancelUrl) || url.includes(secureCancelUrl)) {
      navigation.goBack();
      const err = new Error('Unexpected error');
      onError(err);
    }
  };

  return (
    <View style={styles.container}>
      <PageHeader
        leftButton={
          <IconButton
            name="close"
            startInLoadingState
            onPress={navigation.goBack}
            style={styles.centerContainer}
            color={COLORS.GRAY_DARK}
            size={22}
          />
        }
      />
      <WebView
        enableApplePay
        originWhitelist={['*']}
        renderLoading={() => <LoadingSpinner color={COLORS.BLACK} />}
        onNavigationStateChange={onNavStateChange}
        source={{
          uri: sessionUrl,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default PaymentFrame;
