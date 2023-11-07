import auth from '@react-native-firebase/auth';
import React from 'react';
import {
  KeyboardAvoidingView,
  RefreshControl,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  DISABLED_BOTTOM_NAV_SCREENS,
  getActiveRoute,
} from '../../constants/navigator';

import { isIOS } from '../../constants/platform';
import { COLORS } from '../../constants/theme';
import { moderateScale } from '../../utils/scale';

/**
 * Container for all pages.
 * Includes interaction behaviour with keyboard.
 */
const PageContainer = ({
  children,
  header,
  fullScreen,
  withScrollView = true,
  onScroll,
  refreshing,
  onRefresh,
  scrollRef,
}) => {
  const renderContent = () => {
    return <View style={styles.content(fullScreen)}>{children}</View>;
  };

  const renderRefreshControl = () => {
    return (
      <RefreshControl
        tintColor={COLORS.ORANGE}
        refreshing={refreshing}
        onRefresh={onRefresh}
      />
    );
  };

  const renderScrollableContent = () => {
    return (
      <KeyboardAvoidingView
        behavior={isIOS() ? 'padding' : 'height'}
        style={styles.container}>
        <ScrollView
          refreshControl={onRefresh ? renderRefreshControl() : null}
          style={styles.scrollContainer}
          contentContainerStyle={styles.scrollContent}
          onScroll={onScroll}
          scrollEventThrottle={0}
          ref={scrollRef}>
          {renderContent()}
        </ScrollView>
      </KeyboardAvoidingView>
    );
  };
  const activeRoute = getActiveRoute();
  const isLoggedIn = !!auth().currentUser;

  const hasBottomBar =
    isLoggedIn && !DISABLED_BOTTOM_NAV_SCREENS.includes(activeRoute?.name);
  const edges = hasBottomBar ? ['left'] : ['bottom'];

  return (
    <SafeAreaView edges={edges} style={styles.container}>
      {header}
      {withScrollView ? renderScrollableContent() : renderContent()}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
  },
  content: fullScreen => ({
    flex: 1,
    paddingHorizontal: fullScreen ? 0 : moderateScale(16),
  }),
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
});

export default PageContainer;
