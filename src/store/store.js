import { configureStore } from '@reduxjs/toolkit';
import { addressAPI } from '../services/addressService';
import { categoriesAPI } from '../services/categoriesService';
import { deliveryAPI } from '../services/deliveryService';
import { ordersAPI } from '../services/ordersService';
import { productsAPI } from '../services/productService';
import { sessionAPI } from '../services/sessionService';
import { shopsAPI } from '../services/shopsService';
import { tableAPI } from '../services/tableService';
import { userAPI } from '../services/userService';

import orderSlice from './reducers/orderSlice';
import visitSlice from './reducers/visitSlice';

export const store = configureStore({
  reducer: {
    visit: visitSlice,
    order: orderSlice,
    [shopsAPI.reducerPath]: shopsAPI.reducer,
    [tableAPI.reducerPath]: tableAPI.reducer,
    [userAPI.reducerPath]: userAPI.reducer,
    [categoriesAPI.reducerPath]: categoriesAPI.reducer,
    [productsAPI.reducerPath]: productsAPI.reducer,
    [ordersAPI.reducerPath]: ordersAPI.reducer,
    [deliveryAPI.reducerPath]: deliveryAPI.reducer,
    [addressAPI.reducerPath]: addressAPI.reducer,
    [sessionAPI.reducerPath]: sessionAPI.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware()
      .concat(shopsAPI.middleware)
      .concat(tableAPI.middleware)
      .concat(userAPI.middleware)
      .concat(productsAPI.middleware)
      .concat(categoriesAPI.middleware)
      .concat(ordersAPI.middleware)
      .concat(deliveryAPI.middleware)
      .concat(addressAPI.middleware)
      .concat(sessionAPI.middleware),
});

export default store;
