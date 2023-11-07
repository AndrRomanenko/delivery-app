import React from 'react';
import { StatusBar, StyleSheet, Text, View } from 'react-native';

import GoBackHeaderButton from '../../../../components/common/GoBackHeaderButton';
// import CallAWaiter from '../../../../components/common/CallAWaiter/CallAWaiter';

import useLanguageStyles from '../../../../hooks/useLanguageStyles';

import { COLORS, FONTS, SIZES } from '../../../../constants/theme';

const RestaurantDetailsHeader = ({ title }) => {
  const { languageStyles } = useLanguageStyles();

  return (
    <View style={[styles.headerContainer, languageStyles.row]}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.buttonContainer}>
        <GoBackHeaderButton />
      </View>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.buttonContainer}>
        {/* <TouchableOpacity>
          <CallAWaiter />
        </TouchableOpacity> */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    flex: 0.6,
    fontWeight: '600',
    fontSize: SIZES.TEXT.LARGE,
    color: COLORS.TEXT.BLACK,
    fontFamily: FONTS.SEMIBOLD,
    textAlign: 'center',
  },
  buttonContainer: {
    flex: 0.2,
  },
});

export default RestaurantDetailsHeader;
