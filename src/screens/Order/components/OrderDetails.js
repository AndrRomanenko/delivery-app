import React from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, View } from 'react-native';
import Avatar from '../../../components/Avatar';
import { COLORS } from '../../../constants/theme';
import useLanguageStyles from '../../../hooks/useLanguageStyles';
import { getValidPrice } from '../../../utils/order';
import { moderateScale } from '../../../utils/scale';
import OrderListItem from './OrderListItem';

const OrderDetails = ({ order, editable, user, onDeleteItem }) => {
  const { languageStyles } = useLanguageStyles();
  const { t: translation } = useTranslation('sessionOrdersDetails');

  const getTotalPrice = () => {
    const price =
      order.resultPrice || order.items.reduce((a, b) => a + b.itemPrice, 0);
    return getValidPrice(price);
  };

  const isOwner = order.client ? order.client.id === user?.id : true;
  const ownerLabel = isOwner ? 'My' : `${order.client.fullName}'s`;

  return (
    <View style={styles.container}>
      <View style={[styles.header, languageStyles.row]}>
        <Avatar
          src={order.client?.photo}
          style={styles.avatar}
          iconSize={22}
          iconColor={COLORS.GRAY_ICON}
        />
        <Text style={styles.headerTitle}>{ownerLabel} order</Text>
      </View>
      <View style={styles.content}>
        {order.items.map((x, i) => (
          <OrderListItem
            onDelete={onDeleteItem}
            item={x}
            key={i}
            index={i}
            editable={editable}
          />
        ))}
        <View style={[styles.totalContainer, languageStyles.row]}>
          <Text style={styles.totalText}>{translation('total')}</Text>
          <Text style={styles.price}>{getTotalPrice()}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    alignItems: 'center',
    marginTop: moderateScale(24),
    paddingHorizontal: moderateScale(16),
  },
  avatar: {
    width: moderateScale(40),
    height: moderateScale(40),
  },
  headerTitle: {
    marginHorizontal: moderateScale(15),
    color: COLORS.BLACK,
    fontWeight: '600',
    fontSize: moderateScale(22),
  },
  content: {
    paddingTop: moderateScale(8),
  },
  totalContainer: {
    paddingTop: moderateScale(12),
    paddingBottom: moderateScale(52),
    paddingHorizontal: moderateScale(16),
  },
  totalText: {
    fontSize: moderateScale(17),
    color: COLORS.BLACK,
    fontWeight: 'bold',
    flex: 1,
  },
  price: {
    fontSize: moderateScale(17),
    color: COLORS.BLACK,
    fontWeight: 'bold',
  },
});

export default OrderDetails;
