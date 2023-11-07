// Clean isReqired validation

import i18n from '../localization/i18n';

export const requiredValidation = {
  required: 'This field is required',
};

// First name and last name validation
export const fullNameValidation = {
  required: i18n.t('validation:requiredField'),
  minLength: {
    value: 5,
    message: i18n.t('validation:minimumSymbols', { value: 5 }),
  },
  maxLength: {
    value: 50,
    message: i18n.t('validation:maximumSymbols', { value: 50 }),
  },
  pattern: {
    value: /^[A-Za-z\u0590-\u05FF\u0600-\u06FF\u0750-\u077F0-9 ]+$/i,
    message: i18n.t('validation:invalidFormat'),
  },
};

// Phone validation
export const phoneValidation = {
  pattern: {
    value: /^\+?\d+$/,
    message: i18n.t('validation:invalidFormat'),
  },
  minLength: {
    value: 12,
    message: i18n.t('validation:minimumSymbols', { value: 12 }),
  },
  maxLength: {
    value: 14,
    message: i18n.t('validation:maximumSymbols', { value: 14 }),
  },
};

// Email validation (check requirements)
export const emailValidation = {
  pattern: {
    value: /^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})$/,
    message: i18n.t('validation:wrongEmailFormat'),
  },
};

// BANK CARD SECTION ===============
export const cardNumberValidation = {
  required: i18n.t('validation:requiredField'),
  pattern: {
    value: /^([0-9]{4}[\s]?){3}([0-9]{4})$/,
    message: i18n.t('validation:wrongCardNumberFormat'),
  },
};

export const cardCvvValidation = {
  required: i18n.t('validation:requiredField'),
  pattern: {
    value: /^([0-9]{3})$/,
    message: i18n.t('validation:wrongCVVFormat'),
  },
};

export const cardDateValidation = {
  required: i18n.t('validation:requiredField'),
  pattern: {
    value: /^(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})$/,
    message: i18n.t('validation:wrongFormat'),
  },
};

export const birthdayValidation = {};
