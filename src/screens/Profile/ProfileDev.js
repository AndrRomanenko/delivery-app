import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, View } from 'react-native';
import { useToast } from 'react-native-toast-notifications';

import Button from '../../components/common/Button';
import PageContainer from '../../components/PageContainer';
import PageHeader from '../../components/PageHeader';

import { OrderContext } from '../../context/OrderContext';
import { SessionContext } from '../../context/SessionContext';
import useLanguageStyles from '../../hooks/useLanguageStyles';

import { SCREEN_WIDTH } from '../../constants/device';
import { TOAST_TYPES } from '../../constants/toasts';
import { PaymentContext } from '../../context/PaymentContext';

/**
 * For now page have only demo functionality and Features,
 * so while develop, remove all temp content from here
 */
const Profile = () => {
  const toast = useToast();
  const { i18n } = useTranslation();
  const { t: translation } = useTranslation('profile');
  const { languageStyles } = useLanguageStyles();

  const { deleteOrder } = useContext(OrderContext);
  const {
    deleteInHouseSession,
    deleteOutHouseSession,
    closeVisitLoading,
    closeDeliveryLoading,
  } = useContext(SessionContext);
  const { clearPaymentData } = useContext(PaymentContext);

  const handlelanguageSelect = language => {
    i18n.changeLanguage(language);
  };

  const onVisitCancel = () => {
    deleteOrder();
    deleteInHouseSession();
  };

  const onDeliveryCancel = () => {
    deleteOrder();
    deleteOutHouseSession();
  };

  const handleClearCards = async () => {
    clearPaymentData();
    toast.show(translation('allCardsDeleted'), { type: TOAST_TYPES.SUCCESS });
  };

  const checkActiveLanguage = language => i18n.language === language;

  return (
    <PageContainer header={<PageHeader title={translation('developerMenu')} />}>
      <Text style={[styles.title, languageStyles.text]}>
        {translation('languageLabel')}
      </Text>
      <View style={styles.languages}>
        <View style={styles.languageButtonContainer}>
          <Button
            label="EN"
            onPress={() => handlelanguageSelect('en')}
            secondary={!checkActiveLanguage('en')}
          />
        </View>
        <View style={styles.languageButtonContainer}>
          <Button
            label="HE"
            onPress={() => handlelanguageSelect('he')}
            secondary={!checkActiveLanguage('he')}
          />
        </View>
        <View style={styles.languageButtonContainer}>
          <Button
            label="UA"
            onPress={() => handlelanguageSelect('ua')}
            secondary={!checkActiveLanguage('ua')}
          />
        </View>
        <View style={styles.languageButtonContainer}>
          <Button
            label="RU"
            onPress={() => handlelanguageSelect('ru')}
            secondary={!checkActiveLanguage('ru')}
          />
        </View>
      </View>
      <Text style={[styles.title, languageStyles.text]}>Visit:</Text>
      <Button
        label={translation('cancelVisit')}
        onPress={onVisitCancel}
        loading={closeVisitLoading}
      />
      <Button
        label={translation('cancelDeliverySession')}
        onPress={onDeliveryCancel}
        loading={closeDeliveryLoading}
      />
      <Text style={[styles.title, languageStyles.text]}>Payment:</Text>
      <Button
        label={translation('deletePaymentCards')}
        onPress={handleClearCards}
      />
    </PageContainer>
  );
};

const styles = StyleSheet.create({
  title: {
    width: '100%',
    textAlign: 'center',
    fontSize: SCREEN_WIDTH * 0.05,
    marginBottom: 20,
  },
  languages: {
    width: '100%',
    height: 100,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  languageButtonContainer: {
    width: '20%',
  },
});

export default Profile;
