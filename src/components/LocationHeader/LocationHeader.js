import React from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, View } from 'react-native';
import { isIOS } from '../../constants/platform';
import { COLORS, STYLES, SIZES } from '../../constants/theme';
import { moderateScale } from '../../utils/scale';
import BarItem from '../BottomNavBar/components/BarItem';

export const LocationHeader = ({ state, descriptors, navigation }) => {
  const { t: translation } = useTranslation('navigation');

  return (
    <View style={[styles.container, STYLES.shadow]}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];

        const label = options.tabBarLabel
          ? options.tabBarLabel
          : options.tabBarLabel
          ? options.title
          : route.name;
        const translatedLabel = translation(label);

        return (
          <BarItem
            key={route.name}
            style={styles.button}
            textStyle={styles.buttonText}
            text={translatedLabel}
            {...{
              route,
              descriptors,
              navigation,
              index,
              state,
            }}
          />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    flexDirection: 'row',
    top: isIOS() ? moderateScale(130) : moderateScale(80),
    width: '90%',
    alignSelf: 'center',
    backgroundColor: COLORS.WHITE,
    borderRadius: moderateScale(12),
    padding: moderateScale(4),
  },
  button: isFocused => ({
    flex: 1,
    alignItems: 'center',
    paddingVertical: moderateScale(8),
    backgroundColor: isFocused ? COLORS.ORANGE_LIGHT : COLORS.WHITE,
    borderRadius: moderateScale(12),
    paddingTop: 'auto',
    paddingBottom: 'auto',
  }),
  buttonText: isActive => ({
    fontFamily: 'SFPRODISPLAY-MEDIUM',
    fontSize: SIZES.TEXT.REGULAR,
    fontWeight: isActive ? '500' : '400',
    color: isActive ? COLORS.BLACK : COLORS.GRAY_ICON,
  }),
});
