import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { useToast } from 'react-native-toast-notifications';
import Button from '../../../../components/common/Button';
import InputLabel from '../../../../components/common/InputLabel';
import TextInput from '../../../../components/input/TextInput';
import PageContainer from '../../../../components/PageContainer';
import PageHeader from '../../../../components/PageHeader';
import { ROUTES } from '../../../../constants/navigator';
import { STYLES } from '../../../../constants/theme';
import { TOAST_TYPES } from '../../../../constants/toasts';
import TrashButton from '../../../../icons/address/buttonTrash.svg';
import CountryPicker from '../../../../components/input/CountryInput/CountryPicker';
import {
  useAddAddressMutation,
  useGetAddressesQuery,
  useUpdateAddressMutation,
} from '../../../../services/addressService';
import { requiredValidation } from '../../../../utils/validations';
import { getCountryByName } from '../../../../utils/country';
import { moderateScale } from '../../../../utils/scale';

const AddressInfo = ({ route }) => {
  const { t: translation } = useTranslation('addressInfoScreen');
  const navigation = useNavigation();
  const toast = useToast();

  const { data: addresses = [] } = useGetAddressesQuery();
  const [addAddress, { isLoading: addAddressLoading }] =
    useAddAddressMutation();
  const [updateAddress, { isLoading: updateAddressLoading }] =
    useUpdateAddressMutation();

  // addressId = Edit mode
  const addressId = route?.params?.addressId;
  const selectedAddressData =
    addressId && addresses.find(addr => addr.id === addressId);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onTouched',
    defaultValues: {
      ...selectedAddressData,
      country: getCountryByName(selectedAddressData?.country),
    },
  });

  const onSavePress = async data => {
    const validatedData = {
      ...data,
      country: data?.country?.name?.common,
    };
    try {
      if (addressId) {
        await updateAddress({ id: addressId, ...validatedData }).unwrap();
      } else {
        await addAddress(validatedData).unwrap();
      }
      toast.show(translation('addressSaved'), { type: TOAST_TYPES.SUCCESS });
      navigation.goBack();
    } catch (error) {
      console.warn('Address save error', error);
      toast.show(error.data.message);
    }
  };

  const onDeletePress = () => {
    navigation.navigate(ROUTES.PROFILE.ADDRESS.REMOVAL_MODAL, {
      addressId,
    });
  };

  const DeleteAddressButton = addressId && (
    <TouchableOpacity onPress={onDeletePress} style={STYLES.shadow}>
      <TrashButton />
    </TouchableOpacity>
  );

  return (
    <PageContainer
      header={
        <PageHeader
          title={translation(`${addressId ? 'pageTitleEdit' : 'pageTitleNew'}`)}
          rightButton={DeleteAddressButton}
        />
      }>
      <InputLabel label={translation('country')} style={styles.marginTop} />
      <Controller
        control={control}
        name="country"
        render={({ field: { onChange, value } }) => (
          <CountryPicker value={value} onSelect={onChange} disablePhoneCode />
        )}
        rules={requiredValidation}
      />

      <InputLabel label={translation('city')} />
      <Controller
        control={control}
        name="city"
        render={({ field: { onChange, value, onBlur } }) => (
          <TextInput
            value={value}
            onBlur={onBlur}
            onChangeText={onChange}
            error={errors?.city?.message}
          />
        )}
        rules={requiredValidation}
      />

      <InputLabel label={translation('addressLineFirst')} />
      <Controller
        control={control}
        name="addressLineFirst"
        render={({ field: { onChange, value, onBlur } }) => (
          <TextInput
            value={value}
            onBlur={onBlur}
            onChangeText={onChange}
            error={errors?.addressLineFirst?.message}
          />
        )}
        rules={requiredValidation}
      />

      <InputLabel label={translation('addressLineSecond')} />
      <Controller
        control={control}
        name="addressLineSecond"
        render={({ field: { onChange, value, onBlur } }) => (
          <TextInput
            value={value}
            onBlur={onBlur}
            onChangeText={onChange}
            error={errors?.addressLineSecond?.message}
          />
        )}
      />

      <View style={styles.zipCode}>
        <InputLabel label={translation('zipCode')} />
        <Controller
          control={control}
          name="zipCode"
          render={({ field: { onChange, value, onBlur } }) => (
            <TextInput
              value={value}
              onBlur={onBlur}
              onChangeText={onChange}
              error={errors?.zipCode?.message}
            />
          )}
        />
      </View>
      <Button
        onPress={handleSubmit(onSavePress)}
        disabled={addAddressLoading || updateAddressLoading}
        loading={addAddressLoading || updateAddressLoading}
        style={styles.marginTop}
        label={translation(`${addressId ? 'saveChanges' : 'addAddress'}`)}
      />
    </PageContainer>
  );
};

const styles = StyleSheet.create({
  marginTop: {
    marginTop: moderateScale(24),
  },
  zipCode: {
    width: '40%',
  },
});

export default AddressInfo;
