import EncryptedStorage from 'react-native-encrypted-storage';

const addItem = async (key, item) => {
  try {
    await EncryptedStorage.setItem(key, JSON.stringify(item));
  } catch (err) {
    console.warn(err);
  }
};

const getItem = async key => {
  try {
    const data = await EncryptedStorage.getItem(key);
    return data ? JSON.parse(data) : undefined;
  } catch (err) {
    console.warn(err);
  }
};

const removeItem = async key => {
  try {
    await EncryptedStorage.removeItem(key);
  } catch (err) {
    console.warn(err);
  }
};

const secureStorage = {
  addItem,
  getItem,
  removeItem,
};

export default secureStorage;
