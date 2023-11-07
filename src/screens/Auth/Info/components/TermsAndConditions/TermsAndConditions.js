import React from 'react';
import { useTranslation } from 'react-i18next';
import { View, StyleSheet } from 'react-native';

import Checkbox from '../../../../../components/input/Checkbox';
import InfoText from '../../../../../components/common/InfoText';

import useLanguageStyles from '../../../../../hooks/useLanguageStyles';
import { SCREEN_HEIGHT } from '../../../../../constants/device';

const TermsAndConditions = ({ checked, onChange }) => {
  const { t: translation } = useTranslation('info', {
    keyPrefix: 'termsAndConditions',
  });
  const { languageStyles } = useLanguageStyles();

  return (
    <>
      {/* Info & links block */}
      <View style={styles.bottomContent}>
        <View style={styles.info}>
          <InfoText>{translation('info')}</InfoText>
          <View style={languageStyles.row}>
            <InfoText onPress={() => {}}>
              {translation('termsAndConditionsLabel')}
            </InfoText>
            <InfoText> & </InfoText>
            <InfoText onPress={() => {}}>
              {translation('privacyPolicyLabel')}
            </InfoText>
          </View>
        </View>

        {/* Approval checkbox */}
        <Checkbox
          value={checked}
          onValueChange={onChange}
          renderLabel={() => (
            <View style={languageStyles.row}>
              <InfoText style={styles.noMargin}>
                {translation('agreedLabel')}{' '}
              </InfoText>
              <InfoText onPress={() => {}} style={styles.noMargin}>
                {translation('disclosureOfRepresentationLabel')}
              </InfoText>
            </View>
          )}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  bottomContent: {
    width: '100%',
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingTop: SCREEN_HEIGHT * 0.04,
    marginBottom: SCREEN_HEIGHT * 0.03,
  },
  info: {
    width: '80%',
    alignItems: 'center',
    marginHorizontal: 'auto',
    marginBottom: SCREEN_HEIGHT * 0.04,
  },
  noMargin: {
    marginBottom: 0,
  },
});

export default TermsAndConditions;
