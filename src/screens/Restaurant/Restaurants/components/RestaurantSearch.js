import React from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, TextInput, View } from 'react-native';
import { COLORS, SIZES } from '../../../../constants/theme';
import useLanguageStyles from '../../../../hooks/useLanguageStyles';
import SearchIcon from '../../../../icons/listIcon/Search.svg';

/**
 * Shitty markup.
 * TODO: Refactor if there will be any problems with UX
 */

const RestaurantSearch = ({ value = '', onChange }) => {
  const { languageStyles } = useLanguageStyles();
  const { t: translation } = useTranslation('findLocationScreen');

  return (
    <View style={[styles.container, languageStyles.row]}>
      <View style={styles.iconContainer}>
        <SearchIcon fill={COLORS.GRAY_ICON} />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          value={value}
          onChangeText={onChange}
          placeholder={translation('placeholder')}
          style={[styles.input, languageStyles.text]}
          placeholderTextColor={COLORS.GRAY_ICON}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: SIZES.BORDER_RADIUS.BR14,
    backgroundColor: COLORS.GRAY_LIGHT,
    width: '100%',
    flexDirection: 'row',
    paddingHorizontal: SIZES.PADDING.P18,
    borderWidth: 1,
    borderColor: 'transparent',
    marginBottom: 10,
  },
  iconContainer: {
    flex: 0.1,
    justifyContent: 'center',
  },
  inputContainer: {
    flex: 0.9,
    justifyContent: 'center',
  },
  input: {
    fontFamily: 'SFPRODISPLAY-REGULAR',
    fontSize: SIZES.TEXT.REGULAR,
    color: COLORS.BLACK,
    paddingVertical: SIZES.PADDING.P12,
  },
});

export default RestaurantSearch;
