import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import Avatar from '../../../../../../../components/Avatar';
import RatingStars from '../../../../../../../components/RatingStars';
import Reply from '../Reply';

import useLanguageStyles from '../../../../../../../hooks/useLanguageStyles';

import { moderateScale } from '../../../../../../../utils/scale';
import { COLORS } from '../../../../../../../constants/theme';
import { useGetShopByIdQuery } from '../../../../../../../services/shopsService';

const Review = ({ data, shopId, isLastReview }) => {
  const { languageStyles } = useLanguageStyles();

  const { currentData: restaurant } = useGetShopByIdQuery(shopId);

  const { client, rating, message, replies } = data;
  const { fullName, photo } = client;
  const { title, images } = restaurant || {};

  return (
    <View
      style={[
        styles.container,
        languageStyles.row,
        !isLastReview && styles.reviewBorder,
      ]}>
      <Avatar src={photo} style={styles.avatar} />
      <View style={styles.divider} />
      <View style={styles.infoContiner}>
        <Text style={[styles.name, languageStyles.text]}>{fullName}</Text>
        <RatingStars value={rating} style={languageStyles.row} />
        <Text style={[styles.comment, languageStyles.text]}>{message}</Text>
        {replies.length
          ? replies.map((reply, index) => (
              <Reply
                key={index}
                message={reply.message}
                shopAvatarSrc={images?.[0]?.src}
                shopTitle={title}
              />
            ))
          : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: moderateScale(16),
  },
  divider: {
    flex: 0.05,
  },
  avatar: {
    width: moderateScale(40),
    height: moderateScale(40),
  },
  name: {
    marginVertical: moderateScale(2),
    fontSize: moderateScale(16),
    color: COLORS.TEXT.BLACK,
    fontWeight: '500',
  },
  infoContiner: {
    flex: 1,
  },
  comment: {
    color: COLORS.GRAY_ICON,
    fontWeight: '400',
    fontSize: moderateScale(13),
    marginTop: moderateScale(12),
    marginBottom: moderateScale(14),
  },
  reviewBorder: {
    borderBottomWidth: 1,
    borderColor: COLORS.GRAY_LIGHT,
  },
});

export default Review;
