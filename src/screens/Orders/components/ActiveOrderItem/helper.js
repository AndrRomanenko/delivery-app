import { ORDER_STATUSES } from '../../../../constants/order';

/**
 * Function to pick up right translation key for status
 */
export const getTranslationKey = value => {
  switch (value) {
    case ORDER_STATUSES.IN_PROGRESS:
      return 'inProgress';
    case ORDER_STATUSES.WAIT_FOR_PAYMENT:
      return 'waitPayment';
    case ORDER_STATUSES.INITIALIZED:
      return 'draft';
    default:
      return value;
  }
};
