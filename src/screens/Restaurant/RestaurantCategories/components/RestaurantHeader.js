import {
  CommonActions,
  useIsFocused,
  useNavigation,
} from '@react-navigation/native';
import React, { useEffect } from 'react';
import {
  InteractionManager,
  SafeAreaView,
  StyleSheet,
  View,
} from 'react-native';

import GoBackHeaderButton from '../../../../components/common/GoBackHeaderButton';

import useLanguageStyles from '../../../../hooks/useLanguageStyles';

import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { ROUTES } from '../../../../constants/navigator';
import { SessionContext } from '../../../../context/SessionContext';

const RestaurantHeader = () => {
  const { languageStyles } = useLanguageStyles();
  const navigation = useNavigation();
  const { isVisitActive, visit, deleteCurrentSession } =
    useContext(SessionContext);
  const { t: translation } = useTranslation('restaurantScreen');
  const isFocused = useIsFocused();

  const goToList = () => {
    // Handle case when navigation changed after visit finished.
    navigation.dispatch(state => {
      const hasHomeRoute = state.routes.some(
        r => r.name === ROUTES.LOCATION.ROOT,
      );
      if (!hasHomeRoute) {
        return CommonActions.reset({
          index: 0,
          routes: [
            {
              name: ROUTES.LOCATION.ROOT,
            },
            ...state.routes,
          ],
        });
      }
    });
    InteractionManager.runAfterInteractions(() => {
      navigation.pop();
      navigation.navigate(ROUTES.LOCATION.ROOT);
    });
  };

  const onCloseSesssionAndGoBack = async () => {
    // Need to update modal loading state - since it's static currently no ideas how to make it better. PS - definitely not the best solution.
    persistModal(true);
    try {
      await deleteCurrentSession();
      goToList();
    } catch (err) {
      console.warn(err);
    }
    persistModal(false);
  };

  const persistModal = loading => {
    navigation.navigate(ROUTES.COMMON.INFO_MODAL, {
      title: translation('confirmationTitle'),
      description: translation('confirmationDescription'),
      buttons: [
        {
          label: translation('cancel'),
          secondary: true,
        },
        {
          label: translation('confirm'),
          onPress: onCloseSesssionAndGoBack,
          loading,
        },
      ],
    });
  };

  const onTryGoBack = e => {
    if (!isVisitActive || !isFocused) {
      return e || goToList();
    }
    e?.preventDefault();
    persistModal();
  };

  useEffect(() => {
    navigation.addListener('beforeRemove', onTryGoBack);
    return function () {
      navigation.removeListener('beforeRemove', onTryGoBack);
    };
  }, [navigation, isVisitActive, visit, isFocused]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.buttonsContainer, languageStyles.row]}>
        <View>
          <GoBackHeaderButton onPress={() => onTryGoBack()} />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  buttonsContainer: {
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    zIndex: 1,
  },
});

export default RestaurantHeader;
