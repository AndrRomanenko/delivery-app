import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet } from 'react-native';

import PageContainer from '../../../components/PageContainer';
import PageHeader from '../../../components/PageHeader';
import RestaurantList from './components/RestaurantList';

import { useLazyGetShopsQuery } from '../../../services/shopsService';

import LoadingSpinner from '../../../components/LoadingSpinner';
import { SIZES } from '../../../constants/theme';

const Restaurants = () => {
  const { t: navigationTranslation } = useTranslation('navigation');
  const [searchValue, setSearchValue] = useState('');

  const [getRestaurants, { currentData: restaurants, isFetching, isLoading }] =
    useLazyGetShopsQuery('', { skip: isFetching });

  useFocusEffect(
    useCallback(() => {
      if (!isFetching) {
        getRestaurants();
      }
    }, []),
  );

  const getFilteredList = (items, search) => {
    if (!search) {
      return items;
    }
    const filteredItems = items?.filter(x =>
      x.title.toLowerCase().includes(search.toLowerCase()),
    );
    return filteredItems;
  };

  const data = useMemo(
    () => getFilteredList(restaurants, searchValue),
    [restaurants, searchValue],
  );

  return (
    <PageContainer
      withScrollView={false}
      header={
        <PageHeader
          title={navigationTranslation('findLocation')}
          disableButtons
        />
      }>
      <RestaurantList
        style={styles.list}
        loading={isLoading}
        items={data}
        onSearchChange={setSearchValue}
        searchValue={searchValue}
      />
    </PageContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: SIZES.PADDING.P20,
  },
  titleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SIZES.PADDING.P12,
    paddingHorizontal: SIZES.PADDING.P12,
  },
  list: {
    marginTop: 70,
    flex: 1,
  },
});

export default Restaurants;
