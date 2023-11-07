import React from 'react';
import { StyleSheet, View } from 'react-native';

import { moderateScale } from '../../../../utils/scale';
import ActiveOrderItem from '../ActiveOrderItem';

const ActiveOrdersSection = ({ ordersData, filtered = false }) => {
  // TODO: Add separation by service types.
  if (!ordersData || !ordersData.length) {
    return null;
  }

  return (
    <View style={styles.container}>
      {ordersData.map((order, index) => (
        <ActiveOrderItem
          order={order}
          key={order.id}
          imageUrl={order.shop?.images?.[0]}
          isFirstItem={index === 0}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: moderateScale(16),
  },
});

export default ActiveOrdersSection;
