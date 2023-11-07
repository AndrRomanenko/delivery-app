import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import dayjs from 'dayjs';
import Image from '../../../../components/Image';
import { ROUTES } from '../../../../constants/navigator';
import { COLORS } from '../../../../constants/theme';
import useLanguageStyles from '../../../../hooks/useLanguageStyles';
import { getValidPrice } from '../../../../utils/order';
import { moderateScale } from '../../../../utils/scale';

/**
 * Completed order list item for orders list
 */
const CompleteOrderItem = ({ order, imageUrl, isFirstItem }) => {
  const navigation = useNavigation();
  const { languageStyles } = useLanguageStyles();
  const { shop, resultPrice, createdAt } = order;

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
    navigation.navigate(ROUTES.ORDERS.SESSION_ORDERS_DETAILS, { order });
  };
  return (
    <>
      {!isFirstItem && <View style={styles.divider} />}
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={onPress}
        style={[styles.container, languageStyles.row]}>
        <View style={styles.imageContainer}>{getShopImage()}</View>
        <View style={styles.spacer} />
        <View style={styles.infoContainer}>
          <Text style={styles.title}>{shop?.title}</Text>
          <View style={[styles.infoRow, languageStyles.row]}>
            <Text style={styles.date}>
              {dayjs(createdAt).format('DD.MM.YYYY')}
            </Text>
            <Text style={[styles.price, languageStyles.text]}>
              {getValidPrice(resultPrice)}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
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
  infoRow: {
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: moderateScale(10),
  },
  date: {
    fontSize: moderateScale(13),
    color: COLORS.GRAY_ICON,
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

export default CompleteOrderItem;
