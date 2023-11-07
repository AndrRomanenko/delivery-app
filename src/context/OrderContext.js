import { useNavigation } from '@react-navigation/native';
import React, { useContext, useEffect } from 'react';
import { useToast } from 'react-native-toast-notifications';
import { useDispatch, useSelector } from 'react-redux';
import { ROUTES } from '../constants/navigator';
import { ORDER_STATUSES } from '../constants/order';
import { TOAST_TYPES } from '../constants/toasts';
import usePrevious from '../hooks/usePrevious';
import {
  useCalculateOrderMutation,
  usePlaceOrderMutation,
  useSupplementOrderMutation,
} from '../services/ordersService';
import {
  deleteOrder as cancelOrder,
  setOrder,
} from '../store/reducers/orderSlice';
import { formatItems } from '../utils/formatItems';
import { removeOrderFromStorage, saveOrderToStorage } from '../utils/order';
import { SessionContext } from './SessionContext';
import { useTranslation } from 'react-i18next';
import { getFormattedErrorMessage } from '../utils/error';

const OrderContext = React.createContext();

// Context of current visit running order.
// TODO: Rename to VisitOrder
const OrderProvider = ({ children }) => {
  const { t: translation } = useTranslation([
    'sessionOrdersDetails',
    'general',
  ]);

  const { visit, isVisitActive } = useContext(SessionContext);
  const order = useSelector(state => state.order);
  const prevOrder = usePrevious(order);
  const isOrderActive = order.status !== ORDER_STATUSES.UNINITIALIZED;
  const toast = useToast();

  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [calculateOrder, { isFetching }] = useCalculateOrderMutation();
  const [updateOrderItems] = useSupplementOrderMutation();
  const [placeOrder, { isLoading: isPlaceOrderLoading }] =
    usePlaceOrderMutation();

  const loading = isFetching || isPlaceOrderLoading;

  useEffect(() => {
    if (order.status === ORDER_STATUSES.UNINITIALIZED || order.id) {
      return;
    }
    saveOrderToStorage(order);
  }, [order, prevOrder]);

  const isVisitByShopAllowed = shop => shop.pickUpActive;
  const isDeliveryByShopAllowed = shop => shop.deliveryActive;
  const isTakeAwayByShopAllowed = shop => shop.takeAwayActive;

  const isSessionByShopAllowed = shop =>
    isVisitByShopAllowed(shop) ||
    isDeliveryByShopAllowed(shop) ||
    isTakeAwayByShopAllowed(shop);

  const isOrderByShopAllowed = shop => {
    const isSessionAllowed = isSessionByShopAllowed(shop);
    return isVisitActive ? visit.shopId === shop.id : isSessionAllowed;
  };

  const supplementOrder = async items => {
    try {
      const address = order.outHouseDetails?.address?.id;
      const outHouseDetails = {
        type: order.outHouseDetails?.type,
        address,
      };

      const o = await updateOrderItems({
        items: formatItems(items),
        sessionType: visit.sessionType,
        // outHouseDetails,
      }).unwrap();
      dispatch(setOrder(o));
      toast.show(translation('updated'), { type: TOAST_TYPES.SUCCESS });
    } catch (err) {
      console.warn('Order update error:', err);
      const formattedMsg = getFormattedErrorMessage(err);
      toast.show(formattedMsg);
    }
  };

  const changeOrderItems = async items => {
    try {
      const o = await calculateOrder({
        items: formatItems(items),
        sessionType: visit.sessionType,
      }).unwrap();
      dispatch(
        setOrder({ ...o, status: o.status || ORDER_STATUSES.INITIALIZED }),
      );
    } catch (err) {
      console.warn('Order change error:', err);
      const formattedMsg = getFormattedErrorMessage(err);
      toast.show(formattedMsg);
    }
  };

  const onPlaceOrder = async () => {
    // Thanks backend for this brilliant idea.
    const outHouseDetails = order.outHouseDetails.type
      ? {
          ...order.outHouseDetails,
          address: order.outHouseDetails.address.id,
        }
      : null;
    try {
      const o = await placeOrder({
        items: formatItems(order.items),
        sessionType: visit.sessionType,
        outHouseDetails,
      }).unwrap();
      dispatch(setOrder(o));
      await removeOrderFromStorage();
      navigation.navigate(ROUTES.ORDERS.ROOT_TAB);
      if (outHouseDetails) {
        navigation.navigate(ROUTES.ORDERS.SESSION_ORDERS_DETAILS, {
          sessionId: o.sessionId,
          proceedToPayment: true,
        });
      } else {
        toast.show(translation('placed'), { type: TOAST_TYPES.SUCCESS });
      }
    } catch (err) {
      console.warn('Place order error', err);
      toast.show(translation('placedError'));
    }
  };

  const addOrderItem = async item => {
    if (order.id) {
      supplementOrder([item]);
    } else {
      const items = [...order.items, item];
      changeOrderItems(items);
    }
  };

  const deleteOrderItem = index => {
    if (order.items.length === 1) {
      deleteOrder();
      return;
    }
    const items = order.items.filter(x => order.items.indexOf(x) !== index);
    changeOrderItems(items);
  };

  const deleteOrder = (keepInStorage = false) => {
    dispatch(cancelOrder());
    if (!keepInStorage) {
      removeOrderFromStorage();
    }
  };

  return (
    <OrderContext.Provider
      value={{
        order,
        isOrderActive,
        isOrderByShopAllowed,
        isSessionByShopAllowed,
        isVisitByShopAllowed,
        isDeliveryByShopAllowed,
        isTakeAwayByShopAllowed,
        addOrderItem,
        deleteOrder,
        deleteOrderItem,
        onPlaceOrder,
        loading,
      }}>
      {children}
    </OrderContext.Provider>
  );
};

export { OrderProvider, OrderContext };
