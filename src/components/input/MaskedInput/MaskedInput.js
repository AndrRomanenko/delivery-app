import React from 'react';
import { StyleSheet } from 'react-native';
import TextInputMask from 'react-native-text-input-mask';
import { COLORS, SIZES } from '../../../constants/theme';
import ErrorText from '../../common/ErrorText';

const MaskedInput = ({ error, inputStyle, mask, ...props }) => (
  <>
    <TextInputMask
      {...props}
      style={[styles.root, inputStyle, error && styles.error]}
      keyboardShouldPersistTaps="never"
      mask={mask}
    />
    <ErrorText error={error} />
  </>
);

const styles = StyleSheet.create({
  root: {
    width: '100%',
    paddingVertical: SIZES.INPUT.PADDING.VERTICAL,
    paddingHorizontal: SIZES.INPUT.PADDING.HORIZONTAL,
    backgroundColor: COLORS.GRAY_LIGHT,
    borderRadius: SIZES.BORDER_RADIUS.BR14,
    fontSize: SIZES.TEXT.REGULAR,
    fontWeight: '400',
    color: COLORS.TEXT.BLACK,
    borderWidth: 1,
    borderColor: COLORS.GRAY_LIGHT,
  },
  error: {
    borderColor: COLORS.ORANGE,
  },
});

export default MaskedInput;
