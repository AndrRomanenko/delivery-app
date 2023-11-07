import React from 'react';
import { useTranslation } from 'react-i18next';
import { View, Text, StyleSheet } from 'react-native';

import CompleteOrderItem from '../CompleteOrderItem';
import GroupHeader from '../GroupHeader';

import useLanguageStyles from '../../../../hooks/useLanguageStyles';
import { getValidPrice } from '../../../../utils/order';
import { moderateScale } from '../../../../utils/scale';
import { COLORS } from '../../../../constants/theme';

import { groupOrderByMonths } from './helper';

const CompleteOrdersSection = ({ ordersData }) => {
  const { t: translation } = useTranslation('ordersScreen');
  const { languageStyles } = useLanguageStyles();

  const groupedOrders = groupOrderByMonths(ordersData);

  return (
    <View style={styles.container}>
      {groupedOrders.map((group, index) => (
        <View key={index}>
          <GroupHeader title={group.period} />
          {group.data.map((order, orderIndex) => (
            <CompleteOrderItem
              key={order.id}
              order={order}
              imageUrl={order.shop?.images[0]}
              isFirstItem={orderIndex === 0}
            />
          ))}
          <View style={[styles.totalContainer, languageStyles.row]}>
            <Text style={styles.total}>{translation('total')}</Text>
            <Text style={styles.total}>{getValidPrice(group.totalPrice)}</Text>
          </View>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: moderateScale(16),
  },
  totalContainer: {
    justifyContent: 'space-between',
    borderTopWidth: moderateScale(1),
    borderTopColor: COLORS.GRAY_LIGHT,
    paddingVertical: moderateScale(12),
    marginTop: moderateScale(10),
  },
  total: {
    fontSize: moderateScale(16),
    fontWeight: '500',
  },
});

export default CompleteOrdersSection;
