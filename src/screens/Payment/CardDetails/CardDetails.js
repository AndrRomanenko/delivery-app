import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { useToast } from 'react-native-toast-notifications';

import PageContainer from '../../../components/PageContainer';
import PageHeader from '../../../components/PageHeader';
import Button from '../../../components/common/Button';
import InputLabel from '../../../components/common/InputLabel';
import MaskedInput from '../../../components/input/MaskedInput';
import TextInput from '../../../components/input/TextInput';

import useLanguageStyles from '../../../hooks/useLanguageStyles';
import { PaymentContext } from '../../../context/PaymentContext';

import {
  cardCvvValidation,
  cardDateValidation,
  cardNumberValidation,
  fullNameValidation,
} from '../../../utils/validations';
import { moderateScale } from '../../../utils/scale';
import { COLORS } from '../../../constants/theme';
import { TOAST_TYPES } from '../../../constants/toasts';
import { ROUTES } from '../../../constants/navigator';
import { useTranslation } from 'react-i18next';

const CardDetails = ({ navigation }) => {
  const toast = useToast();
  const { t: translation } = useTranslation('cardDetailsScreen');
  const { t: generalTranslation } = useTranslation('general');

  const { languageStyles } = useLanguageStyles();
  const { addBankCard } = useContext(PaymentContext);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onTouched',
  });

  const onSubmit = async data => {
    await addBankCard(data);
    toast.show(translation('cardAddedSuccess'), { type: TOAST_TYPES.SUCCESS });
    navigation.navigate(ROUTES.ORDERS.PAYMENT.PAYMENT_METHOD);
  };

  return (
    <PageContainer header={<PageHeader title={translation('pageTitle')} />}>
      <Text style={[styles.title, languageStyles.text]}>
        {translation('cardDetails')}
      </Text>
      <Text style={[styles.info, languageStyles.text]}>
        {translation('info')}
      </Text>
      <InputLabel label={translation('cardNumber')} />
      <Controller
        control={control}
        name="cardNumber"
        render={({ field: { onChange, value, onBlur } }) => (
          <MaskedInput
            value={value}
            mask="[0000] [0000] [0000] [0000]"
            onBlur={onBlur}
            onChangeText={(f, extracted) => onChange(extracted)}
            error={errors?.cardNumber?.message}
          />
        )}
        rules={cardNumberValidation}
      />
      <View style={styles.cardInfoContainer}>
        <View style={styles.cardInfoItem}>
          <InputLabel label={translation('expiryDate')} />
          <Controller
            control={control}
            name="expiryDate"
            render={({ field: { onChange, value, onBlur } }) => (
              <MaskedInput
                value={value}
                onBlur={onBlur}
                onChangeText={onChange}
                error={errors?.expiryDate?.message}
                mask="[00]/[00]"
              />
            )}
            rules={cardDateValidation}
          />
        </View>
        <View style={styles.cardInfoItem}>
          <InputLabel label={translation('cvv')} />
          <Controller
            control={control}
            name="cvv"
            render={({ field: { onChange, value, onBlur } }) => (
              <MaskedInput
                value={value}
                onBlur={onBlur}
                onChangeText={onChange}
                error={errors?.cvv?.message}
                mask="[000]"
                secureTextEntry={true}
              />
            )}
            rules={cardCvvValidation}
          />
        </View>
      </View>
      <InputLabel label={translation('cardOwner')} />
      <Controller
        control={control}
        name="cardOwner"
        render={({ field: { onChange, value, onBlur } }) => (
          <TextInput
            value={value}
            onBlur={onBlur}
            onChangeText={onChange}
            error={errors?.cardOwner?.message}
          />
        )}
        rules={fullNameValidation}
      />
      <Button
        onPress={handleSubmit(onSubmit)}
        style={styles.selectButton}
        label={generalTranslation('confirm')}
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
  cardInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardInfoItem: {
    flex: 0.48,
  },
});

export default CardDetails;
