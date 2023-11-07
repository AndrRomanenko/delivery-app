import React, { useCallback } from 'react';
import {
  Linking,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { COLORS, SIZES } from '../../../../constants/theme';
import useLanguageStyles from '../../../../hooks/useLanguageStyles';

import Clock from '../../../../icons/restoranInfo/Clock.svg';
import Instagram from '../../../../icons/restoranInfo/instagram.svg/';
import Location from '../../../../icons/restoranInfo/Location.svg';
import Telephone from '../../../../icons/restoranInfo/Telephone.svg';

const RestaurantContactInfo = ({ restaurant }) => {
  const { languageStyles } = useLanguageStyles();

  const openURL = useCallback(async (url, fallbackURL) => {
    Linking.openURL(url).catch(err => {
      if (!fallbackURL) {
        return console.log(err, 'link open error');
      }

      Linking.openURL(fallbackURL).catch(e => {
        console.log(e, 'fallback url can not be open');
      });
    });
  }, []);

  const openTelephone = p => {
    openURL(`tel:${p}`);
  };

  const openInstagram = username => {
    openURL(
      `instagram://user?username=${username}`,
      `https://www.instagram.com/${username}/`,
    );
  };

  const openLocation = address => {
    const url = Platform.select({
      ios: `maps:0,0?q=${address}`,
      android: `geo:0,0?q=${address}`,
    });

    openURL(url);
  };

  // Temporary
  const instagramUsername = 'big.kahuna_burger';
  const openingHours = '10:00-21:00';

  return (
    <>
      {restaurant.address && (
        <TouchableOpacity
          onPress={() => openLocation(restaurant.address)}
          style={[styles.buttonContainer, languageStyles.row]}>
          <Location />
          <Text numberOfLines={1} style={styles.text}>
            {restaurant.address}
          </Text>
        </TouchableOpacity>
      )}

      {openingHours && (
        <TouchableOpacity style={[styles.buttonContainer, languageStyles.row]}>
          <Clock />
          <Text numberOfLines={1} style={styles.text}>
            {openingHours}
          </Text>
        </TouchableOpacity>
      )}

      {restaurant.contactPhones?.map(p => (
        <TouchableOpacity
          key={p}
          onPress={() => openTelephone(p)}
          style={[styles.buttonContainer, languageStyles.row]}>
          <Telephone />
          <Text numberOfLines={1} style={styles.text}>
            {p}
          </Text>
        </TouchableOpacity>
      ))}

      {instagramUsername && (
        <TouchableOpacity
          onPress={() => openInstagram(instagramUsername)}
          style={[styles.lustContainer, languageStyles.row]}>
          <Instagram />
          <Text numberOfLines={1} style={styles.text}>
            {instagramUsername}
          </Text>
        </TouchableOpacity>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    marginVertical: SIZES.MARGIN.M10,
  },
  textContainer: {},
  text: {
    textAlign: 'left',
    marginHorizontal: SIZES.MARGIN.M16,
    fontSize: SIZES.TEXT.REGULAR,
    fontFamily: 'SFPRODISPLAY-REGULAR',
    color: COLORS.TEXT.BLACK,
  },
  lustContainer: {
    flexDirection: 'row',
    marginTop: SIZES.MARGIN.M10,
    marginBottom: SIZES.MARGIN.M24,
    alignItems: 'flex-end',
  },
});

export default RestaurantContactInfo;
