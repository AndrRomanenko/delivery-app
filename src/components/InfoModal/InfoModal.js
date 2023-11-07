import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { isIOS } from '../../constants/platform';
import { COLORS } from '../../constants/theme';
import useLanguageStyles from '../../hooks/useLanguageStyles';
import { moderateScale } from '../../utils/scale';
import Button from '../common/Button';

const InfoModal = ({ children, route, onOutPress }) => {
  const { title, description, buttons } = route?.params || {};
  const { languageStyles } = useLanguageStyles();
  const navigation = useNavigation();

  const mapButton = (b, i) => {
    return (
      <Button
        key={i}
        style={styles.button}
        label={b.label}
        loading={b.loading}
        onPress={b.onPress || navigation.goBack}
        secondary={b.secondary}
      />
    );
  };

  return (
    <KeyboardAvoidingView
      behavior={isIOS() ? 'padding' : 'height'}
      style={styles.container}>
      <TouchableWithoutFeedback onPress={onOutPress}>
        <View style={styles.overlay} />
      </TouchableWithoutFeedback>
      <SafeAreaView edges={['bottom']} style={styles.content}>
        {children || (
          <>
            <View style={styles.textContainer}>
              <Text style={styles.title}>{title}</Text>
              <Text style={styles.description}>{description}</Text>
            </View>
            {buttons?.length && (
              <View style={[styles.buttonContainer, languageStyles.row]}>
                {buttons.map(mapButton)}
              </View>
            )}
          </>
        )}
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  overlay: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    left: 0,
    top: 0,
  },
  content: {
    paddingVertical: moderateScale(30),
    borderTopLeftRadius: moderateScale(20),
    borderTopRightRadius: moderateScale(20),
    width: '100%',
    backgroundColor: COLORS.WHITE,
  },
  textContainer: {
    paddingHorizontal: moderateScale(53),
    alignItems: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: moderateScale(16),
    color: COLORS.TEXT.BLACK,
  },
  description: {
    textAlign: 'center',
    marginTop: moderateScale(10),
    fontWeight: '500',
    fontSize: moderateScale(14),
    color: COLORS.GRAY_ICON,
  },
  buttonContainer: {
    paddingHorizontal: moderateScale(16),
    borderTopWidth: 1,
    borderColor: COLORS.GRAY,
    marginTop: moderateScale(24),
    paddingTop: moderateScale(17),
  },
  button: {
    flex: 1,
    marginHorizontal: moderateScale(6),
    marginBottom: 0,
  },
});

export default InfoModal;
