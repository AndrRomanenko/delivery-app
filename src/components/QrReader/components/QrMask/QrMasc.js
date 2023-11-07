import React from 'react';
import { useTranslation } from 'react-i18next';
import { Text, View, StyleSheet } from 'react-native';
import { Svg, Defs, Rect, Mask } from 'react-native-svg';
import { COLORS, SIZES } from '../../../../constants/theme';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../../../constants/device';
import { isIOS } from '../../../../constants/platform';

const SvgMasc = () => {
  return (
    <Svg height="100%" width="100%">
      <Defs>
        <Mask id="mask" x="0" y="0" height="100%" width="100%">
          <Rect height="100%" width="100%" fill="#fff" />
          <Rect
            x="10%"
            y={'33%'}
            width="80%"
            height="40%"
            rx={15}
            strokeLinejoin={'round'}
            strokeWidth="2"
            strokeRadius="15"
            fill="black"
          />
        </Mask>
      </Defs>
      <Rect
        height="100%"
        width="100%"
        fill="rgba(0, 0, 0, 0.5)"
        mask="url(#mask)"
        fill-opacity="0.1"
      />
    </Svg>
  );
};

const QrMasc = () => {
  const { t: translation } = useTranslation('qrReader');
  return (
    <View style={{ width: SCREEN_WIDTH, height: SCREEN_HEIGHT }}>
      <SvgMasc />
      <View
        style={{
          width: '100%',
          position: 'absolute',
          top: isIOS() ? SCREEN_WIDTH * 0.55 : SCREEN_WIDTH * 0.4615,
          right: 0,
          bottom: 0,
          alignItems: 'center',
        }}>
        <Text style={styles.h1}> {translation('text')}</Text>
      </View>

      <View style={styles.boxContainer}>
        <View
          style={{
            height: '33.3%',
            backgroundColor: 'transparent',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <View
            style={{
              width: '16.6%',
              height: '50%',
              backgroundColor: 'transparent',
              borderTopLeftRadius: 13,
              borderColor: COLORS.ORANGE,
              borderTopWidth: 2,
              borderLeftWidth: 2,
            }}
          />
          <View
            style={{
              width: '16.6%',
              height: '50%',
              backgroundColor: 'transparent',
            }}
          />
          <View
            style={{
              width: '16.6%',
              height: '50%',
              backgroundColor: 'transparent',
              borderTopRightRadius: 13,
              borderColor: COLORS.ORANGE,
              borderTopWidth: 2,
              borderRightWidth: 2,
            }}
          />
        </View>
        <View style={{ height: '33.3%', backgroundColor: 'transparent' }} />
        <View
          style={{
            height: '33.3%',
            backgroundColor: 'transparent',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
          }}>
          <View
            style={{
              width: '16.6%',
              height: '50%',
              backgroundColor: 'transparent',
              borderBottomLeftRadius: 13,
              borderColor: COLORS.ORANGE,
              borderBottomWidth: 2,
              borderLeftWidth: 2,
            }}
          />
          <View
            style={{
              width: '16.6%',
              height: '50%',
              backgroundColor: 'transparent',
            }}
          />
          <View
            style={{
              width: '16.6%',
              height: '50%',
              backgroundColor: 'transparent',
              borderBottomRightRadius: 13,
              borderColor: COLORS.ORANGE,
              borderBottomWidth: 2,
              borderRightWidth: 2,
            }}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  h1: {
    fontFamily: 'SFPRODISPLAY-SEMIBOLDITALIC',
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  boxContainer: {
    width: '80%',
    height: '40%',
    backgroundColor: 'transparent',
    position: 'absolute',
    left: '10%',
    top: '33%',
    padding: SIZES.PADDING.P20,
    borderRadius: 13,
    flexDirection: 'column',
  },
  elements: {
    width: '100%',
    top: SCREEN_WIDTH * 0.1282,
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: SIZES.PADDING.P12,
    paddingHorizontal: SIZES.PADDING.P12,
  },
  title: {
    fontSize: SIZES.TEXT.LARGE,
    fontWeight: '600',
    color: 'black',
  },
});

export default QrMasc;
