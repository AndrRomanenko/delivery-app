import React from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import BarItem from './components/BarItem';

import { COLORS, SIZES, STYLES } from '../../constants/theme';

import { getRouteIcon } from './helper';

const BottomNavBar = ({ state, descriptors, navigation }) => {
  const focusedOptions = descriptors[state.routes[state.index].key].options;

  if (focusedOptions.tabBarVisible === false) {
    return null;
  }

  return (
    <SafeAreaView edges={['bottom']} style={[styles.container, STYLES.shadow]}>
      {state.routes.map((route, index) => (
        <BarItem
          key={route.name}
          {...{
            route,
            descriptors,
            navigation,
            index,
            state,
            icon: getRouteIcon(route.name, state.index === index),
            disableLabel: true,
          }}
        />
      ))}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopLeftRadius: SIZES.BORDER_RADIUS.BR14,
    borderTopRightRadius: SIZES.BORDER_RADIUS.BR14,
    backgroundColor: COLORS.WHITE,
  },
});

export default BottomNavBar;
