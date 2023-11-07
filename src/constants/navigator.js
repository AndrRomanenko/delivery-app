export const TAB_BAR_SPACING = 87;

let container = null;

export const setContainer = c => {
  container = c.current;
};

export const ROUTES = {
  AUTH: {
    ROOT: 'Auth',
    INFO: 'Info',
    CONFIRMATION: 'Confirmation',
  },
  HOME: {
    ROOT_STACK: 'HomeStack',
    ROOT: 'Home',
  },
  VISIT: {
    STATUS_MODAL: 'VisitStatusModal',
    NEW_GUEST_MODAL: 'NewGuestModal',
  },
  ORDERS: {
    ROOT_STACK: 'Orders',
    ROOT_TAB: 'OrdersList',
    SESSION_ORDERS_DETAILS: 'sessionOrdersDetails',
    DELIVERY_DETAILS: 'DeliveryDetails',
    NEW_ADDRESS: 'NewAddress',
    FEEDBACK_MODAL: 'FeedbackModal',
    ORDERS_LIST: {
      ALL: 'All',
      DINE_IN: 'DineIn',
      DELIVERY: 'Delivery',
      TAKE_AWAY: 'TakeAway',
    },
    PAYMENT: {
      ROOT: 'PaymentItemsList',
      PAYMENT_ITEMS_LIST: 'PaymentItemsList',
      TIPS: 'Tips',
      INVOICE: 'Invoice',
      PAYMENT_METHOD: 'PaymentMethod',
      CARD_DETAILS: 'CardDetails',
      PAYMENT_FRAME: 'PaymentFrame',
      PAYMENT_STATUS: 'PaymentStatusModal',
    },
  },
  RESTAURANT: {
    ROOT: 'Restaurants',
    RESTAURANT_CATEGORIES: 'RestaurantCategories',
    RESTAURANT_QR: 'RestaurantQRScanner',
    RESTAURANT_DETAILS: 'RestaurantDetails',
    CATEGORY_MENU: 'CategoryMenu',
    SESSION_TYPE_MODAL: 'SessionTypeModal',
  },
  LOCATION: {
    ROOT: 'LocationRestaurants',
    QR: 'LocationQRScanner',
  },
  PROFILE: {
    ROOT: 'ProfileRoot',
    CREATE_PROFILE: 'CreateProfile',
    PROFILE: 'Profile',
    PERSONAL_INFO: 'PersonalInfo',
    DEVELOP_MENU: 'ProfileDev',
    SUPPORT: 'Support',
    ADDRESS: {
      ROOT: 'AddressList',
      ADDRESS_LIST: 'AddressList',
      ADDRESS_INFO: 'AddressInfo',
      REMOVAL_MODAL: 'AddressRemovalModal',
    },
  },
  COMMON: {
    CHANGE_PHONE: 'ChangePhone',
    TERMS_CONDITIONS: 'TermsAndConditions',
    CONFIRM_PHONE: 'ConfirmPhone',
    INFO_MODAL: 'InfoModal',
  },
};

/**
 * List of screens where bottom nav bar should be hidden
 */
export const DISABLED_BOTTOM_NAV_SCREENS = [
  ROUTES.RESTAURANT.RESTAURANT_DETAILS,
  ROUTES.RESTAURANT.SESSION_TYPE_MODAL,
  ROUTES.ORDERS.SESSION_ORDERS_DETAILS,
  ROUTES.ORDERS.DELIVERY_DETAILS,
  ROUTES.ORDERS.NEW_ADDRESS,
  ROUTES.ORDERS.FEEDBACK_MODAL,
  ROUTES.PROFILE.PERSONAL_INFO,
  ROUTES.PROFILE.SUPPORT,
  ROUTES.PROFILE.ADDRESS.ADDRESS_LIST,
  ROUTES.PROFILE.ADDRESS.ADDRESS_INFO,
  ROUTES.PROFILE.ADDRESS.REMOVAL_MODAL,
  ...Object.values(ROUTES.ORDERS.PAYMENT),
];

export const dispatchNavigation = (routeName, params) => {
  container.navigate(routeName);
};

export const getActiveRoute = () => container?.getCurrentRoute();
