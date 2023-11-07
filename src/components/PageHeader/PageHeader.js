import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, StatusBar } from 'react-native';

import useLanguageStyles from '../../hooks/useLanguageStyles';

import { COLORS, FONTS, SIZES } from '../../constants/theme';
import { SCREEN_WIDTH } from '../../constants/device';
import GoBackHeaderButton from '../../components/common/GoBackHeaderButton';

const PageHeader = ({
  title,
  leftButton,
  onBack,
  rightButton,
  disableButtons,
}) => {
  const { languageStyles } = useLanguageStyles();

  const defaultLeftButton = <GoBackHeaderButton onPress={onBack} />;

  return (
    <SafeAreaView>
      <StatusBar barStyle="dark-content" />
      <View style={[styles.container, languageStyles.row]}>
        <View style={styles.buttonContainer}>
          {!disableButtons && (leftButton || defaultLeftButton)}
        </View>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.buttonContainer}>
          {!disableButtons && rightButton}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    width: SCREEN_WIDTH,
    height: 70,
  },
  buttonContainer: {
    flex: 0.2,
  },
  title: {
    flex: 0.6,
    fontWeight: '600',
    fontSize: SIZES.TEXT.LARGE,
    color: COLORS.TEXT.BLACK,
    fontFamily: FONTS.SEMIBOLD,
    textAlign: 'center',
  },
});

export default PageHeader;
