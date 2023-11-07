import { CommonActions } from '@react-navigation/native';
import creditCardType from 'credit-card-type';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, View } from 'react-native';
import { useToast } from 'react-native-toast-notifications';
import Button from '../../../components/common/Button';

import IconButton from '../../../components/IconButton';
import InfoModal from '../../../components/InfoModal';
import LoadingSpinner from '../../../components/LoadingSpinner';
import { ROUTES } from '../../../constants/navigator';
import { PAYMENT_TYPES } from '../../../constants/payment';
import { COLORS } from '../../../constants/theme';
import { TOAST_TYPES } from '../../../constants/toasts';
import { VISIT_TYPES } from '../../../constants/visit';
import { moderateScale } from '../../../utils/scale';

const STATUS_PARAMS_MAP = {
  [PAYMENT_TYPES.CASH]: {
    title: 'paymentModal.waiterTitle',
    description: 'paymentModal.waiterDescription',
    cancelEnabled: true,
    okEnabled: false,
    timeout: true,
    loaderComponent: <LoadingSpinner size="large" />,
  },
  [PAYMENT_TYPES.CARD]: {
    title: 'paymentModal.pendingTitle',
    description: 'paymentModal.pendingDescription',
    cancelEnabled: false,
    okEnabled: false,
    loaderComponent: (
      <IconButton name="schedule" size={34} color={COLORS.ORANGE} />
    ),
  },
};

const ERROR_PARAMS = {
  title: 'paymentModal.errorTitle',
  description: 'paymentModal.errorDescription',
  cancelEnabled: false,
  okEnabled: true,
  loaderComponent: <IconButton name="error" size={34} color={COLORS.RED} />,
};

const PaymentStatusModal = ({ navigation, route }) => {
  const { t: translation } = useTranslation('modals');
  const toast = useToast();

  const {
    paymentMethod: { type, data, label },
    sessionId,
    sessionType,
    error,
  } = route.params;

  const {
    title,
    description,
    cancelEnabled,
    okEnabled,
    loaderComponent,
    timeout,
  } = error
    ? {
        ...ERROR_PARAMS,
        description: error?.data?.message
          ? `paymentModal.${error.data.message}`
          : ERROR_PARAMS.description,
      }
    : STATUS_PARAMS_MAP[type] || STATUS_PARAMS_MAP[PAYMENT_TYPES.CARD];

  const isOutHouseSession = sessionType === VISIT_TYPES.OUT_HOUSE;

  const resetNavigation = () => {
    navigation.dispatch(state => {
      return CommonActions.reset({
        index: 0,
        routes: [
          {
            name: ROUTES.ORDERS.ROOT_STACK,
          },
        ],
      });
    });
  };

  const onCancel = () => {
    navigation.goBack();
  };

  const onSubmit = () => {
    if (error?.status === 410) {
      resetNavigation();
      return;
    }
    navigation.goBack();
  };

  const getPaymentMethodDetails = () => {
    const cardType = creditCardType(data?.number)[0]?.type;
    const method = `${cardType} ${label}`;

    return `${translation('paymentModal.proceedWith')} ${method}...`;
  };

  useEffect(() => {
    if (!timeout) {
      return;
    }
    setTimeout(async () => {
      resetNavigation();
      if (isOutHouseSession) {
        toast.show(translation('paymentModal.orderPlaced'), {
          type: TOAST_TYPES.SUCCESS,
        });
      }
    }, 3000);
  }, []);

  return (
    <InfoModal>
      <>
        <View style={styles.textContainer}>
          <Text style={styles.title}>{translation(title)}</Text>
          <Text style={styles.description}>{translation(description)}</Text>
        </View>
        {React.cloneElement(loaderComponent, { style: styles.loading })}
        {(cancelEnabled || okEnabled) && (
          <View style={styles.buttonContainer}>
            {cancelEnabled && (
              <Button
                style={styles.cancelButton}
                onPress={onCancel}
                secondary
                label="Cancel"
              />
            )}
            {okEnabled && (
              <Button
                style={styles.cancelButton}
                onPress={onSubmit}
                label="Okay"
              />
            )}
          </View>
        )}
      </>
    </InfoModal>
  );
};

const styles = StyleSheet.create({
  textContainer: {
    paddingHorizontal: moderateScale(53),
    alignItems: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: moderateScale(16),
    color: COLORS.TEXT.BLACK,
  },
  description: {
    textAlign: 'center',
    marginTop: moderateScale(10),
    fontWeight: '500',
    fontSize: moderateScale(14),
    color: COLORS.GRAY_ICON,
  },
  buttonContainer: {
    paddingHorizontal: moderateScale(16),
    borderTopWidth: 1,
    borderColor: COLORS.GRAY,
    marginTop: moderateScale(22),
    paddingTop: moderateScale(16),
  },
  button: {
    flex: 1,
    marginHorizontal: moderateScale(6),
    marginBottom: 0,
  },
  loading: {
    flex: 0,
    marginTop: moderateScale(22),
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelButton: {
    marginBottom: 0,
  },
});

export default PaymentStatusModal;
