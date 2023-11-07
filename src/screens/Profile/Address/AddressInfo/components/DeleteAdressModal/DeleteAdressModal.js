import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, View } from 'react-native';
import { useToast } from 'react-native-toast-notifications';
import Button from '../../../../../../components/common/Button';
import InfoModal from '../../../../../../components/InfoModal';
import { ROUTES } from '../../../../../../constants/navigator';
import { COLORS } from '../../../../../../constants/theme';
import useLanguageStyles from '../../../../../../hooks/useLanguageStyles';
import { useDeleteAddressMutation } from '../../../../../../services/addressService';
import { moderateScale } from '../../../../../../utils/scale';

const DeleteAdressModal = ({ route }) => {
  const { t: translation } = useTranslation('modals', {
    keyPrefix: 'deleteAddressModal',
  });
  const navigation = useNavigation();
  const toast = useToast();

  const [deleteAddress, { isFetching }] = useDeleteAddressMutation();

  const addressId = route?.params?.addressId;

  const { languageStyles } = useLanguageStyles();

  const onCancel = () => {
    navigation.goBack();
  };

  const onAccept = async () => {
    try {
      deleteAddress(addressId).unwrap();
      navigation.navigate(ROUTES.PROFILE.ADDRESS.ADDRESS_LIST);
    } catch (error) {
      console.warn('Address deleting error', error);
      toast.show(error.data.message);
      navigation.goBack();
    }
  };

  return (
    <InfoModal>
      <View style={styles.container}>
        <View style={styles.textContainer}>
          <Text style={styles.title}>{translation('title')}</Text>
          <Text style={styles.description}>{translation('description')}</Text>
        </View>

        <View style={[styles.buttonContainer, languageStyles.row]}>
          <Button
            style={styles.button}
            label={translation('cancel')}
            onPress={onCancel}
            secondary
          />
          <Button
            style={styles.button}
            label={translation('delete')}
            onPress={onAccept}
            loading={isFetching}
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

export default DeleteAdressModal;
