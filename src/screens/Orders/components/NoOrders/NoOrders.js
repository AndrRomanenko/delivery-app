import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, StyleSheet } from 'react-native';

import NoOrdersImage from '../../../../icons/orders/noOrders.svg';

import Button from '../../../../components/common/Button';

import { moderateScale } from '../../../../utils/scale';
import { COLORS } from '../../../../constants/theme';
import { ROUTES } from '../../../../constants/navigator';
import { useTranslation } from 'react-i18next';

const NoOrders = () => {
  const navigation = useNavigation();
  const { t: translation } = useTranslation('ordersScreen');

  const handlePress = () => {
    navigation.navigate(ROUTES.RESTAURANT.ROOT);
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <NoOrdersImage style={styles.image} />
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{translation('noOrdersTitle')}</Text>
        <Text style={styles.info}>{translation('noOrdersInfo')}</Text>
        <Button onPress={handlePress} label={translation('findPlace')} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    overflow: 'visible',
    alignItems: 'center',
  },
  imageContainer: {
    flex: 0.5,
    justifyContent: 'flex-end',
  },
  image: {
    width: '90%',
  },
  infoContainer: {
    flex: 0.5,
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  title: {
    fontSize: moderateScale(18),
    marginBottom: moderateScale(12),
    fontWeight: '500',
  },
  info: {
    fontSize: moderateScale(14),
    lineHeight: moderateScale(20),
    width: '80%',
    textAlign: 'center',
    marginBottom: moderateScale(45),
    color: COLORS.GRAY_ICON,
  },
});

export default NoOrders;
