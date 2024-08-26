import React from "react";
import { Button, makeStyles } from "@rneui/themed";
import { View } from "react-native";
import { CustomHeading } from "../CustomHeading";
import { useCheckout } from "../../contexts/CheckoutContext";
import { Logo } from "../Logo";


export const OrderBookedFeedback = () => {
  const styles = useStyles();
  const { restartCheckout } = useCheckout();

  return (
    <View style={styles.container} testID="checkout-success-feedback">
      <Logo theme="light" />
      <CustomHeading style={{ color: 'white' }}>
        Booking Placed!
      </CustomHeading>
      <Button 
        onPress={restartCheckout} 
        color="success"
      >
        Make a new booking
      </Button>
    </View>
  );
}

const useStyles = makeStyles((theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.primary,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    overflow: "hidden",
  },
  text: {
    marginVertical: theme.spacing.lg,
  },
  progress: {
    width: "80%",
    marginVertical: theme.spacing.lg,
  },
  heading: { color: 'white' }
}));
