import React, { useEffect } from "react";
import { Icon, LinearProgress, makeStyles } from "@rneui/themed";
import { View } from "react-native";
import { CustomHeading } from "./CustomHeading";
import { useCheckout } from "../contexts/CheckoutContext";
import { Logo } from "./Logo";

export const Loading = () => {
  const styles = useStyles();
  const { state } = useCheckout();

  return (
    <View style={styles.container}>
      {state.loading && !state.success && (
        <>
          <Logo theme="light" />
          <LinearProgress color="white" style={styles.progress} />
        </>
      )}
      <CustomHeading style={{ color: 'white' }}>
        {state.success ?  'Booking Placed! =)' : 'Booking order...'}
      </CustomHeading>
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
