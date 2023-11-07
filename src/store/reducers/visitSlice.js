import { createSlice } from '@reduxjs/toolkit';
import { VISIT_STATUSES, VISIT_TYPES } from '../../constants/visit';

const initialState = {
  sessionId: null,
  sessionType: null,
  tableId: null,
  shopId: null,
  guests: [],
  orders: [],
  owner: null,

  status: VISIT_STATUSES.UNINITIALIZED,
  tableHash: null,
  tableName: '',
  error: null,
  isOwner: false,
  requestIds: [],
};

const visitSlice = createSlice({
  name: 'visit',
  initialState,
  reducers: {
    setTableHash: (state, { payload }) => {
      state.tableHash = payload;
    },
    setShopId: (state, { payload }) => {
      state.shopId = payload;
    },
    setTable: (state, { payload }) => {
      state.tableId = payload.tableId;
      state.tableName = payload.tableName;
      state.tableHash = payload.tableHash;
    },
    setVisit: (state, { payload }) => {
      state.sessionId = payload.sessionId;
      state.tableId = payload.tableId;
      state.shopId = payload.shopId;
      state.guests = payload.guests;
      state.orders = payload.orders;
      state.owner = payload.owner;
      state.sessionType = payload.sessionType;

      state.status = payload.status;
      state.tableHash = payload.tableHash;
      state.tableName = payload.tableName;
      state.error = payload.error;
      state.isOwner = payload.isOwner;
      state.requestIds = payload.requestIds;
    },
    clearVisit: state => {
      state.sessionId = initialState.sessionId;
      state.tableId = initialState.tableId;
      state.shopId = initialState.shopId;
      state.guests = initialState.guests;
      state.orders = initialState.orders;
      state.owner = initialState.owner;
      state.sessionType = null;

      state.status = initialState.status;
      state.tableHash = initialState.tableHash;
      state.tableName = initialState.tableName;
      state.error = initialState.error;
      state.isOwner = initialState.isOwner;
      state.requestIds = initialState.requestIds;
    },
    // TODO: Fix naming
    onError: (state, { payload }) => {
      state.sessionId = initialState.sessionId;
      state.tableId = initialState.tableId;
      state.shopId = initialState.shopId;
      state.guests = initialState.guests;
      state.orders = initialState.orders;
      state.owner = initialState.owner;
      state.sessionType = initialState.sessionType;

      state.tableHash = initialState.tableHash;
      state.tableName = initialState.tableName;
      state.isOwner = initialState.isOwner;
      state.requestIds = initialState.requestIds;
      // Save error
      state.status = VISIT_STATUSES.FAILED;
      state.error = payload;
    },
    onTableBookingInit: state => {
      state.status = VISIT_STATUSES.LOADING;
      state.error = initialState.error;
    },
    onTableBookingRequested: state => {
      state.status = VISIT_STATUSES.REQUESTED;
    },
    onTableBookingApproved: state => {
      state.status = VISIT_STATUSES.APPROVED;
    },
    onTableBookingRejected: state => {
      state.status = VISIT_STATUSES.REJECTED;
    },
    receiveTableBookingRequest: (state, { payload }) => {
      state.requestIds = [...state.requestIds, payload];
    },
    resolveTableBookingRequest: (state, { payload }) => {
      state.requestIds = state.requestIds.filter(id => id !== payload);
    },
    // Same as on booking table, to keep logic similar for now.
    onCreateDeliveryInit: state => {
      state.status = VISIT_STATUSES.LOADING;
      state.error = initialState.error;
    },
    onCreateDeliveryApproved: state => {
      state.status = VISIT_STATUSES.APPROVED;
    },
  },
});

export const {
  setVisit,
  setTableHash,
  setShopId,
  setTable,
  clearVisit,
  onError,
  onTableBookingInit,
  onTableBookingRequested,
  onTableBookingApproved,
  onTableBookingRejected,
  receiveTableBookingRequest,
  resolveTableBookingRequest,
  onCreateDeliveryInit,
  onCreateDeliveryApproved,
} = visitSlice.actions;

export default visitSlice.reducer;
