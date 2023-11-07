import { createApi } from '@reduxjs/toolkit/query/react';
import { isAndroid } from '../constants/platform';
import baseQuery from './config/baseQuery';

const tags = {
  user: 'user',
};

export const userAPI = createApi({
  reducerPath: 'userAPI',
  tagTypes: [tags.user],
  baseQuery,
  endpoints: builder => ({
    getUserInfo: builder.query({
      query: () => ({
        url: 'client/profile',
      }),
      keepUnusedDataFor: 0,
      providesTags: () => [tags.user],
    }),
    updateUserInfo: builder.mutation({
      query: userData => {
        const { fullName, email, birthDay, subscribedToMarketingInfo } =
          userData;

        return {
          url: 'client/profile',
          method: 'PATCH',
          body: { fullName, email, birthDay, subscribedToMarketingInfo },
        };
      },
      invalidatesTags: [tags.user],
    }),
    updateUserPhoto: builder.mutation({
      query: file => {
        const data = new FormData();
        data.append('photo', {
          name: file.fileName,
          type: file.type,
          uri: isAndroid ? file.uri : file.uri.replace('file://', ''),
        });

        return {
          url: 'client/profile/photo',
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          method: 'POST',
          body: data,
        };
      },
      providesTags: [tags.user],
    }),
    saveDeviceToken: builder.mutation({
      query: tokenData => ({
        url: 'client/fcmToken',
        method: 'POST',
        body: tokenData,
      }),
      invalidatesTags: [tags.user],
    }),
    getPaymentCardsList: builder.query({
      query: () => ({
        url: 'client/payment_card',
      }),
      providesTags: () => [tags.user],
    }),
  }),
});

export const {
  useLazyGetUserInfoQuery,
  useGetUserInfoQuery,
  useUpdateUserInfoMutation,
  useUpdateUserPhotoMutation,
  useSaveDeviceTokenMutation,
  useGetPaymentCardsListQuery,
} = userAPI;
