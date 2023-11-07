import React from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, View } from 'react-native';
import { COLORS } from '../../constants/theme';
import useLanguageStyles from '../../hooks/useLanguageStyles';
import { getValidPrice } from '../../utils/order';
import { moderateScale } from '../../utils/scale';
import CollapsibleView from '../CollapsibleView';
import RadioButtonGroup from '../RadioButtonGroup';

const ModifierOptionItem = ({ item, style, titleStyle }) => {
  const { t: translation } = useTranslation('productDetailsScreen');
  const renderPriceLabel = () => {
    if (item.price) {
      return (
        <Text style={styles.price}>
          {getValidPrice(item.price, { modifierPrice: true })}
        </Text>
      );
    } else {
      return item.isDefault ? (
        <Text style={styles.defaultLabel}>{translation('default')}</Text>
      ) : null;
    }
  };

  return (
    <View style={[styles.modifierItem, style]}>
      <Text style={[styles.modifierItemTitle, titleStyle]}>{item.title}</Text>
      {renderPriceLabel()}
    </View>
  );
};

const ModifierItem = ({ item, value, onItemOptionSelect }) => {
  const { languageStyles } = useLanguageStyles();

  const handleSelect = (option, i) => {
    onItemOptionSelect(item, option);
  };

  return (
    <CollapsibleView style={styles.container} title={item.title}>
      <View style={styles.contentContainer}>
        <RadioButtonGroup
          activeIndex={item.options.findIndex(x => x.id === value)}
          onItemSelect={handleSelect}
          items={item.options.map(o => ({
            item: o,
            title: (
              <ModifierOptionItem
                style={languageStyles.row}
                titleStyle={languageStyles.text}
                item={o}
              />
            ),
          }))}
          itemStyle={[styles.radioItem, languageStyles.row]}
        />
      </View>
    </CollapsibleView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: moderateScale(24),
    paddingHorizontal: moderateScale(16),
    paddingVertical: moderateScale(18),
    backgroundColor: COLORS.GRAY_LIGHT,
  },
  contentContainer: {
    paddingBottom: moderateScale(16),
  },
  radioItem: {
    marginVertical: moderateScale(9),
    paddingHorizontal: moderateScale(16),
  },
  defaultLabel: {
    overflow: 'hidden',
    backgroundColor: COLORS.BLUE_LIGHT,
    color: COLORS.BLUE,
    paddingVertical: moderateScale(6),
    paddingHorizontal: moderateScale(18),
    borderRadius: moderateScale(14),
    marginHorizontal: moderateScale(16),
  },
  modifierItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  modifierItemTitle: {
    flex: 1,
  },
  price: {
    color: COLORS.GRAY_ICON,
    marginHorizontal: moderateScale(16),
  },
});

export default ModifierItem;
