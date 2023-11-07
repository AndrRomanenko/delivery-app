import { useIsFocused } from '@react-navigation/native';
import React, { useContext, useState } from 'react';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '../../components/common/Button';
import LoadingSpinner from '../../components/LoadingSpinner';
import PageHeader from '../../components/PageHeader';
import { ROUTES } from '../../constants/navigator';
import { ORDER_STATUSES } from '../../constants/order';
import { OrderContext } from '../../context/OrderContext';
import { SessionContext } from '../../context/SessionContext';
import { useGetSessionDetailsByIdQuery } from '../../services/sessionService';
import { useGetUserInfoQuery } from '../../services/userService';
import { moderateScale } from '../../utils/scale';
import { RestaurantInfo } from '../Restaurant/RestaurantCategories/components/RestaurantInfo';
import OrderDetails from './components/OrderDetails';

const SessionOrdersDetails = ({ route, navigation }) => {
  const { t: translation } = useTranslation('sessionOrdersDetails');
  const focused = useIsFocused();
  const { resetNavigation, sessionId, proceedToPayment } = route.params;
  const { deleteCurrentSession, isOutHouseSession } =
    useContext(SessionContext);
  const {
    deleteOrder,
    deleteOrderItem,
    onPlaceOrder: handlePlaceOrder,
    loading,
    order: draftOrder,
  } = useContext(OrderContext);
  // This indicates if our order is already placed. If not, we still can delete items. And we use draftOrder as order to update deleted items (params are not being updated like props).
  const editable = route.params.order && !route.params.order.id;
  const order = editable ? draftOrder : route.params.order;

  const { data: user = {} } = useGetUserInfoQuery();

  const { currentData: session, isFetching: sessionLoading } =
    useGetSessionDetailsByIdQuery(sessionId, {
      refetchOnMountOrArgChange: true,
      skip: !sessionId || !focused,
    });
  const orders = sessionId ? session?.orders : [order];
  const mainOrder = sessionId
    ? session?.orders.find(o => o.client.id === user.id) || {}
    : order;

  const restaurant = mainOrder.shop;
  const showShopInfo = !editable;

  const paymentAllowed = session && session.orders.some(o => !o.paid);

  // Dumb idea but anyway better than going back and forth to update the state of order.
  const [reviewSubmitted, setReviewSubmitted] = useState(
    mainOrder.hasOwnProperty('reviewLeft') ? mainOrder.reviewLeft : true,
  );

  const onPayForOrders = () => {
    if (orders.length === 1) {
      navigation.navigate(ROUTES.ORDERS.ROOT_STACK, {
        screen: ROUTES.ORDERS.PAYMENT.TIPS,
        params: {
          totalPrice: mainOrder.resultPrice,
          session,
          selectedOrderIds: [mainOrder.id],
          mainOrder,
        },
      });
    } else {
      navigation.navigate(ROUTES.ORDERS.ROOT_STACK, {
        screen: ROUTES.ORDERS.PAYMENT.PAYMENT_ITEMS_LIST,
        params: {
          session,
          mainOrder,
        },
      });
    }
  };

  useEffect(() => {
    if (sessionLoading || !session) {
      return;
    }
    if (proceedToPayment) {
      onPayForOrders();
    }
  }, [proceedToPayment, sessionLoading]);

  const onBack = () => {
    navigation.navigate(ROUTES.ORDERS.ROOT_TAB);
    if (resetNavigation) {
      navigation.navigate(ROUTES.RESTAURANT.ROOT);
    }
  };

  const onFinishVisit = () => {
    deleteOrder();
    deleteCurrentSession();
    onBack();
  };

  const onSupplementMyOrder = () => {
    navigation.navigate(ROUTES.RESTAURANT.RESTAURANT_CATEGORIES, {
      restaurant,
    });
  };

  const onDeleteItem = index => {
    deleteOrderItem(index);
  };

  const onPlaceOrder = () => {
    if (isOutHouseSession) {
      navigation.navigate(ROUTES.ORDERS.DELIVERY_DETAILS, {
        restaurant,
      });
    } else {
      handlePlaceOrder();
    }
  };

  const onLeaveFeedbackPress = () => {
    navigation.navigate(ROUTES.ORDERS.FEEDBACK_MODAL, {
      orderId: mainOrder.id,
      restaurant,
      onSubmit: () => setReviewSubmitted(true),
    });
  };

  const getPrimaryActionParams = () => {
    // These actions are applicable to all session orders.
    if (order && !order.id) {
      return {
        label: 'placeOrder',
        onPress: onPlaceOrder,
      };
    }
    if (paymentAllowed) {
      return {
        label: 'payForOrders',
        onPress: onPayForOrders,
      };
    }
    if (!reviewSubmitted) {
      return {
        label: 'leaveFeedback',
        onPress: onLeaveFeedbackPress,
      };
    }
  };

  const getSecondaryActionParams = () => {
    // These actions are applicable only for current user's order.
    switch (mainOrder.status) {
      case ORDER_STATUSES.INITIALIZED:
        return {
          label: 'finishVisit',
          onPress: onFinishVisit,
        };
      case ORDER_STATUSES.IN_PROGRESS:
        return !isOutHouseSession
          ? {
              label: 'supplementMyOrder',
              onPress: onSupplementMyOrder,
            }
          : null;
      case ORDER_STATUSES.CREATED:
      case ORDER_STATUSES.WAIT_FOR_PAYMENT:
        return {
          label: 'supplementMyOrder',
          onPress: onSupplementMyOrder,
        };
      default:
        return null;
    }
  };

  const primaryAction = getPrimaryActionParams();
  const secondaryAction = getSecondaryActionParams();

  return (
    <SafeAreaView style={styles.wrapper}>
      <PageHeader title={translation('details')} onBack={onBack} />
      <ScrollView contentContainerStyle={styles.container}>
        {showShopInfo && restaurant && (
          <RestaurantInfo restaurant={restaurant} />
        )}
        {sessionLoading || !orders || !orders?.length ? (
          <LoadingSpinner />
        ) : (
          orders.map(o => (
            <OrderDetails
              key={o.id}
              {...{
                order: o,
                user,
                editable,
                onDeleteItem,
              }}
            />
          ))
        )}
      </ScrollView>
      <View style={styles.bottomContainer}>
        {secondaryAction && (
          <Button
            style={styles.button}
            secondary
            onPress={secondaryAction.onPress}
            label={translation(secondaryAction.label)}
          />
        )}
        {primaryAction && (
          <Button
            loading={loading}
            style={styles.button}
            onPress={primaryAction.onPress}
            label={translation(primaryAction.label)}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  container: {
    flexGrow: 1,
  },
  bottomContainer: {
    paddingHorizontal: moderateScale(16),
  },
  button: {
    marginBottom: moderateScale(16),
  },
});

export default SessionOrdersDetails;
