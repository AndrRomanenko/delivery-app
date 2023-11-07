import React from 'react';
import { useTranslation } from 'react-i18next';
import { Text, TouchableOpacity, View, StyleSheet } from 'react-native';

import Left from '../../../../icons/profile/Left.svg';
import Right from '../../../../icons/profile/Right.svg';

import useLanguageStyles from '../../../../hooks/useLanguageStyles';

import { COLORS, SIZES } from '../../../../constants/theme';
import { SCREEN_WIDTH } from '../../../../constants/device';

const ProfileButton = ({ onPress, title, icon }) => {
  const { languageStyles } = useLanguageStyles();
  const { i18n } = useTranslation();

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[languageStyles.row, styles.container]}>
      <View style={styles.iconContainer}>{icon}</View>
      <View style={[styles.titleContainer, languageStyles.row]}>
        <Text style={styles.title}>{title}</Text>
        {i18n.language === 'he' ? <Left /> : <Right />}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: SIZES.PADDING.P20,
  },
  iconContainer: {
    width: '15%',
    alignItems: 'center',
  },
  titleContainer: {
    width: '85%',
    borderBottomWidth: SCREEN_WIDTH * 0.002564,
    borderBottomColor: COLORS.GRAY_LIGHT,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 20,
  },
  title: {
    fontFamily: 'SFPRODISPLAY-REGULAR',
    fontWeight: '400',
    fontSize: SIZES.TEXT.REGULAR,
    color: COLORS.TEXT.BLACK,
  },
});

export default ProfileButton;
