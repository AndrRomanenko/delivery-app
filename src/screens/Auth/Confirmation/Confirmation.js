import React, { useState } from 'react';
import { Text, StyleSheet, View, InteractionManager } from 'react-native';
import { useToast } from 'react-native-toast-notifications';
import { useForm, Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import auth from '@react-native-firebase/auth';

import PageContainer from '../../../components/PageContainer';
import Button from '../../../components/common/Button';
import InfoText from '../../../components/common/InfoText';
import CodeInput from '../../../components/input/CodeInput';
import PageHeader from '../../../components/PageHeader';

import useLanguageStyles from '../../../hooks/useLanguageStyles';
import { COLORS, SIZES } from '../../../constants/theme';
import { ROUTES } from '../../../constants/navigator';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../../constants/device';
import { CODE_RESENT_COUNTDOWN } from '../../../constants/auth';
import { TOAST_TYPES } from '../../../constants/toasts';

/**
 * Log in confirmation page, Auth navigation
 */
const Confirmation = ({ route, navigation }) => {
  const toast = useToast();
  const { languageStyles } = useLanguageStyles();
  const { t: translation } = useTranslation('confirmation');
  const { phone, confirm } = route.params;
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(CODE_RESENT_COUNTDOWN);

  const changePhone = route?.params?.changePhone;
  const verificationId = route?.params?.verificationId;

  React.useEffect(() => {
    timer > 0 && setTimeout(() => setTimer(timer - 1), 1000);
  }, [timer]);

  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm({ mode: 'onChange' });

  const onSubmit = async data => {
    try {
      setLoading(true);

      if (changePhone) {
        // Procceed with phone change flow
        const providerCrederntial = auth.PhoneAuthProvider.credential(
          verificationId,
          data.code,
        );
        await auth().currentUser.updatePhoneNumber(providerCrederntial);
        toast.show(translation('phoneChanged'), { type: TOAST_TYPES.SUCCESS });
        navigation.navigate(ROUTES.PROFILE.PERSONAL_INFO);
      } else {
        // Procceed with login flow
        await confirm.confirm(data.code);
      }
    } catch (error) {
      console.log(error);
      toast.show(translation('invalidCode'), { duration: 0 });
    }
    setLoading(false);
  };

  const handleCodeReset = () => {
    setTimer(CODE_RESENT_COUNTDOWN);
    auth().verifyPhoneNumber(phone, true);
  };

  return (
    <PageContainer
      header={
        changePhone && (
          <PageHeader title={translation('changePhoneNumber')} disableButtons />
        )
      }>
      <Text style={styles.title}>{translation('codeLabel')}</Text>
      <InfoText>{translation('checkSmsLabel')}</InfoText>
      <View style={languageStyles.row}>
        <InfoText>{translation('codeDestinationLabel')}</InfoText>
        <InfoText> {phone} </InfoText>
      </View>

      <Controller
        control={control}
        name="code"
        render={({ field: { onChange, value, onBlur } }) => (
          <CodeInput value={value} onBlur={onBlur} onChange={onChange} />
        )}
        rules={{
          required: {
            value: true,
          },
          minLength: 6,
        }}
      />

      <InfoText>{translation('noCodeLabel')}</InfoText>
      <View style={languageStyles.row}>
        <InfoText
          onPress={!timer && handleCodeReset}
          style={styles.resendButton}>
          {translation('resendCode')}
        </InfoText>
        <Text> </Text>
        <InfoText
          onPress={!timer && handleCodeReset}
          style={styles.resendButton}>
          {timer ? `(${timer}s)` : ''}
        </InfoText>
      </View>

      <View style={styles.divider} />

      <Button
        label={translation('buttonLabel')}
        secondary={!isValid}
        onPress={handleSubmit(onSubmit)}
        loading={loading}
      />
    </PageContainer>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: SCREEN_WIDTH * 0.05,
    fontWeight: '600',
    color: COLORS.TEXT.BLACK,
    marginBottom: SCREEN_HEIGHT * 0.03,
  },
  resendButton: {
    fontSize: SIZES.TEXT.REGULAR,
    marginVertical: SCREEN_HEIGHT * 0.02,
  },
  errorMessage: {
    paddingHorizontal: 0,
  },
  divider: {
    flex: 1,
  },
});

export default Confirmation;
