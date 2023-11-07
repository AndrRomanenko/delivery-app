import React from 'react';
import { useTranslation } from 'react-i18next';
import { View, StyleSheet } from 'react-native';
import CompleteOrderItem from '../CompleteOrderItem';
import GroupHeader from '../GroupHeader';
import { moderateScale } from '../../../../utils/scale';
import { groupOrderByType } from './helper';

const GroupByTypeCompleteOrdersSection = ({ ordersData }) => {
  const { t: translation } = useTranslation('ordersScreen');
  const groupedOrders = groupOrderByType(ordersData);

  const renderOrder = (order, orderIndex) => (
    <CompleteOrderItem
      key={orderIndex}
      order={order}
      imageUrl={order.shop?.images[0]}
      isFirstItem={orderIndex === 0}
    />
  );

  const renderGroup = ([title, orders], index) => {
    if (!orders.length) {
      return;
    }
    return (
      <View key={index} style={styles.group}>
        <GroupHeader title={translation(title)} />
        {orders.map(renderOrder)}
      </View>
    );
  };

  return <View style={styles.container}>{groupedOrders.map(renderGroup)}</View>;
};

const styles = StyleSheet.create({
  container: {
    // paddingVertical: moderateScale(16),
  },
  group: {
    marginTop: moderateScale(16),
  },
});

export default GroupByTypeCompleteOrdersSection;
