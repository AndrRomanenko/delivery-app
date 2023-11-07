import React from 'react';
import { useTranslation } from 'react-i18next';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../../../../../../constants/theme';

import MapViewIcon from '../../../../../../icons/address/mapView.svg';
import { moderateScale } from '../../../../../../utils/scale';

const NoAddresses = () => {
  const { t: translation } = useTranslation('addressListScreen');

  return (
    <View style={styles.container}>
      <MapViewIcon />
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{translation('noAddresses')}</Text>
        <Text style={styles.info}>{translation('noAddressesInfo')}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoContainer: {
    marginVertical: moderateScale(80),
    textAlign: 'center',
    width: '60%',
  },
  title: {
    fontSize: moderateScale(18),
    color: COLORS.TEXT.BLACK,
    fontWeight: '500',
    textAlign: 'center',
    marginBottom: moderateScale(10),
  },
  info: {
    textAlign: 'center',
    color: COLORS.GRAY_ICON,
    fontWeight: '400',
    lineHeight: moderateScale(20),
    fontSize: moderateScale(14),
  },
});

export default NoAddresses;
