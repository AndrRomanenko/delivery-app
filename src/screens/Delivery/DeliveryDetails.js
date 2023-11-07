import React, { useContext, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text } from 'react-native';
import { useDispatch } from 'react-redux';
import Button from '../../components/common/Button';
import PageContainer from '../../components/PageContainer';
import PageHeader from '../../components/PageHeader';
import RadioButtonGroup from '../../components/RadioButtonGroup';
import { ORDER_SERVICE_TYPES } from '../../constants/order';
import { COLORS } from '../../constants/theme';
import { OrderContext } from '../../context/OrderContext';
import useLanguageStyles from '../../hooks/useLanguageStyles';
import { setOrderServiceType } from '../../store/reducers/orderSlice';
import { moderateScale } from '../../utils/scale';
import AddressSection from './components/AddressSection';
import TimeSection from './components/TimeSection';

const DeliveryDetails = ({ route }) => {
  const dispatch = useDispatch();
  const {
    order,
    onPlaceOrder,
    loading,
    isDeliveryByShopAllowed,
    isTakeAwayByShopAllowed,
  } = useContext(OrderContext);
  const { t: translation } = useTranslation('deliveryDetailsScreen');
  const { languageStyles } = useLanguageStyles();
  const scrollRef = useRef(null);

  const { restaurant } = route.params;

  const { type, address } = order?.outHouseDetails;

  const deliveryAllowed = isDeliveryByShopAllowed(restaurant);
  const takeAwayAllowed = isTakeAwayByShopAllowed(restaurant);

  const DELIVERY_OPTIONS = [
    {
      type: ORDER_SERVICE_TYPES.DELIVERY,
      active: deliveryAllowed,
    },
    {
      type: ORDER_SERVICE_TYPES.TAKE_AWAY,
      active: takeAwayAllowed,
    },
  ];

  useEffect(() => {
    dispatch(setOrderServiceType(ORDER_SERVICE_TYPES.DELIVERY));
  }, []);

  const onServiceTypeSelect = data => {
    dispatch(setOrderServiceType(data.type));
  };

  const onSubmit = () => {
    onPlaceOrder();
  };

  const isDeliveryInfoComplete = !!(type && address.id);

  return (
    <PageContainer
      header={<PageHeader title={translation('title')} />}
      scrollRef={scrollRef}>
      <Text style={[styles.title, languageStyles.text]}>
        {translation('typeOfOrder')}
      </Text>
      <RadioButtonGroup
        activeIndex={DELIVERY_OPTIONS.findIndex(o => o.type === type)}
        onItemSelect={onServiceTypeSelect}
        items={DELIVERY_OPTIONS.filter(o => o.active).map((o, index) => ({
          item: { type: o.type, id: index },
          title: <Text style={styles.optionLabel}>{translation(o.type)}</Text>,
        }))}
        itemStyle={languageStyles.rowReverse}
      />

      <AddressSection />

      <TimeSection scrollRef={scrollRef} />

      <Button
        onPress={onSubmit}
        style={styles.selectButton}
        label={translation('continue')}
        loading={loading}
        disabled={!isDeliveryInfoComplete}
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
    marginBottom: moderateScale(24),
  },
  selectButton: {
    position: 'absolute',
    bottom: 0,
    marginHorizontal: '5%',
  },
  optionLabel: {
    fontSize: moderateScale(16),
    fontWeight: '400',
    color: COLORS.TEXT.BLACK,
    flex: 1,
    paddingHorizontal: moderateScale(14),
    paddingVertical: moderateScale(11),
  },
});

export default DeliveryDetails;
