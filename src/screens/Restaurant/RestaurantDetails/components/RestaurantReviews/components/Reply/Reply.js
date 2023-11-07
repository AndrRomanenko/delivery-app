import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import Avatar from '../../../../../../../components/Avatar';
import { COLORS } from '../../../../../../../constants/theme';

import useLanguageStyles from '../../../../../../../hooks/useLanguageStyles';

import { moderateScale } from '../../../../../../../utils/scale';

const Reply = ({ message, shopAvatarSrc, shopTitle }) => {
  const { languageStyles } = useLanguageStyles();
  return (
    <View style={[styles.container, languageStyles.row]}>
      <Avatar
        src={shopAvatarSrc}
        style={styles.avatar}
        iconSize={moderateScale(14)}
      />
      <View style={styles.divider} />
      <View style={styles.infoContainer}>
        <Text style={styles.shopName}>{shopTitle}</Text>
        <Text style={styles.message}>{message}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  divider: {
    flex: 0.05,
  },
  infoContainer: {
    flex: 1,
  },
  avatar: {
    width: moderateScale(20),
    height: moderateScale(20),
  },
  shopName: {
    color: COLORS.TEXT.BLACK,
    fontSize: moderateScale(14),
    fontWeight: '500',
    marginBottom: moderateScale(10),
    lineHeight: moderateScale(20),
  },
  message: {
    color: COLORS.GRAY_ICON,
    fontWeight: '400',
    fontSize: moderateScale(13),
    marginBottom: moderateScale(14),
  },
});

export default Reply;
