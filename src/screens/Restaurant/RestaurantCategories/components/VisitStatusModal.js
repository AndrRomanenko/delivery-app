import React, { useContext, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import Button from '../../../../components/common/Button';
import InfoModal from '../../../../components/InfoModal';
import { COLORS } from '../../../../constants/theme';
import { SessionContext } from '../../../../context/SessionContext';
import useLanguageStyles from '../../../../hooks/useLanguageStyles';
import { moderateScale } from '../../../../utils/scale';
import { VISIT_STATUSES } from '../../../../constants/visit';
import IconButton from '../../../../components/IconButton';

const STATUS_TEXT_MAP = {
  [VISIT_STATUSES.LOADING]: {
    title: 'visitModal.loadingTitle',
    description: 'visitModal.loadingDescription',
    buttonsEnabled: false,
  },
  [VISIT_STATUSES.REQUESTED]: {
    title: 'visitModal.confirmationLoadingTitle',
    description: 'visitModal.confirmationLoadingDescription',
    buttonsEnabled: false,
  },
  [VISIT_STATUSES.REJECTED]: {
    title: 'visitModal.confirmationFailedTitle',
    description: 'visitModal.confirmationFailedDescription',
    buttonsEnabled: true,
  },
};

const VisitStatusModal = ({ navigation }) => {
  const { languageStyles, isReversed } = useLanguageStyles();
  const { t: translation } = useTranslation('modals');

  const { visit, deleteLocalSession, restartInHouseSession } =
    useContext(SessionContext);
  const { title, description, buttonsEnabled } =
    STATUS_TEXT_MAP[visit.status] || {};

  const onCancel = () => {
    // Deleting local session since it hasn't been created on backend (admin refused).
    deleteLocalSession();
    navigation.goBack();
  };

  const onTryAgain = () => {
    restartInHouseSession();
  };

  useEffect(() => {
    if (
      visit.status === VISIT_STATUSES.UNINITIALIZED ||
      visit.status === VISIT_STATUSES.APPROVED ||
      visit.status === VISIT_STATUSES.FAILED
    ) {
      navigation.goBack();
    }
  }, [visit.status]);

  return (
    <InfoModal>
      <View style={styles.container}>
        {visit.status === VISIT_STATUSES.REQUESTED && (
          <IconButton
            name="close"
            onPress={onCancel}
            style={styles.closeButton(isReversed)}
            color={COLORS.GRAY_DARK}
            size={22}
          />
        )}
        <View style={styles.textContainer}>
          <Text style={styles.title}>{translation(title)}</Text>
          <Text style={styles.description}>{translation(description)}</Text>
        </View>

        {buttonsEnabled ? (
          <View style={[styles.buttonContainer, languageStyles.row]}>
            <Button
              style={styles.button}
              label={translation('visitModal.cancel')}
              onPress={onCancel}
              secondary
            />
            <Button
              style={styles.button}
              label={translation('visitModal.tryAgain')}
              onPress={onTryAgain}
            />
          </View>
        ) : (
          <View style={styles.loadingContainer}>
            <ActivityIndicator color={COLORS.ORANGE} />
          </View>
        )}
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
  closeButton: reversed => ({
    position: 'absolute',
    top: 0,
    zIndex: 5,
    [reversed ? 'left' : 'right']: moderateScale(24),
  }),
});

export default VisitStatusModal;
