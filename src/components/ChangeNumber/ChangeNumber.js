import React, { useState, useCallback } from 'react';
import auth from '@react-native-firebase/auth';
import { useFocusEffect } from '@react-navigation/native';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

import useLanguageStyles from '../../hooks/useLanguageStyles';

import { SCREEN_WIDTH } from '../../constants/device';
import { COLORS, FONTS, SIZES } from '../../constants/theme';
import { ROUTES } from '../../constants/navigator';

const ChangeNumber = ({ label }) => {
  const { t: translation } = useTranslation('general');
  const { languageStyles } = useLanguageStyles();
  const navigation = useNavigation();
  const [user, setUser] = useState(null);

  useFocusEffect(
    useCallback(() => {
      setUser(auth().currentUser);
    }, []),
  );

  const onPress = () => {
    navigation.navigate(ROUTES.COMMON.CHANGE_PHONE, { changePhone: true });
  };

  return (
    <View style={[styles.container, languageStyles.row]}>
      <View>
        <Text style={[styles.numberLabel, languageStyles.text]}>{label}</Text>
        <Text style={[styles.number, languageStyles.text]}>
          {user?.phoneNumber}
        </Text>
      </View>
      <TouchableOpacity onPress={onPress} style={styles.button}>
        <Text style={styles.buttonText}>{translation('change')}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: SCREEN_WIDTH * 0.06,
    borderBottomWidth: SCREEN_WIDTH * 0.002564,
    borderBottomColor: COLORS.GRAY_LIGHT,
    justifyContent: 'space-between',
  },
  number: {
    fontFamily: FONTS.REGULAR,
    fontWeight: '600',
    fontSize: SIZES.TEXT.MEDIUM,
    color: COLORS.GRAY_ICON,
    paddingTop: SCREEN_WIDTH * 0.02564,
    paddingBottom: SIZES.PADDING.P12,
  },
  numberLabel: {
    fontFamily: FONTS.MEDIUM,
    fontWeight: '500',
    fontSize: SIZES.TEXT.REGULAR,
    color: COLORS.TEXT.BLACK,
  },
  button: {
    justifyContent: 'center',
  },
  buttonText: {
    fontWeight: '500',
    fontSize: SIZES.TEXT.REGULAR,
    color: COLORS.BLUE,
    fontFamily: FONTS.MEDIUM,
  },
});

export default ChangeNumber;
