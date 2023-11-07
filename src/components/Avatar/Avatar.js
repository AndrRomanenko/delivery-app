import React from 'react';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Image from 'react-native-fast-image';

import { COLORS } from '../../constants/theme';
import { useGetUserInfoQuery } from '../../services/userService';
import { moderateScale } from '../../utils/scale';

const Avatar = ({ style, iconSize = 32, iconColor = '#D5D5DC', src }) => {
  const { data: userData } = useGetUserInfoQuery();
  const uri = src || userData?.photo;
  const [error, setError] = useState(false);

  const onError = e => {
    console.warn('Avatar load error.', e.nativeEvent.error);
    setError(true);
  };

  const renderAvatar = () =>
    uri && !error ? (
      <Image onError={onError} source={{ uri }} style={styles.image} />
    ) : (
      <Icon name="person" size={iconSize} color={iconColor} />
    );

  return <View style={[styles.container, style]}>{renderAvatar()}</View>;
};

const styles = StyleSheet.create({
  container: {
    width: moderateScale(82),
    height: moderateScale(82),
    backgroundColor: COLORS.GRAY,
    borderRadius: moderateScale(41),
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: moderateScale(41),
  },
});

export default Avatar;
