import React from 'react';
import { useTranslation } from 'react-i18next';
import auth from '@react-native-firebase/auth';
import { createStackNavigator } from '@react-navigation/stack';
import PageHeader from '../../components/PageHeader';
import { ROUTES } from '../../constants/navigator';
import Confirmation from '../../screens/Auth/Confirmation';
import CreateProfile from '../../screens/Auth/CreateProfile';
import Info from '../../screens/Auth/Info';

const AuthStack = createStackNavigator();

export function AuthNavigation() {
  const { t: translation } = useTranslation('navigation');
  const displayName = auth().currentUser?.displayName;

  const AUTH_NAVIGATOR_CONFIG = {
    initialRouteName: ROUTES.AUTH.INFO,
    screenOptions: {
      title: 'login',
      header: () => <PageHeader title={translation('login')} disableButtons />,
    },
  };

  return (
    <AuthStack.Navigator {...AUTH_NAVIGATOR_CONFIG}>
      <AuthStack.Screen name={ROUTES.AUTH.INFO} component={Info} />
      <AuthStack.Screen
        name={ROUTES.AUTH.CONFIRMATION}
        component={Confirmation}
      />
    </AuthStack.Navigator>
  );
}
