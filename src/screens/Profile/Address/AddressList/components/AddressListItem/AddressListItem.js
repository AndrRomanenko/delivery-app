import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import MapLabelIcon from '../../../../../../icons/address/mapLabel.svg';
import Divider from '../../../../../../components/common/Divider';
import useLanguageStyles from '../../../../../../hooks/useLanguageStyles';

import { moderateScale } from '../../../../../../utils/scale';
import { COLORS } from '../../../../../../constants/theme';
import { useNavigation } from '@react-navigation/native';
import { ROUTES } from '../../../../../../constants/navigator';
import { getAddressLabel } from '../../../../../../utils/address';

const AddressListItem = ({ address }) => {
  const { languageStyles } = useLanguageStyles();
  const navigation = useNavigation();

  const { id } = address;

  const onItemPress = () => {
    navigation.navigate(ROUTES.PROFILE.ADDRESS.ADDRESS_INFO, {
      addressId: id,
    });
  };

  return (
    <>
      <TouchableOpacity
        style={[styles.container, languageStyles.row]}
        onPress={onItemPress}>
        <View style={styles.icon}>
          <MapLabelIcon />
        </View>
        <View style={styles.divider} />
        <Text style={styles.label}>{getAddressLabel(address)}</Text>
      </TouchableOpacity>
      <Divider />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: moderateScale(10),
  },
  icon: {
    paddingHorizontal: moderateScale(5),
  },
  divider: {
    width: moderateScale(10),
  },
  label: {
    fontSize: moderateScale(16),
    color: COLORS.TEXT.BLACK,
    fontWeight: '500',
  },
});

export default AddressListItem;
