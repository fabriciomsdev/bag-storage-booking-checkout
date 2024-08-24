import React, { createContext, useContext, useState, useEffect } from "react";
import { CheckoutState, ItensClassification, Customer, Card } from "../types/checkout";
import { CheckoutService } from "../services/CheckoutService";
import { Socket, Channel } from "phoenix";

interface CheckoutContextProps {
  state: CheckoutState;
  addABag: () => void;
  removeABag: () => void;
  onChangeCustomerData: (data: Customer) => void;
  onChangePaymentData: (data: Card) => void;
  finishCheckout: () => void;
  wachOrderUpdates: (callback?: (data: any) => void) => void;
  restartCheckout: () => void;
}

const AppConfig = {
    apiUrl: "http://localhost:4000/api",
};

const CheckoutContext = createContext<CheckoutContextProps | undefined>(undefined);

const pureState = () => ({
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
  } as CheckoutState)


export const CheckoutProvider: React.FC = ({ children }) => {
  const [channel, setChannel] = useState<Channel | null>(null);
  const [state, setState] = useState<CheckoutState>(pureState());

  const checkoutService = new CheckoutService(AppConfig.apiUrl);
  const socket = new Socket("ws://localhost:4000/socket", {
    params: { token: "your_token" },
  });

  socket.connect();


  useEffect(() => {
    loadPossibleItemsToStore();
  }, []);

  useEffect(() => {
    if (state.possibleItemsToStore.length) addABag();
  }, [state.possibleItemsToStore]);

  useEffect(() => {
    startCheckout();
  }, [state.storePoint?.id]);

  useEffect(() => {
    if (state.booking.id) wachOrderUpdates();

    return disconnectFromOrderUpdatesChannel;
  }, [state.booking.id]);

  useEffect(() => {
    calculateNewPrice(state);
  }, [state.booking.items.bags]);

  const loadPossibleItemsToStore = async () => {
    const data = await checkoutService.getPossibleItemsKindToStore();

    setState((prevState) => ({
      ...prevState,
      possibleItemsToStore: data,
    }));
  };


  const calculateNewPrice = (state: CheckoutState) => {
    const storagePrice = getStoragePrice();
    const nextState = { ...state };
    nextState.booking.totalValue = nextState.booking.items.bags * storagePrice;
    setState(nextState);

    return nextState;
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

      return nextState;
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

      return nextState;
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
  const wachOrderUpdates = async (callback = processOrderUpdate) => {
    if (!state.booking.id) return;

    const channelName = `order:${state.booking.id}`;
    const orderUpdatesChannel = socket.channel(channelName, {});
    setChannel(orderUpdatesChannel);

    orderUpdatesChannel
      .join()
      .receive("ok", (resp: any) => {
        console.log("Joined successfully to socket!", resp);
        setChannel(orderUpdatesChannel);
      })
      .receive("error", (resp: any) => {
        console.log("Unable to join", resp);
      });

    orderUpdatesChannel.on("order_update", (payload: { order: { status: string } }) => {
      processOrderUpdate(payload.order);
    });
  }

  const disconnectFromOrderUpdatesChannel = () => {
    channel?.leave();
    socket.disconnect();
  }

  const restartCheckout = () => {
    setState(pureState());
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
        wachOrderUpdates,
        restartCheckout
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