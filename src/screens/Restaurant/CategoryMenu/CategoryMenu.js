import React, { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Alert, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS } from '../../../constants/theme';
import RestaurantDetailsHeader from '../RestaurantDetails/components/RestaurantDetailsHeader';
import { CategoryListSwitcher } from './components/CategoryListSwitcher';
import { ProductSectionList } from './components/ProductSectionList';

import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import Button from '../../../components/common/Button';
import { ROUTES } from '../../../constants/navigator';
import { OrderContext } from '../../../context/OrderContext';
import usePrevious from '../../../hooks/usePrevious';
import { useGetCategoryByIdQuery } from '../../../services/categoriesService';
import { moderateScale } from '../../../utils/scale';
import { SessionContext } from '../../../context/SessionContext';

const MINIMUM_VIEW_TIME = 300;

const CategoryMenu = ({ route, navigation }) => {
  const { categoryId } = route.params;

  const [activeGroupIndex, setActiveGroupIndex] = useState(0);

  const { order, isOrderActive } = useContext(OrderContext);
  const {
    visit: { sessionId },
  } = useContext(SessionContext);

  const listRef = useRef();
  const manualScrollLoading = useRef(false);

  const {
    isLoading,
    currentData: menu,
    error,
  } = useGetCategoryByIdQuery(categoryId);

  const prevError = usePrevious(error);

  const { t: translation } = useTranslation('categoryMenu');
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

  const onSetActiveGroup = i => {
    manualScrollLoading.current = true;
    listRef.current.scrollToLocation({
      sectionIndex: i,
      itemIndex: 0,
    });
    setTimeout(() => {
      manualScrollLoading.current = false;
      setActiveGroupIndex(i);
    }, MINIMUM_VIEW_TIME);
  };

  const handleViewableItemsChanged = ({ viewableItems, changed }) => {
    if (manualScrollLoading.current) {
      return;
    }
    const section = viewableItems[0]?.section;
    if (!section) {
      return;
    }
    const index = menu.groups.findIndex(x => x.id === section.id);
    setActiveGroupIndex(index);
  };

  const onShowOrder = () => {
    const params = order.id ? { sessionId } : { order };
    navigation.navigate(ROUTES.ORDERS.ROOT_STACK, {
      screen: ROUTES.ORDERS.SESSION_ORDERS_DETAILS,
      params: {
        ...params,
        resetNavigation: true,
      },
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <RestaurantDetailsHeader title={menu?.title} />
      <CategoryListSwitcher
        categories={menu?.groups}
        activeIndex={activeGroupIndex}
        onItemPress={onSetActiveGroup}
      />
      {isLoading || !menu ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator />
        </View>
      ) : (
        <ProductSectionList
          onViewableItemsChanged={handleViewableItemsChanged}
          listRef={listRef}
          sections={menu?.groups.map(g => ({
            id: g.id,
            title: g.title,
            data: g.products,
          }))}
        />
      )}
      {isOrderActive && (
        <View style={styles.checkOrderButtonWrapper}>
          <Button
            onPress={onShowOrder}
            style={styles.checkOrderButton}
            label={translation('checkOrder')}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkOrderButtonWrapper: {
    width: '100%',
    paddingHorizontal: moderateScale(16),
    position: 'absolute',
    bottom: moderateScale(5),
  },
});

export default CategoryMenu;
