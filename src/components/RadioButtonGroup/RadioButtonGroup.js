import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { COLORS } from '../../constants/theme';
import { moderateScale } from '../../utils/scale';

const RadioButtonGroup = ({
  style,
  items,
  itemStyle,
  activeIndex = 0,
  onItemSelect,
}) => {
  const mapRadioButton = (x, i) => {
    const isSelected = i === activeIndex;
    return (
      <React.Fragment key={i}>
        <TouchableOpacity
          style={[styles.item, itemStyle]}
          onPress={() => onItemSelect(x.item, i)}>
          {x.title &&
            (React.isValidElement(x.title) ? (
              x.title
            ) : (
              <Text style={styles.title}>{x.title}</Text>
            ))}
          <View
            style={[
              styles.radio,
              { borderColor: isSelected ? COLORS.BLUE : COLORS.GRAY },
            ]}>
            {isSelected && <View style={styles.selectedRadio} />}
          </View>
        </TouchableOpacity>
        {x.info}
      </React.Fragment>
    );
  };

  if (!items || !items.length) {
    return null;
  }

  return (
    <View style={[styles.container, style]}>{items.map(mapRadioButton)}</View>
  );
};

const styles = StyleSheet.create({
  container: {},
  item: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radio: {
    height: moderateScale(24),
    width: moderateScale(24),
    borderRadius: moderateScale(12),
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    marginRight: moderateScale(12),
  },
  selectedRadio: {
    height: moderateScale(12),
    width: moderateScale(12),
    borderRadius: moderateScale(6),
    backgroundColor: COLORS.BLUE,
  },
});

export default RadioButtonGroup;
