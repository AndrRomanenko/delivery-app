import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import { moderateScale } from '../../../utils/scale';

const colors = {
  regular: '#d5d9e4',
  active: '#1e2227',
};

const BarItem = ({
  route,
  index,
  descriptors,
  navigation,
  state,
  icon,
  style,
  textStyle,
  text,
  disableLabel,
}) => {
  const insets = useSafeAreaInsets();

  const { options } = descriptors[route.key];

  const isFocused = state.index === index;

  const label = disableLabel
    ? undefined
    : text ||
      (options.tabBarLabel
        ? options.tabBarLabel
        : options.tabBarLabel
        ? options.title
        : route.name);

  const onPress = () => {
    const event = navigation.emit({
      type: 'tabPress',
      target: route.key,
      canPreventDefault: true,
    });

    if (!isFocused && !event.defaultPrevented) {
      navigation.navigate(route.name);
    }
  };

  return (
    <TouchableOpacity
      accessibilityRole="button"
      accessibilityState={{ selected: isFocused }}
      accessibilityLabel={options.tabBarAccessibilityLabel}
      testID={options.tabBarTestID}
      onPress={onPress}
      style={[styles.button(insets.bottom), style?.(isFocused)]}
      key={index}>
      <View style={styles.buttonContent}>
        {icon && <View style={styles.imageContainer}>{icon}</View>}
        {label && (
          <Text style={[styles.buttonText(isFocused), textStyle?.(isFocused)]}>
            {label}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: safeAreaEnabled => ({
    justifyContent: 'center',
    flex: 1,
    paddingTop: moderateScale(15),
    paddingBottom: !safeAreaEnabled && moderateScale(15),
  }),
  buttonContent: {
    alignItems: 'center',
  },
  imageContainer: {
    width: moderateScale(25),
    height: moderateScale(25),
  },
  buttonText: isFocused => ({
    color: isFocused ? colors.active : colors.regular,
    fontSize: moderateScale(10),
  }),
});

export default BarItem;
