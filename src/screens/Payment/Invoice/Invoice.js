import React from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, View } from 'react-native';
import { useToast } from 'react-native-toast-notifications';

import Button from '../../../components/common/Button';
import PageContainer from '../../../components/PageContainer';
import PageHeader from '../../../components/PageHeader';

import useLanguageStyles from '../../../hooks/useLanguageStyles';

import CallAWaiter from '../../../components/common/CallAWaiter/CallAWaiter';
import { ROUTES } from '../../../constants/navigator';
import { COLORS } from '../../../constants/theme';
import { getValidPrice } from '../../../utils/order';
import { moderateScale } from '../../../utils/scale';

const Invoice = ({ navigation, route }) => {
  const toast = useToast();
  const { t: translation } = useTranslation('invoiceScreen');
  const { t: generalTranslation } = useTranslation('general');
  const { tips, session, selectedOrderIds } = route.params;

  const orderPrice = getValidPrice(route.params.totalPrice);
  const tipsPrice = getValidPrice(tips);
  const totalPrice = getValidPrice(route.params.totalPrice + tips);

  const { languageStyles } = useLanguageStyles();

  const onSubmit = () => {
    navigation.navigate(ROUTES.ORDERS.PAYMENT.PAYMENT_METHOD, {
      tips,
      session,
      selectedOrderIds,
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
        {translation('checkBill')}
      </Text>
      <View style={[styles.item, languageStyles.row]}>
        <Text style={[styles.text, languageStyles.text]}>
          {translation('order')}
        </Text>
        <Text style={languageStyles.text}>{orderPrice}</Text>
      </View>
      <View style={[styles.item, languageStyles.row]}>
        <Text style={[styles.text, languageStyles.text]}>
          {translation('tips')}
        </Text>
        <Text style={languageStyles.text}>{tipsPrice}</Text>
      </View>
      <View style={[styles.total, languageStyles.row]}>
        <Text style={[styles.text, styles.bold, languageStyles.text]}>
          {translation('total')}
        </Text>
        <Text style={[styles.bold, languageStyles.text]}>{totalPrice}</Text>
      </View>
      <Button
        onPress={onSubmit}
        style={styles.selectButton}
        label={`${translation('confirm')} ${totalPrice}`}
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
  item: {
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: moderateScale(12),
  },
  text: {
    fontSize: moderateScale(16),
    fontWeight: '500',
  },
  total: {
    marginTop: moderateScale(15),
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: moderateScale(15),
    borderTopWidth: 1,
    borderTopColor: COLORS.GRAY_LIGHT,
  },
  bold: {
    fontWeight: '600',
  },
  selectButton: {
    marginTop: 'auto',
  },
});

export default Invoice;
