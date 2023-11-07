import React, { useEffect, useRef } from 'react';
import {
  FlatList,
  InteractionManager,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { COLORS, SIZES } from '../../../../constants/theme';

export const CategoryListSwitcher = ({
  categories = [],
  activeIndex = 0,
  onItemPress,
}) => {
  const ref = useRef();

  useEffect(() => {
    if (!categories.length) {
      return;
    }
    InteractionManager.runAfterInteractions(() => {
      ref.current.scrollToIndex({ index: activeIndex, animated: true });
    });
  }, [activeIndex, categories]);

  const renderItem = ({ item, index }) => {
    const hasSpacing = !!index;
    const isActive = index === activeIndex;

    return (
      <TouchableOpacity
        onPress={() => onItemPress?.(index)}
        style={[
          styles.item,
          hasSpacing && styles.itemSpacing,
          isActive && styles.activeItem,
        ]}>
        <Text style={[styles.itemText, isActive && styles.activeItemText]}>
          {item.title}
        </Text>
        {isActive && <View style={styles.activeIndicator} />}
      </TouchableOpacity>
    );
  };
  return (
    <View style={styles.container}>
      <FlatList
        contentContainerStyle={styles.list}
        ref={ref}
        showsHorizontalScrollIndicator={false}
        horizontal
        data={categories}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    marginBottom: 4,
    marginTop: SIZES.MARGIN.M24 - 10,
  },
  item: {
    paddingVertical: 10,
  },
  itemSpacing: {
    marginLeft: 16,
  },
  itemText: {
    fontSize: 15,
    color: COLORS.GRAY_ICON,
  },
  activeItemText: {
    fontWeight: 'bold',
    color: COLORS.BLACK,
  },
  activeIndicator: {
    position: 'absolute',
    bottom: 2,
    alignSelf: 'center',
    backgroundColor: COLORS.ORANGE,
    width: 5,
    height: 5,
    borderRadius: 5,
  },
});
