import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { InteractionManager, StyleSheet, Text, View } from 'react-native';

import Button from '../../../components/common/Button';
import PageContainer from '../../../components/PageContainer';
import PageHeader from '../../../components/PageHeader';
import RadioButtonGroup from '../../../components/RadioButtonGroup';

import { PaymentContext } from '../../../context/PaymentContext';
import useLanguageStyles from '../../../hooks/useLanguageStyles';

import { ROUTES } from '../../../constants/navigator';
import { PAYMENT_TYPES } from '../../../constants/payment';
import { COLORS } from '../../../constants/theme';
import { moderateScale } from '../../../utils/scale';

import { useToast } from 'react-native-toast-notifications';
import CallAWaiter from '../../../components/common/CallAWaiter/CallAWaiter';
import { OrderContext } from '../../../context/OrderContext';
import { SessionContext } from '../../../context/SessionContext';
import { usePayForOrdersMutation } from '../../../services/ordersService';
import { getPaymentIcon, getPaymentMethods } from './helper';

const PaymentMethod = ({ navigation, route }) => {
  const toast = useToast();
  const { t: translation } = useTranslation('paymentMethodScreen');
  const { t: generalTranslation } = useTranslation('general');
  const { languageStyles } = useLanguageStyles();
  const [selectedPaymentIndex, setSelectedPaymentIndex] = useState(null);
  const { cards, lastPayment, setSelectedPayment, clearSelectedPayment } =
    useContext(PaymentContext);
  const { deleteOrder } = useContext(OrderContext);
  const { isInHouseSession } = useContext(SessionContext);

  const { tips, session, selectedOrderIds } = route.params;

  const [payForOrder, { isLoading }] = usePayForOrdersMutation();

  const paymentMethods = getPaymentMethods(cards);

  const isPaymentSelected = selectedPaymentIndex !== null;

  useFocusEffect(
    useCallback(() => {
      checkLastPayment();
    }, [cards]),
  );

  const onMethodSelect = (m, index) => {
    setSelectedPaymentIndex(index);
  };

  const onRequestPayment = (paymentMethod, cardId = null) => {
    const payload = {
      paymentMethod,
      cardId,
      ordersIds: selectedOrderIds,
      tips,
    };
    return payForOrder(payload).unwrap();
  };

  const presentPaymentStatusModal = (paymentMethod, error) => {
    InteractionManager.runAfterInteractions(() => {
      navigation.navigate(ROUTES.ORDERS.PAYMENT.PAYMENT_STATUS, {
        paymentMethod,
        sessionId: session.id,
        sessionType: session.sessionType,
        error,
      });
    });
  };

  const onPaymentFailed = (paymentMethod, error) => {
    console.warn('Payment error', error);
    presentPaymentStatusModal(paymentMethod, error);
  };

  const onPaymentConfirmed = paymentMethod => {
    deleteOrder();
    presentPaymentStatusModal(paymentMethod);
  };

  const onConfirmPayment = async paymentMethod => {
    const { type, data } = paymentMethod;
    try {
      const res = await onRequestPayment(type, data?.id);
      const { paymentSession } = res;
      if (!paymentSession) {
        return onPaymentConfirmed(paymentMethod);
      }
      // This means we're opening an iframe to confirm our new card details / ApplePay / GooglePay.
      navigation.navigate(ROUTES.ORDERS.PAYMENT.PAYMENT_FRAME, {
        session: paymentSession,
        onSuccess: () => onPaymentConfirmed(paymentMethod),
        onError: err => onPaymentFailed(paymentMethod, err),
      });
    } catch (err) {
      onPaymentFailed(paymentMethod, err);
    }
  };

  const handleSubmit = async () => {
    const selectedPayment = paymentMethods[selectedPaymentIndex];
    // if (selectedPayment !== PAYMENT_TYPES.NEW_CARD) {
    //   await setSelectedPayment(selectedPayment);
    // } else {
    //   await clearSelectedPayment();
    // }
    onConfirmPayment(selectedPayment);
  };

  const checkLastPayment = () => {
    if (!lastPayment) {
      return;
    }
    if (lastPayment.type === PAYMENT_TYPES.CASH) {
      setSelectedPaymentIndex(
        paymentMethods.findIndex(item => item.type === PAYMENT_TYPES.CASH),
      );
    }
    if (lastPayment.type === PAYMENT_TYPES.CARD) {
      setSelectedPaymentIndex(
        paymentMethods.findIndex(
          item =>
            item.type === PAYMENT_TYPES.CARD &&
            item.data.cardNumber === lastPayment.data.cardNumber,
        ),
      );
    }
  };

  const PaymentItem = useCallback(({ method }) => {
    return (
      <View style={[styles.paymentItem, languageStyles.row]}>
        <Text style={styles.paymentLabel}>{method.label}</Text>
        <View style={styles.paymentDivider} />
        <View style={styles.paymentIcon}>
          {method && getPaymentIcon(method.type, method.data)}
        </View>
      </View>
    );
  }, []);

  return (
    <PageContainer
      header={
        <PageHeader
          title={translation('pageTitle')}
          rightButton={isInHouseSession && <CallAWaiter />}
        />
      }>
      <Text style={[styles.title, languageStyles.text]}>
        {translation('selectMethod')}
      </Text>
      <Text style={[styles.info, languageStyles.text]}>
        {translation('info')}
      </Text>

      <RadioButtonGroup
        isReversed
        activeIndex={selectedPaymentIndex}
        onItemSelect={onMethodSelect}
        items={paymentMethods.map((method, index) => ({
          item: { ...method, id: index },
          title: <PaymentItem method={method} />,
          info: method.type === PAYMENT_TYPES.CASH &&
            paymentMethods[selectedPaymentIndex]?.type ===
              PAYMENT_TYPES.CASH && (
              <Text style={styles.info}>{translation('cashInfo')}</Text>
            ),
        }))}
        itemStyle={[styles.radioItem, languageStyles.rowReverse]}
      />
      <Button
        style={styles.selectButton}
        label={generalTranslation('select')}
        onPress={handleSubmit}
        loading={isLoading}
        secondary={!isPaymentSelected}
        disabled={!isPaymentSelected}
      />
    </PageContainer>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: moderateScale(16),
    fontWeight: '600',
    color: COLORS.TEXT.BLACK,
    marginTop: moderateScale(20),
    marginBottom: moderateScale(12),
  },
  info: {
    fontSize: moderateScale(12),
    fontWeight: '400',
    color: COLORS.GRAY_ICON,
    marginBottom: moderateScale(12),
  },
  radioItem: {
    marginVertical: moderateScale(12),
  },
  paymentItem: {
    flex: 1,
    height: moderateScale(20),
    alignItems: 'center',
  },
  paymentLabel: {
    paddingHorizontal: moderateScale(14),
    fontSize: moderateScale(16),
    fontWeight: '400',
    color: COLORS.TEXT.BLACK,
  },
  paymentDivider: {
    flex: 0.8,
  },
  paymentIcon: {
    flex: 0.2,
    height: moderateScale(18),
  },
  paymentInfo: {
    fontSize: moderateScale(12),
    fontWeight: '400',
    color: COLORS.GRAY_ICON,
  },
  selectButton: {
    position: 'absolute',
    bottom: 0,
    marginHorizontal: '5%',
  },
});

export default PaymentMethod;
