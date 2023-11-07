import { useIsFocused } from '@react-navigation/native';
import React, { useContext, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { InteractionManager, StatusBar, StyleSheet } from 'react-native';
import { useToast } from 'react-native-toast-notifications';

import Button from '../../../components/common/Button';
import { ROUTES } from '../../../constants/navigator';
import { VISIT_STATUSES } from '../../../constants/visit';
import { OrderContext } from '../../../context/OrderContext';
import { SessionContext } from '../../../context/SessionContext';
import { useLazyGetCategoriesByShopIdQuery } from '../../../services/categoriesService';
import { useLazyGetShopByIdQuery } from '../../../services/shopsService';
import CategoryList from './components/CategoryList';
import CategoryListHeader from './components/CategoryListHeader';
import PopupMenuButton from './components/PopupMenuButton';
import RestaurantHeader from './components/RestaurantHeader';

const RestaurantCategories = ({ route, navigation }) => {
  const restaurant = route.params?.restaurant || {};
  const {
    isVisitActive,
    visit,
    deleteCurrentSession,
    startSessionByShop,
    reloadSession,
  } = useContext(SessionContext);
  const { isSessionByShopAllowed } = useContext(OrderContext);

  const { id } = restaurant;

  const [getShopById] = useLazyGetShopByIdQuery(visit.shopId || '', {
    skip: !visit.shopId,
    refetchOnMountOrArgChange: false,
  });

  const { t: translation } = useTranslation('restaurantScreen');
  const isFocused = useIsFocused();
  const toast = useToast();

  const [getCategoriesByShopId, { isFetching, currentData: categories }] =
    useLazyGetCategoriesByShopIdQuery(id);

  const getVisitRestaurant = async () => {
    try {
      const r = await getShopById(visit.shopId).unwrap();
      navigation.setParams({
        restaurant: r,
      });
    } catch (err) {
      toast.show(err.data.title);
      deleteCurrentSession();
      navigation.replace(ROUTES.LOCATION.ROOT);
    }
  };

  const loadCategories = () => {
    getCategoriesByShopId(id).unwrap();
  };

  const onRefresh = () => {
    loadCategories();
    reloadSession();
  };

  useEffect(() => {
    if (!id) {
      getVisitRestaurant();
    }
  }, []);

  useEffect(() => {
    if (!isFetching && isFocused && id) {
      loadCategories();
    }
  }, [id, isFocused]);

  useEffect(() => {
    if (
      visit.status !== VISIT_STATUSES.UNINITIALIZED &&
      visit.status !== VISIT_STATUSES.APPROVED
    ) {
      InteractionManager.runAfterInteractions(() => {
        navigation.navigate(ROUTES.VISIT.STATUS_MODAL);
      });
    }
  }, [visit]);

  const handleVisitStart = () => {
    startSessionByShop(restaurant);
  };

  return (
    <>
      <StatusBar barStyle="light-content" />
      <RestaurantHeader />
      <CategoryList
        categories={categories}
        refreshing={isFetching}
        onRefresh={onRefresh}
        ListHeaderComponent={() => (
          <CategoryListHeader restaurant={restaurant} />
        )}
      />
      {isVisitActive && <PopupMenuButton />}
      {!isVisitActive && isSessionByShopAllowed(restaurant) && (
        <Button
          style={styles.button}
          onPress={handleVisitStart}
          label={translation('buttonStartOrder')}
        />
      )}
    </>
  );
};
const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    top: '90%',
    zIndex: 1,
    width: '90%',
    marginHorizontal: '5%',
  },
});

export default RestaurantCategories;
