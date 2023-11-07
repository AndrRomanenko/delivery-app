import React from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { useToast } from 'react-native-toast-notifications';

import { SCREEN_WIDTH } from '../../constants/device';
import { COLORS, SIZES } from '../../constants/theme';
import Avatar from '../Avatar';

const ChangeAvatar = ({ avatarSrc, handleAvatarChange }) => {
  const { t: translation } = useTranslation([
    'personalInfoScreen',
    'permissions',
    'general',
  ]);

  const toast = useToast();

  const imageOptions = {
    mediaType: 'image',
    maxWidth: 300,
    maxHeight: 550,
    quality: 1,
    selectionLimit: 1,
  };

  const changePhoto = () => {
    launchImageLibrary(imageOptions, response => {
      if (response.didCancel) {
        return;
      } else if (response.errorCode === 'camera_unavailable') {
        toast.show(
          translation('camera.camera_unavailable', { ns: 'permissions' }),
        );
        return;
      } else if (response.errorCode === 'permission') {
        toast.show(translation('camera.permission', { ns: 'permissions' }));
        return;
      } else if (response.errorCode === 'others') {
        const errorMessage =
          response.errorMessage || translation('error', { ns: 'general' });
        toast.show(errorMessage);
        return;
      }
      if (response.assets) {
        handleAvatarChange(response.assets[0]);
      }
    });
  };

  return (
    <>
      <Avatar style={styles.avatar} src={avatarSrc?.uri} />
      <TouchableOpacity style={styles.buttonContainer} onPress={changePhoto}>
        {avatarSrc ? (
          <Text style={styles.buttonText}>{translation('changePhoto')}</Text>
        ) : (
          <Text style={styles.buttonText}>{translation('addPhoto')}</Text>
        )}
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatar: {
    alignSelf: 'center',
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
    marginTop: SIZES.MARGIN.M16,
    marginBottom: SCREEN_WIDTH * 0.05,
  },
  buttonText: {
    fontWeight: '500',
    fontSize: SIZES.TEXT.REGULAR,
    color: COLORS.BLUE,
    fontFamily: 'SFPRODISPLAY-MEDIUM',
  },
});

export default ChangeAvatar;
