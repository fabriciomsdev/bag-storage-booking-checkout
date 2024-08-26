import React, { useEffect } from "react";
import {
  makeStyles,
} from "@rneui/themed";
import { View } from "react-native";
import { CheckoutDivider } from "./Divider";
import { CustomerInformationForm } from "./CustomerInformationForm";
import { CreditCardForm } from "./CreditCard";
import { CheckoutConfirmation } from "./Confirmation";
import { CheckoutHeader } from "./CheckoutHeader";
import { useCheckout } from "../contexts/CheckoutContext";
import { Loading } from "./Feedbacks/Loading";
import { OrderProcessingErrorFeedback } from "./Feedbacks/Error";
import { OrderBookedFeedback } from "./Feedbacks/OrderBooked";

export function Checkout() {
  const styles = useStyles();
  const { state } = useCheckout();

  if (state.loading) return <Loading />;
  if (state.success) return <OrderBookedFeedback />;

  return (
    <View style={styles.container}>
      <CheckoutHeader/>
      <CheckoutDivider/>
      <CustomerInformationForm/>
      <CheckoutDivider/>
      <CreditCardForm/>
      <OrderProcessingErrorFeedback />
      <CheckoutDivider/>
      <CheckoutConfirmation/>
    </View>
  );
}

const useStyles = makeStyles((theme) => ({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    overflow: "hidden",
  },
  text: {
    marginVertical: theme.spacing.lg,
  },
}));