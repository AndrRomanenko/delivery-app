import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ROUTES as ROOT } from '../../../../constants/navigator';
import { COLORS, SIZES } from '../../../../constants/theme';
import useLanguageStyles from '../../../../hooks/useLanguageStyles';
import { RestaurantImage } from '../../RestaurantCategories/components/RestaurantImage';

const RestaurantListItem = ({ item }) => {
  const { title, address } = item;
  const { languageStyles } = useLanguageStyles();
  const navigation = useNavigation();

  const openRestaurantPage = () => {
    navigation.navigate(ROOT.RESTAURANT.RESTAURANT_CATEGORIES, {
      restaurant: item,
    });
  };

  return (
    <TouchableOpacity
      activeOpacity={0.6}
      onPress={openRestaurantPage}
      style={[styles.container, languageStyles.row]}>
      <RestaurantImage restaurant={item} style={styles.imageContainer} />
      <View style={styles.divider} />
      <View style={[styles.infoContainer, languageStyles.aligment]}>
        <Text numberOfLines={1} style={[styles.titleText, languageStyles.text]}>
          {title}
        </Text>
        {address && (
          <Text
            numberOfLines={1}
            style={[styles.addressText, languageStyles.text]}>
            {address}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.GRAY_LIGHT,
    alignItems: 'center',
    paddingVertical: 10,
  },
  imageContainer: {
    width: 40,
    height: 40,
    borderRadius: 3,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 3,
  },
  divider: {
    flex: 0.05,
  },
  infoContainer: {
    flex: 0.95,
  },
  titleText: {
    fontFamily: 'SFPRODISPLAY-MEDIUM',
    fontSize: SIZES.TEXT.MEDIUM,
    color: COLORS.TEXT.BLACK,
  },
  addressText: {
    fontFamily: 'SFPRODISPLAY-REGULAR',
    fontSize: SIZES.TEXT.SMALL,
    color: COLORS.GRAY_ICON,
  },
});

export default RestaurantListItem;
