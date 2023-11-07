import React from 'react';
import { useTranslation } from 'react-i18next';
import { TouchableOpacity } from 'react-native';
import { useToast } from 'react-native-toast-notifications';

import CallWaiter from '../../../icons/restaurantPage/CallAWaiter.svg';

import { useCallWaiterMutation } from '../../../services/tableService';

import { TOAST_TYPES } from '../../../constants/toasts';
import { STYLES } from '../../../constants/theme';

const CallAWaiter = () => {
  const toast = useToast();
  const { t: translation } = useTranslation('components', {
    keyPrefix: 'callAWaiter',
  });

  const [callWaiter, { isFetching }] = useCallWaiterMutation();

  const handlePress = async () => {
    try {
      await callWaiter().unwrap();
      toast.show(translation('coming'), { type: TOAST_TYPES.SUCCESS });
    } catch (err) {
      console.log({ err });
      if (err.status === 404) {
        toast.show(translation('notActiveSession'));
      }
      if (err.status === 406) {
        toast.show(translation('called'), { type: TOAST_TYPES.SUCCESS });
      }
    }
  };

  return (
    <TouchableOpacity
      style={STYLES.shadow}
      onPress={!isFetching && handlePress}>
      <CallWaiter />
    </TouchableOpacity>
  );
};

export default CallAWaiter;
