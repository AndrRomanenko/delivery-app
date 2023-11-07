import messaging from '@react-native-firebase/messaging';

export const HANDLER_TYPES = {
  FOREGROUND: 'FOREGROUND',
  BACKGROUND: 'BACKGROUND',
  QUIT: 'QUIT',
};

export async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;
  console.log('PN Authorization status:', authStatus);
  return enabled;
}
