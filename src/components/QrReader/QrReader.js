import { useFocusEffect, useIsFocused } from '@react-navigation/native';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useToast } from 'react-native-toast-notifications';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { RNCamera as Camera } from 'react-native-camera';

import PageContainer from '../PageContainer';
import PageHeader from '../PageHeader';
import QrMasc from './components/QrMask/QrMasc';

import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../constants/device';
import { COLORS } from '../../constants/theme';
import { SessionContext } from '../../context/SessionContext';

const QrReader = ({ route, navigation }) => {
  const isFocused = useIsFocused();
  const toast = useToast();
  const { t: translation } = useTranslation('navigation');

  const [loading, setLoading] = useState(false);

  const {
    startInHouseSessionByQr,
    visit,
    clearTableHash,
    clearSelectedShop,
    isVisitActive,
  } = useContext(SessionContext);

  const onCodeScanned = async ({ data }) => {
    setLoading(true);
    try {
      await startInHouseSessionByQr(data);
    } catch (err) {
      toast.show(err.message);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      if (isVisitActive) {
        return;
      }
      // Always clear hash except if visit is already running.
      clearTableHash();
    }, [isVisitActive]),
  );

  useEffect(
    () =>
      navigation.addListener('beforeRemove', e => {
        if (isVisitActive || visit.tableHash) {
          // Don't clear selected shop in case user has already started the visit process.
          return;
        }
        clearSelectedShop();
      }),
    [navigation, isVisitActive, visit],
  );

  return (
    <PageContainer
      fullScreen
      header={
        <PageHeader
          title={translation(visit.shopId ? 'startVisit' : 'findLocation')}
          disableButtons={!visit.shopId}
        />
      }>
      {!isFocused || loading ? (
        <View style={styles.activityStyle}>
          <ActivityIndicator size="large" color={COLORS.BLACK} />
        </View>
      ) : (
        <Camera
          style={styles.cameraStyle}
          onBarCodeRead={!loading ? onCodeScanned : undefined}
          type={'back'}
          captureAudio={false}>
          <QrMasc />
        </Camera>
      )}
    </PageContainer>
  );
};

const styles = StyleSheet.create({
  activityStyle: {
    flex: 1,
    zIndex: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cameraStyle: {
    position: 'relative',
    top: '-12%',
    height: SCREEN_HEIGHT,
    width: SCREEN_WIDTH,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
});

export default QrReader;
