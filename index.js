import 'react-native-gesture-handler';
import { AppRegistry, LogBox, Text } from 'react-native';
import React from 'react';
import 'intl';
import 'intl/locale-data/jsonp/en';
import App from './src/App';
import { name as appName } from './app.json';
import './src/localization/i18n';
import { FONTS } from './src/constants/theme';

const oldTextRender = Text.render;

Text.render = function (...args) {
  const origin = oldTextRender.call(this, ...args);
  const children = origin.props.children;

  if (typeof children === 'object') {
    return React.cloneElement(origin, {
      children: React.cloneElement(children, {
        style: [{ fontFamily: FONTS.REGULAR }, children.props.style],
      }),
    });
  }

  return React.cloneElement(origin, {
    style: [{ fontFamily: FONTS.REGULAR }, origin.props.style],
  });
};

LogBox.ignoreAllLogs();

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);

AppRegistry.registerComponent(appName, () => App);
