import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Alert, StyleSheet, Text } from 'react-native';

import RestaurantPeculiarities from './components/RestaurantPeculiarities';
import RestaurantContactInfo from './components/RestaurantContactInfo';
import RestaurantReviews from './components/RestaurantReviews';
import LoadingSpinner from '../../../components/LoadingSpinner';

import usePrevious from '../../../hooks/usePrevious';
import useLanguageStyles from '../../../hooks/useLanguageStyles';
import {
  useGetShopByIdQuery,
  useLazyGetShopReviewsQuery,
} from '../../../services/shopsService';

import { COLORS, SIZES } from '../../../constants/theme';
import PageContainer from '../../../components/PageContainer';
import PageHeader from '../../../components/PageHeader';
import { isScrolledToEnd } from '../../../utils/scrolling';
import { useToast } from 'react-native-toast-notifications';

const RestaurantDetails = ({ route, navigation }) => {
  const toast = useToast();
  const { languageStyles } = useLanguageStyles();
  const scrollRef = useRef(null);

  const [reviewsData, setReviewsData] = useState({
    page: 0,
    pages: undefined,
    items: [],
  });

  const { title, id, openReviews } = route.params;

  const [fetchReviews, { isFetching }] = useLazyGetShopReviewsQuery();
  const {
    isLoading,
    currentData: restaurant,
    error,
  } = useGetShopByIdQuery(id, {
    refetchOnMountOrArgChange: true,
  });

  const { rank: restaurantRank } = restaurant?.reviews;

  const getReviews = async () => {
    if (reviewsData.page === reviewsData.pages) {
      return;
    }
    try {
      const newData = await fetchReviews({
        page: reviewsData.page + 1,
        id,
      }).unwrap();

      setReviewsData({
        page: newData.page,
        pages: newData.pages,
        items: [...reviewsData.items, ...newData.items],
      });
    } catch (err) {
      console.warn(err);
      toast.show('Reviews fetching error occured');
    }
  };

  const prevError = usePrevious(error);

  const { t: translation } = useTranslation('restaurantDetails');
  const { t: generalTranslation } = useTranslation('general');

  useEffect(() => {
    if (error?.status === 404 && error.status !== prevError?.status) {
      Alert.alert(generalTranslation('error'), translation('notFound'), [
        {
          text: 'OK',
          onPress: () => navigation.goBack(),
        },
      ]);
    }
  }, [error]);

  useEffect(() => {
    getReviews();
  }, []);

  const handleScroll = ({ nativeEvent }) => {
    if (isScrolledToEnd(nativeEvent)) {
      getReviews();
    }
  };

  return (
    <PageContainer
      header={<PageHeader title={title} />}
      onScroll={handleScroll}
      scrollRef={scrollRef}>
      {isLoading || !restaurant ? (
        <LoadingSpinner />
      ) : (
        <>
          <Text style={[styles.description, languageStyles.text]}>
            {restaurant.description}
          </Text>
          <RestaurantContactInfo restaurant={restaurant} />
          {restaurant.peculiarities && (
            <RestaurantPeculiarities restaurant={restaurant} />
          )}
          <RestaurantReviews
            rank={restaurantRank}
            scrollRef={scrollRef}
            autoScroll={openReviews}
            shopId={id}
            isLoading={isFetching}
            reviewsData={reviewsData.items}
          />
        </>
      )}
    </PageContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
  },
  description: {
    fontSize: SIZES.TEXT.TEXT_SIZE_17,
    fontFamily: 'SFPRODISPLAY-REGULAR',
    color: COLORS.TEXT.BLACK,
    marginBottom: SIZES.MARGIN.M16,
  },
});

export default RestaurantDetails;
