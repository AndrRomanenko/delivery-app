import { useNavigation } from '@react-navigation/native';
import React, { useContext } from 'react';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, View } from 'react-native';
import Button from '../../../../components/common/Button';
import InfoModal from '../../../../components/InfoModal';
import { COLORS } from '../../../../constants/theme';
import { OrderContext } from '../../../../context/OrderContext';
import { SessionContext } from '../../../../context/SessionContext';
import useLanguageStyles from '../../../../hooks/useLanguageStyles';
import { moderateScale } from '../../../../utils/scale';

const SessionTypeModal = ({ route }) => {
  const { t: translation } = useTranslation('modals', {
    keyPrefix: 'sessionTypeModal',
  });
  const { shop } = route.params;
  const {
    isVisitByShopAllowed,
    isDeliveryByShopAllowed,
    isTakeAwayByShopAllowed,
  } = useContext(OrderContext);

  const inHouseAllowed = isVisitByShopAllowed(shop);
  const outHouseAllowed =
    isDeliveryByShopAllowed(shop) || isTakeAwayByShopAllowed(shop);

  const { startOutHouseSessionByShop, startInHouseSessionByShop } =
    useContext(SessionContext);
  const navigation = useNavigation();

  const onClose = () => {
    navigation.goBack();
  };

  const { languageStyles } = useLanguageStyles();

  const onDeliverySelect = () => {
    onClose();
    startOutHouseSessionByShop();
  };

  const onDineInSelect = async () => {
    onClose();
    startInHouseSessionByShop();
  };

  return (
    <InfoModal onOutPress={onClose}>
      <View style={styles.container}>
        <View style={styles.textContainer}>
          <Text style={styles.title}>{translation('title')}</Text>
          <Text style={styles.description}>{translation('description')}</Text>
        </View>

        <View style={[styles.buttonContainer, languageStyles.row]}>
          <Button
            style={styles.button}
            label={translation('makeOrder')}
            onPress={onDeliverySelect}
            disabled={!outHouseAllowed}
            secondary
          />
          <Button
            style={styles.button}
            disabled={!inHouseAllowed}
            label={translation('inHouseDinner')}
            onPress={onDineInSelect}
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

export default SessionTypeModal;
