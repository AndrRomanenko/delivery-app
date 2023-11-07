import React, { useCallback, useContext, useRef } from 'react';
import { FlatList, RefreshControl, StyleSheet } from 'react-native';
import { COLORS } from '../../../../constants/theme';
import { SessionContext } from '../../../../context/SessionContext';
import scrollEmitter from '../../mocks/events';
import CategoryListItem from './CategoryListItem';

const CategoryList = ({
  categories,
  ListHeaderComponent,
  onRefresh,
  refreshing,
}) => {
  const { isVisitActive } = useContext(SessionContext);
  const isScrollDrag = useRef(false);

  const onScroll = useCallback(event => {
    if (isScrollDrag.current) {
      scrollEmitter.emit('onScrollDown', event);
    }
  }, []);

  const onScrollBeginDrag = useCallback(() => {
    isScrollDrag.current = true;
  }, []);

  const onScrollEndDrag = useCallback(() => {
    setTimeout(() => {}, 0);
  }, [isScrollDrag]);

  const keyExtractor = item => item.id;

  const renderItem = ({ item, index }) => (
    <CategoryListItem item={item} index={index} />
  );

  const renderRefreshControl = () => {
    return (
      <RefreshControl
        tintColor={COLORS.ORANGE}
        refreshing={refreshing}
        onRefresh={onRefresh}
      />
    );
  };

  return (
    <FlatList
      contentContainerStyle={styles.container(!isVisitActive)}
      numColumns={2}
      data={categories}
      showsVerticalScrollIndicator={false}
      ListHeaderComponent={ListHeaderComponent}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      onScroll={onScroll}
      scrollEventThrottle={16}
      onScrollBeginDrag={onScrollBeginDrag}
      onScrollEndDrag={onScrollEndDrag}
      onRefresh={onRefresh}
      refreshing={refreshing}
      refreshControl={renderRefreshControl()}
    />
  );
};

const styles = StyleSheet.create({
  // If !visit, add padding for [Start visit] button to avoid overlapping
  container: visitStarted => ({
    paddingBottom: visitStarted ? 100 : 0,
  }),
});

export default CategoryList;
