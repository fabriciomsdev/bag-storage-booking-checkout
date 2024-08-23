import React from "react";
import { Text } from "@rneui/themed";
import { useCheckout } from "../contexts/CheckoutContext";
import { BagCounter } from "./BagCounter";
import { Container } from "./Container";
import { CustomHeading } from "./CustomHeading";
import { Logo } from "./Logo";

export function CheckoutHeader() {
  const { state, addABag, removeABag } = useCheckout();

  return (
    <Container>
      <Logo theme="dark" />
      <Text>Booking storage at:</Text>
      <CustomHeading>{state.storePoint.name}</CustomHeading>
      <BagCounter
        count={state.booking.items.bags}
        onIncrement={addABag}
        onDecrement={removeABag}
      />
    </Container>
  )
}