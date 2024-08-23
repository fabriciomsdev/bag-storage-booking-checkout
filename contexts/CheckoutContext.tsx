import React, { createContext, useContext, useState, useEffect } from "react";
import { CheckoutState, ItensClassification, Customer, Card } from "../types/checkout";
import { CheckoutService } from "../services/CheckoutService";

interface CheckoutContextProps {
  state: CheckoutState;
  addABag: () => void;
  removeABag: () => void;
  onChangeCustomerData: (data: Customer) => void;
  onChangePaymentData: (data: Card) => void;
  finishCheckout: () => void;
  wachOrder: (callback?: (data: any) => void) => void;
}

const AppConfig = {
    apiUrl: "http://localhost:4000/api",
};

const CheckoutContext = createContext<CheckoutContextProps | undefined>(undefined);


export const CheckoutProvider: React.FC = ({ children }) => {
  const [state, setState] = useState<CheckoutState>({
    storePoint: {
      id: "236584ee-58e2-42fd-a4d4-e08133bbbb6b",
      name: "Cody's Cookie Store",
    },
    possibleItemsToStore: [],
    success: false,
    loading: false,
    error: undefined,
    booking: {
      id: undefined,
      items: {
        bags: 0,
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
      totalValue: 0,
    },
  });

  const checkoutService = new CheckoutService(AppConfig.apiUrl);

  useEffect(() => {
    loadPossibleItemsToStore();
  }, []);

  useEffect(() => {
    if (state.possibleItemsToStore.length) addABag();
  }, [state.possibleItemsToStore]);

  useEffect(() => {
    startCheckout();
  }, [state.storePoint?.id]);

  const loadPossibleItemsToStore = async () => {
    const data = await checkoutService.getPossibleItemsKindToStore();

    setState((prevState) => ({
      ...prevState,
      possibleItemsToStore: data,
    }));
  };


  const calculateNewPrice = (state: CheckoutState) => {
    const storagePrice = getStoragePrice();
    state.booking.totalValue = state.booking.items.bags * storagePrice;

    return state;
  }

  const getStoragePrice = () => {
    const bagStorePrice = state.possibleItemsToStore.find(
      (item) => item.name === "Bags Storage"
    )?.valueToStore || 10;

    return bagStorePrice;
  }

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

      return calculateNewPrice(nextState);
    });
  };

  const removeABag = () => {
    setState((prevState) => {
      if (prevState.booking.items.bags === 1) return prevState;

      const nextState = {
        ...prevState,
        booking: {
          ...prevState.booking,
          items: {
            ...prevState.booking.items,
            bags: prevState.booking.items.bags - 1,
          },
        },
      };

      return calculateNewPrice(nextState);
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

  const startCheckout = async () => {
    const data = await checkoutService.start(state.storePoint);

    setState((prevState) => ({
      ...prevState,
      booking: {
        ...prevState.booking,
        id: data.id,
      },
    }));
  }

  const setAsLoading = () => {
    setState({
      ...state,
      loading: true,
    });
  }

  const finishCheckout = async () => {
    setAsLoading();
    
    if (state.booking.id) {
      const data = await checkoutService.finish(state.booking.id, state);
    }
  }

  const processOrderUpdate = (data: any) => {
    if (data.status === "booked") {
      setState((prevState) => ({
        ...prevState,
        success: true,
      }));
    }

    if (data.status === "failed") {
      setState((prevState) => ({
        ...prevState,
        success: false,
        error: data.error,
        loading: false,
      }));
    }
  }
  
  // TODO: use websockets
  const wachOrder = async (callback = processOrderUpdate) => {
    setInterval(async () => {
      if (state.booking.id) {
        const data = await checkoutService.getOrder(state.booking.id);
        callback(data);
      }
    }, 4000);
  }


  return (
    <CheckoutContext.Provider
      value={{ 
        state, 
        addABag, 
        removeABag, 
        onChangeCustomerData, 
        onChangePaymentData,
        finishCheckout,
        wachOrder
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