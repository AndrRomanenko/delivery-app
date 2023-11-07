import React from 'react';
import { StyleSheet, View, Text, SafeAreaView } from 'react-native';

import ErrorIcon from '../../icons/common/error.svg';
import SuccessIcon from '../../icons/common/successTemp.svg';

import useLanguageStyles from '../../hooks/useLanguageStyles';
import { SCREEN_WIDTH } from '../../constants/device';
import { COLORS, FONTS, SIZES, STYLES } from '../../constants/theme';
import { TOAST_TYPES } from '../../constants/toasts';
import { moderateScale } from '../../utils/scale';

const ICON_SIZE = SCREEN_WIDTH * 0.06;

// TODO: Add icons for different types
const getToastIcon = toastType => {
  switch (toastType) {
    case TOAST_TYPES.SUCCESS:
      return <SuccessIcon width={ICON_SIZE} height={ICON_SIZE} />;
    default:
      return <ErrorIcon width={ICON_SIZE} height={ICON_SIZE} />;
  }
};

/**
 * Custom toast for in-app notification
 * By now, provides error notification by default as we need only error case.
 */
const Toast = ({ message, type }) => {
  const { languageStyles } = useLanguageStyles();
  return (
    <SafeAreaView>
      <View style={[styles.container, STYLES.shadow]}>
        <View style={[styles.content, languageStyles.row]}>
          {getToastIcon(type)}
          <View style={styles.divider} />
          <Text style={[styles.message, languageStyles.text]}>{message}</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: SCREEN_WIDTH * 0.9,
    backgroundColor: COLORS.WHITE,
    borderRadius: moderateScale(14),
    paddingHorizontal: moderateScale(18),
    paddingVertical: moderateScale(24),
    marginBottom: moderateScale(10),
  },
  divider: {
    width: moderateScale(20),
  },
  content: {
    alignItems: 'center',
    flex: 1,
  },
  message: {
    flex: 1,
    fontFamily: FONTS.REGULAR,
    color: COLORS.TEXT.BLACK,
    fontSize: SIZES.TEXT.MEDIUM,
    lineHeight: SIZES.TEXT.BOLD,
  },
});
export default Toast;
