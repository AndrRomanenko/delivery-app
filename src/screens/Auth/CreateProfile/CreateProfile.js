import auth from '@react-native-firebase/auth';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { StyleSheet } from 'react-native';
import { useToast } from 'react-native-toast-notifications';

import Button from '../../../components/common/Button';
import IconButton from '../../../components/IconButton';
import TextInput from '../../../components/input/TextInput';
import PageContainer from '../../../components/PageContainer';

import PageHeader from '../../../components/PageHeader';
import { ROUTES } from '../../../constants/navigator';
import { COLORS } from '../../../constants/theme';
import { useUpdateUserInfoMutation } from '../../../services/userService';
import { fullNameValidation } from '../../../utils/validations';

const CreateProfile = ({ navigation }) => {
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const { t: translation } = useTranslation(['general', 'createProfile']);
  const [updateUserData] = useUpdateUserInfoMutation();

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({ mode: 'onChange' });

  const onSubmit = async data => {
    try {
      setLoading(true);
      await auth().currentUser.updateProfile({ displayName: data.name });
      await updateUserData({ fullName: data.name }).unwrap();
      navigation.replace(ROUTES.HOME.ROOT_STACK);
    } catch (error) {
      toast.show(translation('error'));
    }
    setLoading(false);
  };

  const onSkip = () => {
    navigation.replace(ROUTES.HOME.ROOT);
  };

  const titleText = translation('firstAndLastName', { ns: 'createProfile' });

  return (
    <PageContainer
      header={
        <PageHeader
          leftButton={() => null}
          rightButton={
            <IconButton
              name="close"
              startInLoadingState
              onPress={onSkip}
              style={styles.centerContainer}
              color={COLORS.GRAY_DARK}
              size={22}
            />
          }
          title={titleText}
        />
      }>
      <Controller
        control={control}
        name="name"
        render={({ field: { onChange, value, onBlur } }) => (
          <TextInput
            placeholder={titleText}
            placeholderTextColor={COLORS.GRAY_ICON}
            value={value}
            onBlur={onBlur}
            onChangeText={onChange}
            error={errors?.name?.message}
          />
        )}
        rules={fullNameValidation}
      />
      <Button
        style={styles.button}
        label={translation('create', { ns: 'createProfile' })}
        onPress={handleSubmit(onSubmit)}
        secondary={!isValid}
        disabled={!isValid}
        loading={loading}
      />
    </PageContainer>
  );
};

const styles = StyleSheet.create({
  divider: {
    flex: 1,
  },
  button: {
    marginTop: 'auto',
  },
});

export default CreateProfile;
