import { createApi } from '@reduxjs/toolkit/query/react';
import baseQuery from './config/baseQuery';

const tags = {
  selectedProduct: 'selectedProduct',
};

export const productsAPI = createApi({
  reducerPath: 'productsAPI',
  tagTypes: [tags.selectedProduct],
  baseQuery,
  endpoints: builder => ({
    getProductById: builder.query({
      query: id => ({
        url: `products/${id}`,
      }),
      providesTags: () => [tags.selectedProduct],
    }),
  }),
});

export const { useGetProductByIdQuery, useLazyGetProductByIdQuery } =
  productsAPI;
