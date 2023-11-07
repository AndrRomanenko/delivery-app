import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { StyleSheet, View } from 'react-native';
import { useToast } from 'react-native-toast-notifications';

import ChangeAvatar from '../../../../components/ChangeAvatar';
import ChangeNumber from '../../../../components/ChangeNumber/ChangeNumber';
import Button from '../../../../components/common/Button';
import MarketingInfo from '../MarketingInformation/MarketingInfo';
import InputLabel from '../../../../components/common/InputLabel';
import DateInput from '../../../../components/input/DateInput';
import TextInput from '../../../../components/input/TextInput';
import PageContainer from '../../../../components/PageContainer';
import PageHeader from '../../../../components/PageHeader';

import {
  useGetUserInfoQuery,
  useUpdateUserInfoMutation,
  useUpdateUserPhotoMutation,
} from '../../../../services/userService';

import {
  birthdayValidation,
  emailValidation,
  fullNameValidation,
} from '../../../../utils/validations';

import { SCREEN_WIDTH } from '../../../../constants/device';
import { ROUTES } from '../../../../constants/navigator';

const PersonalInfo = ({ navigation }) => {
  const { t: generalTranslation } = useTranslation('general');
  const { t: translation } = useTranslation('personalInfoScreen');
  const toast = useToast();

  const { data: userData } = useGetUserInfoQuery();

  const [avatar, setAvatar] = useState(null);

  const [updateUserData, { isLoading: userUpdateLoading }] =
    useUpdateUserInfoMutation();

  const [updateUserPhoto, { isLoading: userUpdatePhotoLoading }] =
    useUpdateUserPhotoMutation();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm({
    mode: 'onTouched',
    defaultValues: userData,
  });

  useEffect(() => {
    // If get new userData reset form with new default values
    if (userData) {
      reset(userData);
    }
  }, [userData]);

  const onSubmit = async data => {
    try {
      const arrayOfPromises = [updateUserData(data).unwrap()];
      if (avatar) {
        arrayOfPromises.push(updateUserPhoto(avatar).unwrap());
      }
      await Promise.all(arrayOfPromises);
      navigation.navigate(ROUTES.PROFILE.PROFILE);
    } catch (err) {
      console.warn('User Update error ', err);
      toast.show(translation('errorUpdating'));
    }
  };

  const handleAvatarChange = newAvatar => {
    setAvatar(newAvatar);
  };

  return (
    <PageContainer header={<PageHeader title={translation('title')} />}>
      <ChangeAvatar
        avatarSrc={avatar}
        handleAvatarChange={handleAvatarChange}
      />

      {/* Name input */}
      <InputLabel label={translation('fullName')} isRequired />
      <Controller
        control={control}
        name="fullName"
        render={({ field: { onChange, value, onBlur } }) => (
          <TextInput
            value={value}
            onBlur={onBlur}
            onChangeText={onChange}
            error={errors?.fullName?.message}
          />
        )}
        rules={fullNameValidation}
      />

      {/* E-mail input  */}
      <InputLabel label={translation('email')} />
      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, value, onBlur } }) => (
          <TextInput
            value={value}
            onBlur={onBlur}
            onChangeText={onChange}
            error={errors?.email?.message}
          />
        )}
        rules={emailValidation}
      />

      {/* Bithday date input */}
      <InputLabel label={translation('birthday')} />
      <Controller
        control={control}
        name="birthDay"
        render={({ field: { onChange, value, onBlur } }) => (
          <DateInput
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            error={errors?.birthday?.message}
          />
        )}
        rules={birthdayValidation}
      />

      {/* Phone number info & change */}
      <ChangeNumber label={translation('phoneNumber')} />

      <Controller
        control={control}
        name="subscribedToMarketingInfo"
        render={({ field: { onChange, value } }) => (
          <MarketingInfo value={value} onChange={onChange} />
        )}
      />

      <View style={styles.divider} />

      <Button
        onPress={handleSubmit(onSubmit)}
        label={generalTranslation('save')}
        secondary={!isValid}
        loading={userUpdateLoading || userUpdatePhotoLoading}
      />
    </PageContainer>
  );
};

const styles = StyleSheet.create({
  divider: {
    flex: 1,
    minHeight: SCREEN_WIDTH * 0.07,
  },
});

export default PersonalInfo;
