import React from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

// TODO: Add type support (FA, Ion etc)
const IconButton = ({
  type,
  activeOpacity = 0.6,
  name,
  onPress,
  style,
  iconStyle,
  color,
  size,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={activeOpacity}
      onPress={onPress}
      style={style}
      disabled={!onPress}>
      <Icon name={name} color={color} size={size} style={iconStyle} />
    </TouchableOpacity>
  );
};

export default IconButton;
