import auth from '@react-native-firebase/auth';
import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { COLORS, FONTS, SIZES } from '../../constants/theme';
import { OrderContext } from '../../context/OrderContext';
import { SessionContext } from '../../context/SessionContext';
import useLanguageStyles from '../../hooks/useLanguageStyles';
import LogOutIcon from '../../icons/profile/LogOutIcon.svg';
import { ROUTES } from '../../constants/navigator';

const Logout = () => {
  const navigation = useNavigation();
  const { languageStyles } = useLanguageStyles();
  const { t: translation } = useTranslation('profileScreen');
  const { deleteLocalSession } = useContext(SessionContext);
  const { deleteOrder } = useContext(OrderContext);

  const handleLogout = async () => {
    try {
      // Delete current session in case of a logout.
      deleteOrder(true);
      deleteLocalSession();
      await auth().signOut();
    } catch (err) {
      console.warn(err);
    }
  };

  return (
    <TouchableOpacity
      onPress={handleLogout}
      style={[languageStyles.row, styles.container]}>
      <View style={styles.iconContainer}>
        <LogOutIcon />
      </View>
      <View style={[styles.titleContainer, languageStyles.row]}>
        <Text style={styles.title}>{translation('logOut')}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: SIZES.PADDING.P20,
  },
  iconContainer: {
    width: '15%',
    alignItems: 'center',
  },
  titleContainer: {
    width: '85%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingBottom: 20,
  },
  title: {
    fontFamily: FONTS.REGULAR,
    fontWeight: '400',
    fontSize: SIZES.TEXT.REGULAR,
    color: COLORS.TEXT.BLACK,
  },
});

export default Logout;
