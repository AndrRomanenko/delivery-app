import React, { useState } from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import { useTranslation } from 'react-i18next';
import countries from 'world-countries';

import useLanguageStyles from '../../../hooks/useLanguageStyles';
import { SCREEN_WIDTH } from '../../../constants/device';
import { COLORS, SIZES } from '../../../constants/theme';

import ChevronIcon from '../../../icons/common/chevron.svg';

const CountryPicker = ({
  value,
  onSelect,
  disabled,
  loading,
  disablePhoneCode,
}) => {
  const { t: translation } = useTranslation('components', {
    keyPrefix: 'countryPicker',
  });
  const { languageStyles } = useLanguageStyles();
  const [focus, setFocus] = useState(false);
  const getItemName = item => {
    return `${item.name.common}`;
  };

  const renderPickerItem = item => {
    return (
      <View
        style={[
          styles.countryItem,
          languageStyles.row,
          value === item.name.common && styles.selectedItem,
        ]}>
        <Text style={styles.flag}>{item.flag}</Text>
        <View style={styles.flagDivider} />
        <Text style={[styles.label, languageStyles.text]}>
          {getItemName(item)}
        </Text>
        {!disablePhoneCode && (
          <Text style={styles.codeDevider}>
            {item.idd.root}
            {item.idd.suffixes.length === 1 && item.idd.suffixes}
          </Text>
        )}
      </View>
    );
  };

  return (
    <SelectDropdown
      data={countries}
      onSelect={onSelect}
      disabled={disabled}
      onFocus={() => setFocus(true)}
      onBlur={() => setFocus(false)}
      buttonStyle={{
        ...styles.buttonStyle,
        ...(focus && styles.focused),
      }}
      renderCustomizedButtonChild={() => {
        return (
          <View style={[styles.buttonContentContainer, languageStyles.row]}>
            {value ? (
              <>
                <Text style={styles.flag}>{value.flag}</Text>
                <View style={styles.flagDivider} />
              </>
            ) : null}
            <Text style={[styles.label, languageStyles.text]}>
              {value ? getItemName(value) : translation('placeholder')}
            </Text>
            {loading ? (
              <ActivityIndicator color={COLORS.TEXT.BLACK} />
            ) : (
              <ChevronIcon style={focus && styles.chevronUp} />
            )}
          </View>
        );
      }}
      dropdownStyle={styles.dropdownContainer}
      rowStyle={[styles.dropdownRow, languageStyles.row]}
      renderCustomizedRowChild={renderPickerItem}
      dropdownOverlayColor="transparent"
    />
  );
};

export default CountryPicker;

const styles = StyleSheet.create({
  buttonStyle: {
    marginBottom: SIZES.INPUT.MARGIN,
    width: '100%',
    height: 'auto',
    paddingVertical: SIZES.INPUT.PADDING.VERTICAL,
    paddingHorizontal: SIZES.INPUT.PADDING.HORIZONTAL,
    backgroundColor: COLORS.GRAY_LIGHT,
    borderRadius: SIZES.BORDER_RADIUS.BR12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.GRAY_LIGHT,
  },
  focused: {
    borderColor: COLORS.BLUE,
  },
  label: {
    color: COLORS.TEXT.BLACK,
    fontWeight: '400',
    fontSize: SIZES.TEXT.REGULAR,
    flex: 1,
  },
  buttonContentContainer: {
    alignItems: 'center',
  },
  selectedItem: {
    backgroundColor: COLORS.GRAY,
    borderRadius: SIZES.BORDER_RADIUS.BR14,
  },
  dropdownContainer: {
    borderRadius: SIZES.BORDER_RADIUS.BR14,
    borderWidth: 1,
    borderColor: COLORS.GRAY,
  },
  dropdownRow: {
    height: undefined,
    backgroundColor: COLORS.GRAY_LIGHT,
    borderBottomWidth: 0,
  },
  countryItem: {
    paddingHorizontal: SIZES.INPUT.PADDING.HORIZONTAL,
    alignItems: 'center',
  },
  flag: {
    fontSize: SIZES.TEXT.REGULAR,
  },
  flagDivider: {
    width: SCREEN_WIDTH * 0.02,
  },
  chevronUp: {
    transform: [{ rotate: '180deg' }],
  },
});
