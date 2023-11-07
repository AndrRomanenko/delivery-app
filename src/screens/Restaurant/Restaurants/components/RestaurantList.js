import React from 'react';
import { FlatList, View } from 'react-native';
import RestaurantSearch from './RestaurantSearch';

import RestaurantListItem from './RestaurantListItem';
import SearchFailed from './SearchFailed';
import LoadingSpinner from '../../../../components/LoadingSpinner';

const RestaurantList = ({
  searchValue,
  items = [],
  style,
  onSearchChange,
  isLoading,
}) => {
  const renderItem = ({ item }) => {
    return <RestaurantListItem item={item} />;
  };

  return (
    <View style={style}>
      <RestaurantSearch onChange={onSearchChange} value={searchValue} />
      <>
        {!items.length && searchValue ? (
          <SearchFailed />
        ) : isLoading ? (
          <LoadingSpinner />
        ) : (
          <FlatList data={items} renderItem={renderItem} />
        )}
      </>
    </View>
  );
};

export default RestaurantList;
