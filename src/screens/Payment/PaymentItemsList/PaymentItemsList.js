import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, View } from 'react-native';

import Button from '../../../components/common/Button';
import CallAWaiter from '../../../components/common/CallAWaiter/CallAWaiter';
import Divider from '../../../components/common/Divider';
import PageContainer from '../../../components/PageContainer';
import PageHeader from '../../../components/PageHeader';

import useLanguageStyles from '../../../hooks/useLanguageStyles';

import { ROUTES } from '../../../constants/navigator';
import { COLORS } from '../../../constants/theme';
import { getValidPrice } from '../../../utils/order';
import { moderateScale } from '../../../utils/scale';
import PaymentItem from './components/PaymentItem';

const PaymentItemsList = ({ navigation, route }) => {
  const { t: translation } = useTranslation('paymentItemsListScreen');
  const { languageStyles } = useLanguageStyles();
  const { session, mainOrder } = route.params;

  const getDefaultItemsToPay = () => {
    if (!mainOrder.paid) {
      return [mainOrder.id];
    }
    const ids = session.orders.filter(o => !o.paid).map(o => o.id);
    return ids;
  };

  const [itemsToPay, setItemsToPay] = useState(getDefaultItemsToPay());

  const handleUserPress = userId => {
    setItemsToPay(includedItems =>
      includedItems.includes(userId)
        ? includedItems.filter(id => id !== userId)
        : [...includedItems, userId],
    );
  };

  const totalPrice = session.orders.reduce(
    (acc, order) =>
      itemsToPay.includes(order.id) ? acc + order.resultPrice : acc,
    0,
  );

  const onSubmit = async () => {
    navigation.navigate(ROUTES.ORDERS.PAYMENT.TIPS, {
      totalPrice,
      session,
      selectedOrderIds: itemsToPay,
    });
  };

  return (
    <PageContainer
      header={
        <PageHeader
          title={translation('pageTitle')}
          rightButton={<CallAWaiter />}
        />
      }>
      <Text style={[styles.title, languageStyles.text]}>
        {translation('info')}
      </Text>
      {session.orders.map(order => (
        <PaymentItem
          key={order.id}
          disabled={order.paid}
          label={order.client.fullName}
          price={`+ ${getValidPrice(order.resultPrice)}`}
          onPress={() => handleUserPress(order.id)}
          checked={itemsToPay.includes(order.id)}
        />
      ))}
      <Divider />
      <View style={[styles.totalContainer, languageStyles.row]}>
        <Text style={styles.total}>{translation('total')}</Text>
        <Text style={styles.total}>{getValidPrice(totalPrice)}</Text>
      </View>
      <Button
        onPress={onSubmit}
        disabled={!itemsToPay.length}
        style={styles.selectButton}
        label={`${translation('selectPayment')} ${getValidPrice(totalPrice)}`}
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
  selectButton: {
    position: 'absolute',
    bottom: 0,
    marginHorizontal: '5%',
  },
  totalContainer: {
    justifyContent: 'space-between',
    marginTop: moderateScale(10),
  },
  total: {
    fontSize: moderateScale(16),
    fontWeight: '700',
  },
});

export default PaymentItemsList;
