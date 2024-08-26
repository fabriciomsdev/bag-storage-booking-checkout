import React, { useEffect } from "react";
import { View } from "react-native";
import { CustomHeading } from "../CustomHeading";
import { Text } from "@rneui/themed";
import { makeStyles } from "@rneui/themed";
import { useCheckout } from "../../contexts/CheckoutContext";

export function OrderProcessingErrorFeedback() {
  const { state } = useCheckout();

  if (state.error) return <CheckoutError error={state.error} />;

  return <></>;
}

export function CheckoutError({ error }: { error: string }) {
  const styles = useStyles();
  return (
    <View style={styles.container}>
      <CustomHeading>Ops!</CustomHeading>
      <Text>{error}</Text>
    </View>
  );
}

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: '#f8d7da',
    width: "90%",
    overflow: "hidden",
    padding: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  text: {
    marginVertical: theme.spacing.lg,
  },
}));
