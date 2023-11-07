import React from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, View } from 'react-native';
import { PeculiarityIcon } from '../../../../components/PeculiarityIcon';
import { COLORS, SIZES } from '../../../../constants/theme';
import useLanguageStyles from '../../../../hooks/useLanguageStyles';

const RestaurantPeculiarities = ({ restaurant }) => {
  const { languageStyles } = useLanguageStyles();
  const { t: translation } = useTranslation('restaurantInfo');

  const renderPeculiarities = type => {
    const label = type ? translation(`peculiarities.${type}`) : 'UNKNOWN';

    return (
      <View key={type} style={[styles.item, languageStyles.row]}>
        <PeculiarityIcon name={type} />
        <Text style={styles.text}>{label}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.title, languageStyles.text]}>
        {translation('features')}
      </Text>

      <View style={styles.columnList}>
        {restaurant.peculiarities.map(renderPeculiarities)}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: SIZES.MARGIN.M24,
    borderTopColor: COLORS.GRAY,
    borderTopWidth: 1,
    paddingRight: 20,
  },
  title: {
    fontWeight: '500',
    fontSize: SIZES.TEXT.LARGE,
    color: COLORS.TEXT.BLACK,
    fontFamily: 'SFPRODISPLAY-MEDIUM',
    marginBottom: SIZES.MARGIN.M20,
  },
  text: {
    paddingLeft: SIZES.PADDING.P12,
    fontWeight: '400',
    fontSize: SIZES.TEXT.REGULAR,
    fontFamily: 'SFPRODISPLAY-REGULAR',
    color: COLORS.TEXT.BLACK,
  },
  item: {
    width: '50%',
    alignItems: 'center',
    marginBottom: SIZES.MARGIN.M16,
  },
  columnList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});

export default RestaurantPeculiarities;
