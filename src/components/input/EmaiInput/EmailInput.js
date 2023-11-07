import { COLORS, SIZES } from '../../../constants/theme';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import useLanguageStyles from '../../../hooks/useLanguageStyles';

const EmailInput = props => {
  const { errors, labelName, touched } = props;
  const styles = useStyles(touched, errors);
  const { t: translation } = useTranslation('personalInfoScreen');
  const { languageStyles } = useLanguageStyles();

  return (
    <View style={styles.container}>
      <View>
        <Text style={[styles.nameLabel, languageStyles.text]}>{labelName}</Text>
        <TextInput {...props} style={[styles.input, languageStyles.text]} />
      </View>
      {touched && errors && (
        <View>
          <Text style={[styles.nameError, languageStyles.text]}>
            {translation('invalidEmail')}
          </Text>
        </View>
      )}
    </View>
  );
};

const useStyles = (touched, errors) =>
  StyleSheet.create({
    container: {
      paddingHorizontal: SIZES.PADDING.P20,
      marginTop: SIZES.MARGIN.M20,
    },
    nameLabel: {
      fontFamily: 'SFPRODISPLAY-SEMIBOLD',
      fontWeight: '600',
      fontSize: SIZES.TEXT.SMALL,
      color: COLORS.TEXT.BLACK,
      marginBottom: SIZES.MARGIN.M10,
    },
    input: {
      backgroundColor: COLORS.GRAY_LIGHT,
      paddingVertical: SIZES.PADDING.P12,
      paddingLeft: SIZES.PADDING.P16,
      borderRadius: SIZES.BORDER_RADIUS.BR12,
      fontFamily: 'SFPRODISPLAY-REGULAR',
      fontWeight: '400',
      fontSize: SIZES.TEXT.REGULAR,
      color: COLORS.TEXT.BLACK,
      borderWidth: touched && errors ? 1 : 0,
      borderColor: COLORS.BLUE,
    },
    nameError: {
      fontFamily: 'SFPRODISPLAY-SEMIBOLD',
      fontWeight: '600',
      fontSize: SIZES.TEXT.SMALL,
      color: COLORS.BLUE,
      marginBottom: SIZES.MARGIN.M10,
      marginTop: SIZES.MARGIN.M10,
    },
  });

export default EmailInput;
