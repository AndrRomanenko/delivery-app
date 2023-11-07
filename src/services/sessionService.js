import { createApi } from '@reduxjs/toolkit/query/react';
import baseQuery from './config/baseQuery';

const tags = {
  session: 'session',
};

export const sessionAPI = createApi({
  reducerPath: 'sessionAPI',
  tagTypes: [tags.session],
  // Important to drop cache here (we're jumping between sessions)
  keepUnusedDataFor: 0,
  baseQuery,
  endpoints: builder => ({
    getCurrentSession: builder.query({
      query: () => ({
        url: 'shoppingSession/current',
      }),
      providesTags: () => [tags.session],
    }),
    getSessionDetailsById: builder.query({
      query: shoppingSessionId => ({
        url: `shoppingSession/${shoppingSessionId}`,
      }),
      providesTags: () => [tags.session],
    }),
  }),
});

export const {
  useLazyGetCurrentSessionQuery,
  useGetSessionDetailsByIdQuery,
  useLazyGetSessionDetailsByIdQuery,
} = sessionAPI;
