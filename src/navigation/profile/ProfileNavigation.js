import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import PersonalInfo from '../../screens/Profile/components/PersonalInfo/PersonalInfo';
import ProfileDev from '../../screens/Profile/ProfileDev';
import Support from '../../screens/Profile/Support';

import AddressList from '../../screens/Profile/Address/AddressList';
import AddressInfo from '../../screens/Profile/Address/AddressInfo';
import DeleteAdressModal from '../../screens/Profile/Address/AddressInfo/components/DeleteAdressModal';
import Profile from '../../screens/Profile';

import { ROUTES } from '../../constants/navigator';
import { MODAL_CONFIG } from '..';

const Stack = createStackNavigator();

export function ProfileNavigation() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={ROUTES.PROFILE.PROFILE} component={Profile} />
      <Stack.Screen
        name={ROUTES.PROFILE.PERSONAL_INFO}
        component={PersonalInfo}
      />
      <Stack.Screen name={ROUTES.PROFILE.SUPPORT} component={Support} />
      <Stack.Screen name={ROUTES.PROFILE.DEVELOP_MENU} component={ProfileDev} />
      <Stack.Screen
        name={ROUTES.PROFILE.ADDRESS.ADDRESS_LIST}
        component={AddressList}
      />
      <Stack.Screen
        name={ROUTES.PROFILE.ADDRESS.ADDRESS_INFO}
        component={AddressInfo}
      />
      <Stack.Screen
        name={ROUTES.PROFILE.ADDRESS.REMOVAL_MODAL}
        options={{ ...MODAL_CONFIG, gestureEnabled: false }}
        component={DeleteAdressModal}
      />
    </Stack.Navigator>
  );
}
