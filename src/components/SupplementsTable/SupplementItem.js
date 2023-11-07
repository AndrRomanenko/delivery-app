import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { COLORS } from '../../constants/theme';
import useLanguageStyles from '../../hooks/useLanguageStyles';
import { getValidPrice } from '../../utils/order';
import { moderateScale } from '../../utils/scale';
import IconButton from '../IconButton';

const MAX_QUANTITY = 10;

const SupplementItem = ({ item, onChange }) => {
  const { languageStyles } = useLanguageStyles();

  const handleChange = quantity => {
    if (quantity < 0 || quantity > MAX_QUANTITY) {
      return;
    }
    onChange({
      ...item,
      quantity,
    });
  };
  const totalPrice = item.quantity ? item.quantity * item.price : item.price;
  const priceColor = item.quantity ? COLORS.BLACK : COLORS.GRAY_ICON;

  return (
    <View style={[styles.container, languageStyles.row]}>
      <Text style={[styles.title, languageStyles.text]}>{item.title}</Text>
      <View style={[styles.content, languageStyles.row]}>
        <Text style={[styles.price, { color: priceColor }]}>
          {item.quantity ? '+' : ''}
          {getValidPrice(totalPrice)}
        </Text>
        <IconButton
          style={styles.iconContainer}
          name="remove"
          onPress={() => handleChange(item.quantity - 1)}
          size={20}
          color={COLORS.GRAY_ICON}
        />
        <Text style={styles.quantity}>{item.quantity}</Text>

        <IconButton
          style={styles.iconContainer}
          onPress={() => handleChange(item.quantity + 1)}
          name="add"
          size={20}
          color={COLORS.GRAY_ICON}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: moderateScale(9),
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: moderateScale(16),
  },
  title: {
    flex: 1,
    fontSize: moderateScale(16),
    color: COLORS.BLACK,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    backgroundColor: COLORS.GRAY_LIGHT,
    width: moderateScale(32),
    height: moderateScale(32),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: moderateScale(32),
  },
  price: {
    color: COLORS.GRAY_ICON,
    marginHorizontal: moderateScale(18),
  },
  quantity: {
    fontSize: moderateScale(16),
    fontWeight: '500',
    color: COLORS.BLACK,
    marginHorizontal: moderateScale(25),
    width: moderateScale(20),
    textAlign: 'center',
  },
});

export default SupplementItem;
