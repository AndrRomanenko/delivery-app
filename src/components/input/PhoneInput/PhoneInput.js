import React from 'react';
import { TextInput, StyleSheet, Text, View } from 'react-native';

import ErrorText from '../../common/ErrorText';

import useLanguageStyles from '../../../hooks/useLanguageStyles';
import { COLORS, SIZES } from '../../../constants/theme';
import { getCountryByCode } from '../../../utils/country';
import { checkPhone } from '../../../screens/Auth/Info/helper';

const PhoneInput = props => {
  const { error, value } = props;
  const { languageStyles } = useLanguageStyles();

  const countryFlag = getCountryByCode(checkPhone(value))?.flag || null;

  return (
    <>
      <View style={[styles.root, error && styles.error, languageStyles.row]}>
        {countryFlag && (
          <>
            <Text style={styles.flag}>
              {getCountryByCode(checkPhone(value)).flag}
            </Text>
            <View style={styles.divider} />
          </>
        )}

        <TextInput
          {...props}
          style={[styles.input, languageStyles.text]}
          keyboardType="phone-pad"
          keyboardShouldPersistTaps="never"
          error={error}
        />
      </View>
      <ErrorText error={error} />
    </>
  );
};

const styles = StyleSheet.create({
  root: {
    width: '100%',
    backgroundColor: COLORS.GRAY_LIGHT,
    borderRadius: SIZES.BORDER_RADIUS.BR14,
    borderWidth: 1,
    borderColor: COLORS.GRAY_LIGHT,
    alignItems: 'center',
    paddingHorizontal: SIZES.INPUT.PADDING.HORIZONTAL,
  },
  error: {
    borderWidth: 1,
    borderColor: COLORS.ORANGE,
  },
  input: {
    paddingVertical: SIZES.INPUT.PADDING.VERTICAL,
    fontSize: SIZES.TEXT.REGULAR,
    fontWeight: '400',
    color: COLORS.TEXT.BLACK,
    flex: 1,
  },
  divider: {
    width: SIZES.INPUT.PADDING.HORIZONTAL,
  },
});

export default PhoneInput;
