import { createApi } from '@reduxjs/toolkit/query/react';
import baseQuery from './config/baseQuery';

const tags = {
  addresses: 'addresses',
};

export const addressAPI = createApi({
  reducerPath: 'addressAPI',
  tagTypes: [tags.addresses],
  baseQuery,
  endpoints: builder => ({
    getAddresses: builder.query({
      query: () => ({
        url: 'client/addresses',
      }),
      providesTags: () => [tags.addresses],
    }),
    addAddress: builder.mutation({
      query: ({
        // id ?????
        id,
        country,
        city,
        addressLineFirst,
        addressLineSecond,
        zipCode,
      }) => ({
        url: 'client/addresses',
        method: 'POST',
        body: {
          id,
          country,
          city,
          addressLineFirst,
          addressLineSecond,
          zipCode,
        },
      }),
      invalidatesTags: [tags.addresses],
    }),
    deleteAddress: builder.mutation({
      query: id => ({
        url: `client/addresses/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [tags.addresses],
    }),
    updateAddress: builder.mutation({
      query: ({
        id,
        country,
        city,
        addressLineFirst,
        addressLineSecond,
        zipCode,
      }) => ({
        url: `client/addresses/${id}`,
        method: 'PATCH',
        body: {
          country,
          city,
          addressLineFirst,
          addressLineSecond,
          zipCode,
        },
      }),
      invalidatesTags: [tags.addresses],
    }),
  }),
});

export const {
  useGetAddressesQuery,
  useLazyGetAddressesQuery,
  useAddAddressMutation,
  useDeleteAddressMutation,
  useUpdateAddressMutation,
} = addressAPI;
