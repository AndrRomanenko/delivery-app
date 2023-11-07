import React from 'react';
import { Text, StyleSheet } from 'react-native';
import useLanguageStyles from '../../../../hooks/useLanguageStyles';
import { moderateScale } from '../../../../utils/scale';

const GroupHeader = ({ title }) => {
  const { languageStyles } = useLanguageStyles();

  return <Text style={[styles.root, languageStyles.text]}>{title}</Text>;
};

const styles = StyleSheet.create({
  root: {
    color: '#5468AB',
    fontSize: moderateScale(14),
    fontWeight: '500',
    textTransform: 'uppercase',
    marginBottom: moderateScale(10),
  },
});

export default GroupHeader;
