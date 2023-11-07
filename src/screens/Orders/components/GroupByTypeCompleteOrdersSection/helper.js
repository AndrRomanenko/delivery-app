import { ORDER_SERVICE_TYPES } from '../../../../constants/order';

/**
 * @return [type: string, data: array]
 */
export const groupOrderByType = data => {
  const initialReduceValue = Object.values(ORDER_SERVICE_TYPES).reduce(
    (accum, orderType) => {
      accum[orderType] = [];
      return accum;
    },
    {},
  );

  const groups = data.reduce((accum, order) => {
    const type = order.outHouseDetails?.type || 'in_house';
    if (type) {
      accum[type].push(order);
    }
    return accum;
  }, initialReduceValue);

  return Object.entries(groups);
};
