import React, { useCallback, useEffect } from 'react';
import { Platform } from 'react-native';

import messaging from '@react-native-firebase/messaging';
import { getI18n } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useSaveDeviceTokenMutation } from '../services/userService';
import {
  onTableBookingApproved,
  onTableBookingRejected,
  receiveTableBookingRequest,
} from '../store/reducers/visitSlice';
import {
  HANDLER_TYPES,
  requestUserPermission,
} from '../utils/pushNotification';
import { VISIT_EVENTS, VISIT_STATUSES } from '../constants/visit';
import usePrevious from '../hooks/usePrevious';

const PushNotificationContext = React.createContext();

const PushNotificationProvider = props => {
  const [saveDeviceToken] = useSaveDeviceTokenMutation();
  const dispatch = useDispatch();
  const visit = useSelector(state => state.visit);
  const prevVisit = usePrevious(visit);

  const onMessage = useCallback(
    (message, reason) => {
      switch (message.data.event) {
        case VISIT_EVENTS.VISIT_CHANGED:
          if (
            Number(message.data.tableId) !== visit.tableId ||
            Number(message.data.shopId) !== visit.shopId ||
            visit.status !== VISIT_STATUSES.REQUESTED
          ) {
            return;
          }

          if (message.data.joinTableRequestStatus === VISIT_STATUSES.APPROVED) {
            dispatch(onTableBookingApproved());
          } else if (
            message.data.joinTableRequestStatus === VISIT_STATUSES.REJECTED
          ) {
            dispatch(onTableBookingRejected());
          }
          return;
        case VISIT_EVENTS.VISIT_CREATED:
          if (
            Number(message.data.tableId) !== visit.tableId ||
            Number(message.data.shopId) !== visit.shopId ||
            visit.status !== VISIT_STATUSES.APPROVED ||
            !visit.isOwner ||
            visit.requestIds.includes(message.data.joinTableRequestId)
          ) {
            return;
          }
          if (
            message.data.joinTableRequestStatus === VISIT_STATUSES.REQUESTED
          ) {
            dispatch(
              receiveTableBookingRequest(message.data.joinTableRequestId),
            );
          }
          return;

        default:
          return;
      }
    },
    [visit],
  );

  const safeFCMToken = async () => {
    const platform = Platform.OS.toLowerCase();
    const locale = getI18n().language;
    const fcmToken = await messaging().getToken();
    const payload = {
      fcmToken,
      platform,
      locale,
    };
    try {
      await saveDeviceToken(payload);
    } catch (err) {
      console.warn('Save device FCM token error. ', err);
      throw err;
    }
  };

  const validateFcm = async () => {
    const permission = await requestUserPermission();
    if (!permission) {
      throw new Error('User declined push notification permission.');
    }
    await safeFCMToken();
  };

  const handleQuitState = useCallback(async () => {
    const msg = await messaging().getInitialNotification();
    msg && onMessage(msg, HANDLER_TYPES.QUIT);
  }, [visit, prevVisit]);

  useEffect(() => {
    if (prevVisit && visit.status !== prevVisit.status) {
      handleQuitState();
    }
  }, [prevVisit, handleQuitState]);

  useEffect(() => {
    validateFcm();
    const msgListener = messaging().onMessage(msg =>
      onMessage(msg, HANDLER_TYPES.FOREGROUND),
    );
    const openListener = messaging().onNotificationOpenedApp(msg =>
      onMessage(msg, HANDLER_TYPES.BACKGROUND),
    );

    return () => {
      msgListener();
      openListener();
      messaging().deleteToken();
    };
  }, [onMessage]);

  return (
    <PushNotificationContext.Provider value={{}}>
      {props.children}
    </PushNotificationContext.Provider>
  );
};

export { PushNotificationProvider, PushNotificationContext };
