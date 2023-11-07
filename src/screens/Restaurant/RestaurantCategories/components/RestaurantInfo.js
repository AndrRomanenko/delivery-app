import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ROUTES } from '../../../../constants/navigator';
import { COLORS, FONTS, SIZES } from '../../../../constants/theme';
import useLanguageStyles from '../../../../hooks/useLanguageStyles';
import Info from '../../../../icons/restaurantPage/info.svg';
import Right from '../../../../icons/restaurantPage/Right.svg';
import RightMirror from '../../../../icons/restaurantPage/RightMirror.svg';
import Star from '../../../../icons/restaurantPage/star.svg';
import { useGetShopByIdQuery } from '../../../../services/shopsService';
import { formatRank } from '../../../../utils/restaurantRank';
import { moderateScale } from '../../../../utils/scale';
import { RestaurantImage } from './RestaurantImage';

export const RestaurantInfo = ({ restaurant }) => {
  const { i18n } = useTranslation();
  const { languageStyles } = useLanguageStyles();
  const navigation = useNavigation();
  const { t: translation } = useTranslation('restaurantScreen');

  const { currentData: fullRestaurantData } = useGetShopByIdQuery(
    restaurant.id,
  );

  const { total: reviewsTotal = 0, rank: restaurantRank = 0 } =
    fullRestaurantData?.reviews || {};

  const openInfo = ({ openReviews }) => {
    navigation.navigate(ROUTES.RESTAURANT.RESTAURANT_DETAILS, {
      id: restaurant.id,
      title: restaurant.title,
      openReviews,
    });
  };

  return (
    <View style={styles.container}>
      <View style={languageStyles.row}>
        <RestaurantImage restaurant={restaurant} />
        <View style={styles.divider} />
        <TouchableOpacity
          style={styles.infoContainer}
          activeOpacity={0.8}
          onPress={() => openInfo({ openReviews: false })}>
          <Text style={[styles.title, languageStyles.text]}>
            {restaurant.title}
          </Text>
          <View style={[styles.infoButton, languageStyles.row]}>
            <View
              style={[
                languageStyles.row,
                {
                  alignItems: 'center',
                },
              ]}>
              <Info />
              <Text style={styles.text}>
                {translation('buttonRestaurantInfo')}
              </Text>
            </View>
            {i18n.language === 'he' ? <RightMirror /> : <Right />}
          </View>
        </TouchableOpacity>
        <View style={styles.divider} />
        {fullRestaurantData?.reviews && (
          <TouchableOpacity
            style={styles.rangContainer}
            activeOpacity={0.8}
            onPress={() => openInfo({ openReviews: true })}>
            <View style={[styles.rang, languageStyles.row]}>
              <Star width={moderateScale(13)} fill="white" />
              <View style={styles.rangDivider} />
              <Text style={styles.rangText}>{formatRank(restaurantRank)}</Text>
            </View>
            <Text style={styles.reviewText}>{reviewsTotal}</Text>
            <Text style={styles.reviewText}>{translation('reviews')}</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.GRAY_LIGHT,
    paddingHorizontal: SIZES.PADDING.P15,
    paddingVertical: SIZES.PADDING.P16,
  },
  rangContainer: {
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rang: {
    backgroundColor: COLORS.BLUE,
    padding: moderateScale(6),
    alignItems: 'center',
    borderRadius: moderateScale(4),
    marginBottom: moderateScale(4),
  },
  rangDivider: {
    width: moderateScale(2),
  },
  rangText: {
    fontWeight: '600',
    fontSize: moderateScale(14),
    color: COLORS.WHITE,
    fontFamily: 'SFPRODISPLAY-SEMIBOLD',
  },
  reviewText: {
    fontSize: moderateScale(12),
    color: COLORS.BLUE,
  },
  divider: {
    flex: 0.05,
  },
  infoContainer: {
    flex: 0.95,
  },
  title: {
    fontWeight: '600',
    fontSize: SIZES.TEXT.Semibold,
    color: COLORS.TEXT.BLACK,
    fontFamily: FONTS.SEMIBOLD,
  },
  infoButton: {
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: moderateScale(14),
  },
  text: {
    paddingHorizontal: 10,
    fontWeight: '600',
    fontSize: SIZES.TEXT.REGULAR,
    color: COLORS.GRAY_ICON,
    fontFamily: 'SFPRODISPLAY-SEMIBOLD',
  },
});
