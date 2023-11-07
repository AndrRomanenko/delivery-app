import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useLazyGetCurrentSessionQuery } from '../services/sessionService';
import { useLazyGetShopByIdQuery } from '../services/shopsService';
import {
  useApproveBookingMutation,
  useBookTableMutation,
  useCloseSessionMutation,
  useLazyGetTableQuery,
  useRejectBookingMutation,
} from '../services/tableService';

import { useNavigation } from '@react-navigation/native';
import { useToast } from 'react-native-toast-notifications';
import { getHash, isShopTableToken } from '../components/QrReader/helper';
import { ROUTES } from '../constants/navigator';
import { ORDER_STATUSES } from '../constants/order';
import { TOAST_TYPES } from '../constants/toasts';
import { VISIT_STATUSES, VISIT_TYPES } from '../constants/visit';
import usePrevious from '../hooks/usePrevious';
import {
  useCreateDeliveryMutation,
  useDeleteDeliveryMutation,
} from '../services/deliveryService';
import { useLazyGetOrderByIdQuery } from '../services/ordersService';
import { useLazyGetUserInfoQuery } from '../services/userService';
import { setOrder } from '../store/reducers/orderSlice';
import {
  clearVisit,
  onCreateDeliveryApproved,
  onCreateDeliveryInit,
  onError,
  onTableBookingApproved,
  onTableBookingInit,
  onTableBookingRequested,
  resolveTableBookingRequest,
  setShopId,
  setTable,
  setTableHash,
  setVisit,
} from '../store/reducers/visitSlice';
import { getOrderFromStorage, removeOrderFromStorage } from '../utils/order';
import {
  getVisitFromStorage,
  removeVisitFromStorage,
  saveVisitToStorage,
} from '../utils/visit';
import { getFormattedErrorMessage } from '../utils/error';

// Context of currently running session.
// TODO: Expose InHouseSessionContext or OutHouseSessionContext based on currently selected session.
// TODO: Create InHouseSessionSlice and OutHouseSessionSlice.
// Session context will be responsible for currently selected session, including orders and delivery details.
const SessionContext = React.createContext();

