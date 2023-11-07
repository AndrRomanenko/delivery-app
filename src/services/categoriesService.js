import { createApi } from '@reduxjs/toolkit/query/react';
import baseQuery from './config/baseQuery';

const tags = {
  categories: 'categories',
  selectedCategory: 'selectedCategory',
};

export const categoriesAPI = createApi({
  reducerPath: 'categoriesAPI',
  tagTypes: [tags.categories, tags.selectedCategory],
  baseQuery,
  endpoints: builder => ({
    getCategoriesByShopId: builder.query({
      query: shopId => ({
        url: `shops/${shopId}/categories`,
      }),
      providesTags: () => [tags.categories],
    }),
    getCategoryById: builder.query({
      query: categoryId => ({
        url: `categories/${categoryId}`,
      }),
      providesTags: () => [tags.selectedCategory],
    }),
  }),
});

export const { useLazyGetCategoriesByShopIdQuery, useGetCategoryByIdQuery } =
  categoriesAPI;
