import auth from '@react-native-firebase/auth';
import {
  useFocusEffect,
  useIsFocused,
  useNavigation,
} from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StatusBar, StyleSheet, Text, View } from 'react-native';

import Address from '../../icons/profile/Address.svg';
import Personal from '../../icons/profile/Personal.svg';
import Support from '../../icons/profile/Support.svg';
import TermsConditions from '../../icons/profile/Terms&Conditions.svg';

import Avatar from '../../components/Avatar';
import LogOut from '../../components/Logout/Logout';
import ProfileButton from './components/ProfileButton/ProfileButton';

import PageContainer from '../../components/PageContainer';
import PageHeader from '../../components/PageHeader';
import { SCREEN_WIDTH } from '../../constants/device';
import { ROUTES } from '../../constants/navigator';
import { COLORS, SIZES } from '../../constants/theme';
import { useGetUserInfoQuery } from '../../services/userService';

const Profile = () => {
  const navigation = useNavigation();
  const { t: translation } = useTranslation('profileScreen');
  const [user, setUser] = useState(null);

  const focused = useIsFocused();

  const { data: userData = {} } = useGetUserInfoQuery('', {
    skip: !focused,
  });

  useFocusEffect(
    useCallback(() => {
      setUser(auth().currentUser);
    }, []),
  );

  const goToInfo = () => {
    navigation.navigate(ROUTES.PROFILE.PERSONAL_INFO);
  };

  return (
    <PageContainer
      header={<PageHeader title={translation('title')} disableButtons />}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.avatarContainer}>
        <Avatar src={userData.photo} />
      </View>
      <View style={styles.userNameContainer}>
        <Text style={styles.nameText}>{userData.fullName}</Text>
        <Text style={styles.number}>{user?.phoneNumber}</Text>
      </View>
      <ProfileButton
        icon={<Personal />}
        title={translation('personalInformation')}
        onPress={goToInfo}
      />
      <ProfileButton
        onPress={() => navigation.navigate(ROUTES.PROFILE.ADDRESS.ADDRESS_LIST)}
        icon={<Address />}
        title={translation('savedAddresses')}
      />
      <ProfileButton
        onPress={() => navigation.navigate(ROUTES.PROFILE.SUPPORT)}
        icon={<Support />}
        title={translation('support')}
      />
      <ProfileButton
        onPress={() => navigation.navigate(ROUTES.COMMON.TERMS_CONDITIONS)}
        icon={<TermsConditions />}
        title={translation('termsConditions')}
      />
      {/* TODO: Temp page for testing. Remove */}
      <ProfileButton
        icon={<TermsConditions />}
        title={translation('settingsDev')}
        onPress={() => navigation.navigate(ROUTES.PROFILE.DEVELOP_MENU)}
      />
      <LogOut />
    </PageContainer>
  );
};

const styles = StyleSheet.create({
  avatarContainer: {
    width: '100%',
    alignItems: 'center',
    paddingBottom: SIZES.PADDING.P12,
  },
  userNameContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: SCREEN_WIDTH * 0.1025,
  },
  nameText: {
    fontFamily: 'SFPRODISPLAY-SEMIBOLD',
    fontWeight: '600',
    fontSize: SIZES.TEXT.BOLD,
    color: COLORS.TEXT.BLACK,
    paddingBottom: SCREEN_WIDTH * 0.025641,
  },
  number: {
    fontFamily: 'SFPRODISPLAY-REGULAR',
    fontWeight: '600',
    fontSize: SIZES.TEXT.MEDIUM,
    color: COLORS.GRAY_ICON,
  },
});

export default Profile;
