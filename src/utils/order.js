import AsyncStorage from '@react-native-async-storage/async-storage';

const ORDER_KEY = 'currentOrder';

export const saveOrderToStorage = async order => {
  await AsyncStorage.setItem(ORDER_KEY, JSON.stringify(order));
};

export const getOrderFromStorage = async () => {
  try {
    const v = await AsyncStorage.getItem(ORDER_KEY);
    return JSON.parse(v);
  } catch (err) {
    console.warn('getOrderFromStorage error.', err);
  }
};

export const removeOrderFromStorage = async () => {
  try {
    await AsyncStorage.removeItem(ORDER_KEY);
  } catch (err) {
    console.warn('removeOrderFromStorage error.', err);
  }
};

/**
 * Prepare price to avoid JS decimal calculation issues
 */
export const validatePrice = price =>
  (Math.round(price * Math.pow(10, 2)) / Math.pow(10, 2)).toFixed(2);

// TODO: ...
const DEFAULT_CURRENCY = '$';

export const getValidPrice = (sum, { modifierPrice } = {}) => {
  const positiveSign = modifierPrice ? '+' : '';
  const resultSign = sum < 0 ? '-' : positiveSign;
  const resultSum = validatePrice(Math.abs(sum));
  return `${resultSign}${DEFAULT_CURRENCY}${resultSum}`;
};

export const getFormattedProductWeight = weight => {
  if (typeof weight === 'object') {
    const { value, measureUnit } = weight;

    if (measureUnit === 'grams') {
      return value < 1000 ? `${value}g` : `${value / 1000}kg`;
    } else {
      return value < 1000 ? `${value}ml` : `${value / 1000}l`;
    }
  }
  return weight < 1000 ? `${weight}g` : `${weight / 1000}kg`;
};
