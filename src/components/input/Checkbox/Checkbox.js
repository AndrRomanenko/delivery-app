import React from 'react';
import { View, StyleSheet } from 'react-native';
import CheckBoxBase from '@react-native-community/checkbox';

import useLanguageStyles from '../../../hooks/useLanguageStyles';
import { isAndroid, isIOS } from '../../../constants/platform';
import { SCREEN_WIDTH } from '../../../constants/device';
import { COLORS } from '../../../constants/theme';

const Checkbox = ({ disabled, value, onValueChange, renderLabel }) => {
  const { languageStyles } = useLanguageStyles();

  return (
    <View style={[styles.container, languageStyles.row]}>
      <CheckBoxBase
        disabled={disabled}
        value={value}
        onValueChange={onValueChange}
        // iOS props
        boxType="square"
        onCheckColor={COLORS.WHITE}
        onFillColor={COLORS.BLUE}
        tintColor={COLORS.GRAY_DARK}
        onTintColor={COLORS.BLUE}
        onAnimationType="fade"
        offAnimationType="fade"
        // Android props
        tintColors={{ true: COLORS.BLUE }}
        style={[styles.checkBox, disabled && styles.disabled]}
      />
      {renderLabel && (
        <>
          <View style={styles.divider} />
          {renderLabel()}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  checkBox: {
    // TODO: look for a better solution, if broken
    height: isIOS() ? 22 : 26,
    width: isIOS() ? 22 : 28,
    transform: isAndroid() ? [{ scaleX: 1.4 }, { scaleY: 1.4 }] : undefined,
  },
  divider: {
    width: SCREEN_WIDTH * 0.02,
  },
  disabled: {
    opacity: 0.5,
  },
});

export default Checkbox;
