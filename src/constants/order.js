export const ORDER_STATUSES = {
  // UI statuses
  UNINITIALIZED: 'uninitialized',
  INITIALIZED: 'initialized',
  //
  LOADING: 'loading',
  CREATED: 'created',
  IN_PROGRESS: 'in_progress',
  COMPLETED: 'completed',
  WAIT_FOR_PAYMENT: 'wait_payment',
  CANCELED: 'canceled',
  PENDING: 'pending',
};

export const ORDER_DINE_IN_STATUSES = {};

export const ORDER_DELIVERY_STATUSES = {};

export const ORDER_TAKE_AWAY_STATUSES = {};

/**
 * Service types for orders lists
 */
export const ORDER_SERVICE_TYPES = {
  DINE_IN: 'in_house',
  DELIVERY: 'delivery',
  TAKE_AWAY: 'take_away',
};

export const ORDER_PICKUP_TIME_TYPES = {
  ASAP: 'asap',
  PARTICULAR: 'particular',
};
