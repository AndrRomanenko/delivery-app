import React, { useState } from 'react';
import { SectionList, StyleSheet, Text, View } from 'react-native';
import { COLORS } from '../../../../constants/theme';
import useLanguageStyles from '../../../../hooks/useLanguageStyles';
import ProductDetailsModal from './ProductDetailsModal';
import ProductListItem from './ProductListItem';

export const ProductSectionList = ({
  sections,
  listRef,
  onViewableItemsChanged,
}) => {
  const { languageStyles } = useLanguageStyles();
  const [detailProductId, setDetailsProductId] = useState(null);

  const onShowItemDetails = item => {
    setDetailsProductId(item.id);
  };

  const onHideItemDetails = () => setDetailsProductId(null);

  return (
    <View style={styles.container}>
      <SectionList
        viewabilityConfig={{
          waitForInteraction: true,
          viewAreaCoveragePercentThreshold: 95,
        }}
        onViewableItemsChanged={onViewableItemsChanged}
        ref={listRef}
        showsVerticalScrollIndicator={false}
        stickySectionHeadersEnabled={false}
        sections={sections}
        keyExtractor={item => item.id}
        renderItem={({ item, index }) => (
          <ProductListItem
            onPress={onShowItemDetails}
            item={item}
            index={index}
          />
        )}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={[styles.title, languageStyles.text]}>{title}</Text>
        )}
      />
      <ProductDetailsModal
        productId={detailProductId}
        onClose={onHideItemDetails}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: COLORS.BLACK,
    fontFamily: 'SFPRODISPLAY-SEMIBOLD',
    marginBottom: 8,
    marginTop: 16,
    marginHorizontal: 16,
  },
});
