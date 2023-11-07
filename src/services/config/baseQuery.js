import auth from '@react-native-firebase/auth';
import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getI18n } from 'react-i18next';
import { BASE_URL } from '@env';

/**
 * General config for query
 */
export default fetchBaseQuery({
  baseUrl: BASE_URL,
  prepareHeaders: async headers => {
    const token = await auth().currentUser.getIdToken();

    headers.set('Accept-Language', getI18n().language);
    headers.set('Authorization', `Bearer ${token}`);
    return headers;
  },
});
