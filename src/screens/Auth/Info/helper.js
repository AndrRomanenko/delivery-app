/**
 * Check and provide phone with "+" if needed
 */
export const checkPhone = value =>
  value && value[0] === '+' ? value : `+${value}`;
