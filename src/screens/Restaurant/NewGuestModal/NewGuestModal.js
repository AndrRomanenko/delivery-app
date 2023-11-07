import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, View } from 'react-native';

import Button from '../../../components/common/Button';
import InfoModal from '../../../components/InfoModal';
import { COLORS } from '../../../constants/theme';
import { SessionContext } from '../../../context/SessionContext';
import useLanguageStyles from '../../../hooks/useLanguageStyles';
import { moderateScale } from '../../../utils/scale';

const NewGuestModal = ({ navigation }) => {
  const { languageStyles } = useLanguageStyles();
  const { t: translation } = useTranslation('modals');
  const { visit, approveTableBookingRequest, rejectTableBookingRequest } =
    useContext(SessionContext);
  const [guestId] = visit.requestIds;

  const onCancel = () => {
    rejectTableBookingRequest(guestId);
    navigation.goBack();
  };

  const onAccept = () => {
    approveTableBookingRequest(guestId);
    navigation.goBack();
  };

  return (
    <InfoModal>
      <View style={styles.container}>
        <View style={styles.textContainer}>
          <Text style={styles.title}>{translation('newGuestModal.title')}</Text>
          <Text style={styles.description}>
            joinTableRequestId:{guestId}
            {translation('newGuestModal.description')}
          </Text>
        </View>

        <View style={[styles.buttonContainer, languageStyles.row]}>
          <Button
            style={styles.button}
            label={translation('newGuestModal.cancel')}
            onPress={onCancel}
            secondary
          />
          <Button
            style={styles.button}
            label={translation('newGuestModal.accept')}
            onPress={onAccept}
          />
        </View>
      </View>
    </InfoModal>
  );
};

const styles = StyleSheet.create({
  container: {},
  textContainer: {
    paddingHorizontal: moderateScale(53),
    alignItems: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: moderateScale(16),
    color: COLORS.TEXT.BLACK,
  },
  description: {
    textAlign: 'center',
    marginTop: moderateScale(10),
    fontWeight: '500',
    fontSize: moderateScale(14),
    color: COLORS.GRAY_ICON,
  },
  buttonContainer: {
    paddingHorizontal: moderateScale(16),
    borderTopWidth: 1,
    borderColor: COLORS.GRAY,
    marginTop: moderateScale(24),
    paddingTop: moderateScale(17),
  },
  button: {
    flex: 1,
    marginHorizontal: moderateScale(6),
    marginBottom: 0,
  },
  loadingContainer: {
    marginTop: moderateScale(22),
  },
});

export default NewGuestModal;
