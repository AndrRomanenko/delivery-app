import React from 'react';

import OrdersIcon from '../../icons/common/orders.svg';
import OrdersActiveIcon from '../../icons/common/ordersActive.svg';
import ListIcon from '../../icons/common/list.svg';
import ListActiveIcon from '../../icons/common/listActive.svg';
import ProfileIcon from '../../icons/common/profile.svg';
import ProfileActiveIcon from '../../icons/common/profileActive.svg';

import { ROUTES } from '../../constants/navigator';

/**
 * Can't perform single icon color change because of wierd SVG markup
 *  TODO: To refactor in future...
 */
export const getRouteIcon = (routeName, isActive) => {
  switch (routeName) {
    case ROUTES.RESTAURANT.ROOT:
      return isActive ? (
        <ListActiveIcon width="100%" height="100%" />
      ) : (
        <ListIcon width="100%" height="100%" />
      );
    case ROUTES.ORDERS.ROOT_STACK:
      return isActive ? (
        <OrdersActiveIcon width="100%" height="100%" />
      ) : (
        <OrdersIcon width="100%" height="100%" />
      );
    case ROUTES.PROFILE.ROOT:
      return isActive ? (
        <ProfileActiveIcon width="100%" height="100%" />
      ) : (
        <ProfileIcon width="100%" height="100%" />
      );
  }
};
