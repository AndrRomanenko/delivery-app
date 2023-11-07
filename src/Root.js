import React, { useRef } from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import NativeToast, { ToastProvider } from 'react-native-toast-notifications';
import { Provider } from 'react-redux';

import Toast from './components/Toast';

import { setContainer } from './constants/navigator';
import { COLORS } from './constants/theme';

import AppWithNavigator from './navigation';
import store from './store';

const Root = () => {
  const navRef = useRef(null);

  const onInit = () => {
    setContainer(navRef);
  };

  const handleNavigationChange = appState => {};

  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <StatusBar backgroundColor={COLORS.WHITE} barStyle="dark-content" />
        <ToastProvider
          placement="top"
          renderToast={props => <Toast {...props} />}>
          <NativeToast ref={ref => (global.toast = ref)} />
          <AppWithNavigator
            onNavigationStateChange={handleNavigationChange}
            onReady={onInit}
            appRef={navRef}
          />
        </ToastProvider>
      </SafeAreaProvider>
    </Provider>
  );
};

export default Root;
