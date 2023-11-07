import AsyncStorage from '@react-native-async-storage/async-storage';

const VISIT_DETAILS_KEY = 'visitTableDetails';

export const saveVisitToStorage = async visit => {
  await AsyncStorage.setItem(VISIT_DETAILS_KEY, JSON.stringify(visit));
};

export const getVisitFromStorage = async () => {
  try {
    const v = await AsyncStorage.getItem(VISIT_DETAILS_KEY);
    return JSON.parse(v);
  } catch (err) {
    console.warn('getVisitFromStorage error.', err);
  }
};

export const removeVisitFromStorage = async () => {
  try {
    await AsyncStorage.removeItem(VISIT_DETAILS_KEY);
  } catch (err) {
    console.warn('removeVisitFromStorage error.', err);
  }
};
