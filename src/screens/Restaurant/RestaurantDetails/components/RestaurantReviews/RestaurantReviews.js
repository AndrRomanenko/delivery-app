import React from 'react';
import { useTranslation } from 'react-i18next';
import { View, Text, StyleSheet } from 'react-native';

import LoadingSpinner from '../../../../../components/LoadingSpinner';
import Review from './components/Review';

import Star from '../../../../../icons/restaurantPage/star.svg';

import useLanguageStyles from '../../../../../hooks/useLanguageStyles';

import { COLORS, FONTS, SIZES } from '../../../../../constants/theme';
import { moderateScale } from '../../../../../utils/scale';
import { formatRank } from '../../../../../utils/restaurantRank';

const RestaurantReviews = ({
  rank,
  reviewsData,
  isLoading,
  shopId,
  scrollRef,
  autoScroll,
}) => {
  const { t: translation } = useTranslation('restaurantDetails');
  const { languageStyles } = useLanguageStyles();

  const handleLayoutScroll = e => {
    if (autoScroll && reviewsData.length && !isLoading) {
      const { layout } = e.nativeEvent;
      scrollRef.current.scrollTo({
        x: 0,
        y: layout.y,
      });
    }
  };

  return (
    <View style={styles.container} onLayout={handleLayoutScroll}>
      <View style={[styles.header, languageStyles.row]}>
        <Text style={styles.title}>{translation('reviews')}</Text>
        <View style={styles.ratingDivider} />
        <Star style={styles.ratingStar} width={moderateScale(16)} />
        <Text style={styles.rangText}>{formatRank(rank)}</Text>
      </View>
      {reviewsData?.map((reviewData, index) => (
        <Review
          key={index}
          data={reviewData}
          shopId={shopId}
          isLastReview={index === reviewsData.length - 1}
        />
      ))}
      {isLoading && <LoadingSpinner />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: SIZES.MARGIN.M24,
    borderTopColor: COLORS.GRAY,
    borderTopWidth: 1,
  },
  header: {
    marginBottom: SIZES.MARGIN.M20,
    alignItems: 'center',
  },
  ratingDivider: {
    flex: 0.03,
  },
  ratingStar: {
    marginHorizontal: moderateScale(4),
  },
  title: {
    fontWeight: '500',
    fontSize: SIZES.TEXT.LARGE,
    color: COLORS.TEXT.BLACK,
    fontFamily: FONTS.MEDIUM,
  },
  rangText: {
    fontWeight: '400',
    fontSize: moderateScale(18),
    color: COLORS.TEXT.BLACK,
    fontFamily: FONTS.SEMIBOLD,
  },
});

export default RestaurantReviews;
