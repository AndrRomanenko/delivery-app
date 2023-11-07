import React from 'react';
import { useTranslation } from 'react-i18next';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import { LocationHeader } from '../../components/LocationHeader';
import QrReader from '../../components/QrReader/QrReader';
import { ROUTES } from '../../constants/navigator';
import Restaurants from '../../screens/Restaurant/Restaurants';

const Tab = createMaterialTopTabNavigator();

export const LocationNavigation = () => {
  const { t: translation } = useTranslation('navigation');

  return (
    <Tab.Navigator
      screenOptions={{
        swipeEnabled: false,
      }}
      tabBar={props => <LocationHeader {...props} />}>
      <Tab.Screen
        name={ROUTES.RESTAURANT.ROOT}
        component={Restaurants}
        options={{ tabBarLabel: translation('list') }}
      />
      <Tab.Screen
        name={ROUTES.LOCATION.QR}
        component={QrReader}
        options={{ tabBarLabel: 'QR' }}
      />
    </Tab.Navigator>
  );
};
