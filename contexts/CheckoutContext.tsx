import React, { createContext, useContext, useState, useEffect } from "react";
import { CheckoutState, ItensClassification, Customer, Card } from "../types/checkout";
import { CheckoutService } from "../services/CheckoutService";

interface CheckoutContextProps {
  state: CheckoutState;
  addABag: () => void;
  removeABag: () => void;
  onChangeCustomerData: (data: Customer) => void;
  onChangePaymentData: (data: Card) => void;
}

const AppConfig = {
    apiUrl: "http://localhost:4000/api",
};

const CheckoutContext = createContext<CheckoutContextProps | undefined>(undefined);


export const CheckoutProvider: React.FC = ({ children }) => {
  const [state, setState] = useState<CheckoutState>({
    id: "1",
    userId: "1",
    storePoint: {
      id: "1x",
      name: "Cody's Cookie Store",
    },
    possibleItemsToStore: [],
    booking: {
      items: {
        bags: 1,
      },
      customer: {
        name: "Cody",
        email: "fabricioms.dev@gmail.com",
      },
      storePoint: {
        id: "1x",
        name: "Cody's Cookie Store",
      },
      paymentOrder: {
        kind: "creditCard",
        card: {
          number: "1234 5678 9012 3456",
          cvv: "123",
          expiration: "12/23",
        },
      },
      totalValue: 100,
    },
  });

  const checkoutService = new CheckoutService(AppConfig.apiUrl);

  useEffect(() => {
    loadPossibleItemsToStore();
  }, []);

  const loadPossibleItemsToStore = async () => {
    const data = await checkoutService.getPossibleItemsKindToStore();

    setState((prevState) => ({
      ...prevState,
      possibleItemsToStore: data,
    }));
  };

  const addABag = () => {
    setState((prevState) => {
      const nextState = {
        ...prevState,
        booking: {
          ...prevState.booking,
          items: {
            ...prevState.booking.items,
            bags: prevState.booking.items.bags + 1,
          },
        },
      };

      const bagStorePrice = prevState.possibleItemsToStore.find(
        (item) => item.name === "Bags Storage"
      )?.valueToStore || 10;

      nextState.booking.totalValue = nextState.booking.items.bags * bagStorePrice;

      return nextState;
    });
  };

  const removeABag = () => {
    setState((prevState) => {
      if (prevState.booking.items.bags === 1) return prevState;

      return {
        ...prevState,
        booking: {
          ...prevState.booking,
          items: {
            ...prevState.booking.items,
            bags: prevState.booking.items.bags - 1,
          },
        },
      };
    });
  };

  const onChangeCustomerData = (data: Customer) => {
    setState((prevState) => ({
      ...prevState,
      booking: {
        ...prevState.booking,
        customer: data,
      },
    }));
  };

  const onChangePaymentData = (data: Card) => {
    setState((prevState) => ({
      ...prevState,
      booking: {
        ...prevState.booking,
        paymentOrder: {
          ...prevState.booking.paymentOrder,
          card: data,
        },
      },
    }));
  };

  return (
    <CheckoutContext.Provider
      value={{ 
        state, 
        addABag, 
        removeABag, 
        onChangeCustomerData, 
        onChangePaymentData 
      }}
    >
      {children}
    </CheckoutContext.Provider>
  );
};

export const useCheckout = () => {
  const context = useContext(CheckoutContext);
  if (!context) {
    throw new Error("useCheckout must be used within a CheckoutProvider");
  }
  return context;
};