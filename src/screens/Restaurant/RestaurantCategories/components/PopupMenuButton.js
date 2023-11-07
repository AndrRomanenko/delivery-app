import React, { useState, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import Tooltip from 'react-native-walkthrough-tooltip';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useToast } from 'react-native-toast-notifications';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';

import FLogo from '../../../../icons/restaurantPage/tooltipMenu/FLogo.svg';
import CancelIcon from '../../../../icons/restaurantPage/tooltipMenu/Cancel.svg';
import WaiterIcon from '../../../../icons/restaurantPage/tooltipMenu/Waiter.svg';

import Divider from '../../../../components/common/Divider';

import useLanguageStyles from '../../../../hooks/useLanguageStyles';
import { SessionContext } from '../../../../context/SessionContext';
import { OrderContext } from '../../../../context/OrderContext';

import { useCallWaiterMutation } from '../../../../services/tableService';
import { moderateScale } from '../../../../utils/scale';
import { TOAST_TYPES } from '../../../../constants/toasts';
import { ROUTES } from '../../../../constants/navigator';
import { COLORS } from '../../../../constants/theme';

const ICON_SIZE = moderateScale(24);

const PopupMenuButton = () => {
  const toast = useToast();
  const navigation = useNavigation();

  const { languageStyles } = useLanguageStyles();
  const { t: translation } = useTranslation(['restaurantScreen', 'components']);

  const { deleteOrder, order, isOrderActive } = useContext(OrderContext);
  const {
    deleteCurrentSession,
    isInHouseSession,
    visit: { sessionId },
  } = useContext(SessionContext);

  const [callWaiter] = useCallWaiterMutation();

  const [isOpen, setIsOpen] = useState(false);

  const onCurrentOrderPress = () => {
    const params = order.id ? { sessionId } : { order };
    navigation.navigate(ROUTES.ORDERS.ROOT_STACK, {
      screen: ROUTES.ORDERS.SESSION_ORDERS_DETAILS,
      params: {
        ...params,
        resetNavigation: true,
      },
    });
  };

  const onCallAWaiter = async () => {
    try {
      await callWaiter().unwrap();
      toast.show(translation('callAWaiter.coming', { ns: 'components' }), {
        type: TOAST_TYPES.SUCCESS,
      });
    } catch (err) {
      console.warn({ err });
      if (err.status === 404) {
        toast.show(
          translation('callAWaiter.notActiveSession', { ns: 'components' }),
        );
      }
      if (err.status === 406) {
        toast.show(translation('callAWaiter.called', { ns: 'components' }), {
          type: TOAST_TYPES.SUCCESS,
        });
      }
    }
  };

  const handleOptionPress = onPress => {
    onPress && onPress();
    setIsOpen(false);
  };

  const onVisitCancel = () => {
    deleteOrder();
    deleteCurrentSession();
  };

  const options = (
    <View style={styles.optionsContainer}>
      {isOrderActive && (
        <>
          <TouchableOpacity
            style={[styles.tooltipButton, languageStyles.row]}
            onPress={() => handleOptionPress(onCurrentOrderPress)}>
            <WaiterIcon width={ICON_SIZE} />
            <View style={styles.buttonContentGap} />
            <Text style={styles.buttonText}>
              {translation('buttonCurrentOrder')}
            </Text>
          </TouchableOpacity>
          <Divider disableMargin />
        </>
      )}
      {isInHouseSession && (
        <TouchableOpacity
          style={[styles.tooltipButton, languageStyles.row]}
          onPress={() => handleOptionPress(onCallAWaiter)}>
          <WaiterIcon width={ICON_SIZE} />
          <View style={styles.buttonContentGap} />
          <Text style={styles.buttonText}>{translation('buttonWaiter')}</Text>
        </TouchableOpacity>
      )}
      <Divider disableMargin />
      <TouchableOpacity
        style={[styles.tooltipButton, languageStyles.row]}
        onPress={() => handleOptionPress(onVisitCancel)}>
        <CancelIcon width={ICON_SIZE} />
        <View style={styles.buttonContentGap} />
        <Text style={styles.buttonText}>
          {translation('buttonCompleteVisit')}
        </Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <Tooltip
      isVisible={isOpen}
      onClose={() => setIsOpen(false)}
      content={options}
      showChildInTooltip={false}
      childContentSpacing={10}
      disableShadow
      placement="top"
      backgroundColor="transparent"
      contentStyle={styles.content}
      parentWrapperStyle={styles.root}
      arrowSize={styles.arrow}>
      <TouchableOpacity onPress={() => setIsOpen(true)} style={styles.button}>
        {isOpen ? (
          <Icon name="close" size={ICON_SIZE} color={COLORS.WHITE} />
        ) : (
          <FLogo width={ICON_SIZE} />
        )}
      </TouchableOpacity>
    </Tooltip>
  );
};

const styles = StyleSheet.create({
  root: {
    position: 'absolute',
    bottom: moderateScale(16),
    right: moderateScale(16),
  },
  content: {
    padding: 0,
    backgroundColor: 'transparent',
  },
  optionsContainer: {
    backgroundColor: COLORS.WHITE,
    borderRadius: moderateScale(15),
  },
  button: {
    width: moderateScale(56),
    height: moderateScale(56),
    backgroundColor: COLORS.ORANGE,
    borderRadius: moderateScale(28),
    justifyContent: 'center',
    alignItems: 'center',
  },
  tooltipButton: {
    paddingHorizontal: moderateScale(22),
    paddingVertical: moderateScale(15),
    alignItems: 'center',
  },
  buttonContentGap: {
    width: moderateScale(15),
  },
  buttonText: {
    fontSize: moderateScale(16),
    fontWeight: '400',
    color: COLORS.TEXT.BLACK,
  },
  arrow: { width: 0, height: 0 },
});

export default PopupMenuButton;
