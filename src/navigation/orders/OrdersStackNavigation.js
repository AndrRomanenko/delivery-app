import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import CardDetails from '../../screens/Payment/CardDetails/CardDetails';
import PaymentItemsList from '../../screens/Payment/PaymentItemsList';
import PaymentMethod from '../../screens/Payment/PaymentMethod';
import Tips from '../../screens/Payment/Tips';

import { MODAL_CONFIG } from '..';
import { ROUTES } from '../../constants/navigator';
import DeliveryDetails from '../../screens/Delivery/DeliveryDetails';
import SessionOrdersDetails from '../../screens/Order/SessionOrdersDetails';
import PaymentStatusModal from '../../screens/Payment/components/PaymentStatusModal';
import Invoice from '../../screens/Payment/Invoice';
import PaymentFrame from '../../screens/Payment/PaymentFrame';
import AddressInfo from '../../screens/Profile/Address/AddressInfo';
import { OrdersTabNavigation } from './OrdersTabNavigation';
import FeedbackModal from '../../screens/Order/components/FeedbackModal';

const Stack = createStackNavigator();

export function OrdersStackNavigation() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name={ROUTES.ORDERS.ROOT_TAB}
        component={OrdersTabNavigation}
      />
      <Stack.Screen
        name={ROUTES.ORDERS.SESSION_ORDERS_DETAILS}
        component={SessionOrdersDetails}
      />
      <Stack.Screen
        name={ROUTES.ORDERS.DELIVERY_DETAILS}
        component={DeliveryDetails}
      />
      <Stack.Screen name={ROUTES.ORDERS.NEW_ADDRESS} component={AddressInfo} />
      <Stack.Screen
        name={ROUTES.ORDERS.PAYMENT.PAYMENT_ITEMS_LIST}
        component={PaymentItemsList}
      />
      <Stack.Screen name={ROUTES.ORDERS.PAYMENT.TIPS} component={Tips} />
      <Stack.Screen name={ROUTES.ORDERS.PAYMENT.INVOICE} component={Invoice} />
      <Stack.Screen
        name={ROUTES.ORDERS.PAYMENT.PAYMENT_METHOD}
        component={PaymentMethod}
      />
      <Stack.Screen
        name={ROUTES.ORDERS.PAYMENT.CARD_DETAILS}
        component={CardDetails}
      />
      <Stack.Screen
        name={ROUTES.ORDERS.PAYMENT.PAYMENT_FRAME}
        component={PaymentFrame}
        options={{
          presentation: 'modal',
        }}
      />
      <Stack.Screen
        name={ROUTES.ORDERS.PAYMENT.PAYMENT_STATUS}
        component={PaymentStatusModal}
        options={{ ...MODAL_CONFIG, gestureEnabled: false }}
      />
      <Stack.Screen
        name={ROUTES.ORDERS.FEEDBACK_MODAL}
        component={FeedbackModal}
        options={{ ...MODAL_CONFIG, gestureEnabled: false }}
      />
    </Stack.Navigator>
  );
}
