import React from "react";
import { LinearProgress, makeStyles } from "@rneui/themed";
import { View } from "react-native";
import { CustomHeading } from "../CustomHeading";
import { Logo } from "../Logo";


export const Loading = () => {
  const styles = useStyles();

  return (
    <View style={styles.container} testID="checkout-loading-feedback">
      <Logo theme="light" />
      <LinearProgress color="white" style={styles.progress} />
      <CustomHeading style={{ color: 'white' }}>
        Booking your order...
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
