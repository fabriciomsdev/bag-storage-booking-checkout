import React, { useEffect } from "react";
import { LinearProgress, makeStyles } from "@rneui/themed";
import { TextStyle, View } from "react-native";
import { CustomHeading } from "./CustomHeading";
import { useCheckout } from "../contexts/CheckoutContext";

export const Loading = () => {
  const styles = useStyles();
  const { state, wachOrder } = useCheckout();

  useEffect(() => {
    wachOrder();
  }, []);

  return (
    <View style={styles.container}>
      <CustomHeading style={{ color: 'white' }}>
        {state.success ?  'Booking Placed!' : 'Booking order...'}
      </CustomHeading>
      {state.loading && !state.success && (
        <LinearProgress color="white" style={styles.progress} />
      )}
    </View>
  );
};

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
