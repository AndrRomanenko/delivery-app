import { useNavigation } from '@react-navigation/native';
import React, { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import LoadingSpinner from '../../../../components/LoadingSpinner';
import RadioButtonGroup from '../../../../components/RadioButtonGroup';
import { ROUTES } from '../../../../constants/navigator';
import { ORDER_SERVICE_TYPES } from '../../../../constants/order';
import { COLORS } from '../../../../constants/theme';
import { OrderContext } from '../../../../context/OrderContext';
import { SessionContext } from '../../../../context/SessionContext';
import useLanguageStyles from '../../../../hooks/useLanguageStyles';
import { useGetAddressesQuery } from '../../../../services/addressService';
import { useGetShopByIdQuery } from '../../../../services/shopsService';
import { setOrderAddressId } from '../../../../store/reducers/orderSlice';
import { getAddressLabel } from '../../../../utils/address';
import { moderateScale } from '../../../../utils/scale';

const AddressSection = () => {
  const dispatch = useDispatch();
  const { t: translation } = useTranslation('deliveryDetailsScreen');
  const navigation = useNavigation();
  const { languageStyles } = useLanguageStyles();
  const { order } = useContext(OrderContext);
  const { visit } = useContext(SessionContext);

  const { data: addresses = [], isLoading: isAddressesLoading } =
    useGetAddressesQuery();
  const { currentData: shopData, isLoading: isShopLoading } =
    useGetShopByIdQuery(visit.shopId);

  const [selectedAddressId, setSelectedAddressId] = useState(undefined);
  const shopAddresses = shopData?.addresses;

  const { type } = order?.outHouseDetails;

  const isDelivery = type === ORDER_SERVICE_TYPES.DELIVERY;
  const isTakeAway = type === ORDER_SERVICE_TYPES.TAKE_AWAY;

  const initializeDefaultValues = () => {
    let id;
    if (isDelivery) {
      id = addresses.length ? addresses[0].id : null;
    }
    if (isTakeAway) {
      id = shopAddresses.length ? shopAddresses[0].id : null;
    }
    setSelectedAddressId(id);
    dispatch(setOrderAddressId(id));
  };

  useEffect(() => {
    initializeDefaultValues();
  }, [type, shopAddresses, addresses]);

  const handleAddressSelect = data => {
    setSelectedAddressId(data.address.id);
    setOrderAddressId(data.address.id);
  };

  const getAddressesItems = () => {
    if (isDelivery) {
      return addresses.map((address, index) => ({
        item: { address, id: index },
        title: (
          <Text style={styles.optionLabel}>{getAddressLabel(address)}</Text>
        ),
      }));
    }
    if (isTakeAway) {
      return shopAddresses.map((address, index) => ({
        item: { address, id: index },
        title: <Text style={styles.optionLabel}>{address.formatted}</Text>,
      }));
    }
  };

  const getActiveAddressIndex = () => {
    if (isDelivery) {
      return addresses.findIndex(address => address.id === selectedAddressId);
    }
    if (isTakeAway) {
      return shopAddresses.findIndex(
        address => address.id === selectedAddressId,
      );
    }
  };

  const onAddAddressPress = () => {
    navigation.navigate(ROUTES.ORDERS.NEW_ADDRESS);
  };

  return (
    <>
      <Text style={[styles.title, languageStyles.text]}>
        {isDelivery
          ? translation('selectAddress')
          : translation('selectRestaurant')}
      </Text>
      {isShopLoading || isAddressesLoading ? (
        <LoadingSpinner style={styles.addressSpinner} />
      ) : (
        <>
          {isTakeAway && (
            <Text style={[styles.info, languageStyles.text]}>
              {translation('restaurantInfo')}
            </Text>
          )}
          <RadioButtonGroup
            activeIndex={getActiveAddressIndex()}
            onItemSelect={handleAddressSelect}
            items={getAddressesItems()}
            itemStyle={languageStyles.rowReverse}
          />
          {isDelivery && (
            <TouchableOpacity onPress={onAddAddressPress}>
              <Text style={[styles.addAddressLabel, languageStyles.text]}>
                {translation('addAddress')}
              </Text>
            </TouchableOpacity>
          )}
        </>
      )}
    </>
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
  addAddressLabel: {
    fontSize: moderateScale(16),
    fontWeight: '600',
    color: COLORS.BLUE,
    paddingVertical: moderateScale(11),
  },
  optionLabel: {
    fontSize: moderateScale(16),
    fontWeight: '400',
    color: COLORS.TEXT.BLACK,
    flex: 1,
    paddingHorizontal: moderateScale(14),
    paddingVertical: moderateScale(11),
  },
  addressSpinner: {
    flex: 0,
  },
});

export default AddressSection;
