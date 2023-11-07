import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React, { useContext, useLayoutEffect, useState } from 'react';
import auth from '@react-native-firebase/auth';
import BottomNavBar from '../../components/BottomNavBar';
import {
  DISABLED_BOTTOM_NAV_SCREENS,
  getActiveRoute,
  ROUTES,
} from '../../constants/navigator';
import { PushNotificationProvider } from '../../context/PushNotificationContext';
import { SessionContext, SessionProvider } from '../../context/SessionContext';

import { createStackNavigator } from '@react-navigation/stack';
import { MODAL_CONFIG } from '..';
import { OrderProvider } from '../../context/OrderContext';
import { PaymentProvider } from '../../context/PaymentContext';
import NewGuestModal from '../../screens/Restaurant/NewGuestModal';
import VisitStatusModal from '../../screens/Restaurant/RestaurantCategories/components/VisitStatusModal';
import { OrdersStackNavigation } from '../orders';
import { ProfileNavigation } from '../profile';
import { RestaurantNavigation } from '../restaurant';
import CreateProfile from '../../screens/Auth/CreateProfile';

const HomeTab = createBottomTabNavigator();
const Stack = createStackNavigator();

function HomeNavigation({ navigation }) {
  const { visit } = useContext(SessionContext);
  const [isTabBarVisible, setTabBarVisible] = useState(false);

  const HOME_NAVIGATOR_CONFIG = {
    initialRouteName: ROUTES.RESTAURANT.ROOT,
    tabBar: props => <BottomNavBar {...props} />,
    screenOptions: {
      header: () => {},
      tabBarVisible: isTabBarVisible,
    },
    screenListeners: ({ navigation }) => ({
      state: e => {
        setTabBarVisible(
          !DISABLED_BOTTOM_NAV_SCREENS.includes(getActiveRoute()?.name),
        );
      },
    }),
  };

  useLayoutEffect(() => {
    if (visit.requestIds.length) {
      navigation.navigate(ROUTES.VISIT.NEW_GUEST_MODAL);
    }
  }, [visit]);

  return (
    <HomeTab.Navigator {...HOME_NAVIGATOR_CONFIG}>
      <HomeTab.Screen
        name={ROUTES.ORDERS.ROOT_STACK}
        component={OrdersStackNavigation}
      />
      <HomeTab.Screen
        options={{ headerShown: false }}
        name={ROUTES.RESTAURANT.ROOT}
        component={RestaurantNavigation}
      />
      <HomeTab.Screen
        options={{ headerShown: false }}
        name={ROUTES.PROFILE.ROOT}
        component={ProfileNavigation}
      />
    </HomeTab.Navigator>
  );
}

function HomeStackNavigation({ navigation }) {
  const displayName = auth().currentUser?.displayName;
  const initialRouteName = displayName
    ? ROUTES.RESTAURANT.ROOT
    : ROUTES.PROFILE.CREATE_PROFILE;

  return (
    <Stack.Navigator
      initialRouteName={initialRouteName}
      screenOptions={{ headerShown: false }}>
      <Stack.Screen name={ROUTES.HOME.ROOT} component={HomeNavigation} />
      <Stack.Screen
        name={ROUTES.VISIT.STATUS_MODAL}
        options={{ ...MODAL_CONFIG, gestureEnabled: false }}
        component={VisitStatusModal}
      />
      <Stack.Screen
        name={ROUTES.VISIT.NEW_GUEST_MODAL}
        options={{ ...MODAL_CONFIG, gestureEnabled: false }}
        component={NewGuestModal}
      />
      <Stack.Screen
        options={({ route }) => ({ title: route.name })}
        name={ROUTES.PROFILE.CREATE_PROFILE}
        component={CreateProfile}
      />
    </Stack.Navigator>
  );
}

export function HomeNavigationContainer(props) {
  return (
    <PushNotificationProvider>
      <SessionProvider>
        <OrderProvider>
          <PaymentProvider>
            <HomeStackNavigation {...props} />
          </PaymentProvider>
        </OrderProvider>
      </SessionProvider>
    </PushNotificationProvider>
  );
}
