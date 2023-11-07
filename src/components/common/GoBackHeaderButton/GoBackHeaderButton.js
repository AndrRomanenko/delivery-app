import React from 'react';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import BackButton from '../../../icons/restaurantPage/BackButton.svg';

import useLanguageStyles from '../../../hooks/useLanguageStyles';
import { STYLES } from '../../../constants/theme';

const GoBackHeaderButton = ({ onPress }) => {
  const navigation = useNavigation();
  const { languageStyles } = useLanguageStyles();

  const onPressDefault = () => {
    navigation.goBack();
  };

  return (
    <TouchableOpacity
      onPress={onPress || onPressDefault}
      style={[STYLES.shadow, languageStyles.rotation]}>
      <BackButton />
    </TouchableOpacity>
  );
};

export default GoBackHeaderButton;
