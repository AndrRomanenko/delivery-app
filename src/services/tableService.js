import { createApi } from '@reduxjs/toolkit/query/react';
import baseQuery from './config/baseQuery';

const tags = {
  table: 'table',
};

export const tableAPI = createApi({
  reducerPath: 'tableAPI',
  tagTypes: [tags.table],
  baseQuery,
  endpoints: builder => ({
    getTable: builder.query({
      query: qrCode => ({
        url: `tables/${qrCode}/info`,
      }),
      providesTags: () => [tags.table],
    }),
    bookTable: builder.mutation({
      query: qrCode => ({
        url: `tables/${qrCode}/book`,
        method: 'POST',
        responseHandler: async response => {
          return response.ok
            ? {
                status: response.status,
                data: await response.json(),
              }
            : response.json();
        },
      }),
      invalidatesTags: [tags.table],
    }),
    approveBooking: builder.mutation({
      query: id => ({
        url: `tables/request/${id}/approve`,
        method: 'POST',
      }),
      invalidatesTags: [tags.table],
    }),
    rejectBooking: builder.mutation({
      query: id => ({
        url: `tables/request/${id}/reject`,
        method: 'POST',
      }),
      invalidatesTags: [tags.table],
    }),
    closeSession: builder.mutation({
      query: () => ({
        url: 'tables/closeSession',
        method: 'DELETE',
      }),
      invalidatesTags: [tags.table],
    }),
    callWaiter: builder.mutation({
      query: () => ({
        url: 'tables/callWaiter',
        method: 'POST',
      }),
    }),
  }),
});

export const {
  useLazyGetTableQuery,
  useBookTableMutation,
  useApproveBookingMutation,
  useRejectBookingMutation,
  useCloseSessionMutation,
  useCallWaiterMutation,
} = tableAPI;
