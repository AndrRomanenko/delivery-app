import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet } from 'react-native';

import PageContainer from '../../components/PageContainer';
import PageHeader from '../../components/PageHeader';

import useLanguageStyles from '../../hooks/useLanguageStyles';

import { ROUTES } from '../../constants/navigator';
import { ORDER_SERVICE_TYPES } from '../../constants/order';
import { COLORS, FONTS } from '../../constants/theme';
import OrdersList from '../../screens/Orders/OrdersList';
import { moderateScale } from '../../utils/scale';

const Tab = createMaterialTopTabNavigator();

export const OrdersTabNavigation = () => {
  const { t: translation } = useTranslation('navigation');
  const { t: ordersTranslation } = useTranslation('ordersScreen');
  const { isReversed } = useLanguageStyles();

  const tabs = [
    <Tab.Screen
      key={ROUTES.ORDERS.ORDERS_LIST.ALL}
      name={ROUTES.ORDERS.ORDERS_LIST.ALL}
      component={OrdersList}
      options={{ tabBarLabel: ordersTranslation('allOrders') }}
    />,
    <Tab.Screen
      key={ROUTES.ORDERS.ORDERS_LIST.DINE_IN}
      name={ROUTES.ORDERS.ORDERS_LIST.DINE_IN}
      initialParams={{
        type: ORDER_SERVICE_TYPES.DINE_IN,
      }}
      component={OrdersList}
      options={{ tabBarLabel: ordersTranslation('in_house') }}
    />,
    <Tab.Screen
      key={ROUTES.ORDERS.ORDERS_LIST.DELIVERY}
      name={ROUTES.ORDERS.ORDERS_LIST.DELIVERY}
      initialParams={{
        type: ORDER_SERVICE_TYPES.DELIVERY,
      }}
      component={OrdersList}
      options={{ tabBarLabel: ordersTranslation('delivery') }}
    />,
    <Tab.Screen
      key={ROUTES.ORDERS.ORDERS_LIST.TAKE_AWAY}
      name={ROUTES.ORDERS.ORDERS_LIST.TAKE_AWAY}
      initialParams={{
        type: ORDER_SERVICE_TYPES.TAKE_AWAY,
      }}
      component={OrdersList}
      options={{ tabBarLabel: ordersTranslation('take_away') }}
    />,
  ];

  return (
    <PageContainer
      fullScreen
      header={<PageHeader title={translation('orders')} disableButtons />}>
      <Tab.Navigator
        screenOptions={{
          swipeEnabled: true,
          tabBarScrollEnabled: true,
          tabBarLabelStyle: styles.tabBarLabelStyle,
          tabBarItemStyle: styles.tabBarItemStyle,
          tabBarIndicatorStyle: styles.tabBarIndicatorStyle,
        }}>
        {isReversed ? tabs.reverse() : tabs}
      </Tab.Navigator>
    </PageContainer>
  );
};

const styles = StyleSheet.create({
  tabBarLabelStyle: {
    fontSize: moderateScale(14),
    fontFamily: FONTS.SEMIBOLD,
    fontWeight: '500',
    textTransform: 'none',
  },
  tabBarItemStyle: {
    width: moderateScale(100),
  },
  tabBarIndicatorStyle: {
    backgroundColor: COLORS.ORANGE,
  },
});
