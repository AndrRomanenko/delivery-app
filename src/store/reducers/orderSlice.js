import { createSlice } from '@reduxjs/toolkit';
import { ORDER_STATUSES } from '../../constants/order';

const initialState = {
  appliedOffers: [],
  createdAt: null,
  discount: null,
  id: null,
  sessionId: null,
  items: [],
  resultPrice: null,
  status: ORDER_STATUSES.UNINITIALIZED,
  shop: null,
  table: null,
  error: null,

  // For dellivery/take-away
  outHouseDetails: {
    type: null,
    address: {
      id: null,
      formatted: null,
    },
    deliveryTime: null,
  },
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    setOrder: (state, { payload }) => {
      state.appliedOffers = payload.appliedOffers;
      state.createdAt = payload.createdAt;
      state.discount = payload.discount;
      state.id = payload.id;
      state.sessionId = payload.sessionId;
      state.items = payload.items;
      state.resultPrice = payload.resultPrice;
      state.status = payload.status;
      state.table = payload.table;
      state.shop = payload.shop;
      // Backend just gives us 'null' for precheckout.
      state.outHouseDetails =
        payload.outHouseDetails || initialState.outHouseDetails;
    },
    deleteOrder: state => {
      state.appliedOffers = initialState.appliedOffers;
      state.createdAt = initialState.createdAt;
      state.discount = initialState.discount;
      state.id = initialState.initialState;
      state.sessionId = initialState.sessionId;
      state.items = initialState.items;
      state.resultPrice = initialState.resultPrice;
      state.status = initialState.status;
      state.table = initialState.table;
      state.shop = initialState.shop;
      state.error = initialState.error;
      state.outHouseDetails = initialState.outHouseDetails;
    },
    setOrderServiceType: (state, { payload }) => {
      state.outHouseDetails.type = payload;
    },
    setOrderAddressId: (state, { payload }) => {
      state.outHouseDetails.address.id = payload;
    },
    setOrderDeliveryTime: (state, { payload }) => {
      state.outHouseDetails.deliveryTime = payload;
    },
  },
});

export const {
  setOrder,
  deleteOrder,
  setOrderServiceType,
  setOrderAddressId,
  setOrderDeliveryTime,
} = orderSlice.actions;

export default orderSlice.reducer;
