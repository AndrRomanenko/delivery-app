import { createApi } from '@reduxjs/toolkit/query/react';
import baseQuery from './config/baseQuery';

const tags = {
  orders: 'orders',
  order: 'order',
};

export const ordersAPI = createApi({
  reducerPath: 'ordersAPI',
  tagTypes: [tags.orders, tags.order],
  baseQuery,
  endpoints: builder => ({
    getOrders: builder.query({
      query: ({ page, type_of_service }) => ({
        url: 'order',
        params: {
          page,
          type_of_service,
        },
      }),
      providesTags: () => [tags.orders],
    }),
    getOrderById: builder.query({
      query: id => ({
        url: `order/${id}`,
      }),
    }),
    calculateOrder: builder.mutation({
      query: ({ items, sessionType }) => ({
        url: 'order/preCheckout',
        method: 'POST',
        body: {
          items,
          sessionType,
        },
      }),
      invalidatesTags: [tags.order],
    }),
    placeOrder: builder.mutation({
      query: ({ items, sessionType, outHouseDetails }) => ({
        url: 'order/checkout',
        method: 'POST',
        body: {
          items,
          sessionType,
          outHouseDetails,
        },
      }),
      invalidatesTags: [tags.order],
    }),
    supplementOrder: builder.mutation({
      query: ({ items, sessionType, outHouseDetails }) => ({
        url: 'order/addItems',
        method: 'POST',
        body: {
          items,
          sessionType,
          outHouseDetails,
        },
      }),
      invalidatesTags: [tags.order],
    }),
    payForOrders: builder.mutation({
      query: ({ paymentMethod, cardId, ordersIds }) => ({
        url: 'order/pay',
        method: 'POST',
        body: {
          paymentMethod,
          cardId,
          ordersIds,
        },
      }),
      invalidatesTags: [tags.order],
    }),
    sendShopReview: builder.mutation({
      query: ({ orderId, review }) => {
        const { rating, message } = review;
        return {
          url: `order/${orderId}/reviews/add`,
          method: 'POST',
          body: {
            rating,
            message,
          },
        };
      },
      invalidatesTags: [tags.order],
    }),
  }),
});

export const {
  useLazyGetOrdersQuery,
  useLazyGetOrderByIdQuery,
  usePlaceOrderMutation,
  useSupplementOrderMutation,
  useCalculateOrderMutation,
  usePayForOrdersMutation,
  useSendShopReviewMutation,
} = ordersAPI;
