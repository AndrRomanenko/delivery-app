import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useContext } from 'react';
import { StatusBar, View } from 'react-native';

import LoadingSpinner from '../../../components/LoadingSpinner';
import PageContainer from '../../../components/PageContainer';
import { ORDER_SERVICE_TYPES, ORDER_STATUSES } from '../../../constants/order';
import { OrderContext } from '../../../context/OrderContext';
import { SessionContext } from '../../../context/SessionContext';
import { useLazyGetOrdersQuery } from '../../../services/ordersService';
import ActiveOrderItem from '../components/ActiveOrderItem';
import ActiveOrdersSection from '../components/ActiveOrdersSection';
import CompleteOrdersSection from '../components/CompleteOrdersSection';
import GroupByTypeCompleteOrdersSection from '../components/GroupByTypeCompleteOrdersSection';
import NoOrders from '../components/NoOrders';

const OrdersList = ({ route }) => {
  const type = route?.params?.type;

  const { order } = useContext(OrderContext);
  const { visit, isOutHouseSession } = useContext(SessionContext);

  const [getOrders, { currentData: ordersData, isFetching, isLoading }] =
    useLazyGetOrdersQuery('', { skip: isFetching });

  const loadOrders = () => {
    getOrders({
      page: 1,
      type_of_service: type || '',
    });
  };

  useFocusEffect(
    useCallback(() => {
      if (!isFetching) {
        loadOrders();
      }
    }, []),
  );

  const items = ordersData?.items || [];

  const activeOrders = items.filter(
    o =>
      o.status !== ORDER_STATUSES.COMPLETED &&
      o.status !== ORDER_STATUSES.CANCELED,
  );
  const completeOrders = items.filter(
    o =>
      o.status === ORDER_STATUSES.COMPLETED ||
      o.status === ORDER_STATUSES.CANCELED,
  );

  const isActiveOrderVisible = () => {
    if (order.status !== ORDER_STATUSES.INITIALIZED) {
      // Expecting to see it in orders list.
      return false;
    }
    if (!type) {
      // 'All' is selected.
      return true;
    }
    const orderType = order.outHouseDetails?.type;
    if (!orderType) {
      if (isOutHouseSession) {
        // User hasn't selected if it's delivery or takeaway yet. Show for both.
        return (
          type === ORDER_SERVICE_TYPES.DELIVERY ||
          type === ORDER_SERVICE_TYPES.TAKE_AWAY
        );
      }
      // Otherwise show as dinein.
      return type === ORDER_SERVICE_TYPES.DINE_IN;
    } else {
      return orderType === type;
    }
  };

  const activeOrderVisible = isActiveOrderVisible();

  return (
    <PageContainer refreshing={isFetching && !isLoading} onRefresh={loadOrders}>
      <StatusBar barStyle="dark-content" />
      {isLoading && <LoadingSpinner />}
      {items.length || activeOrderVisible ? (
        <>
          {activeOrderVisible && (
            <View>
              <ActiveOrderItem
                editable
                order={order}
                imageUrl={order.shop?.images?.[0]}
              />
            </View>
          )}
          <ActiveOrdersSection ordersData={activeOrders} />
          {type ? (
            <CompleteOrdersSection ordersData={completeOrders} />
          ) : (
            <GroupByTypeCompleteOrdersSection ordersData={completeOrders} />
          )}
        </>
      ) : (
        <NoOrders />
      )}
    </PageContainer>
  );
};

export default OrdersList;