const SessionProvider = ({ children }) => {
  const { t: translation } = useTranslation([
    'clientSession',
    'general',
    'qrReader',
  ]);
  const navigation = useNavigation();
  const toast = useToast();

  const visit = useSelector(state => state.visit);
  const prevVisit = usePrevious(visit);
  const { tableHash, shopId, status } = visit;

  const dispatch = useDispatch();

  const [getUserData] = useLazyGetUserInfoQuery();

  const [getOrderById] = useLazyGetOrderByIdQuery('', {
    refetchOnMountOrArgChange: true,
  });

  const [getTableInfo, { currentData: tableData = {} }] =
    useLazyGetTableQuery();

  const [getShopById, { isFetching }] = useLazyGetShopByIdQuery(
    tableData.shopId,
    {
      skip: !tableData.shopId || isFetching,
      refetchOnMountOrArgChange: true,
    },
  );

  const [getCurrentSession] = useLazyGetCurrentSessionQuery();

  const [bookTable] = useBookTableMutation();
  const [approveTableBooking] = useApproveBookingMutation();
  const [rejectTableBooking] = useRejectBookingMutation();

  const [closeSession, { isLoading: closeVisitLoading }] =
    useCloseSessionMutation();
  const [deleteDeliverySession, { isLoading: closeDeliveryLoading }] =
    useDeleteDeliveryMutation();

  const [createDelivery] = useCreateDeliveryMutation();

  const isVisitActive = status === VISIT_STATUSES.APPROVED;
  const isOutHouseSession = visit.sessionType === VISIT_TYPES.OUT_HOUSE;
  const isInHouseSession = visit.sessionType === VISIT_TYPES.IN_HOUSE;

  const requestTableBooking = async token => {
    dispatch(onTableBookingInit());
    try {
      const res = await bookTable(token).unwrap();
      if (res.status === 200) {
        dispatch(onTableBookingApproved());
      } else if (res.status === 201) {
        dispatch(onTableBookingRequested());
      }
    } catch (err) {
      console.warn('Request Table booking error. ', err);
      const formattedMsg = getFormattedErrorMessage(err);
      toast.show(formattedMsg);
      dispatch(onError(err));
    }
  };

  const startSessionByShop = shop => {
    dispatch(setShopId(shop.id));
    navigation.navigate(ROUTES.RESTAURANT.SESSION_TYPE_MODAL, {
      shop,
    });
  };

  const startInHouseSessionByShop = () => {
    if (tableHash) {
      requestTableBooking(tableHash);
    } else {
      navigation.navigate(ROUTES.RESTAURANT.RESTAURANT_QR);
    }
  };

  const startOutHouseSessionByShop = async () => {
    dispatch(onCreateDeliveryInit());
    try {
      await createDelivery(shopId).unwrap();
      dispatch(onCreateDeliveryApproved());
    } catch (err) {
      console.warn('Delivery/Take-away request error: ', err);
      const formattedMsg = getFormattedErrorMessage(err);
      toast.show(formattedMsg);
      dispatch(onError(err));
    }
  };

  const startInHouseSessionByQr = async data => {
    if (!isShopTableToken(data)) {
      throw new Error(translation('wrongQRCodeScanned', { ns: 'qrReader' }));
    }
    const token = getHash(data);
    try {
      const table = await getTableInfo(token).unwrap();

      if (shopId && shopId !== table.shopId) {
        throw new Error(translation('wrongShopScanned', { ns: 'qrReader' }));
      }
      dispatch(
        setTable({
          tableId: table.id,
          tableName: table.title,
          tableHash: token,
        }),
      );
      await navigateToShop(table);

      const startVisitAllowed = !!shopId;
      if (startVisitAllowed) {
        requestTableBooking(token);
      }
    } catch (err) {
      console.warn('Get Table details error. ', err);
      const formattedMsg = getFormattedErrorMessage(err);
      toast.show(formattedMsg);
      throw err;
    }
  };

  const restartInHouseSession = async () => {
    if (!visit.tableHash) {
      return startInHouseSessionByQr();
    }
    await requestTableBooking(visit.tableHash);
  };

  const clearTableHash = () => {
    dispatch(setTableHash(null));
  };

  const clearSelectedShop = () => {
    dispatch(setShopId(null));
  };

  const deleteLocalSession = () => {
    // For now just clearing visit.
    // In the future - will handle diffent slices.
    dispatch(clearVisit());
  };

  const deleteInHouseSession = async () => {
    try {
      await closeSession().unwrap();
      deleteLocalSession();
      toast.show(translation('inHouseSessionClosed'), {
        type: TOAST_TYPES.SUCCESS,
      });
    } catch (err) {
      const activeOrderErr = err.status === 406;
      console.warn('Visit session closing error', err);
      const errorText = activeOrderErr ? 'yourActiveOrder' : 'error';
      toast.show(
        translation(errorText, {
          ns: activeOrderErr ? 'clientSession' : 'general',
        }),
      );
    }
  };

  const deleteOutHouseSession = async () => {
    try {
      await deleteDeliverySession().unwrap();
      deleteLocalSession();
      toast.show(translation('deliverySessionClosed'), {
        type: TOAST_TYPES.SUCCESS,
      });
    } catch (err) {
      console.warn('Delivery session closing error', err);
      const formattedMsg = getFormattedErrorMessage(err);
      toast.show(formattedMsg);
    }
  };

  const deleteCurrentSession = async () => {
    if (isInHouseSession) {
      await deleteInHouseSession();
    } else if (isOutHouseSession) {
      await deleteOutHouseSession();
    }
  };

  const getCurrentUser = async () => {
    try {
      const user = await getUserData().unwrap();
      return user;
    } catch (err) {
      console.warn('Get current user error', err);
      const formattedMsg = getFormattedErrorMessage(err);
      toast.show(formattedMsg);
    }
  };

  const loadCurrentSessionForUser = async user => {
    try {
      const sessions = await getCurrentSession().unwrap();
      const s = sessions[0];
      if (!s || !user) {
        return null;
      }
      const isOwner = s.owner.id === user.id;
      return {
        ...s,
        status: VISIT_STATUSES.APPROVED,
        tableHash: null,
        tableName: '',
        error: null,
        isOwner,
        requestIds: [],
      };
    } catch (err) {
      console.warn('Get session error', err);
      const formattedMsg = getFormattedErrorMessage(err);
      toast.show(formattedMsg);
    }
  };

  const reloadSession = async () => {
    const user = await getCurrentUser();
    const session = await loadCurrentSessionForUser(user);

    if (!session) {
      deleteLocalSession();
      return;
    }
    dispatch(setVisit(session));
  };

  const initSession = async () => {
    // Retrieve API session or local session from storage.
    const user = await getCurrentUser();
    const session = await loadCurrentSessionForUser(user);

    const prevSavedVisit = await getVisitFromStorage();
    const payload = session || prevSavedVisit;

    if (!payload) {
      return;
    }

    const orderId = session.orders.length
      ? session.orders.find(o => o.client.id === user.id)?.orderId
      : null;
    let order;
    if (orderId) {
      order = await getOrderById(orderId).unwrap();
    }
    if (!orderId || order.status === ORDER_STATUSES.COMPLETED) {
      // Skipping previous order. Pulling latest locally saved.
      order = await getOrderFromStorage();
      if (order && order.sessionId !== payload.sessionId) {
        removeOrderFromStorage();
        order = null;
      }
    }
    if (order) {
      dispatch(setOrder(order));
    }
    dispatch(setVisit(payload));
  };

  const navigateToShop = async table => {
    const r = await getShopById(table.shopId);
    const restaurant = r.data;
    navigation.navigate(ROUTES.RESTAURANT.RESTAURANT_CATEGORIES, {
      restaurant,
    });
  };

  const resolveTableRequest = reqId => {
    dispatch(resolveTableBookingRequest(reqId));
  };

  const approveTableBookingRequest = async reqId => {
    try {
      await approveTableBooking(reqId).unwrap();
      reloadSession();
    } catch (err) {
      console.warn('approveTableBookingRequest error. ', err);
      const formattedMsg = getFormattedErrorMessage(err);
      toast.show(formattedMsg);
    }
    resolveTableRequest(reqId);
  };

  const rejectTableBookingRequest = async reqId => {
    try {
      await rejectTableBooking(reqId).unwrap();
    } catch (err) {
      console.warn('rejectTableBookingRequest error. ', err);
      const formattedMsg = getFormattedErrorMessage(err);
      toast.show(formattedMsg);
    }
    resolveTableRequest(reqId);
  };

  useEffect(() => {
    if (visit.status === prevVisit?.status) {
      return;
    }
    if (visit.status === VISIT_STATUSES.REQUESTED) {
      saveVisitToStorage(visit);
    }
    if (visit.status === VISIT_STATUSES.APPROVED) {
      removeVisitFromStorage();
      if (!visit.sessionId) {
        // Load API session if visit was just approved.
        initSession();
      }
    }
  }, [visit, prevVisit]);

  useEffect(() => {
    if (!prevVisit) {
      initSession();
      return;
    }
    if (
      prevVisit.status === VISIT_STATUSES.UNINITIALIZED &&
      visit.status === VISIT_STATUSES.REQUESTED
    ) {
      navigateToShop(visit);
    }
  }, [visit, prevVisit]);

  return (
    <SessionContext.Provider
      value={{
        visit,
        isVisitActive,
        isOutHouseSession,
        isInHouseSession,
        startInHouseSessionByQr,
        startSessionByShop,
        startInHouseSessionByShop,
        startOutHouseSessionByShop,
        restartInHouseSession,
        clearTableHash,
        clearSelectedShop,
        deleteInHouseSession,
        deleteOutHouseSession,
        deleteCurrentSession,
        deleteLocalSession,
        closeVisitLoading,
        closeDeliveryLoading,
        approveTableBookingRequest,
        rejectTableBookingRequest,
        reloadSession,
      }}>
      {children}
    </SessionContext.Provider>
  );
};

export { SessionProvider, SessionContext };
