import React from 'react';
import { StyleSheet } from 'react-native';
import Image from '../../../../components/Image';
import { SIZES } from '../../../../constants/theme';

export const RestaurantImage = ({
  restaurant,
  resizeMode = 'cover',
  style,
}) => {
  const uri = restaurant.images?.[0]?.src || '';

  return (
    <Image
      source={{ uri }}
      resizeMode={resizeMode}
      style={[styles.image, style]}
    />
  );
};

const styles = StyleSheet.create({
  image: {
    height: SIZES.DEFAULT_IMAGE.HEIGHT,
    width: SIZES.DEFAULT_IMAGE.WIDTH,
    borderRadius: 5,
  },
});
