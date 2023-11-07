import React from 'react';
import { TextInput as TextInputBase, StyleSheet } from 'react-native';
import { COLORS, SIZES } from '../../../constants/theme';
import ErrorText from '../../common/ErrorText';

const TextInput = props => {
  const { error, inputStyle } = props;

  return (
    <>
      <TextInputBase
        {...props}
        style={[styles.root, inputStyle, error && styles.error]}
        keyboardShouldPersistTaps="never"
      />
      <ErrorText error={error} />
    </>
  );
};

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

export default TextInput;
