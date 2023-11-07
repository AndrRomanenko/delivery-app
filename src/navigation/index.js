import auth from '@react-native-firebase/auth';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';
import SplashScreen from 'react-native-bootsplash';

import Confirmation from '../screens/Auth/Confirmation';
import Info from '../screens/Auth/Info';
import TermsAndConditions from '../screens/Profile/TermsAndCondtions';

import { ROUTES } from '../constants/navigator';
import { COLORS } from '../constants/theme';

import InfoModal from '../components/InfoModal';
import { AuthNavigation } from './auth';
import { HomeNavigationContainer } from './home/HomeNavigation';

const Stack = createStackNavigator();

const NAVIGATION_THEME = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: COLORS.WHITE,
  },
};

const NAVIGATION_CONFIG = {
  screenOptions: {
    headerShown: false,
  },
};

export const MODAL_CONFIG = {
  presentation: 'transparentModal',
  cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid,
};

function RootNavigation() {
  const [authorized, setAuthorized] = useState(undefined);

  useEffect(() => {
    if (authorized === undefined) {
      return;
    }
    SplashScreen.hide();
  }, [authorized]);

  function onAuthStateChanged(user) {
    setAuthorized(!!user);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  return (
    <Stack.Navigator {...NAVIGATION_CONFIG}>
      {authorized ? (
        <Stack.Screen
          name={ROUTES.HOME.ROOT_STACK}
          component={HomeNavigationContainer}
        />
      ) : (
        <Stack.Screen name={ROUTES.AUTH.ROOT} component={AuthNavigation} />
      )}
      <Stack.Screen
        name={ROUTES.COMMON.INFO_MODAL}
        options={MODAL_CONFIG}
        component={InfoModal}
      />
      <Stack.Screen name={ROUTES.COMMON.CHANGE_PHONE} component={Info} />
      <Stack.Screen
        name={ROUTES.COMMON.CONFIRM_PHONE}
        component={Confirmation}
      />
      <Stack.Screen
        name={ROUTES.COMMON.TERMS_CONDITIONS}
        component={TermsAndConditions}
      />
    </Stack.Navigator>
  );
}

export default ({ onNavigationStateChange, appRef, onReady }) => {
  return (
    <NavigationContainer
      onReady={onReady}
      onNavigationStateChange={onNavigationStateChange}
      theme={NAVIGATION_THEME}
      ref={appRef}>
      <RootNavigation />
    </NavigationContainer>
  );
};
