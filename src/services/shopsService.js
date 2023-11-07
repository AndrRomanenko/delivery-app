import { createApi } from '@reduxjs/toolkit/query/react';
import baseQuery from './config/baseQuery';

const tags = {
  shops: 'shops',
  selectedShop: 'selectedShop',
  shopReviews: 'shopReviews',
};

export const shopsAPI = createApi({
  reducerPath: 'shopsAPI',
  tagTypes: [tags.shops, tags.selectedShop, tags.shopReviews],
  baseQuery,
  endpoints: builder => ({
    getShops: builder.query({
      query: () => ({
        url: 'shops',
      }),
      providesTags: () => [tags.shops],
    }),
    getShopById: builder.query({
      query: id => ({
        url: `shops/${id}`,
      }),
      providesTags: () => [tags.selectedShop],
    }),
    getShopReviews: builder.query({
      query: ({ page, id }) => ({
        url: `shops/${id}/reviews`,
        params: {
          page,
        },
      }),
      providesTags: () => [tags.shopReviews],
    }),
  }),
});

export const {
  useLazyGetShopsQuery,
  useGetShopByIdQuery,
  useLazyGetShopByIdQuery,
  useLazyGetShopReviewsQuery,
} = shopsAPI;
