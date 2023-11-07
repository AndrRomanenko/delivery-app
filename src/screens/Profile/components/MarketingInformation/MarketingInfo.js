import React from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Switch, Text, View } from 'react-native';

import useLanguageStyles from '../../../../hooks/useLanguageStyles';

import { SCREEN_WIDTH } from '../../../../constants/device';
import { COLORS, FONTS, SIZES } from '../../../../constants/theme';

const MarketingInfo = ({ value, onChange }) => {
  const { t: translation } = useTranslation('personalInfoScreen');
  const { languageStyles } = useLanguageStyles();

  return (
    <View style={[styles.container, languageStyles.row]}>
      <Text style={[styles.text, languageStyles.text]}>
        {translation('marketing')}
      </Text>
      <Switch
        trackColor={{ false: '#767577', true: COLORS.BLUE }}
        thumbColor={value ? COLORS.WHITE : COLORS.WHITE}
        ios_backgroundColor="#3e3e3e"
        onValueChange={onChange}
        value={value}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingTop: SCREEN_WIDTH * 0.07,
    justifyContent: 'space-between',
  },
  text: {
    fontWeight: '400',
    fontSize: SIZES.TEXT.MEDIUM,
    color: COLORS.TEXT.BLACK,
    fontFamily: FONTS.REGULAR,
  },
});

export default MarketingInfo;
