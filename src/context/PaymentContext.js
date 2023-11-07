import React, { useEffect, useState } from 'react';
import { PAYMENT_TYPES } from '../constants/payment';
import { useGetPaymentCardsListQuery } from '../services/userService';
import secureStorage from '../utils/secureStorage';

const PaymentContext = React.createContext();
const CARDS_KEY = 'cards';
const SELECTED_PAYMENT_KEY = 'selectedPayment';

const PaymentProvider = ({ children }) => {
  const [lastPayment, setLastPayment] = useState(undefined);

  const { currentData: cards = [], isFetching } = useGetPaymentCardsListQuery({
    refetchOnMountOrArgChange: true,
  });

  useEffect(() => {
    retrieveSelectedPayment();
  }, []);

  const retrieveSelectedPayment = async () => {
    const savedPayment = await secureStorage.getItem(SELECTED_PAYMENT_KEY);
    setLastPayment(savedPayment);
  };

  const addBankCard = async card => {
    // Set as card as active
    await secureStorage.addItem(SELECTED_PAYMENT_KEY, {
      type: PAYMENT_TYPES.CARD,
      data: card,
    });

    // Save card to list
    await secureStorage.addItem(CARDS_KEY, [...cards, card]);
    retrieveSelectedPayment();
  };

  const clearPaymentData = async () => {
    await secureStorage.removeItem(CARDS_KEY);
    await secureStorage.removeItem(SELECTED_PAYMENT_KEY);
  };

  const setSelectedPayment = async card => {
    await secureStorage.addItem(SELECTED_PAYMENT_KEY, card);
    retrieveSelectedPayment();
  };

  const clearSelectedPayment = async () => {
    await secureStorage.removeItem(SELECTED_PAYMENT_KEY);
    retrieveSelectedPayment();
  };

  return (
    <PaymentContext.Provider
      value={{
        cards,
        lastPayment,
        addBankCard,
        clearPaymentData,
        setSelectedPayment,
        clearSelectedPayment,
      }}>
      {children}
    </PaymentContext.Provider>
  );
};

export { PaymentContext, PaymentProvider };
