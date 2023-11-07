import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import QrReader from '../../components/QrReader/QrReader';

import CategoryMenu from '../../screens/Restaurant/CategoryMenu';
import RestaurantCategories from '../../screens/Restaurant/RestaurantCategories';
import RestaurantDetails from '../../screens/Restaurant/RestaurantDetails';

import { ROUTES } from '../../constants/navigator';

import { useContext } from 'react';
import { MODAL_CONFIG } from '..';
import { SessionContext } from '../../context/SessionContext';
import SessionTypeModal from '../../screens/Restaurant/RestaurantCategories/components/SessionTypeModal';
import { LocationNavigation } from '../location';

const Stack = createStackNavigator();

export function RestaurantNavigation() {
  const { isVisitActive } = useContext(SessionContext);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!isVisitActive && (
        <>
          <Stack.Screen
            name={ROUTES.LOCATION.ROOT}
            component={LocationNavigation}
          />
          <Stack.Screen
            name={ROUTES.RESTAURANT.RESTAURANT_QR}
            component={QrReader}
          />
        </>
      )}
      <Stack.Screen
        name={ROUTES.RESTAURANT.RESTAURANT_CATEGORIES}
        component={RestaurantCategories}
      />
      <Stack.Screen
        name={ROUTES.RESTAURANT.RESTAURANT_DETAILS}
        component={RestaurantDetails}
      />
      <Stack.Screen
        name={ROUTES.RESTAURANT.CATEGORY_MENU}
        component={CategoryMenu}
      />
      <Stack.Screen
        name={ROUTES.RESTAURANT.SESSION_TYPE_MODAL}
        options={{ ...MODAL_CONFIG, gestureEnabled: false }}
        component={SessionTypeModal}
      />
    </Stack.Navigator>
  );
}
