import React from 'react';
import creditCardType from 'credit-card-type';

import VisaIcon from '../../../icons/payments/visa.svg';
import MastercardIcon from '../../../icons/payments/mastercard.svg';
import GPayIcon from '../../../icons/payments/gPay.svg';
import ApplePayIcon from '../../../icons/payments/applePay.svg';

import i18n from '../../../localization/i18n';

import { PAYMENT_TYPES } from '../../../constants/payment';
import { moderateScale } from '../../../utils/scale';
import { isAndroid, isIOS } from '../../../constants/platform';

export const getPaymentMethods = cards => [
  ...cards.map(card => ({
    type: PAYMENT_TYPES.CARD,
    data: card,
    label: getCardlabel(card.number),
  })),
  {
    type: isIOS() ? PAYMENT_TYPES.APPLE_PAY : PAYMENT_TYPES.GOOGLE_PAY,
    label: isIOS() ? 'Apple Pay' : 'Google Pay',
  },
  {
    type: PAYMENT_TYPES.CASH,
    label: i18n.t('paymentMethodScreen:cash'),
  },
  {
    type: PAYMENT_TYPES.CARD,
    label: i18n.t('paymentMethodScreen:addCard'),
  },
];

export const getPaymentIcon = (type, paymentData) => {
  switch (type) {
    case PAYMENT_TYPES.APPLE_PAY:
      return <ApplePayIcon height={moderateScale(18)} width="100%" />;
    case PAYMENT_TYPES.GOOGLE_PAY:
      return <GPayIcon height={moderateScale(18)} width="100%" />;
    case PAYMENT_TYPES.APPLE_PAY:
      return <MastercardIcon height={moderateScale(16)} width="100%" />;
    case PAYMENT_TYPES.CARD:
      return getCardIcon(paymentData);
    default:
      return null;
  }
};

const getCardIcon = paymentData => {
  const type = creditCardType(paymentData?.number)[0]?.type;
  switch (type) {
    case 'visa':
      return <VisaIcon height={moderateScale(16)} width="100%" />;
    case 'mastercard':
      return <MastercardIcon height={moderateScale(18)} width="100%" />;
    default:
      return null;
  }
};

export const getCardlabel = cardNumber => {
  return `•••• ${cardNumber.slice(-4)}`;
};
