import { createApi } from '@reduxjs/toolkit/query/react';
import baseQuery from './config/baseQuery';

const tags = {
  delivery: 'delivery',
};

export const deliveryAPI = createApi({
  reducerPath: 'deliveryAPI',
  tagTypes: [tags.delivery],
  baseQuery,
  keepUnusedDataFor: 0,
  endpoints: builder => ({
    createDelivery: builder.mutation({
      query: shopId => ({
        url: `out_house/${shopId}/create`,
        method: 'POST',
      }),
    }),
    deleteDelivery: builder.mutation({
      query: () => ({
        url: 'out_house/closeCurrentSession',
        method: 'POST',
      }),
    }),
  }),
});

export const { useCreateDeliveryMutation, useDeleteDeliveryMutation } =
  deliveryAPI;
