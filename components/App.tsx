import React from "react";
import { CheckoutProvider } from "../contexts/CheckoutContext";
import { Checkout }from "./Checkout";

export default function LuggageStoreCheckout() {
  return (
    <CheckoutProvider>
      <Checkout />
    </CheckoutProvider>
  );
}