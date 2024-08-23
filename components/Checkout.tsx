import React from "react";
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
import { Loading } from "./Loading";
import { OrderProcessingFeedback } from "./Error";

export function Checkout() {
  const styles = useStyles();
  const { state } = useCheckout();
  
  if (state.loading) return <Loading />;

  return (
    <View style={styles.container}>
      <CheckoutHeader/>
      <CheckoutDivider/>
      <CustomerInformationForm/>
      <CheckoutDivider/>
      <CreditCardForm/>
      <OrderProcessingFeedback />
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