import React from 'react';
import { AirbnbRating } from 'react-native-ratings';
import { View } from 'react-native';
import { COLORS } from '../../constants/theme';
import { moderateScale } from '../../utils/scale';

const RatingStars = ({
  style,
  value = 3,
  onChange,
  size = moderateScale(12),
  starContainerStyle,
}) => {
  return (
    <View style={style}>
      <AirbnbRating
        count={5}
        isDisabled={!onChange}
        showRating={false}
        selectedColor={COLORS.ORANGE}
        size={size}
        defaultRating={value}
        onFinishRating={onChange}
        starContainerStyle={starContainerStyle}
      />
    </View>
  );
};

export default RatingStars;
