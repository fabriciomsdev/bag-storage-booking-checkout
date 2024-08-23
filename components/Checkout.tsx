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


export function Checkout() {
  const styles = useStyles();

  return (
    <View style={styles.container}>
      <CheckoutHeader/>
      <CheckoutDivider/>
      <CustomerInformationForm/>
      <CheckoutDivider/>
      <CreditCardForm/>
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