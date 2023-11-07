import React, { useState } from 'react';
import { useToast } from 'react-native-toast-notifications';
import { useForm, Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import auth from '@react-native-firebase/auth';
import { View } from 'react-native';

import PageContainer from '../../../components/PageContainer';
import PhoneInput from '../../../components/input/PhoneInput';
import InputLabel from '../../../components/common/InputLabel';
import Button from '../../../components/common/Button';
import ErrorText from '../../../components/common/ErrorText';
import TermsAndConditions from './components/TermsAndConditions';
import PageHeader from '../../../components/PageHeader';

import { ROUTES } from '../../../constants/navigator';
import { phoneValidation } from '../../../utils/validations';
import { checkPhone } from './helper';

/**
 * Info page, Auth navigation
 */
const Info = ({ navigation, route }) => {
  const toast = useToast();
  const { t: generalTranslation } = useTranslation('general');
  const { t: translation } = useTranslation('info');

  const [agreement, setAgreement] = useState(false);
  const [loading, setLoading] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({ mode: 'onChange' });

  const changePhone = route?.params?.changePhone;

  const onSubmit = async data => {
    try {
      setLoading(true);
      const validatedPhone = checkPhone(data.phone);

      if (validatedPhone === auth().currentUser?.phoneNumber) {
        toast.show(translation('samePhoneSelected'));
        return;
      }

      if (changePhone) {
        // Change phone functionality
        const { verificationId } = await auth().verifyPhoneNumber(
          validatedPhone,
        );

        navigation.navigate(ROUTES.COMMON.CONFIRM_PHONE, {
          phone: validatedPhone,
          verificationId,
          changePhone,
        });
      } else {
        // Login functionality
        const confirm = await auth().signInWithPhoneNumber(
          validatedPhone,
          true,
        );
        navigation.navigate(ROUTES.AUTH.CONFIRMATION, {
          phone: validatedPhone,
          confirm,
        });
      }
    } catch (error) {
      console.log(error.message);
      toast.show(generalTranslation('error'), { duration: 0 });
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageContainer
      header={
        changePhone && <PageHeader title={translation('changePhoneNumber')} />
      }>
      {/* Phone input */}
      <InputLabel label={translation('phoneInputLabel')} />
      <Controller
        control={control}
        name="phone"
        render={({ field: { onChange, value, onBlur } }) => (
          <PhoneInput
            value={value}
            onBlur={onBlur}
            onChangeText={onChange}
            error={errors?.phone?.message}
          />
        )}
        rules={phoneValidation}
      />
      {errors.phone && <ErrorText>{errors.phone.message}</ErrorText>}

      {changePhone ? (
        <View style={{ flex: 1 }} />
      ) : (
        <TermsAndConditions checked={agreement} onChange={setAgreement} />
      )}

      <Button
        label={generalTranslation('next')}
        loading={loading}
        onPress={handleSubmit(onSubmit)}
        secondary={!isValid || (changePhone ? false : !agreement)}
        disabled={!isValid || (changePhone ? false : !agreement)}
      />
    </PageContainer>
  );
};

export default Info;
