import { useFocusEffect, useNavigation } from '@react-navigation/native';
import React from 'react';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { View, StyleSheet } from 'react-native';
import Button from '../../../../components/common/Button';
import LoadingSpinner from '../../../../components/LoadingSpinner';

import PageContainer from '../../../../components/PageContainer';
import PageHeader from '../../../../components/PageHeader';
import { ROUTES } from '../../../../constants/navigator';
import { useLazyGetAddressesQuery } from '../../../../services/addressService';
import { moderateScale } from '../../../../utils/scale';
import AddressListItem from './components/AddressListItem/';
import NoAddresses from './components/NoAddresses';

const AddressList = () => {
  const { t: translation } = useTranslation('addressListScreen');
  const navigation = useNavigation();

  const [getAddresses, { data: addresses = [], isFetching }] =
    useLazyGetAddressesQuery();

  useFocusEffect(
    useCallback(() => {
      getAddresses();
    }, []),
  );

  const onAddAdressPress = () => {
    navigation.navigate(ROUTES.PROFILE.ADDRESS.ADDRESS_INFO);
  };
  return (
    <PageContainer header={<PageHeader title={translation('pageTitle')} />}>
      {isFetching ? (
        <LoadingSpinner />
      ) : addresses.length ? (
        <View style={styles.container}>
          {addresses.map(address => (
            <AddressListItem address={address} />
          ))}
        </View>
      ) : (
        <NoAddresses />
      )}

      <Button
        onPress={onAddAdressPress}
        style={styles.addAddressButton}
        label={translation('addAddress')}
      />
    </PageContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: moderateScale(20),
  },
  addAddressButton: {
    position: 'absolute',
    bottom: 0,
    marginHorizontal: '5%',
  },
});

export default AddressList;
