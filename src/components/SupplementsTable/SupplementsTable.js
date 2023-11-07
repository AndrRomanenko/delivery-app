import React from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, View } from 'react-native';
import { COLORS } from '../../constants/theme';
import { moderateScale } from '../../utils/scale';
import CollapsibleView from '../CollapsibleView';
import SupplementItem from './SupplementItem';

const SupplementsTable = ({ style, supplements, onItemChange }) => {
  const { t: translation } = useTranslation('productDetailsScreen');

  if (!supplements || !supplements.length) {
    return null;
  }

  return (
    <CollapsibleView
      style={[styles.container, style]}
      title={translation('supplements')}>
      <View style={styles.contentContainer}>
        {supplements.map(x => (
          <SupplementItem key={x.id} item={x} onChange={onItemChange} />
        ))}
      </View>
    </CollapsibleView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: moderateScale(16),
    paddingVertical: moderateScale(18),
    backgroundColor: COLORS.GRAY_LIGHT,
  },
  contentContainer: {
    paddingTop: moderateScale(12),
  },
  title: {
    fontWeight: '600',
    fontSize: moderateScale(16),
    color: COLORS.BLACK,
  },
});

export default SupplementsTable;
