import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Checkbox from '../../../../../components/input/Checkbox';
import { COLORS } from '../../../../../constants/theme';
import useLanguageStyles from '../../../../../hooks/useLanguageStyles';
import { moderateScale } from '../../../../../utils/scale';

const PaymentItem = ({ label, price, checked, disabled, onPress }) => {
  const { languageStyles } = useLanguageStyles();

  return (
    <TouchableOpacity
      style={[styles.container, languageStyles.row]}
      activeOpacity={1}
      disabled={disabled}
      onPress={onPress}>
      <Text style={styles.label}>{label}</Text>
      <View style={[styles.info, languageStyles.row]}>
        <Text style={styles.price}>{price}</Text>
        <Checkbox value={checked} disabled={disabled} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: moderateScale(10),
    alignItems: 'center',
  },
  label: {
    flex: 1,
    color: COLORS.TEXT.BLACK,
    fontSize: moderateScale(16),
    fontWeight: '400',
  },
  info: {
    alignItems: 'center',
  },
  price: {
    marginHorizontal: moderateScale(15),
    fontSize: moderateScale(14),
    fontWeight: '400',
    color: COLORS.GRAY_ICON,
  },
});

export default PaymentItem;
