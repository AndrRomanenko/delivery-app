import React from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import PillLabel from '../../../../components/common/PillLabel';

import { useNavigation } from '@react-navigation/native';
import Image from '../../../../components/Image';
import { ROUTES } from '../../../../constants/navigator';
import { COLORS } from '../../../../constants/theme';
import useLanguageStyles from '../../../../hooks/useLanguageStyles';
import { getValidPrice } from '../../../../utils/order';
import { moderateScale } from '../../../../utils/scale';
import { getTranslationKey } from './helper';
import { ORDER_STATUSES } from '../../../../constants/order';

/**
 * Active order list item for orders list
 */
const ActiveOrderItem = ({ order, imageUrl, isFirstItem }) => {
  const { resultPrice, status, shop } = order;
  const { languageStyles } = useLanguageStyles();
  const navigation = useNavigation();
  const { t: translation } = useTranslation('ordersScreen');

  const getShopImage = () => {
    return (
      <Image
        source={{ uri: imageUrl.src }}
        resizeMode="cover"
        style={styles.image}
      />
    );
  };

  const onPress = () => {
    // Handling local order.
    const payload =
      order.id && order.status !== ORDER_STATUSES.PENDING // FOR SHOWING PENDING ORDERS
        ? {
            sessionId: order.sessionId,
          }
        : {
            order,
          };
    navigation.navigate(ROUTES.ORDERS.SESSION_ORDERS_DETAILS, payload);
  };

  return (
    <>
      {!isFirstItem && <View style={styles.divider} />}
      <TouchableOpacity
        onPress={onPress}
        style={[styles.container, languageStyles.row]}>
        <View style={styles.imageContainer}>{getShopImage()}</View>
        <View style={styles.spacer} />
        <View style={styles.infoContainer}>
          <View style={[styles.topInfo, languageStyles.row]}>
            <Text style={styles.title}>{shop?.title}</Text>
            <PillLabel label={translation(getTranslationKey(status))} />
          </View>
          <Text style={[styles.price, languageStyles.text]}>
            {getValidPrice(resultPrice)}
          </Text>
        </View>
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  imageContainer: {
    width: moderateScale(50),
    height: moderateScale(50),
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: moderateScale(4),
  },
  title: {
    fontSize: moderateScale(16),
  },
  infoContainer: {
    flex: 1,
  },
  topInfo: {
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: moderateScale(6),
  },
  price: {
    fontSize: moderateScale(14),
    color: COLORS.DARK_BLUE,
  },
  spacer: {
    flex: 0.05,
  },
  divider: {
    height: moderateScale(1),
    borderBottomWidth: moderateScale(1),
    borderBottomColor: COLORS.GRAY_LIGHT,
    marginTop: moderateScale(12),
    marginBottom: moderateScale(14),
  },
});

export default ActiveOrderItem;
