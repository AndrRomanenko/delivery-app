import dayjs from 'dayjs';
import { getI18n } from 'react-i18next';

/**
 * Converts data array into array of objects
 * { period, data: [], totalPrice} grouped by month
 */
export const groupOrderByMonths = (dataArr, locale = 'en') => {
  const groups = dataArr.reduce((r, o) => {
    const period = dayjs(o.createdAt)
      .locale(getI18n().language)
      .format('MMMM YYYY');

    if (r[period]) {
      r[period].data.push(o);
      r[period].totalPrice += o.resultPrice;
    } else {
      r[period] = { period, data: [o], totalPrice: o.resultPrice };
    }

    return r;
  }, {});

  return Object.keys(groups).map(k => groups[k]);
};
